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
            await page.evaluate(async ({framework, name}) => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/calendar/${name}.vue`, framework, false), {framework, name});
            await page.waitForTimeout(300);
        }
        for (const name of ['plain', 'day-view', 'week-view', 'resize']) {
            await fixture(name);
            const root = page.locator('#flux-validation .f_calendar');
            results[framework][name] = await root.evaluate(root => ({
                days: root.querySelectorAll('.f_calendarEntry').length,
                headers: Array.from(root.querySelectorAll('.f_calendarDay,.f_timeGridHeaderDay'), e => e.textContent.trim()),
                times: Array.from(root.querySelectorAll('.f_timeGridHourLabel'), e => e.textContent.trim()),
                items: Array.from(root.querySelectorAll('.f_calendarItem'), e => e.textContent.trim()),
                positions: Array.from(root.querySelectorAll('.f_timeGridDayItem'), e => ({top: e.style.top, height: e.style.height, left: e.style.left, width: e.style.width}))
            }));
        }
        const event = () => page.locator('#flux-validation .f_calendarItem').filter({hasText: 'Stand-up'});
        const positioned = () => event().locator('../..');
        const bottom = positioned().locator('.f_timeGridDayItemHandle.f_isBottom');
        const handle = await bottom.boundingBox();
        await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
        await page.mouse.down();
        await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2 + 24, {steps: 4});
        await page.mouse.up();
        await page.waitForTimeout(120);
        assert.match(await event().innerText(), /90m/);
        assert.equal(await positioned().evaluate(e => e.style.height), '72px');
        await event().focus();
        await page.keyboard.press('Space');
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(100);
        assert.equal(await positioned().evaluate(e => e.style.top), '72px');
        assert(await event().evaluate(e => document.activeElement === e));
        await page.keyboard.press('Enter');
        const day = page.locator('#flux-validation .f_timeGridDay');
        await event().dragTo(day, {targetPosition: {x: 300, y: 240}});
        await page.waitForTimeout(100);
        assert.equal(await positioned().evaluate(e => e.style.top), '240px');
        await fixture('keyboard');
        const monthEvent = page.locator('#flux-validation .f_calendarItem').filter({hasText: 'Stand-up'});
        const start = await monthEvent.locator('../..').locator('.f_calendarEntryDate').innerText();
        await monthEvent.focus(); await page.keyboard.press('Space'); await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(100);
        assert.equal(Number(await monthEvent.locator('../..').locator('.f_calendarEntryDate').innerText()), Number(start) + 1);
        assert(await monthEvent.evaluate(e => e === document.activeElement));
        await page.keyboard.press('Escape');
        await fixture('auto-responsive');
        for (const [width, columns] of [[1400, 0], [1100, 7], [900, 2], [600, 1]]) {
            await page.setViewportSize({width, height: 1000});
            await page.waitForTimeout(600);
            assert.equal(await page.locator('#flux-validation .f_timeGridDay').count(), columns, `${framework}: ${width}px responsive view`);
            if (!columns) assert.equal(await page.locator('#flux-validation [role=gridcell]').count(), 42);
        }
        console.log(framework, 'month/time-grid geometry, resize, keyboard focus, pointer moves and responsive views passed');
        await page.close();
    }
    assert.deepEqual(results.react, results.vue);
} finally {await browser.close();}
