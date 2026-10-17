import assert from 'node:assert/strict';
import {mkdirSync, writeFileSync} from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';

const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
const cases = [
    {name: 'flyout/information', selector: '.f_flyoutPane', opener: 'More information', close: 'escape'},
    {name: 'overlay/basic', selector: '.f_overlayMedium', opener: 'Open overlay', close: 'button'},
    {name: 'slide-over/basic', selector: '.f_slideOver', opener: 'Open', close: 'button'},
    {name: 'form/select/preview', selector: '.f_formSelectPopup', trigger: '.f_formSelect', close: 'escape'},
    {name: 'form/tree-view-select/preview', selector: '.f_formSelectPopup', trigger: '.f_formSelect', close: 'escape'},
    {name: 'attention/alert/functional', selector: '.f_overlay', opener: 'Show alert', close: 'button', closeButton: 'Ok'},
    {name: 'attention/confirm/functional', selector: '.f_overlay', opener: 'Show confirm', close: 'button', closeButton: 'Cancel'},
    {name: 'attention/prompt/functional', selector: '.f_overlay', opener: 'Show prompt', close: 'button', closeButton: 'Cancel'},
    {name: 'tooltip/basic', selector: '.f_tooltip', opener: 'Hover me', close: 'hover'}
];
try {
    for (const framework of ['vue', 'react']) {
        const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
        await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
        async function fixture(name) {
            await page.mouse.move(1400, 900);
            await page.evaluate(async ({framework, name}) => (await import('/.vitepress/react/validation.ts')).renderFixture(`components/${name}.vue`, framework, false), {framework, name});
            await page.waitForTimeout(300);
        }
        async function record(selector, action, duration = 900) {
            await page.evaluate(({selector, duration}) => {
                window.__motion = new Promise(resolve => {
                    const frames = [], start = performance.now();
                    let shade;
                    function sample() {
                        const node = document.querySelector(selector);
                        shade ??= node?.closest('.f_overlayProvider')?.querySelector('.f_overlayShade');
                        const snapshot = element => {
                            const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
                            return {x: rect.x, y: rect.y, width: rect.width, height: rect.height, opacity: Number(style.opacity), scale: style.scale, transform: style.transform, translate: style.translate, filter: style.filter, origin: style.transformOrigin, classes: element.className};
                        };
                        frames.push({time: performance.now() - start, shade: shade ? {opacity: Number(getComputedStyle(shade).opacity), duration: getComputedStyle(shade).transitionDuration} : null, node: node ? snapshot(node) : null, pane: node?.querySelector(':scope > .f_basePaneStructure') ? snapshot(node.querySelector(':scope > .f_basePaneStructure')) : null});
                        if (performance.now() - start < duration) requestAnimationFrame(sample);
                        else resolve(frames);
                    }
                    requestAnimationFrame(sample);
                });
            }, {selector, duration});
            await action();
            return page.evaluate(() => window.__motion);
        }
        results[framework] = {};
        for (const spec of cases) {
            await fixture(spec.name);
            const trigger = spec.trigger ? page.locator(spec.trigger).first() : page.getByRole('button', {name: spec.opener, exact: true});
            const enter = await record(spec.selector, () => spec.close === 'hover' ? trigger.hover() : trigger.click());
            results[framework][spec.name] = {enter};
            const initial = enter.filter(frame => frame.node).at(-1)?.node;
            assert(initial, `${framework} ${spec.name}: did not open`);
            assert(enter.some(frame => frame.node && frame.node.opacity < .9), `${framework} ${spec.name}: missing opening fade`);
            assert(initial.opacity > .99, `${framework} ${spec.name}: enter did not finish`);
            const leave = await record(spec.selector, async () => {
                if (spec.close === 'hover') await page.mouse.move(1400, 900);
                else if (spec.close === 'button') await page.locator(spec.selector).getByRole('button', {name: spec.closeButton ?? 'Close', exact: true}).click();
                else await page.keyboard.press('Escape');
            });
            if (enter.some(frame => frame.shade)) {
                assert(enter.filter(frame => frame.shade).every(frame => frame.shade.duration === '0.6s'), `${framework} ${spec.name}: backdrop timing differs`);
                if (spec.selector !== '.f_slideOver') assert(leave.some(frame => !frame.node && frame.shade?.opacity > .05), `${framework} ${spec.name}: backdrop was removed before its fade completed`);
            }
            const visible = leave.filter(frame => frame.node);
            assert(visible.some(frame => frame.node.opacity > .05 && frame.node.opacity < .9), `${framework} ${spec.name}: missing closing fade`);
            assert.equal(leave.at(-1).node, null, `${framework} ${spec.name}: did not finish closing`);
            for (const {node, pane} of visible) {
                assert.equal(node.translate, initial.translate, `${framework} ${spec.name}: anchor jumped while closing`);
                if (spec.close !== 'hover') for (const axis of ['x', 'y', 'width', 'height']) assert(Math.abs(node[axis] - initial[axis]) < 1.1, `${framework} ${spec.name}: ${axis} jumped from ${initial[axis]} to ${node[axis]}`);
                if (pane) assert.equal(pane.filter, 'none', `${framework} ${spec.name}: closing pane lost its active styling`);
            }
            results[framework][spec.name] = {enter, leave};
            console.log(framework, spec.name, 'opening and closing frames retain their anchor and appearance');
        }
        await fixture('flyout/menu');
        const menuTrigger = page.getByRole('button', {name: 'Menu', exact: true});
        await menuTrigger.click();
        await page.waitForTimeout(250);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(60);
        await menuTrigger.evaluate(node => node.click());
        await page.waitForTimeout(300);
        assert.equal(await page.locator('.f_flyoutPane').count(), 1, `${framework}: reopening must cancel the pending close`);
        await page.keyboard.press('Escape');
        await page.locator('.f_flyoutPane').waitFor({state: 'detached'});
        assert(await menuTrigger.evaluate(node => node === document.activeElement), `${framework}: reopening must preserve focus return to the original anchor`);
        console.log(framework, 'flyout reopening cancels leave and retains the focus anchor');
        for (const [name, selector] of [['expandable/basic', '.f_expandableBody'], ['expandable-pane/basic', '.f_expandablePaneBody']]) {
            await fixture(name);
            const trigger = page.locator('.f_expandableHeader, .f_expandablePaneHeader').first();
            if (await page.locator(selector).count()) {await trigger.click(); await page.locator(selector).waitFor({state: 'detached'});}
            const enter = await record(selector, () => trigger.click());
            const height = enter.filter(frame => frame.node).at(-1).node.height;
            assert(enter.some(frame => frame.node && frame.node.height < height * .1), `${framework} ${name}: missing enter start`);
            assert(enter.some(frame => frame.node && frame.node.height > height * .1 && frame.node.height < height * .9), `${framework} ${name}: missing height animation`);
            const leave = await record(selector, () => trigger.click());
            assert(leave.some(frame => frame.node && frame.node.height > height * .1 && frame.node.height < height * .9), `${framework} ${name}: missing closing height animation`);
            assert.equal(leave.at(-1).node, null);
            const interrupted = await record(selector, async () => {
                await trigger.evaluate(node => node.click());
                await page.waitForTimeout(90);
                await trigger.evaluate(node => node.click());
                await page.waitForTimeout(90);
                await trigger.evaluate(node => node.click());
            });
            assert(Math.abs(interrupted.at(-1).node.height - height) < 1, `${framework} ${name}: interrupted animation did not reopen`);
            results[framework][name] = {enter, leave, interrupted};
            console.log(framework, name, 'height transitions and interrupted reopening passed');
        }
        for (const [direction, index] of [['vertical', 0], ['horizontal', 1]]) {
            for (const [x, y] of [[20, 20], [800, 500], [1280, 900]]) {
                await fixture('tooltip/preview');
                const trigger = page.getByRole('button', {name: 'Hover me', exact: true}).nth(index);
                await trigger.evaluate((node, {x, y}) => {node.style.position = 'fixed'; node.style.left = `${x}px`; node.style.top = `${y}px`;}, {x, y});
                await trigger.hover();
                await page.waitForTimeout(300);
                const layout = await page.locator('.f_tooltip').evaluate(node => {
                    const rect = node.getBoundingClientRect(), style = getComputedStyle(node), arrow = getComputedStyle(node, '::after');
                    return {x: rect.x, y: rect.y, width: rect.width, height: rect.height, origin: style.transformOrigin, arrowX: arrow.left, arrowY: arrow.top, arrowAngle: arrow.rotate, topLayer: Boolean(node.closest(':popover-open'))};
                });
                assert(layout.topLayer, `${framework}: tooltip must be above dialogs`);
                results[framework][`tooltip-${direction}-${x}-${y}`] = layout;
                await page.evaluate(() => window.dispatchEvent(new Event('scroll')));
                await page.locator('.f_tooltip').waitFor({state: 'detached'});
            }
        }
        await page.close();
    }
    for (const key of Object.keys(results.vue)) {
        if (!key.startsWith('tooltip-')) continue;
        for (const prop of ['x', 'y', 'width', 'height']) assert(Math.abs(results.react[key][prop] - results.vue[key][prop]) <= 1, `${key}.${prop}`);
        for (const prop of ['origin', 'arrowX', 'arrowY', 'arrowAngle']) {
            const actual = results.react[key][prop], expected = results.vue[key][prop];
            const numbers = value => [...value.matchAll(/-?\d+(?:\.\d+)?/g)].map(match => Number(match[0]));
            const a = numbers(actual), b = numbers(expected);
            assert(actual === expected || a.length === b.length && a.every((value, index) => Math.abs(value - b[index]) <= .15), `${key}.${prop}: ${actual} vs ${expected}`);
        }
    }
    console.log('Tooltip side, arrow, origin, safe area and scroll dismissal match Vue at all six anchors');
} finally {
    mkdirSync('.artifacts/react-parity', {recursive: true});
    writeFileSync('.artifacts/react-parity/open-close.json', JSON.stringify(results, null, 2));
    await browser.close();
}
