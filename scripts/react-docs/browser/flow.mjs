import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
const project = path.resolve(import.meta.dirname, '../../..');
const manifest = fs.readFileSync(project + '/docs/.vitepress/react/manifest.ts', 'utf8');
const names = [...manifest.matchAll(/^"(flow\/[^"]+)":/gm)].map(match => match[1]).filter(name => !name.includes('playground') && (!process.env.FLUX_FLOW_FILTER || name.includes(process.env.FLUX_FLOW_FILTER)));
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = [];
try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce'});
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
    async function fixture(name, framework) {
        const hasPreview = /<Preview(?:\s|>)/.test(fs.readFileSync(project + '/docs/code/' + name, 'utf8'));
        await page.evaluate(async args => (await import('/.vitepress/react/validation.ts')).renderFixture(args.name, args.framework, args.hasPreview), {name, framework, hasPreview});
        if (framework === 'react') await page.waitForFunction(() => !document.querySelector('#flux-validation [data-react-state="loading"]'));
        await page.waitForTimeout(250);
        assert.equal(await page.locator('#flux-validation [data-react-state="error"]').count(), 0, name);
    }
    for (const name of names) {
        const row = {name};
        for (const framework of ['vue', 'react']) {
            await fixture(name, framework);
            row[framework] = await page.locator('#flux-validation').evaluate(root => {
                const rect = element => {const box = element.getBoundingClientRect(); return {width: Math.round(box.width * 100) / 100, height: Math.round(box.height * 100) / 100};};
                return {
                    worlds: [...root.querySelectorAll('.f_flowWorld')].map(element => ({...rect(element), transform: element.style.transform})),
                    nodes: [...root.querySelectorAll('.f_flowNode')].map(element => ({...rect(element), transform: element.style.transform})),
                    paths: [...root.querySelectorAll('.f_flowConnectionGroup > path')].map(element => ({d: element.getAttribute('d'), className: element.getAttribute('class')})).sort((a, b) => a.d.localeCompare(b.d)),
                    masks: [...root.querySelectorAll('.f_flowEdges mask rect')].map(element => ['x', 'y', 'width', 'height', 'rx'].map(name => element.getAttribute(name))).sort(),
                    labels: [...root.querySelectorAll('.f_flowConnectionBadge')].map(element => ({text: element.textContent.trim(), left: element.style.left, top: element.style.top, ...rect(element)})).sort((a, b) => a.text.localeCompare(b.text))
                };
            });
        }
        try {assert.deepEqual(row.react, row.vue);} catch {row.differs = true;}
        results.push(row);
        if (row.differs) console.log(`Geometry differs: ${name}`);
    }
    for (const framework of ['vue', 'react']) {
        await fixture('flow/components/controls/preview.vue', framework);
        const flow = page.locator('#flux-validation .f_flow');
        const zoom = flow.getByRole('button', {name: '100%', exact: true});
        await zoom.click();
        await page.getByRole('menuitemradio', {name: '150%', exact: true}).click();
        await page.waitForTimeout(350);
        assert.equal(await flow.getByRole('button', {name: '150%', exact: true}).count(), 1);
        await flow.getByRole('button', {name: 'Zoom out', exact: true}).click();
        await page.waitForTimeout(350);
        assert.equal(await flow.getByRole('button', {name: '125%', exact: true}).count(), 1);
        await flow.focus();
        const initial = await flow.locator('.f_flowWorld').evaluate(element => getComputedStyle(element).transform);
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(250);
        assert.notEqual(await flow.locator('.f_flowWorld').evaluate(element => getComputedStyle(element).transform), initial);
        await page.keyboard.press('0');
        await page.waitForTimeout(250);
        const fitted = await flow.locator('.f_flowWorld').evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a);
        assert.ok(fitted <= 1);
        console.log(`${framework}: zoom presets, zoom steps, keyboard pan and fit checked`);
    }
    const differences = results.filter(row => row.differs).map(row => row.name);
    console.log(JSON.stringify({fixtures: results.length, differences}, null, 2));
    assert.deepEqual(differences, []);
} finally {
    fs.mkdirSync('.artifacts/react-parity', {recursive: true});
    fs.writeFileSync('.artifacts/react-parity/flow-geometry.json', JSON.stringify(results, null, 2));
    await browser.close();
}
