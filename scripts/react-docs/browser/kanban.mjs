import assert from 'node:assert/strict';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        page.on('pageerror', error => console.error(framework, error));
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        async function fixture(name) {
            await page.evaluate(async ({framework, name}) => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/kanban/${name}.vue`, framework, false), {framework, name});
            await page.waitForTimeout(400);
        }
        const item = text => page.getByRole('listitem').filter({hasText: text});
        const column = name => page.getByRole('list', {name, exact: true});
        const focused = async text => assert(await item(text).evaluate(e => e === document.activeElement), `${framework}: focus follows ${text}`);
        results[framework] = {};
        await fixture('basic');
        const title = 'Design system review';
        await item(title).focus(); await page.keyboard.press('Space'); await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(200); await focused(title);
        assert.match(await column('In progress').getByRole('listitem').first().innerText(), /Design system/);
        await page.keyboard.press('ArrowDown'); await page.waitForTimeout(200); await focused(title);
        assert.match(await column('In progress').getByRole('listitem').nth(1).innerText(), /Design system/);
        await page.keyboard.press('Escape'); await page.waitForTimeout(200);
        assert.match(await column('To do').getByRole('listitem').first().innerText(), /Design system/);
        await item(title).dragTo(item('Fix layout bug'), {targetPosition: {x: 30, y: 10}});
        await page.waitForTimeout(200);
        assert.deepEqual(await column('In progress').getByRole('listitem').allTextContents(), ['Implement kanban component', title, 'Fix layout bug']);
        await fixture('validation');
        await item('Plan sprint').dragTo(item('Setup project'));
        await page.waitForTimeout(100);
        assert.match(await column('To do').innerText(), /Plan sprint/);
        await fixture('swimlane/basic');
        results[framework].cells = await page.locator('[data-kanban-cell]').evaluateAll(cells => cells.map(cell => {const box = cell.getBoundingClientRect(); return {column: cell.getAttribute('data-kanban-column'), x: box.x, y: box.y, width: box.width, height: box.height};}));
        await item('Write unit tests').focus(); await page.keyboard.press('Space'); await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(200); await focused('Write unit tests');
        const lane = () => item('Write unit tests').locator('xpath=ancestor::*[@data-kanban-swimlane]');
        assert.equal(await lane().getAttribute('aria-label'), 'Bas');
        await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200); await focused('Write unit tests');
        assert.equal(await item('Write unit tests').locator('xpath=ancestor::*[@data-kanban-column]').getAttribute('data-kanban-column'), 'in-progress');
        await page.keyboard.press('Escape'); await page.waitForTimeout(200);
        assert.equal(await lane().getAttribute('aria-label'), 'Anna');
        await page.getByRole('group', {name: 'Anna', exact: true}).getByRole('button', {name: 'Collapse group'}).click();
        assert.equal(await page.getByRole('group', {name: 'Anna', exact: true}).locator('.f_kanbanColumn').count(), 3);
        assert(await page.getByRole('group', {name: 'Anna', exact: true}).locator('.f_kanbanColumnHeader').first().isVisible());
        assert(!await item('Write unit tests').isVisible());
        await fixture('reorder-columns');
        const header = column('To do').locator('header');
        await header.focus(); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200);
        assert.deepEqual(await page.locator('[data-kanban-column]').evaluateAll(elements => elements.map(e => e.getAttribute('aria-label'))), ['In progress', 'To do', 'Review', 'Done']);
        assert(await header.evaluate(e => e === document.activeElement));
        console.log(framework, 'pointer insertion, validation, keyboard rollback/focus, swimlane topology and column reordering passed');
        await page.close();
    }
    assert.deepEqual(results.react, results.vue);
} finally {await browser.close();}
