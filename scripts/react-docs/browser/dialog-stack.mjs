import assert from 'node:assert/strict';
import {mkdirSync, writeFileSync} from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        await page.evaluate(async framework => {
            await (await import('/.vitepress/react/validation.ts')).renderFixture('components/attention/confirm/functional.vue', framework, false);
            window.notifications = (await import('/.vitepress/react/motionValidation.tsx')).snackbarStore(framework);
            window.resolved = [];
        }, framework);
        await page.waitForTimeout(300);
        const output = results[framework] = {};
        async function snapshot(name) {
            output[name] = await page.evaluate(() => ({
                dialogs: Array.from(document.querySelectorAll('.f_overlay')).map(node => ({label: node.getAttribute('aria-label'), current: node.classList.contains('f_isCurrent'), opacity: +getComputedStyle(node).opacity, panes: Array.from(node.children).map(pane => {const r = pane.getBoundingClientRect(); return {text: pane.querySelector('.f_paneHeader')?.textContent, x: r.x, y: r.y, width: r.width, height: r.height, filter: getComputedStyle(pane).filter};})})),
                shades: Array.from(document.querySelectorAll('.f_overlayShade')).filter(node => +getComputedStyle(node).opacity > .01).length,
                locked: getComputedStyle(document.body).overflow === 'hidden',
                mainInert: document.querySelector('#flux-validation > .f_root').inert,
                resolved: [...window.resolved]
            }));
        }
        await page.evaluate(() => {
            for (const title of ['First', 'Second']) window.notifications.showConfirm({title, message: 'Continue?'}).then(value => window.resolved.push([title, value]));
        });
        await page.waitForTimeout(550);
        await snapshot('two confirmations');
        await page.locator('.f_overlay').getByRole('button', {name: 'Cancel', exact: true}).first().evaluate(node => node.click());
        await page.waitForTimeout(550);
        await snapshot('one confirmation');
        await page.evaluate(() => {window.notifications.showAlert({title: 'Alert above confirm', message: 'Details'}).then(() => window.resolved.push(['Alert', true]));});
        await page.waitForTimeout(550);
        await snapshot('mixed stack');
        await page.getByRole('dialog', {name: 'Alert above confirm', exact: true}).getByRole('button', {name: 'Ok', exact: true}).click();
        await page.waitForTimeout(100);
        await snapshot('top leaving');
        await page.waitForTimeout(500);
        await snapshot('back to confirm');
        await page.getByRole('button', {name: 'Ok', exact: true}).click();
        await page.waitForTimeout(700);
        await snapshot('closed');
        console.log(framework, 'simultaneous, mixed and closing dialog stacks recorded');
        await page.close();
    }
    for (const name of Object.keys(results.vue)) {
        const expected = results.vue[name], actual = results.react[name];
        assert.equal(actual.dialogs.length, expected.dialogs.length, `${name}: overlay count`);
        assert.equal(actual.shades, expected.shades, `${name}: shared shade`);
        assert.equal(actual.locked, expected.locked, `${name}: scroll lock`);
        assert.equal(actual.mainInert, expected.mainInert, `${name}: underlying docs content must be inert`);
        assert.deepEqual(actual.resolved, expected.resolved, `${name}: result delivery`);
        for (const b of expected.dialogs) {
            const a = actual.dialogs.find(dialog => dialog.label === b.label);
            assert(a, `${name}: dialog label ${b.label}`);
            assert.equal(a.current, b.current, `${name}: current overlay`);
            assert.equal(a.panes.length, b.panes.length, `${name}: pane count`);
            if (name === 'top leaving') continue;
            for (let j = 0; j < a.panes.length; j++) for (const prop of ['x', 'y', 'width', 'height']) assert(Math.abs(a.panes[j][prop] - b.panes[j][prop]) <= 1, `${name}: pane ${j} ${prop}`);
        }
    }
} finally {
    mkdirSync('.artifacts/react-parity', {recursive: true});
    writeFileSync('.artifacts/react-parity/dialog-stack.json', JSON.stringify(results, null, 2));
    await browser.close();
}
