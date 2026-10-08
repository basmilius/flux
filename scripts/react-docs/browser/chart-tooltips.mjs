import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
const variants = ['line', 'area', 'bar', 'mixed', 'scatter', 'bubble', 'box-plot', 'candlestick', 'pie', 'donut', 'polar-area', 'radar', 'radial-bar', 'heatmap', 'treemap'];
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    for (const variant of variants) {
        results[variant] = {};
        for (const framework of ['vue', 'react']) {
            await page.evaluate(async args => {
                Math.random = () => .42;
                await (await import('/.vitepress/react/validation.ts')).renderFixture(`statistics/components/charts/${args.variant}/with-tooltip.vue`, args.framework, false);
            }, {variant, framework});
            await page.waitForTimeout(550);
            await page.evaluate(async variant => {
                const {getChart} = await import('/.vitepress/react/validation.ts');
                const chart = getChart(document.querySelector('#flux-validation .f_statisticsChart'));
                if (variant === 'radial-bar') {
                    const option = chart.getOption();
                    const probe = document.createElement('div');
                    probe.dataset.tooltipProbe = '';
                    probe.innerHTML = option.tooltip[0].formatter({seriesIndex: 0, dataIndex: 0, value: option.series[0].data[0].value});
                    document.body.append(probe);
                } else chart.dispatchAction({type: 'showTip', seriesIndex: 0, dataIndex: 0});
            }, variant);
            const tooltip = page.locator('.f_statisticsChartTooltip').last();
            await tooltip.waitFor({state: 'visible', timeout: 3000});
            results[variant][framework] = await tooltip.evaluate(element => ({
                text: element.textContent.replace(/\s+/g, ' ').trim(),
                colors: [...element.querySelectorAll('.f_statisticsChartTooltipSeriesColor, .f_statisticsChartTooltipSeriesIcon')].map(item => ({color: getComputedStyle(item).color, background: getComputedStyle(item).backgroundColor})),
                icons: element.querySelectorAll('svg').length
            }));
            await page.evaluate(async () => {
                const {getChart} = await import('/.vitepress/react/validation.ts');
                getChart(document.querySelector('#flux-validation .f_statisticsChart')).dispatchAction({type: 'hideTip'});
                document.querySelector('[data-tooltip-probe]')?.remove();
            });
            await tooltip.waitFor({state: 'hidden'});
        }
        assert.deepEqual(results[variant].react, results[variant].vue, variant);
        console.log(`${variant}: ${variant === 'radial-bar' ? 'tooltip formatter' : 'visible tooltip'} values, colors and icons match`);
    }
} finally {
    fs.writeFileSync('.artifacts/react-parity/chart-tooltips.json', JSON.stringify(results, null, 2));
    await browser.close();
}
