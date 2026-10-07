import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const project = resolve(import.meta.dirname, '../..');
const runtime = process.env.FLUX_REACT_RUNTIME ?? resolve(project, 'packages/react');
const requireRuntime = createRequire(resolve(runtime, 'package.json'));
const requireProject = createRequire(resolve(project, 'packages/react/package.json'));
const React = requireRuntime('react');
const {renderToString} = requireRuntime('react-dom/server');
const {JSDOM} = requireProject('jsdom');
const Flux = await import(pathToFileURL(process.env.FLUX_REACT_BUILD ?? resolve(project, 'packages/react/dist/index.js')).href);
const h = React.createElement;
function Fixture() {
    const [checked, setChecked] = React.useState(true);
    return h(Flux.FluxRoot, null,
    h(Flux.FluxPane, null,
        h(Flux.FluxPaneHeader, {title: 'Server-rendered Flux'}),
        h(Flux.FluxPaneBody, null,
            h(Flux.FluxFormField, {label: 'Name', isOptional: true}, h(Flux.FluxFormInput, {defaultValue: 'Ada'})),
            h(Flux.FluxFormSelect, {defaultValue: 2, options: [{label: 'One', value: 1}, {label: 'Two', value: 2}]}),
            h(Flux.FluxFormCheckbox, {checked, onCheckedChange: setChecked}),
            h(Flux.FluxStaggerTransition, {'data-ssr-stagger': ''}, ['A', ...(checked ? ['B'] : []), 'C'].map(key => h('div', {key}, key))),
            h(Flux.FluxSnackbar, {message: 'Hydrated notification'}),
            h(Flux.FluxFormSlider, {defaultValue: 35}),
            h(Flux.FluxExpandable, {title: 'Details', defaultOpened: true}, 'Expanded content'),
            h(Flux.FluxTooltip, {content: 'Help', open: true}, h(Flux.FluxSecondaryButton, {label: 'Help'})),
            h(Flux.FluxAiStreamingText, {content: '**Markdown** with a [link](https://example.org).'}),
            h(Flux.FluxAiUsage, {inputTokens: 1234, outputTokens: 56, limit: 5000}),
            h(Flux.FluxApplicationStatusPage, {variant: 'not-found'})
        )
    )
);
}
const fixture = () => h(Fixture);
const html = renderToString(fixture());
assert.match(html, /Server-rendered Flux/);
assert.match(html, /Markdown/);
const dom = new JSDOM('<!doctype html><html><body><div id="root">' + html + '</div></body></html>', {url: 'http://localhost/', pretendToBeVisual: true});
for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'MutationObserver', 'Event', 'MouseEvent', 'getComputedStyle', 'localStorage', 'innerWidth', 'innerHeight']) Object.defineProperty(globalThis, key, {configurable: true, value: dom.window[key]});
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
globalThis.ResizeObserver = class {observe() {} unobserve() {} disconnect() {}};
dom.window.matchMedia = () => ({matches: false, addEventListener() {}, removeEventListener() {}});
const errors = [];
dom.window.addEventListener('error', event => errors.push(event.message));
const {hydrateRoot} = requireRuntime('react-dom/client');
const root = hydrateRoot(document.getElementById('root'), fixture(), {onRecoverableError: error => errors.push(error.message)});
await new Promise(resolve => setTimeout(resolve, 200));
assert.deepEqual(errors, [], 'server and browser render must hydrate without replacement');
assert.equal(document.querySelector('input').value, 'Ada');
const checkbox = document.querySelector('input[type="checkbox"]');
assert.equal(checkbox.checked, true);
assert.equal(document.querySelectorAll('[data-ssr-stagger] > div').length, 3);
assert(document.body.textContent.includes('Hydrated notification'));
checkbox.click();
await new Promise(resolve => setTimeout(resolve, 30));
assert.equal(checkbox.checked, false, 'hydrated controls must respond to input');
await new Promise(resolve => setTimeout(resolve, 100));
assert.equal(document.querySelectorAll('[data-ssr-stagger] > div').length, 2, 'hydrated transition groups must finish removing a child');
assert.deepEqual(errors, [], 'hydrated components must not raise runtime errors');
root.unmount();
dom.window.close();
console.log(`React ${React.version}: server render, hydration and client interaction passed`);
