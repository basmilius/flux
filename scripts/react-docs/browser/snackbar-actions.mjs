import assert from 'node:assert/strict';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage();
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        await page.evaluate(async framework => {
            await (await import('/.vitepress/react/validation.ts')).renderFixture('components/attention/snackbar/functional.vue', framework, false);
            window.store = (await import('/.vitepress/react/motionValidation.tsx')).snackbarStore(framework);
            window.events = [];
        }, framework);
        await page.waitForTimeout(100);
        await page.evaluate(() => {window.store.showSnackbar({message: 'Saved changes', duration: 10000, isCloseable: true, actions: {undo: 'Undo'}, onAction: key => window.events.push(`action:${key}`), onClose: () => window.events.push('close')}).then(() => window.events.push('resolved'));});
        await page.getByRole('button', {name: 'Undo', exact: true}).click();
        await page.waitForTimeout(500);
        const afterAction = await page.evaluate(() => ({events: [...window.events], visible: Array.from(document.querySelectorAll('.f_snackbars')).some(node => node.textContent.includes('Saved changes'))}));
        if (afterAction.visible) {
            await page.locator('.f_snackbars button').last().click();
            await page.waitForTimeout(500);
        }
        results[framework] = {afterAction, afterClose: await page.evaluate(() => ({events: [...window.events], visible: Array.from(document.querySelectorAll('.f_snackbars')).some(node => node.textContent.includes('Saved changes'))}))};
        console.log(framework, results[framework]);
        await page.close();
    }
    assert.deepEqual(results.react, results.vue, 'Action callbacks must not implicitly dismiss or resolve a Vue-style notification');
} finally {await browser.close();}
