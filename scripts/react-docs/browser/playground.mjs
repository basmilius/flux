import { chromium } from '../../../docs/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
const output = path.resolve(import.meta.dirname, '../../../.artifacts/react-parity');
mkdirSync(output, { recursive: true });
const base = process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174';
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined) });
const results = {};
let currentPage;
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
        currentPage = page;
        const errors = [];
        page.on('pageerror', (e) => errors.push(String(e)));
        await page.goto(`${base}/${framework === 'react' ? 'react/' : ''}playground`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(900);
        const r = (results[framework] = {});
        console.log(framework);
        for (let repeat = 0; repeat < 3; repeat++) {
            await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
            await page.waitForTimeout(100);
            await page.evaluate(() => scrollTo(0, 0));
            await page.waitForTimeout(100);
        }
        const color = page.locator('.f_colorPicker').first();
        await color.scrollIntoViewIfNeeded();
        const saturation = color.locator('.f_colorPickerSaturation');
        const cb = await saturation.boundingBox();
        const topAtPoint = await saturation.evaluate((e) => {
            const b = e.getBoundingClientRect();
            return document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2)?.closest('.f_colorPickerSaturation') === e;
        });
        assert(topAtPoint, `${framework} saturation target`);
        await page.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2);
        await page.mouse.down();
        await page.mouse.move(cb.x + cb.width * 0.8, cb.y + cb.height * 0.3, { steps: 8 });
        await page.mouse.up();
        r.color = await color.locator('input').first().inputValue();
        const hue = color.getByRole('slider', { name: /hue/i });
        await hue.focus();
        const previousHue = Number(await hue.getAttribute('aria-valuenow'));
        await hue.press('ArrowRight');
        r.hue = await hue.getAttribute('aria-valuenow');
        assert(Math.abs(Number(r.hue) - previousHue - 0.1) < 0.011);
        if (framework === 'react') {
            const context = page
                .locator('.f_contextMenu')
                .filter({ has: page.getByText('Context menu', { exact: true }) })
                .first();
            const target = context.locator('.f_paneBody').first();
            await target.scrollIntoViewIfNeeded();
            console.log('context', await target.boundingBox());
            await page.screenshot({ path: path.join(output, `context-playground-${framework}.png`) });
            await target.click({ button: 'right' });
            const popup = page.locator('.f_contextMenuPopup');
            await popup.waitFor();
            await page.waitForTimeout(350);
            r.context = await popup.boundingBox();
            assert(r.context.y >= 0 && r.context.y + r.context.height <= 1000);
            await page.keyboard.press('Escape');
            await popup.waitFor({ state: 'detached' });
            await target.click({ button: 'right' });
            await popup.waitFor();
            await page.waitForTimeout(350);
            const first = popup.getByRole('menuitem').filter({ visible: true }).first();
            r.firstAction = await first.innerText();
            await first.click();
            await popup.waitFor({ state: 'detached' });
        } else r.context = 'Vue masonry overlap reproduced separately';
        const sliders = page.locator('.f_slider').filter({ hasNot: page.locator('.f_colorPickerHueSlider') });
        const track = page
            .locator('.f_slider')
            .filter({ has: page.locator('button[role=slider]') })
            .first();
        await track.scrollIntoViewIfNeeded();
        const b = await track.boundingBox();
        await page.mouse.move(b.x + b.width * 0.4, b.y + b.height - 3);
        await page.mouse.down();
        await page.mouse.move(b.x + b.width * 0.75, b.y + b.height - 3, { steps: 12 });
        await page.mouse.up();
        r.slider = await track.getByRole('slider').first().getAttribute('aria-valuenow');
        assert.equal(r.slider, '75');
        const fader = page.locator('.f_formFader').first();
        await fader.scrollIntoViewIfNeeded();
        const fb = await fader.boundingBox();
        await page.mouse.move(fb.x + fb.width * 0.3, fb.y + fb.height / 2);
        await page.mouse.down();
        await page.mouse.move(fb.x + fb.width * 0.8, fb.y + fb.height / 2, { steps: 10 });
        await page.mouse.up();
        r.fader = await fader.getAttribute('aria-valuenow');
        assert.equal(r.fader, '80');
        const checkbox = page.locator('.f_table input[type=checkbox]').first();
        await checkbox.scrollIntoViewIfNeeded();
        const initial = await checkbox.isChecked();
        await checkbox.click();
        assert.equal(await checkbox.isChecked(), !initial);
        r.checkbox = await checkbox.evaluate((e) => ({ classes: e.className, width: e.getBoundingClientRect().width }));
        assert.equal(r.checkbox.width, 18);
        r.errors = errors;
        assert.equal(errors.length, 0, errors.join('\n'));
        await page.close();
    }
    assert.equal(results.react.color, results.vue.color);
    assert.equal(results.react.hue, results.vue.hue);
    assert.equal(results.react.slider, results.vue.slider);
    assert.equal(results.react.fader, results.vue.fader);
    console.log(JSON.stringify(results, null, 2));
    writeFileSync(path.join(output, 'playground-interactions.json'), JSON.stringify(results, null, 2));
} catch (e) {
    await currentPage?.screenshot({ path: path.join(output, 'failure.png') });
    console.error(e);
    throw e;
} finally {
    await browser.close();
}
