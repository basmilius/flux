import assert from 'node:assert/strict';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        async function fixture(name) {
            await page.evaluate(async ({framework, name}) => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/form/tree-view-select/${name}.vue`, framework, false), {framework, name});
            await page.waitForTimeout(300);
        }
        results[framework] = {};
        await fixture('searchable');
        const anchor = page.getByRole('combobox');
        await anchor.click();
        const popup = page.locator('.f_formSelectPopup');
        await popup.waitFor();
        await page.waitForTimeout(350);
        results[framework].geometry = await popup.boundingBox();
        const search = popup.getByRole('searchbox');
        await search.fill('laptop');
        assert.deepEqual(await popup.getByRole('option').allTextContents(), ['Electronics', 'Computers', 'Laptops']);
        assert.equal(await popup.locator('.f_formRadioElement').count(), 3);
        assert.equal(await popup.locator('label').count(), 0);
        await search.press('ArrowDown'); await search.press('ArrowDown'); await search.press('ArrowDown'); await search.press('Enter');
        await popup.waitFor({state: 'detached'});
        assert.match(await anchor.innerText(), /Laptops/);
        await anchor.click(); await popup.waitFor();
        assert.equal(await search.inputValue(), '');
        assert.match(await popup.locator('.f_isHighlighted').innerText(), /Laptops/);
        await search.press('Escape'); await popup.waitFor({state: 'detached'});
        assert(await anchor.evaluate(e => e === document.activeElement));
        await fixture('cascading');
        await anchor.click(); await popup.waitFor();
        await popup.getByRole('option', {name: /Netherlands/}).click();
        const child = popup.getByRole('option', {name: /North Holland/});
        assert.equal(await child.getAttribute('aria-disabled'), 'true');
        assert.equal(await child.getAttribute('aria-selected'), 'true');
        assert.equal(await popup.locator('.f_formCheckboxElement').count(), 4);
        await child.getByRole('button', {name: 'Expand'}).click({force: true});
        assert.equal(await popup.getByRole('option', {name: 'Amsterdam', exact: true}).getAttribute('aria-disabled'), 'true');
        await page.mouse.click(1350, 900);
        await popup.waitFor({state: 'detached'});
        console.log(framework, 'tree search ancestry, styled controls, reopen selection, keyboard focus and cascading locks passed');
        await page.close();
    }
    for (const dim of ['x', 'y', 'width', 'height']) assert(Math.abs(results.vue.geometry[dim] - results.react.geometry[dim]) <= 1.1, `${dim}: ${results.vue.geometry[dim]} vs ${results.react.geometry[dim]}`);
} finally {await browser.close();}
