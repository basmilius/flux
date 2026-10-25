import assert from 'node:assert/strict';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        page.on('pageerror', error => console.error(framework, error.message));
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        results[framework] = {};
        async function fixture(name) {
            await page.evaluate(async ({framework, name}) => (await import('/.vitepress/react/validation.ts')).renderFixture(name, framework, false), {framework, name});
            await page.waitForTimeout(300);
        }
        for (const variant of ['fader/basic', 'fader/vertical', 'fader/ranged/basic', 'slider/basic']) {
            await fixture(`components/form/${variant}.vue`);
            const vertical = variant.includes('vertical');
            const root = page.locator(`#flux-validation .${variant.startsWith('slider') ? 'f_slider' : 'f_formFader'}`).first();
            if (!vertical) await root.evaluate(e => e.style.width = '300px');
            const b = await root.boundingBox();
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
            await page.mouse.down();
            await page.mouse.move(vertical ? b.x + b.width / 2 : b.x + b.width + 120, vertical ? b.y - 120 : b.y + b.height / 2);
            await page.waitForTimeout(40);
            const track = root.locator(variant.startsWith('slider') ? '.f_sliderTrack' : '.f_formFaderTrack');
            const transform = await track.evaluate(e => getComputedStyle(e).transform);
            results[framework][variant] = transform;
            const scale = Number(transform.match(/matrix\(([^)]+)\)/)[1].split(',')[vertical ? 3 : 0]);
            assert(scale > 1 && scale < 1.1, `${framework}: no elastic stretch on ${variant}`);
            await page.mouse.up();
            await page.waitForTimeout(350);
            const reset = await track.evaluate(e => getComputedStyle(e).transform);
            assert.equal(reset, 'matrix(1, 0, 0, 1, 0, 0)');
        }
        await fixture('components/form/repeater/reorderable.vue');
        const repeater = page.locator('#flux-validation .f_formRepeater');
        const inputs = repeater.locator('input[type=text]');
        const initial = await inputs.evaluateAll(elements => elements.map(e => e.value));
        const first = repeater.getByRole('button', {name: 'Reorder Line item 1 of 3'});
        await first.focus();
        await page.keyboard.press('Space');
        await page.keyboard.press('ArrowDown');
        assert.equal(await inputs.nth(1).inputValue(), initial[0]);
        await page.keyboard.press('Escape');
        assert.deepEqual(await inputs.evaluateAll(elements => elements.map(e => e.value)), initial);
        const last = repeater.locator('[data-flux-repeater-row]').last();
        await first.dragTo(last, {targetPosition: {x: 30, y: (await last.boundingBox()).height - 4}});
        assert.deepEqual(await inputs.evaluateAll(elements => elements.map(e => e.value)), [...initial.slice(1), initial[0]]);
        await inputs.first().fill('Edited row');
        assert(await inputs.first().evaluate(e => e === document.activeElement));
        await repeater.getByRole('button', {name: 'Remove Line item 1 of 3'}).click();
        await page.getByRole('button', {name: 'Cancel', exact: true}).click();
        assert.equal(await inputs.count(), 3);
        await repeater.getByRole('button', {name: 'Remove Line item 1 of 3'}).click();
        await page.getByRole('button', {name: 'Ok', exact: true}).click();
        await page.waitForTimeout(250);
        assert.equal(await inputs.count(), 2);
        console.log(framework, 'elastic overdrag, pointer reordering, keyboard rollback, editing and confirmed removal passed');
        await page.close();
    }
    for (const variant of Object.keys(results.vue)) assert.equal(results.react[variant], results.vue[variant], variant);
} finally {await browser.close();}
