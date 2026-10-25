import assert from 'node:assert/strict';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        async function fixture(name) {
            await page.evaluate(async ({framework, name}) => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/filter/${name}.vue`, framework, false), {framework, name});
            await page.waitForTimeout(800);
        }
        const root = page.locator('#flux-validation .f_filter');
        const labels = () => root.locator('.f_buttonLabel').allTextContents();
        results[framework] = {};
        await fixture('full');
        results[framework].initial = await labels();
        results[framework].box = await root.boundingBox();
        await root.getByRole('menuitem', {name: /^Option Option B/}).click();
        await page.waitForTimeout(500);
        results[framework].options = await labels();
        await root.getByRole('searchbox').fill('Option A');
        assert.equal(await root.locator('.f_menuItemSelected').count(), 0);
        await root.getByText('Option A', {exact: true}).click();
        await page.waitForTimeout(600);
        results[framework].afterSelection = await labels();
        console.log(framework, JSON.stringify(results[framework]));
        if (await root.locator('.f_filterBack').count()) await root.locator('.f_filterBack').click();
        await page.waitForTimeout(400);
        await root.getByRole('menuitem', {name: /^Choices /}).first().click();
        await page.waitForTimeout(400);
        const optionB = root.getByText('Option B', {exact: true});
        await optionB.click();
        assert.equal(await root.locator('.f_menuItemSelected').count(), 3);
        await root.locator('.f_filterBack').click();
        await page.waitForTimeout(400);
        await root.getByRole('menuitem', {name: /^Cost /}).click();
        await page.waitForTimeout(500);
        assert.equal(await root.getByRole('slider').count(), 2);
        results[framework].range = await root.locator('.f_formFieldValue').allTextContents();
        await fixture('bar');
        await page.getByRole('button', {name: 'Filter', exact: true}).click();
        const flyout = page.locator('.f_flyoutPane');
        await flyout.getByRole('menuitem', {name: 'Status', exact: true}).click();
        await page.waitForTimeout(500);
        await flyout.getByText('Active', {exact: true}).click();
        await page.waitForTimeout(500);
        results[framework].barButtons = await page.locator('#flux-validation .f_filterBar .f_buttonLabel').allTextContents();
        await page.keyboard.press('Escape');
        await page.close();
    }
    for (const key of ['initial', 'options', 'afterSelection', 'range', 'barButtons']) assert.deepEqual(results.react[key], results.vue[key], key);
    for (const dim of ['width', 'height']) assert(Math.abs(results.vue.box[dim] - results.react.box[dim]) <= 1.1, `${dim}: ${results.vue.box[dim]} vs ${results.react.box[dim]}`);
} finally {await browser.close();}
