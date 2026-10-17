import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    for (const framework of ['vue', 'react']) {
        results[framework] = {};
        await page.evaluate(() => localStorage.removeItem('flux/split-view/docs-persisted-example'));
        async function fixture(name) {
            await page.evaluate(async args => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/layout/split-view/${args.name}.vue`, args.framework, false), {name, framework});
            await page.waitForTimeout(350);
            assert.equal(await page.locator('[data-react-state="error"]').count(), 0);
        }
        async function geometry() {
            return page.locator('#flux-validation').evaluate(root => [...root.querySelectorAll('.f_splitView')].map(element => {
                const box = element.getBoundingClientRect();
                const css = getComputedStyle(element);
                return {width: box.width, height: box.height, columns: css.gridTemplateColumns, rows: css.gridTemplateRows};
            }));
        }
        for (const name of ['horizontal', 'vertical', 'nested', 'persisted']) {
            await fixture(name);
            results[framework][name] = {initial: await geometry()};
            const handle = page.getByRole('separator').first();
            await handle.focus();
            const key = name === 'vertical' ? 'ArrowDown' : 'ArrowRight';
            await page.keyboard.press(key);
            await page.keyboard.press(`Shift+${key}`);
            results[framework][name].keyboard = await geometry();
            await page.keyboard.press('Home');
            results[framework][name].home = await geometry();
            await page.keyboard.press('End');
            results[framework][name].end = await geometry();
            const box = await handle.boundingBox();
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            await page.mouse.move(box.x + box.width / 2 - (name === 'vertical' ? 0 : 80), box.y + box.height / 2 - (name === 'vertical' ? 80 : 0), {steps: 8});
            await page.mouse.up();
            results[framework][name].drag = await geometry();
            if (name === 'persisted') {
                results[framework][name].saved = await page.evaluate(() => JSON.parse(localStorage.getItem('flux/split-view/docs-persisted-example')));
                await fixture(name);
                results[framework][name].restored = await geometry();
                assert.deepEqual(results[framework][name].restored, results[framework][name].drag);
            }
        }
        console.log(`${framework}: nested pane geometry, keyboard limits, dragging and persistence checked`);
    }
    assert.deepEqual(results.react, results.vue);
    console.log('Vue and React split views match');
} finally {
    fs.writeFileSync('.artifacts/react-parity/split-view.json', JSON.stringify(results, null, 2));
    await browser.close();
}
