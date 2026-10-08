import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    for (const framework of ['vue', 'react']) {
        await page.evaluate(async framework => (await import('/.vitepress/react/validation.ts')).renderFixture('components/window/basic.vue', framework, false), framework);
        await page.waitForTimeout(400);
        await page.getByRole('button', {name: 'Open window'}).click();
        await page.waitForTimeout(400);
        const surface = page.locator('.f_flyoutPane > .f_pane');
        const size = async () => {const box = await surface.boundingBox(); return {width: box.width, height: box.height};};
        results[framework] = {initial: await size(), views: []};
        for (const name of ['Sort by', 'Period', 'Status']) {
            await page.getByRole('menuitem', {name: new RegExp(`^${name}`)}).click();
            await page.waitForTimeout(650);
            results[framework].views.push(await size());
            assert.notEqual(results[framework].views.at(-1).height, results[framework].initial.height);
            await page.getByRole('menuitem', {name: 'Back', exact: true}).click();
            await page.waitForTimeout(650);
            assert.deepEqual(await size(), results[framework].initial);
        }
        console.log(`${framework}: window navigation and animated pane height checked`);
    }
    assert.deepEqual(results.react, results.vue);
    console.log('Vue and React windows match');
} finally {
    fs.writeFileSync('.artifacts/react-parity/window.json', JSON.stringify(results, null, 2));
    await browser.close();
}
