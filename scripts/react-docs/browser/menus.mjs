import { chromium } from '../../../docs/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined) });
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
        await page.evaluate(async (framework) => {
            await (await import('/.vitepress/react/validation.ts')).renderFixture('components/context-menu/with-submenu.vue', framework, false);
        }, framework);
        await page.waitForTimeout(800);
        const target = page.getByText('Right-click here', { exact: true });
        await target.click({ button: 'right' });
        await page.waitForTimeout(300);
        const share = page.getByRole('menuitem', { name: 'Share', exact: true });
        await share.hover();
        const submenu = page.locator('.f_menuFlyoutPopup');
        await submenu.waitFor();
        await page.waitForTimeout(250);
        const dimensions = await submenu.boundingBox();
        assert.equal(dimensions.width, 270);
        console.log(framework, dimensions);
        const email = page.getByRole('menuitem', { name: 'Email', exact: true });
        await email.hover();
        assert.equal(await share.getAttribute('aria-expanded'), 'true');
        await email.focus();
        await page.keyboard.press('ArrowLeft');
        await submenu.waitFor({ state: 'detached' });
        assert(await share.evaluate((e) => e === document.activeElement));
        await page.keyboard.press('ArrowRight');
        await submenu.waitFor();
        await page.waitForTimeout(100);
        assert(await email.evaluate((e) => e === document.activeElement));
        await email.click();
        await page.locator('.f_contextMenuPopup').waitFor({ state: 'detached' });
        await page.close();
    }
} finally {
    await browser.close();
}
