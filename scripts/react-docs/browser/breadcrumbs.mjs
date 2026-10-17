import assert from 'node:assert/strict';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        results[framework] = {};
        for (const mode of ['start', 'middle']) {
            await page.evaluate(async ({framework, mode}) => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/breadcrumb/collapse-${mode}.vue`, framework, false), {framework, mode});
            const trail = page.locator('#flux-validation .f_breadcrumbList');
            const wrapper = page.locator('#flux-validation .f_breadcrumb').locator('..');
            for (const width of [360, 220, 800, 300]) {
                await wrapper.evaluate((element, width) => {element.style.width = `${width}px`; element.style.maxWidth = 'none';}, width);
                await page.waitForTimeout(180);
                const labels = await trail.locator(':scope > li').allTextContents();
                results[framework][`${mode}-${width}`] = labels;
                const trigger = trail.getByRole('button', {name: 'Show more'});
                if (width === 800) assert.equal(await trigger.count(), 0);
                else {
                    assert.equal(await trigger.count(), 1);
                    await trigger.click();
                    const menu = page.getByRole('menu').filter({visible: true});
                    await menu.waitFor();
                    const hidden = await menu.getByRole('menuitem').allTextContents();
                    results[framework][`${mode}-${width}-hidden`] = hidden;
                    if (mode === 'middle') assert.equal(labels[0].trim(), 'Home');
                    assert.equal(labels.at(-1).trim(), 'Homepage');
                    assert(hidden.includes('Clients'));
                    await page.keyboard.press('Escape');
                    await page.waitForTimeout(600);
                    assert(await trigger.evaluate(element => element === document.activeElement), `${framework}: focus return`);
                }
            }
        }
        await page.close();
    }
    assert.deepEqual(results.react, results.vue);
    console.log('Breadcrumb width changes, collapsed contents, pinned items and focus return match Vue.');
} finally {await browser.close();}
