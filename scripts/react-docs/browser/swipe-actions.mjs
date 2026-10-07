import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce'});
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    for (const framework of ['vue', 'react']) {
        results[framework] = {};
        async function fixture(name) {
            await page.evaluate(async args => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/swipe-actions/${args.name}.vue`, args.framework, false), {name, framework});
            await page.waitForTimeout(450);
        }
        const rows = page.locator('#flux-validation .f_swipeActions');
        async function drag(index, distance) {
            const box = await rows.nth(index).locator('.f_swipeActionsRow').boundingBox();
            const start = {x: box.x + box.width - 20, y: box.y + box.height / 2};
            await page.mouse.move(start.x, start.y);
            await page.mouse.down();
            await page.mouse.move(start.x + Math.sign(distance) * 10, start.y);
            await page.mouse.move(start.x + distance, start.y, {steps: 10});
            await page.waitForTimeout(180);
            await page.mouse.up();
            await page.waitForTimeout(800);
        }
        async function offsets() {
            return rows.evaluateAll(elements => elements.map(element => {
                const row = element.querySelector('.f_swipeActionsRow');
                const css = getComputedStyle(row);
                return {offset: Math.round(parseFloat(getComputedStyle(element).getPropertyValue('--swipe-offset'))), translate: css.translate, transform: css.transform};
            }));
        }
        await fixture('coordinated');
        await drag(0, -150);
        results[framework].open = await offsets();
        await drag(1, -150);
        results[framework].exclusive = await offsets();
        assert.equal(results[framework].exclusive[0].offset, 0, `${framework}: opening a second row closes the first`);
        const archive = rows.nth(1).getByRole('button', {name: 'Archive'});
        await archive.click();
        results[framework].closed = await offsets();
        await fixture('icon-only');
        await rows.first().getByRole('button', {name: 'Snooze'}).focus();
        await page.waitForTimeout(100);
        results[framework].focusOpen = await offsets();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
        results[framework].focusOut = await offsets();
        await fixture('disabled');
        results[framework].disabled = await rows.nth(1).getByRole('button', {name: 'Delete'}).isDisabled();
        assert.ok(results[framework].disabled, `${framework}: disabled row actions stay disabled`);
        await drag(1, -180);
        assert.equal((await offsets())[1].offset, 0);
        await fixture('full-swipe');
        await page.locator('#flux-validation .f_pane').evaluate(element => element.style.width = '480px');
        await page.waitForTimeout(100);
        await drag(0, -400);
        assert.equal(await rows.count(), 2, `${framework}: full swipe activates Delete`);
        results[framework].fullSwipe = await rows.allTextContents();
        await fixture('coordinated');
        await rows.first().dispatchEvent('wheel', {deltaX: 160, deltaY: 0});
        await page.waitForTimeout(150);
        results[framework].wheel = await offsets();
        console.log(`${framework}: row exclusivity, focus, disabled state, full swipe and wheel checked`);
    }
    assert.deepEqual(results.react, results.vue);
    console.log('Vue and React swipe actions match');
} finally {
    fs.writeFileSync('.artifacts/react-parity/swipe-actions.json', JSON.stringify(results, null, 2));
    await browser.close();
}
