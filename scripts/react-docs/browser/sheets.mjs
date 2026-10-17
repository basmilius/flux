import assert from 'node:assert/strict';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of (process.env.FLUX_FRAMEWORK ? [process.env.FLUX_FRAMEWORK] : ['vue', 'react'])) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        page.on('pageerror', error => console.error(framework, error.message));
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        results[framework] = {};
        async function fixture(name) {
            await page.evaluate(async ({framework, name}) => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/sheet/${name}.vue`, framework, false), {framework, name});
            await page.waitForTimeout(150);
        }
        const surface = page.locator('.f_sheetSurface');
        async function offset() {await page.waitForTimeout(900); return surface.evaluate(e => ({offset: parseFloat(e.style.getPropertyValue('--sheet-offset')), width: e.offsetWidth, height: e.offsetHeight}));}
        await fixture('positions');
        for (const position of ['bottom', 'left', 'right', 'top']) {
            await page.locator('#flux-validation').getByRole('button', {name: position, exact: true}).click();
            const initial = await offset();
            console.log(framework, position, initial);
            results[framework][position] = initial;
            const dimension = position === 'top' || position === 'bottom' ? 'height' : 'width';
            assert(Math.abs(initial.offset - initial[dimension] / 2) < .2, `${framework} ${position}: initial snap`);
            const grabber = page.locator('[data-flux-sheet-grabber]');
            await grabber.focus();
            await page.keyboard.press({bottom: 'ArrowUp', top: 'ArrowDown', left: 'ArrowRight', right: 'ArrowLeft'}[position]);
            assert.equal((await offset()).offset, 0);
            await page.keyboard.press({bottom: 'ArrowDown', top: 'ArrowUp', left: 'ArrowLeft', right: 'ArrowRight'}[position]);
            assert(Math.abs((await offset()).offset - initial.offset) < .2);
            await grabber.click();
            await page.waitForTimeout(650);
            assert.equal(await surface.count(), 0);
        }
        await fixture('scrollable');
        await page.locator('#flux-validation').getByRole('button', {name: 'Order history'}).click();
        const first = await offset();
        const grabber = page.locator('[data-flux-sheet-grabber]');
        const b = await grabber.boundingBox();
        await page.mouse.move(b.x + b.width / 2, b.y + 15);
        await page.mouse.wheel(0, 100);
        assert.equal((await offset()).offset, 0, `${framework}: wheel growth`);
        const pane = surface.locator(':scope > .f_pane');
        await pane.evaluate(e => e.scrollTop = 120);
        await pane.dispatchEvent('wheel', {deltaY: -60});
        assert.equal((await offset()).offset, 0, `${framework}: collapsed while scroller had room`);
        await pane.evaluate(e => e.scrollTop = 0);
        await pane.dispatchEvent('wheel', {deltaY: -60});
        assert(Math.abs((await offset()).offset - first.offset) < .2);
        const handle = await grabber.boundingBox();
        await page.mouse.move(handle.x + handle.width / 2, handle.y + 15);
        await page.mouse.down();
        await page.mouse.move(handle.x + handle.width / 2, handle.y - 10);
        await page.mouse.move(handle.x + handle.width / 2, handle.y - 520, {steps: 35});
        await page.waitForTimeout(200);
        const stretched = await surface.evaluate(e => parseFloat(e.style.getPropertyValue('--sheet-offset')));
        assert(stretched < 0 && stretched > -49, `${framework}: elastic overdrag ${stretched}`);
        await page.mouse.up();
        assert.equal((await offset()).offset, 0);
        console.log(framework, 'four sheet positions, keyboard/click snapping, wheel handoff and elastic drag passed');
        await page.close();
    }
    if (results.react && results.vue) assert.deepEqual(results.react, results.vue);
} finally {await browser.close();}
