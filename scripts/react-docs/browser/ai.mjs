import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce'});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    for (const framework of ['vue', 'react']) {
        const row = results[framework] = {};
        async function fixture(name) {
            await page.evaluate(async args => (await import('/.vitepress/react/validation.ts')).renderFixture(`ai/${args.name}.vue`, args.framework, false), {name, framework});
            await page.waitForTimeout(350);
            assert.equal(await page.locator('[data-react-state="error"]').count(), 0);
        }
        await fixture('prompt-input/attachments');
        const chooser = page.waitForEvent('filechooser');
        await page.getByRole('button', {name: 'Attach files', exact: true}).click();
        await (await chooser).setFiles({name: 'example.pdf', mimeType: 'application/pdf', buffer: Buffer.from('example')});
        await page.getByRole('button', {name: 'Remove example.pdf'}).waitFor();
        row.attached = await page.locator('.f_aiPromptInputAttachmentLabel').allTextContents();
        await page.getByRole('button', {name: 'Remove example.pdf'}).click();
        assert.equal(await page.locator('.f_aiPromptInputAttachment').count(), 0);
        await page.getByRole('textbox', {name: 'Message', exact: true}).fill('A prompt');
        await page.getByRole('textbox', {name: 'Message', exact: true}).press('Enter');
        assert.equal(await page.getByRole('textbox', {name: 'Message', exact: true}).inputValue(), '');
        await fixture('conversation/manual');
        const log = page.getByRole('log');
        assert.equal(await log.evaluate(element => element.scrollTop), 0);
        await page.getByRole('button', {name: 'Add a turn', exact: true}).click();
        await page.waitForTimeout(150);
        assert.equal(await log.evaluate(element => element.scrollTop), 0);
        await page.getByRole('button', {name: 'Jump to latest', exact: true}).last().click();
        await page.waitForTimeout(250);
        assert.ok(await log.evaluate(element => element.scrollHeight - element.scrollTop - element.clientHeight <= 24));
        await fixture('conversation/following');
        await page.getByRole('button', {name: 'Ask again'}).click();
        await page.waitForTimeout(600);
        assert.ok(await log.evaluate(element => element.scrollHeight - element.scrollTop - element.clientHeight <= 24));
        await log.evaluate(element => {element.scrollTop = 0;});
        await page.waitForTimeout(150);
        const top = await log.evaluate(element => element.scrollTop);
        await page.waitForTimeout(600);
        assert.equal(await log.evaluate(element => element.scrollTop), top, 'streaming must leave the reader at their scroll position');
        await page.getByRole('button', {name: 'Jump to latest', exact: true}).click();
        await page.waitForTimeout(400);
        assert.ok(await log.evaluate(element => element.scrollHeight - element.scrollTop - element.clientHeight <= 24));
        row.following = true;
        console.log(`${framework}: attachments, prompt submission, manual scrolling and streaming follow checked`);
    }
    assert.deepEqual(results.react, results.vue);
    assert.deepEqual(errors, []);
} finally {
    fs.mkdirSync('.artifacts/react-parity', {recursive: true});
    fs.writeFileSync('.artifacts/react-parity/ai.json', JSON.stringify(results, null, 2));
    await browser.close();
}
