import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    for (const framework of ['vue', 'react']) {
        results[framework] = {};
        for (const name of ['action/grouped', 'toolbar/in-pane']) {
            await page.evaluate(async args => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/${args.name}.vue`, args.framework, false), {name, framework});
            await page.waitForTimeout(250);
            const toolbar = page.getByRole('toolbar').first();
            await toolbar.locator('button').first().focus();
            const visited = [];
            for (const key of ['ArrowRight', 'ArrowRight', 'ArrowLeft']) {
                await page.keyboard.press(key);
                visited.push(await toolbar.evaluate(element => [...element.querySelectorAll('button')].indexOf(document.activeElement)));
            }
            assert.deepEqual(visited, [1, 2, 1], `${framework}: ${name}`);
            results[framework][name] = visited;
        }
        console.log(`${framework}: action stack and grouped toolbar arrow navigation checked`);
    }
    assert.deepEqual(results.react, results.vue);
} finally {
    fs.writeFileSync('.artifacts/react-parity/toolbars.json', JSON.stringify(results, null, 2));
    await browser.close();
}
