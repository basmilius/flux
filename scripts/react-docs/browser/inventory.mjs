import { chromium } from '../../../docs/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const project = path.resolve(import.meta.dirname, '../../..');
const manifest = fs.readFileSync(project + '/docs/.vitepress/react/manifest.ts', 'utf8');
const filter = process.env.FLUX_EXAMPLE_FILTER ? new RegExp(process.env.FLUX_EXAMPLE_FILTER) : undefined;
const names = [...manifest.matchAll(/^"([^"]+)":/gm)].map((m) => m[1]).filter((n) => !n.includes('playground') && !/[A-Z]/.test(n.split('/').at(-1)) && (!filter || filter.test(n)));
const out = process.env.FLUX_VISUAL_OUT ?? path.join(project, '.artifacts/react-parity/inventory');
fs.mkdirSync(out, { recursive: true });
const props = ['padding', 'margin', 'gap', 'fontSize', 'fontWeight', 'lineHeight', 'borderWidth', 'borderRadius', 'alignItems', 'justifyContent', 'flexDirection', 'backgroundColor', 'color'];
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined) });
let cursor = 0;
const results = [];
const compare = (v, r) => {
    const map = new Map();
    for (const n of r) {
        const key = n.key + '|' + n.text;
        const a = map.get(key) ?? [];
        a.push(n);
        map.set(key, a);
    }
    const changes = [];
    const missing = [];
    let matched = 0;
    for (const n of v) {
        const other = map.get(n.key + '|' + n.text)?.shift();
        if (!other) {
            missing.push({ key: n.key, text: n.text });
            continue;
        }
        matched++;
        const diff = {};
        for (const p of props) if (n.styles[p] !== other.styles[p]) diff[p] = [n.styles[p], other.styles[p]];
        for (const p of ['width', 'height']) if (Math.abs(n[p] - other[p]) > 1.1) diff[p] = [n[p], other[p]];
        if (Object.keys(diff).length) changes.push({ key: n.key, text: n.text, diff, vue: n.html, react: other.html });
    }
    return { matched, changes, missing, extra: [...map.values()].flat().map((n) => ({ key: n.key, text: n.text })) };
};
async function worker() {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
    let errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    while (cursor < names.length) {
        const name = names[cursor++];
        const row = { name };
        errors = [];
        try {
            const hasPreview = /<Preview(?:\s|>)/.test(fs.readFileSync(project + '/docs/code/' + name, 'utf8'));
            for (const framework of ['vue', 'react']) {
                await page.evaluate(
                    async ({ name, framework, hasPreview }) => {
                        const { renderFixture } = await import('/.vitepress/react/validation.ts');
                        await renderFixture(name, framework, hasPreview);
                    },
                    { name, framework, hasPreview }
                );
                if (framework === 'react') await page.waitForFunction(() => !document.querySelector('#flux-validation [data-react-state="loading"]'), null, { timeout: 10000 });
                await page.waitForTimeout(100);
                await page.locator('#flux-validation img').evaluateAll(images => Promise.all(images.map(image => image.complete ? undefined : Promise.race([image.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 2500))]))));
                const failed = page.locator('#flux-validation [data-react-state="error"]');
                if (await failed.count()) throw new Error(await failed.innerText());
                row[framework] = await page.locator('#flux-validation').evaluate((root, props) => {
                    const nodes = [];
                    for (const e of root.querySelectorAll('*')) {
                        const classes = e.getAttribute('class') ?? '';
                        const key = classes.split(/\s+/).find((c) => c.startsWith('f_') && !/^f_(preview|fluxView|root|example|visualGridPattern|overlayProvider|overlayShade|snackbars)/.test(c));
                        if (!key) continue;
                        const b = e.getBoundingClientRect();
                        if (!b.width || !b.height) continue;
                        const s = getComputedStyle(e);
                        nodes.push({ key, text: e.textContent.trim().replace(/\s+/g, ' ').slice(0, 90), width: b.width, height: b.height, styles: Object.fromEntries(props.map((p) => [p, s[p]])), html: e.outerHTML.slice(0, 400) });
                    }
                    return nodes;
                }, props);
            }
            row.comparison = compare(row.vue, row.react);
            row.counts = { vue: row.vue.length, react: row.react.length };
            delete row.vue;
            delete row.react;
        } catch (e) {
            row.error = String(e);
        }
        row.errors = [...new Set(errors)];
        results.push(row);
        fs.writeFileSync(out + '/' + name.replaceAll('/', '_') + '.json', JSON.stringify(row, null, 2));
        if (results.length % 50 === 0) console.log(results.length + '/' + names.length);
    }
    await page.close();
}
try {
    await Promise.all([worker(), worker(), worker()]);
} finally {
    await browser.close();
    fs.writeFileSync(out + '/results.json', JSON.stringify(results, null, 2));
}
console.log(JSON.stringify({ fixtures: results.length, errors: results.filter((r) => r.error || r.errors.length).map((r) => ({ name: r.name, error: r.error, errors: r.errors })) }, null, 2));
