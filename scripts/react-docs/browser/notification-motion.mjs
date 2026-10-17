import assert from 'node:assert/strict';
import {mkdirSync, writeFileSync} from 'node:fs';
import {chromium} from '../../../docs/node_modules/playwright/index.mjs';

const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH ?? (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
const results = {};
const errors = [];
const stack = ['A', 'B', 'C'].map((title, index) => ({title, message: `Notification ${title}`, subMessage: index === 1 ? 'This notification has an extra line.' : undefined, isCloseable: true}));
const items = ids => ids.split('').map(id => ({id, height: id === 'B' ? 80 : 50}));
try {
    for (const viewport of [{width: 1440, height: 1000}, {width: 390, height: 844}].filter(viewport => !process.env.FLUX_MOTION_WIDTH || viewport.width === +process.env.FLUX_MOTION_WIDTH)) {
        for (const framework of ['vue', 'react']) {
            const page = await browser.newPage({viewport});
            page.on('pageerror', error => errors.push(`${framework}: ${error.message}`));
            await page.goto(process.env.FLUX_DOCS_URL ?? 'http://127.0.0.1:5174/', {waitUntil: 'networkidle'});
            await page.evaluate(async framework => {
                await (await import('/.vitepress/react/validation.ts')).renderFixture('components/attention/snackbar/functional.vue', framework, false);
                const module = await import('/.vitepress/react/motionValidation.tsx');
                window.snackbarStore = module.snackbarStore(framework);
                window.mountStagger = grid => module.mountStagger(framework, grid);
                window.ids = {};
                window.snapshot = selector => Array.from(document.querySelectorAll(selector)).map(node => {
                    const box = node.getBoundingClientRect(), css = getComputedStyle(node);
                    return {id: node.dataset.item ?? node.querySelector('.f_snackbarTitle')?.textContent, x: box.x, y: box.y, width: box.width, height: box.height, opacity: +css.opacity, transform: css.transform, translate: css.translate, position: css.position};
                });
            }, framework);
            await page.waitForTimeout(300);
            const output = results[`${viewport.width}-${framework}`] = {};
            async function record(name, actions, duration = 800, list = false) {
                const trace = await page.evaluate(async ({actions, duration, list}) => {
                    const selector = list ? '[data-motion-list] > div' : '.f_snackbars > div';
                    const initial = window.snapshot(selector), frames = [], events = [];
                    const start = performance.now();
                    let cursor = 0;
                    while (performance.now() - start < duration) {
                        await new Promise(requestAnimationFrame);
                        const time = performance.now() - start;
                        frames.push({time, nodes: window.snapshot(selector)});
                        while (cursor < actions.length && time >= actions[cursor].at) {
                            const action = actions[cursor++];
                            events.push({time, ...action});
                            if (action.add) for (const spec of action.add) window.ids[spec.title] = window.snackbarStore.addSnackbar(spec);
                            if (action.remove) for (const id of action.remove) window.snackbarStore.removeSnackbar(window.ids[id]);
                            if (action.update) window.snackbarStore.updateSnackbar(window.ids[action.update.title], action.update);
                            if (action.items) window.list.set(action.items);
                            if (action.show) for (const spec of action.show) window.snackbarStore.showSnackbar(spec);
                            if (action.toggle) Array.from(document.querySelectorAll('button')).find(node => node.textContent === 'Toggle Snackbar').click();
                        }
                    }
                    return {initial, frames, events, final: window.snapshot(selector)};
                }, {actions, duration, list});
                output[name] = trace;
                console.log(viewport.width, framework, name, 'recorded');
                return trace;
            }
            async function clear() {
                await page.evaluate(() => {for (const id of Object.values(window.ids)) window.snackbarStore.removeSnackbar(id);});
                await page.waitForTimeout(550);
            }
            async function seed() {
                await clear();
                await page.evaluate(stack => {for (const spec of stack) window.ids[spec.title] = window.snackbarStore.addSnackbar(spec);}, stack);
                await page.waitForTimeout(550);
            }
            if (process.env.FLUX_MOTION_KIND !== 'groups') {
                await record('simultaneous enter', [{at: 0, add: stack}]);
                for (const id of ['A', 'B', 'C']) {
                    await seed();
                    await record(`remove ${id}`, [{at: 0, remove: [id]}]);
                }
                await seed();
                await record('interrupt movement', [{at: 0, remove: ['B']}, {at: 80, add: [{title: 'D', message: 'Fourth notification'}]}, {at: 160, remove: ['A']}, {at: 240, remove: ['C']}, {at: 260, add: [{title: 'E', message: 'Fifth notification'}]}], 1000);
                await clear();
                await record('interrupt enter', stack.map((spec, index) => ({at: index * 80, add: [spec]})), 1000);
                await record('clear together', [{at: 0, remove: ['A', 'B', 'C']}]);
                await record('remove while entering', [{at: 0, add: stack}, {at: 80, remove: ['B']}, {at: 150, remove: ['A', 'C']}]);
                await seed();
                await record('change height', [{at: 0, update: {title: 'A', subMessage: 'An extra line added while the stack is visible.'}}, {at: 100, remove: ['B']}]);
                await clear();
                await record('automatic close', [{at: 0, show: stack.map((spec, index) => ({...spec, duration: 600 + index * 200}))}], 1650);
                await page.evaluate(() => {window.snackbarStore.showSnackbar({title: 'Hover', duration: 700, message: 'Timer pauses over this notification.'});});
                await page.waitForTimeout(200);
                await page.locator('.f_snackbars > div').filter({hasText: 'Hover'}).hover();
                await page.waitForTimeout(900);
                output.hover = {paused: await page.getByText('Hover', {exact: true}).count()};
                await page.mouse.move(1, 1);
                await page.waitForTimeout(1100);
                output.hover.resumed = await page.getByText('Hover', {exact: true}).count();
                await page.evaluate(async framework => (await import('/.vitepress/react/validation.ts')).renderFixture('components/attention/snackbar/global.vue', framework, false), framework);
                await page.waitForTimeout(300);
                await record('declarative enter', [{at: 0, toggle: true}]);
                await record('declarative leave', [{at: 0, toggle: true}]);
            }
            if (process.env.FLUX_MOTION_KIND !== 'snackbars') for (const grid of [false, true]) {
                const prefix = grid ? 'grid' : 'list';
                await page.evaluate(grid => {window.list = window.mountStagger(grid); window.list.set([]);}, grid);
                await page.waitForTimeout(50);
                await record(`${prefix} enter`, [{at: 0, items: items('ABCD')}], 700, true);
                await record(`${prefix} reorder`, [{at: 0, items: items('DCBA')}], 600, true);
                await record(`${prefix} remove middle`, [{at: 0, items: items('DBA')}], 600, true);
                await record(`${prefix} interrupted`, [{at: 0, items: items('AD')}, {at: 60, items: items('BADC')}, {at: 110, items: items('DBCA')}, {at: 160, items: items('DBA')}], 800, true);
                await record(`${prefix} leave interrupted`, [{at: 0, items: items('DA')}, {at: 16, items: items('ADE')}], 700, true);
                await record(`${prefix} append`, [{at: 0, items: items('DBAEF')}], 700, true);
                await record(`${prefix} clear`, [{at: 0, items: []}], 500, true);
                await page.evaluate(() => window.list.dispose());
            }
            await page.close();
        }
    }
    const failures = [];
    for (const width of [1440, 390]) {
        const vue = results[`${width}-vue`], react = results[`${width}-react`];
        if (!vue || !react) continue;
        for (const name of Object.keys(vue)) {
            try {
                if (name === 'hover') {
                    assert.deepEqual(react.hover, vue.hover, 'hover must preserve the remaining timeout');
                    assert.deepEqual(react.hover, {paused: 1, resumed: 0});
                    continue;
                }
                const expected = vue[name], actual = react[name];
                assert.deepEqual(actual.final.map(node => node.id), expected.final.map(node => node.id), 'final order');
                for (const node of actual.final) {
                    const reference = expected.final.find(item => item.id === node.id);
                    for (const prop of ['x', 'y', 'width', 'height', 'opacity']) assert(Math.abs(node[prop] - reference[prop]) <= 1, `final ${node.id}.${prop}: ${node[prop]} vs ${reference[prop]}`);
                }
                if (name.endsWith('interrupted') || ['interrupt movement', 'interrupt enter', 'remove while entering', 'change height', 'automatic close'].includes(name)) {
                    // Vue's DOM moves can cancel running CSS transitions; assert continuity instead of copying those jumps.
                    for (const event of actual.events) {
                        const index = actual.frames.findIndex(frame => frame.time >= event.time);
                        const before = actual.frames[index], after = actual.frames[index + 1];
                        for (const node of after.nodes) {
                            const previous = before.nodes.find(item => item.id === node.id);
                            if (!previous || Math.min(previous.opacity, node.opacity) < .1) continue;
                            assert(Math.hypot(node.x - previous.x, node.y - previous.y) < 5, `interruption jumped for ${node.id}`);
                        }
                    }
                    if (!name.startsWith('list') && !name.startsWith('grid')) for (let index = 1; index < actual.frames.length; index++) {
                        for (const node of actual.frames[index].nodes) {
                            const previous = actual.frames[index - 1].nodes.find(item => item.id === node.id);
                            if (!previous || Math.min(previous.opacity, node.opacity) < .1) continue;
                            assert(Math.hypot(node.x - previous.x, node.y - previous.y) < 35, `${node.id}: a visible notification jumped between frames`);
                        }
                    }
                    console.log('PASS', width, name, 'continuous interrupted motion and Vue destination');
                    continue;
                }
                if (['simultaneous enter', 'declarative enter', 'list enter', 'grid enter'].includes(name)) for (const node of actual.final) {
                    const visible = actual.frames.flatMap(frame => frame.nodes.filter(item => item.id === node.id));
                    assert(visible.some(item => item.opacity < .1), `${node.id}: missing enter start`);
                    assert(visible.some(item => item.opacity > .1 && item.opacity < .9), `${node.id}: missing enter fade`);
                }
                let maxError = 0, totalError = 0, samples = 0;
                for (const frame of actual.frames) {
                    // Allow one RAF of scheduling difference between Vue and React commits.
                    const time = frame.time - actual.events[0].time + expected.events[0].time;
                    const reference = expected.frames.reduce((best, candidate) => Math.abs(candidate.time - time) < Math.abs(best.time - time) ? candidate : best);
                    const nearby = expected.frames.filter(candidate => Math.abs(candidate.time - time) < 20);
                    for (const node of frame.nodes) {
                        const other = reference.nodes.find(item => item.id === node.id);
                        if (!other || Math.min(node.opacity, other.opacity) < .05) continue;
                        const candidates = nearby.flatMap(candidate => candidate.nodes.filter(item => item.id === node.id && item.opacity >= .05));
                        const error = Math.min(...(candidates.length ? candidates : [other]).map(item => Math.hypot(node.x - item.x, node.y - item.y)));
                        maxError = Math.max(maxError, error);
                        totalError += error;
                        samples++;
                    }
                }
                assert(maxError < 28 && totalError / Math.max(1, samples) < 5, `motion diverged: max ${maxError.toFixed(1)}px, mean ${(totalError / samples).toFixed(1)}px`);
                console.log('PASS', width, name, 'max', maxError.toFixed(1), 'mean', (totalError / samples).toFixed(1));
            } catch (error) {failures.push(`${width} ${name}: ${error.message}`);}
        }
    }
    assert.deepEqual(errors, [], 'browser errors');
    assert.deepEqual(failures, [], 'Vue/React motion parity');
} finally {
    mkdirSync('.artifacts/react-parity', {recursive: true});
    writeFileSync('.artifacts/react-parity/notification-motion.json', JSON.stringify(results, null, 2));
    await browser.close();
}
