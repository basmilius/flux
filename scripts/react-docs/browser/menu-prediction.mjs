import assert from 'node:assert/strict';
import {mkdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const out = path.resolve(import.meta.dirname, '../../../.artifacts/react-parity');
mkdirSync(out, {recursive: true});
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        await page.evaluate(async framework => (await import('/.vitepress/react/validation.ts')).renderFixture('components/context-menu/nested-formatting.vue', framework, false), framework);
        const host = page.locator('#flux-validation');
        await host.locator('input[type=checkbox]').check();
        await host.getByText('Right-click this cell', {exact: true}).click({button: 'right'});
        const insert = page.getByRole('menuitem', {name: 'Insert', exact: true});
        await insert.hover();
        const popup = page.locator('.f_menuFlyoutPopup').first();
        await popup.waitFor();
        await page.waitForTimeout(100);
        const a = await insert.boundingBox(), b = await popup.boundingBox();
        console.log(framework, {a,b});
        const snapshots = [];
        results[framework] = snapshots;
        async function move(x, y) {
            await page.mouse.move(x, y);
            await page.waitForTimeout(25);
            snapshots.push(await page.evaluate(() => ({
                cones: [...document.querySelectorAll('.f_menuFlyoutConeDebug')].map(e => ({back: e.classList.contains('f_menuFlyoutConeDebugBack'), points: e.querySelector('polygon').getAttribute('points').split(' ').length, line: Boolean(e.querySelector('line')), circles: e.querySelectorAll('circle').length})),
                open: [...document.querySelectorAll('[aria-haspopup=menu][aria-expanded=true]')].map(e => e.textContent.trim().replace(/\s+/g, ' ')),
                dimmed: document.querySelectorAll('.f_menuConeActive').length
            })));
        }
        await move(a.x + 20, a.y + a.height / 2);
        const destination = {x: b.x + 20, y: b.y + b.height - 25};
        for (let i = 1; i <= 10; i++) await move(a.x + 20 + (destination.x - a.x - 20) * i / 10, a.y + a.height / 2 + (destination.y - a.y - a.height / 2) * i / 10);
        assert(snapshots.some(s => s.cones.some(c => !c.back && c.points === 3 && c.line && c.circles === 2)), `${framework}: missing forward cone`);
        assert(snapshots.some(s => s.dimmed === 1), `${framework}: siblings were not suppressed`);
        assert(snapshots.every(s => s.open.includes('Insert') && !s.open.includes('Format')), `${framework}: sibling stole diagonal movement`);
        await page.mouse.move(b.x + 30, b.y + 50);
        await page.waitForTimeout(150);
        await move(b.x - 20, a.y + a.height + 20);
        await move(b.x - 30, a.y + a.height + 18);
        assert(snapshots.at(-1).cones.some(c => c.back && c.points === 4 && !c.line && c.circles === 1), `${framework}: missing return corridor`);
        await move(a.x + a.width / 2, a.y + a.height / 2);
        await page.mouse.move(a.x - 40, a.y - 40);
        await popup.waitFor({state: 'detached'});
        await insert.focus();
        await page.keyboard.press('ArrowRight');
        await page.getByRole('menuitem', {name: 'Cells', exact: true}).focus();
        await page.keyboard.press('ArrowRight');
        assert.equal(await page.locator('.f_menuFlyoutPopup').count(), 2);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.f_menuFlyoutPopup').count(), 1);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.f_menuFlyoutPopup').count(), 0);
        assert.equal(await page.locator('.f_contextMenuPopup').count(), 1);
        await page.setViewportSize({width: 900, height: 900});
        await page.evaluate(async framework => (await import('/.vitepress/react/validation.ts')).renderFixture('components/context-menu/deep-submenus.vue', framework, false), framework);
        await page.locator('#flux-validation').getByText('Right-click this file', {exact: true}).click({button: 'right'});
        for (const name of ['Move to', 'Documents', 'Work']) {
            await page.getByRole('menuitem', {name, exact: true}).focus();
            await page.keyboard.press('ArrowRight');
            await page.waitForTimeout(70);
        }
        assert.equal(await page.locator('.f_menuFlyoutPopup').count(), 3);
        const flipped = await page.evaluate(() => [...document.querySelectorAll('[aria-haspopup=menu][aria-expanded=true]')].some(trigger => document.getElementById(trigger.getAttribute('aria-controls'))?.getBoundingClientRect().left < trigger.getBoundingClientRect().left));
        assert(flipped, `${framework}: nested test never exercised a flipped popup`);
        await page.getByRole('menuitem', {name: '2026', exact: true}).hover();
        await page.waitForTimeout(50);
        assert.equal(await page.locator('.f_menuFlyoutPopup').count(), 3, `${framework}: an overlapping ancestor stole the pointer`);
        await page.getByRole('menuitem', {name: '2026', exact: true}).click();
        await page.locator('.f_contextMenuPopup').waitFor({state: 'detached'});
        const target = page.locator('#flux-validation .f_contextMenu');
        const targetBox = await target.locator('.f_pane').first().boundingBox();
        const touch = {pointerId: 7, pointerType: 'touch', clientX: targetBox.x + 30, clientY: targetBox.y + 30, bubbles: true};
        await target.dispatchEvent('pointerdown', touch);
        await page.waitForTimeout(550);
        await page.locator('.f_contextMenuPopup').waitFor();
        await target.dispatchEvent('pointerup', touch);
        const beforeDuplicate = await page.locator('.f_contextMenuPopup').boundingBox();
        await target.dispatchEvent('contextmenu', {...touch, clientX: touch.clientX + 50});
        assert.deepEqual(await page.locator('.f_contextMenuPopup').boundingBox(), beforeDuplicate, `${framework}: native long-press event reopened the menu`);
        await page.keyboard.press('Escape');
        await page.locator('.f_contextMenuPopup').waitFor({state: 'detached'});
        await target.dispatchEvent('pointerdown', touch);
        await page.evaluate(touch => document.dispatchEvent(new PointerEvent('pointermove', {...touch, clientX: touch.clientX + 30})), touch);
        await page.waitForTimeout(550);
        assert.equal(await page.locator('.f_contextMenuPopup').count(), 0, `${framework}: scrolling opened a touch context menu`);
        results[framework] = snapshots;
        assert.deepEqual(errors, []);
        console.log(framework, 'forward, return, sibling suppression and nested keyboard navigation passed');
        await page.close();
    }
} finally {
    writeFileSync(path.join(out, 'menu-prediction.json'), JSON.stringify(results, null, 2));
    await browser.close();
}
