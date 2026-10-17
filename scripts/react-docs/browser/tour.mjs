import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    for (const framework of ['vue', 'react']) {
        const row = results[framework] = {};
        async function fixture(name) {
            await page.evaluate(async args => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/tour/${args.name}.vue`, args.framework, false), {name, framework});
            await page.waitForTimeout(200);
            await page.getByRole('button', {name: 'Start tour', exact: true}).click();
            await page.getByRole('dialog').waitFor();
            await page.waitForTimeout(400);
        }
        const snapshot = () => page.locator('.f_tourPopover, .f_tourSpotlight').evaluateAll(elements => elements.map(element => {
            const rect = element.getBoundingClientRect();
            return {className: element.className.replace(/ f_isStepping/, ''), x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height)};
        }));
        await fixture('positions');
        row.positions = [];
        for (let step = 0; step < 4; step++) {
            row.positions.push(await snapshot());
            await page.getByRole('dialog').getByRole('button', {name: step === 3 ? 'Done' : 'Next', exact: true}).click();
            await page.waitForTimeout(400);
        }
        await page.getByRole('dialog').waitFor({state: 'hidden'});
        await fixture('rich');
        row.rich = [await snapshot()];
        await page.getByRole('dialog').getByRole('button', {name: 'Next', exact: true}).click();
        await page.waitForTimeout(45);
        assert.ok(await page.locator('.f_tourBodyViewport').evaluate(element => element.getAnimations({subtree: true}).some(animation => animation.effect?.getTiming().duration > 0)), 'tour step must animate');
        await page.waitForTimeout(400);
        row.rich.push(await snapshot());
        await page.getByRole('dialog').getByRole('button', {name: 'Next', exact: true}).click();
        await page.waitForTimeout(400);
        row.rich.push(await snapshot());
        await page.getByRole('dialog').getByRole('button', {name: 'Done', exact: true}).focus();
        await page.keyboard.press('Tab');
        assert.equal(await page.getByRole('dialog').evaluate(element => element.contains(document.activeElement)), true);
        await page.keyboard.press('Escape');
        await page.getByRole('dialog').waitFor({state: 'hidden'});
        assert.equal(await page.getByRole('button', {name: 'Start tour', exact: true}).evaluate(element => element === document.activeElement), true);
        await fixture('preview');
        await page.setViewportSize({width: 960, height: 800});
        await page.waitForTimeout(350);
        row.resized = await snapshot();
        await page.getByRole('dialog').getByRole('button', {name: 'Skip', exact: true}).click();
        await page.getByRole('dialog').waitFor({state: 'hidden'});
        await page.setViewportSize({width: 1440, height: 1000});
        console.log(`${framework}: tour positions, resizing, keyboard focus and step animations checked`);
    }
    function compare(actual, expected, path = '') {
        if (typeof actual === 'number') {assert.ok(Math.abs(actual - expected) <= 1, `${path}: ${actual} vs ${expected}`); return;}
        if (actual && typeof actual === 'object') {
            assert.deepEqual(Object.keys(actual), Object.keys(expected));
            for (const key of Object.keys(actual)) compare(actual[key], expected[key], `${path}.${key}`);
        } else assert.equal(actual, expected, path);
    }
    compare(results.react, results.vue);
} finally {
    fs.writeFileSync('.artifacts/react-parity/tour.json', JSON.stringify(results, null, 2));
    await browser.close();
}
