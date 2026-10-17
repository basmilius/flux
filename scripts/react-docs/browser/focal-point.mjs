import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce'});
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    for (const framework of ['vue', 'react']) {
        await page.evaluate(async framework => (await import('/.vitepress/react/validation.ts')).renderFixture('components/focal-point/editor/editor.vue', framework, false), framework);
        await page.locator('.f_focalPointEditorImage').waitFor();
        await page.waitForFunction(() => document.querySelector('.f_focalPointEditorImage')?.naturalWidth > 0);
        await page.waitForTimeout(200);
        const row = results[framework] = {};
        const editor = page.getByRole('slider');
        const area = page.locator('.f_focalPointEditorArea');
        const position = () => area.evaluate(element => [parseFloat(element.style.left), parseFloat(element.style.top)]);
        row.initial = await position();
        const image = await page.locator('.f_focalPointEditorImage').boundingBox();
        row.aspect = image.width / image.height;
        await page.mouse.move(image.x + image.width * .3, image.y + image.height * .6);
        await page.mouse.down();
        await page.mouse.move(image.x + image.width * .8, image.y + image.height * .2, {steps: 8});
        await page.mouse.up();
        row.dragged = (await position()).map(Math.round);
        assert.deepEqual(row.dragged, [80, 20]);
        await editor.focus(); await editor.press('Shift+ArrowLeft'); await editor.press('ArrowDown');
        row.keyboard = (await position()).map(Math.round);
        assert.deepEqual(row.keyboard, [70, 21]);
        const before = await position();
        await page.mouse.move(image.x + image.width * .5, image.y + image.height * .5); await page.mouse.down();
        await page.evaluate(() => window.dispatchEvent(new PointerEvent('pointercancel')));
        await page.mouse.up();
        assert.deepEqual(await position(), before);
        await page.getByRole('button', {name: 'Preview', exact: true}).click();
        await page.locator('.f_focalPointPreviewImage').waitFor();
        row.preview = await page.locator('.f_focalPointPreviewImage').evaluate(element => element.style.backgroundPosition);
        await page.getByRole('button', {name: 'Close preview', exact: true}).click();
        await editor.waitFor();
        assert.deepEqual((await position()).map(Math.round), [70, 21]);
        console.log(`${framework}: focal point aspect, drag, cancellation, keyboard and preview checked`);
    }
    assert.deepEqual(results.react, results.vue);
} finally {
    fs.mkdirSync('.artifacts/react-parity', {recursive: true});
    fs.writeFileSync('.artifacts/react-parity/focal-point.json', JSON.stringify(results, null, 2));
    await browser.close();
}
