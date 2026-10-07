import assert from 'node:assert/strict';
import {mkdirSync, writeFileSync} from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
const cases = [
    ...['bottom', 'top', 'left', 'right'].map(position => ({name: position, fixture: 'positions', position, opener: position, close: 'Close'})),
    {name: 'content height', fixture: 'basic', position: 'bottom', opener: 'Share', close: 'Cancel'},
    {name: 'not draggable', fixture: 'not-draggable', position: 'bottom', opener: 'Delete project', close: 'Cancel'}
];
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        results[framework] = {};
        for (const {name, fixture, position, opener, close} of cases) {
            await page.evaluate(async ({framework, fixture}) => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/sheet/${fixture}.vue`, framework, false), {framework, fixture});
            await page.locator('#flux-validation').getByRole('button', {name: opener, exact: true}).waitFor();
            await page.waitForTimeout(300);
            for (const phase of ['enter', 'leave', 'reopen']) {
                const frames = await page.evaluate(async ({opener, close, phase}) => {
                    const start = performance.now(), frames = [];
                    if (phase === 'leave') Array.from(document.querySelectorAll('.f_sheet button')).find(node => node.textContent === close).click();
                    else Array.from(document.querySelectorAll('#flux-validation button')).find(node => node.textContent === opener).click();
                    while (performance.now() - start < 1000) {
                        await new Promise(requestAnimationFrame);
                        const surface = document.querySelector('.f_sheetSurface');
                        if (!surface) {frames.push({time: performance.now() - start}); continue;}
                        const rect = surface.getBoundingClientRect(), css = getComputedStyle(surface);
                        frames.push({time: performance.now() - start, x: rect.x, y: rect.y, width: rect.width, height: rect.height, translate: css.translate, opacity: +css.opacity, classes: surface.className, parentClasses: surface.parentElement.className});
                    }
                    return frames;
                }, {opener, close, phase});
                (results[framework][name] ??= {})[phase] = frames;
                console.log(framework, name, phase, 'recorded');
            }
        }
        await page.close();
    }
    for (const framework of ['vue', 'react']) for (const {name, fixture, position, opener, close} of cases) {
        for (const phase of ['enter', 'reopen']) {
            const frames = results[framework][name][phase].filter(frame => frame.x !== undefined);
            const first = frames[0], last = frames.at(-1);
            const axis = ['top', 'bottom'].includes(position) ? 'y' : 'x';
            const edge = {top: -first.height, bottom: 1000, left: -first.width, right: 1440}[position];
            assert(Math.abs(first[axis] - edge) < 4, `${framework} ${name}: opening must start outside the viewport (${first[axis]} vs ${edge})`);
            assert(frames.some(frame => Math.abs(frame[axis] - last[axis]) > 10 && Math.abs(frame[axis] - edge) > 10), `${framework} ${name}: missing opening motion`);
            const reference = results.vue[name].enter.at(-1);
            assert(Math.abs(last[axis] - reference[axis]) < 1, `${framework} ${name}: final snap`);
        }
        const leaving = results[framework][name].leave;
        assert.equal(leaving.at(-1).x, undefined, `${framework} ${name}: leave must finish`);
        const visible = leaving.filter(frame => frame.x !== undefined);
        const axis = ['top', 'bottom'].includes(position) ? 'y' : 'x';
        assert(Math.abs(visible[0][axis] - results[framework][name].enter.at(-1)[axis]) < 4, `${framework} ${name}: leave must retain its anchor`);
        assert(Math.abs(visible.at(-1)[axis] - visible[0][axis]) > 100, `${framework} ${name}: missing closing motion`);
    }
} finally {
    mkdirSync('.artifacts/react-parity', {recursive: true});
    writeFileSync('.artifacts/react-parity/sheet-motion.json', JSON.stringify(results, null, 2));
    await browser.close();
}
