import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const variants = ['line', 'area', 'bar', 'mixed', 'scatter', 'bubble', 'box-plot', 'candlestick', 'pie', 'donut', 'polar-area', 'radar', 'radial-bar', 'heatmap', 'treemap'];
const results = {};
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    for (const variant of variants) {
        results[variant] = {};
        for (const framework of ['vue', 'react']) {
            const name = `statistics/components/charts/${variant}/preview.vue`;
            await page.evaluate(async ({name, framework}) => {
                if (name.includes('/heatmap/')) Math.random = () => 0.42;
                await (await import('/.vitepress/react/validation.ts')).renderFixture(name, framework, true);
            }, {name, framework});
            await page.waitForFunction(async () => {
                const {getChart} = await import('/.vitepress/react/validation.ts');
                const element = document.querySelector('#flux-validation .f_statisticsChart');
                return element && getChart(element);
            });
            await page.waitForTimeout(450);
            const snapshot = await page.evaluate(async () => {
                const {getChart} = await import('/.vitepress/react/validation.ts');
                const element = document.querySelector('#flux-validation .f_statisticsChart');
                const chart = getChart(element);
                const option = chart.getOption();
                const keys = ['series', 'grid', 'xAxis', 'yAxis', 'radar', 'color', 'tooltip', 'textStyle'];
                const stable = Object.fromEntries(keys.filter(key => key in option).map(key => [key, option[key]]));
                const clean = JSON.parse(JSON.stringify(stable, (key, value) => key.startsWith('__') || key === 'id' ? undefined : value));
                return {options: clean, legend: Array.from(document.querySelectorAll('#flux-validation .f_statisticsLegendItem'), element => element.textContent.trim()), width: chart.getWidth(), height: chart.getHeight()};
            });
            results[variant][framework] = snapshot;
            const legends = page.locator('#flux-validation .f_statisticsLegendItem');
            if (await legends.count()) {
                await legends.first().hover();
                await page.waitForTimeout(100);
                assert.match(await legends.first().getAttribute('class'), /f_isHovered/);
                await page.mouse.move(0, 0);
                await page.waitForTimeout(100);
                assert.doesNotMatch(await legends.first().getAttribute('class'), /f_isHovered/);
                await page.evaluate(async () => {
                    const {getChart} = await import('/.vitepress/react/validation.ts');
                    getChart(document.querySelector('#flux-validation .f_statisticsChart')).trigger('mouseover', {seriesIndex: 0, dataIndex: 0});
                });
                await page.waitForTimeout(100);
                assert.match(await legends.first().getAttribute('class'), /f_isHovered/);
            }
        }
        assert.deepEqual(results[variant].react, results[variant].vue, `${variant} options, legend and dimensions`);
        console.log(`${variant}: options, geometry and legend hover match`);
    }
    assert.deepEqual(errors, []);
} finally {
    fs.mkdirSync('.artifacts/react-parity', {recursive: true});
    fs.writeFileSync('.artifacts/react-parity/charts.json', JSON.stringify(results, null, 2));
    await browser.close();
}
