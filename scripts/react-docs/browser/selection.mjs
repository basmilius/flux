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
            await page.evaluate(async args => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/${args.name}.vue`, args.framework, false), {name, framework});
            await page.waitForTimeout(350);
            assert.equal(await page.locator('[data-react-state="error"]').count(), 0);
        }
        const input = page.locator('#flux-validation input.f_formTagsInputField');
        const tags = () => page.locator('#flux-validation .f_tagLabel').allTextContents();
        await fixture('form/tags-input/basic');
        for (const tag of ['one', 'two', 'two', 'three', 'four', 'five', 'six']) {await input.fill(tag); await input.press('Enter');}
        results[framework].limited = await tags();
        assert.equal(results[framework].limited.length, 5);
        await input.fill(''); await input.press('Backspace');
        results[framework].removed = await tags();
        await fixture('form/tags-input/delimiters');
        await input.evaluate(element => {
            const data = new DataTransfer(); data.setData('text', 'one,two three\nfour');
            element.dispatchEvent(new ClipboardEvent('paste', {bubbles: true, cancelable: true, clipboardData: data}));
        });
        results[framework].pasted = await tags();
        await fixture('form/tags-input/validation');
        await input.fill('bad address'); await input.press('Enter');
        results[framework].invalid = {tags: await tags(), query: await input.inputValue()};
        await input.fill('new@example.com'); await input.press('Enter');
        results[framework].valid = await tags();
        await fixture('form/tags-input/suggestions');
        await input.fill('script');
        await page.waitForTimeout(120);
        results[framework].suggestions = await page.locator('.f_formTagsInputPopup .f_menuItemLabel').allTextContents();
        await input.press('ArrowDown'); await input.press('Enter');
        results[framework].selectedTag = await tags();
        assert.deepEqual(results[framework].selectedTag, ['Vue', 'typescript']);
        await fixture('form/select/basic');
        const select = page.locator('#flux-validation .f_formSelect');
        await select.click(); await page.waitForTimeout(100);
        results[framework].popup = await page.locator('.f_formSelectPopup').evaluate(element => {
            const rect = element.getBoundingClientRect();
            const anchor = document.querySelector('#flux-validation .f_formSelect').getBoundingClientRect();
            return {gap: rect.y - anchor.bottom, width: rect.width, height: rect.height};
        });
        await page.locator('.f_formSelectPopup .f_menuItem').filter({hasText: 'Option 3'}).click();
        results[framework].selected = await select.innerText();
        await fixture('form/select/searchable');
        await select.click();
        const search = page.locator('.f_formSelectSearch input');
        await search.fill('Option 4');
        await search.press('ArrowDown'); await search.press('Enter');
        results[framework].searched = await select.innerText();
        assert.match(results[framework].searched, /Option 4/);
        console.log(`${framework}: tag limits, paste, validation, suggestions and select popup checked`);
    }
    assert.deepEqual(results.react, results.vue);
    console.log('Vue and React selection controls match');
} finally {
    fs.writeFileSync('.artifacts/react-parity/selection.json', JSON.stringify(results, null, 2));
    await browser.close();
}
