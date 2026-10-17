import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    for (const framework of ['vue', 'react']) {
        results[framework] = {};
        async function fixture(name) {
            await page.evaluate(async ({name, framework}) => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/${name}.vue`, framework, false), {name, framework});
            await page.waitForTimeout(650);
        }
        async function geometry() {
            return page.locator('#flux-validation .f_table').evaluate(root => {
                const origin = root.getBoundingClientRect();
                return [...root.querySelectorAll('[role="cell"], [role="columnheader"]')].map(element => {
                    const rect = element.getBoundingClientRect();
                    const style = getComputedStyle(element);
                    return {x: Math.round((rect.x - origin.x) * 100) / 100, width: Math.round(rect.width * 100) / 100, height: rect.height, left: style.left, right: style.right, pinned: element.classList.contains('f_isPinnedEdge')};
                });
            });
        }
        for (const name of ['basic', 'pinned']) {
            await fixture(`table/cell/${name}`);
            const preview = await page.locator('#flux-validation .f_preview').boundingBox();
            const table = await page.locator('#flux-validation .f_table').boundingBox();
            assert(preview.height <= Math.max(300, table.height + 150), `${framework}: ancestor measured the table before its columns were ready`);
            results[framework][`initial-${name}`] = {previewHeight: preview.height, tableHeight: table.height};
        }
        await fixture('table/pinned-columns');
        results[framework].pinned = await geometry();
        await page.locator('#flux-validation .f_table').evaluate(element => element.scrollLeft = 300);
        await page.waitForTimeout(150);
        results[framework].scrolled = await geometry();
        assert.equal(results[framework].scrolled[0].x, results[framework].pinned[0].x);
        assert.equal(results[framework].scrolled[1].x, results[framework].pinned[1].x);
        assert.ok(results[framework].scrolled[2].x < results[framework].pinned[2].x);
        await fixture('table/tree-cell/preview');
        const path = page.locator('#flux-validation .f_tableTreeLines path');
        results[framework].tree = await path.getAttribute('d');
        await page.getByRole('button', {name: 'Collapse row'}).first().click();
        await page.waitForTimeout(150);
        results[framework].collapsedTree = await path.count() ? await path.getAttribute('d') : '';
        assert.notEqual(results[framework].tree, results[framework].collapsedTree);
        await fixture('table/header/resizable');
        const handle = page.getByRole('separator', {name: 'Resize column'}).first();
        await handle.focus();
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Shift+ArrowRight');
        await page.waitForTimeout(150);
        results[framework].resized = await geometry();
        const point = await handle.boundingBox();
        await page.mouse.move(point.x + point.width / 2, point.y + point.height / 2);
        await page.mouse.down();
        await page.mouse.move(point.x + 80, point.y + point.height / 2, {steps: 12});
        await page.mouse.up();
        await page.waitForTimeout(150);
        results[framework].dragged = await geometry();
        assert.ok(results[framework].dragged[0].width > results[framework].resized[0].width);
        await fixture('data-table/sortable');
        await page.getByRole('button', {name: 'Sort', exact: true}).first().click();
        await page.getByRole('menuitem', {name: 'Descending', exact: true}).click();
        await page.waitForTimeout(400);
        results[framework].descending = await page.locator('#flux-validation .f_tableBody [role="row"]').allTextContents();
        assert.equal(await page.getByRole('columnheader').first().getAttribute('aria-sort'), 'descending');
        await page.getByRole('button', {name: 'Sort', exact: true}).first().click();
        await page.getByRole('menuitem', {name: 'Remove sorting'}).click();
        await page.waitForTimeout(200);
        assert.equal(await page.getByRole('columnheader').first().getAttribute('aria-sort'), 'none');
        console.log(`${framework}: pinned columns, tree guides, resizing and sorting exercised`);
    }
    assert.deepEqual(results.react, results.vue);
    assert.deepEqual(errors, []);
    console.log('Vue and React table interactions and geometry match');
} finally {
    fs.mkdirSync('.artifacts/react-parity', {recursive: true});
    fs.writeFileSync('.artifacts/react-parity/tables.json', JSON.stringify(results, null, 2));
    await browser.close();
}
