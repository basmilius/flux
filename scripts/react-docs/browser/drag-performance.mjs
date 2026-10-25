import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { chromium } from '../../../docs/node_modules/playwright/index.mjs';

const output = path.resolve(import.meta.dirname, '../../../.artifacts/react-parity');
mkdirSync(output, { recursive: true });
const base = process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174';
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined) });
const results = {};
try {
    for (const framework of ['react', 'vue']) {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
        const errors = [];
        page.on('pageerror', (error) => errors.push(error.message));
        await page.addInitScript(() => {
            const starts = new WeakMap();
            // Count fresh renders only; bailed-out fibers retain their previous work flags.
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
                supportsFiber: true,
                renderers: new Map(),
                inject(renderer) {
                    this.renderers.set(1, renderer);
                    return 1;
                },
                onCommitFiberUnmount() {},
                onCommitFiberRoot(id, root) {
                    const profile = window.__dragProfile;
                    if (profile?.active) profile.durations.push(root.current.actualDuration);
                    function walk(fiber) {
                        if (!fiber) return;
                        const previous = starts.get(fiber) ?? starts.get(fiber.alternate);
                        if (fiber.actualStartTime !== previous) {
                            if (profile?.active && fiber.flags & 1) {
                                const name = fiber.type?.displayName || fiber.type?.name;
                                if (name) profile.components[name] = (profile.components[name] ?? 0) + 1;
                            }
                            starts.set(fiber, fiber.actualStartTime);
                            if (fiber.alternate) starts.set(fiber.alternate, fiber.actualStartTime);
                        }
                        walk(fiber.child);
                        walk(fiber.sibling);
                    }
                    walk(root.current);
                }
            };
        });
        await page.goto(`${base}/${framework === 'react' ? 'react/' : ''}playground`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(600);
        results[framework] = {};
        for (const control of ['slider', 'range', 'fader', 'color']) {
            const element = control === 'color' ? page.locator('.f_colorPickerSaturation').first() : control === 'fader' ? page.locator('.f_formFader').first() : page.locator('.f_slider').nth(control === 'range' ? 1 : 0);
            await element.scrollIntoViewIfNeeded();
            const box = await element.boundingBox();
            assert(box.width > 0 && box.height > 0);
            const y = box.y + (control === 'slider' || control === 'range' ? box.height - 3 : box.height * 0.3);
            await page.mouse.move(box.x + box.width * 0.3, y);
            await page.evaluate(() => {
                window.__dragProfile = { active: true, components: {}, durations: [], frames: [], tasks: [] };
                window.__dragObserver = new PerformanceObserver((list) => window.__dragProfile.tasks.push(...list.getEntries().map((entry) => entry.duration)));
                window.__dragObserver.observe({ type: 'longtask', buffered: false });
            });
            await page.mouse.down();
            await page.evaluate(
                async ({ box, y }) => {
                    let previous = performance.now();
                    for (let frame = 0; frame < 90; frame++) {
                        await new Promise(requestAnimationFrame);
                        const now = performance.now();
                        window.__dragProfile.frames.push(now - previous);
                        previous = now;
                        const fraction = 0.15 + (0.7 * (1 - Math.cos((frame / 89) * Math.PI * 4))) / 2;
                        document.dispatchEvent(new PointerEvent('pointermove', { pointerId: 1, clientX: box.x + box.width * fraction, clientY: y, buttons: 1, bubbles: true, cancelable: true }));
                    }
                },
                { box, y }
            );
            await page.mouse.up();
            await page.waitForTimeout(350);
            const profile = await page.evaluate(() => {
                window.__dragProfile.active = false;
                window.__dragObserver.disconnect();
                return window.__dragProfile;
            });
            profile.value = control === 'color' ? await page.locator('.f_colorPicker input').first().inputValue() : await (control === 'fader' ? element : element.getByRole('slider').first()).getAttribute('aria-valuenow');
            results[framework][control] = profile;
            const frames = profile.frames.toSorted((a, b) => a - b);
            console.log(framework, control, { median: frames[45].toFixed(1), p95: frames[85].toFixed(1), pageRenders: profile.components.Example ?? 0, longTasks: profile.tasks.length });
            if (framework === 'react') {
                const component = control === 'color' ? 'FluxColorPicker' : control === 'fader' ? 'Fader' : 'Slider';
                assert(profile.components[component] > 1, `${control} produced no React render measurements`);
                assert((profile.components.Example ?? 0) <= 1, `${control} rerendered the whole playground`);
                assert.equal(profile.components.FluxTableCell ?? 0, 0, `${control} rerendered unrelated tables`);
            }
            if (control !== 'color') assert.equal(profile.value, '15', `${framework} ${control} drag did not reach its final value`);
        }
        assert.deepEqual(errors, []);
        await page.close();
    }
    for (const control of Object.keys(results.react)) assert.equal(results.react[control].value, results.vue[control].value, control);
} finally {
    writeFileSync(path.join(output, 'drag-performance.json'), JSON.stringify(results, null, 2));
    await browser.close();
}
