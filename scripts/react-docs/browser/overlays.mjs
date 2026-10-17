import assert from 'node:assert/strict';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';

const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        async function fixture(name) {
            await page.mouse.move(1400, 900);
            await page.evaluate(async ({framework, name}) => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/${name}.vue`, framework, false), {framework, name});
            await page.waitForTimeout(350);
        }
        results[framework] = {};
        await fixture('hover-card/delay');
        const patient = page.getByRole('button', {name: 'Patient', exact: true});
        await patient.hover();
        await page.waitForTimeout(300);
        assert.equal(await page.locator('.f_hoverCardPopup').count(), 0);
        await page.getByRole('group', {name: 'Patient', exact: true}).waitFor();
        await page.waitForTimeout(300);
        const popup = page.locator('.f_hoverCardPopup');
        results[framework].hoverGeometry = await popup.boundingBox();
        assert(await popup.evaluate(e => e.matches(':popover-open')));
        assert(await patient.getAttribute('aria-describedby'));
        await page.mouse.move(1400, 900);
        await page.waitForTimeout(300);
        assert.equal(await popup.count(), 1);
        await popup.waitFor({state: 'detached'});
        await fixture('hover-card/link-preview');
        await page.keyboard.press('Tab');
        await page.locator('.f_hoverCardPopup').waitFor();
        await page.keyboard.press('Tab');
        assert(await page.getByRole('link', {name: 'Open on GitHub'}).evaluate(e => e === document.activeElement));
        await page.keyboard.press('Escape');
        await page.locator('.f_hoverCardPopup').waitFor({state: 'detached'});
        assert(await page.getByRole('link', {name: 'basmilius/flux', exact: true}).evaluate(e => e === document.activeElement));
        await fixture('hover-card/disabled');
        await page.getByText('@janedoe', {exact: true}).hover();
        await page.waitForTimeout(650);
        assert.equal(await page.locator('.f_hoverCardPopup').count(), 0);
        await fixture('pop-confirm/basic');
        await page.getByRole('button', {name: 'Archive', exact: true}).click();
        const flyout = page.locator('.f_flyoutPane');
        await flyout.waitFor();
        await page.waitForTimeout(300);
        assert(await flyout.getByRole('button', {name: 'Archive'}).evaluate(e => e === document.activeElement));
        results[framework].confirmGeometry = await flyout.boundingBox();
        await page.keyboard.press('Escape');
        await flyout.waitFor({state: 'detached'});
        assert(await page.getByRole('button', {name: 'Archive', exact: true}).evaluate(e => e === document.activeElement));
        await page.getByRole('button', {name: 'Archive', exact: true}).click();
        await flyout.getByRole('button', {name: 'Archive'}).click();
        await page.getByText('The invoice moved to the archive.').waitFor();
        await fixture('pop-confirm/custom');
        await page.getByRole('button', {name: 'Sign out', exact: true}).click();
        await flyout.waitFor();
        await page.waitForTimeout(300);
        assert(await flyout.getByRole('button', {name: 'Cancel'}).evaluate(e => e === document.activeElement));
        await flyout.getByRole('checkbox').check();
        await flyout.getByRole('button', {name: 'Sign out'}).click();
        await page.getByText('Signed out of every device.').waitFor();
        console.log(framework, 'hover delays, keyboard focus, popovers, confirmation autofocus and custom content passed');
        await page.close();
    }
    for (const key of Object.keys(results.vue)) for (const dim of ['x', 'y', 'width', 'height']) {
        assert(Math.abs(results.vue[key][dim] - results.react[key][dim]) <= 1.1, `${key}.${dim}: ${results.vue[key][dim]} vs ${results.react[key][dim]}`);
    }
} finally {await browser.close();}
