import assert from 'node:assert/strict';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        results[framework] = {};
        async function fixture(name, below = false) {
            await page.evaluate(async ({framework, name, below}) => {
                await (await import('/.vitepress/react/validation.ts')).renderFixture(`visuals/${name}.vue`, framework, name.endsWith('/preview'));
                if (below) document.getElementById('flux-validation').style.marginTop = '1600px';
            }, {framework, name, below});
        }
        await fixture('highlighter/actions');
        await page.waitForTimeout(750);
        results[framework].variants = await page.locator('#flux-validation svg.rough-annotation').evaluateAll(elements => elements.map(svg => Array.from(svg.querySelectorAll('path'), path => ({fill: path.getAttribute('fill'), stroke: path.getAttribute('stroke'), width: path.getAttribute('stroke-width')}))));
        assert.equal(results[framework].variants.length, 7);
        for (const paths of results[framework].variants) assert(paths.length > 0);
        await fixture('highlighter/replay');
        await page.waitForTimeout(800);
        await page.getByRole('button', {name: 'Replay'}).click();
        assert(await page.locator('#flux-validation svg.rough-annotation').evaluate(svg => svg.getAnimations({subtree: true}).some(animation => animation.playState === 'running')));
        await fixture('highlighter-group/preview');
        await page.waitForTimeout(180);
        const delays = await page.locator('#flux-validation svg.rough-annotation').evaluateAll(elements => elements.map(svg => Math.min(...svg.getAnimations({subtree: true}).map(animation => animation.effect.getTiming().delay))));
        assert.equal(delays.length, 3);
        assert.deepEqual(delays.map(Math.round), [0, 500, 1000]);
        for (const name of ['highlighter/in-view', 'highlighter-group/in-view']) {
            await fixture(name, true);
            await page.waitForTimeout(300);
            assert.equal(await page.locator('#flux-validation svg.rough-annotation path').count(), 0, `${framework}: drew before entering viewport`);
            await page.locator('#flux-validation').scrollIntoViewIfNeeded();
            await page.waitForTimeout(700);
            assert(await page.locator('#flux-validation svg.rough-annotation path').count() > 0);
            await page.evaluate(() => window.scrollTo(0, 0));
        }
        console.log(framework, 'drawing variants, replay, sequential delays and viewport triggers passed');
        await page.close();
    }
    assert.deepEqual(results.react, results.vue);
} finally {await browser.close();}
