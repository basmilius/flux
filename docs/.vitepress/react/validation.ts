import {FluxApplication} from '@flux-ui/application';
import {FluxRoot, fluxRegisterIcons} from '@flux-ui/components';
import {Settings} from 'luxon';
export {getInstanceByDom as getChart} from 'echarts';
import {createApp, h, nextTick, type App, type Component} from 'vue';
import {createI18n} from 'vue-i18n';
import {createMemoryHistory, createRouter} from 'vue-router';
import FluxView from '../theme/FluxView.vue';
import Preview from '../theme/Preview.vue';
import PreviewColumn from '../theme/PreviewColumn.vue';
import ReactExample from '../theme/ReactExample.vue';
import * as icons from '../theme/icons';
import {mountProviders} from './runtime';

const examples = import.meta.glob('../../code/**/*.vue');
let app: App | undefined;
let host: HTMLElement | undefined;
let dispose: (() => void) | undefined;

export async function renderFixture(name: string, framework: 'vue' | 'react', hasPreview: boolean) {
    if (!import.meta.env.DEV) throw new Error('The component comparison is only available on the dev server.');
    app?.unmount();
    dispose?.();
    host?.remove();
    const original = document.getElementById('app');
    if (original) {
        (original as HTMLElement & {__vue_app__?: App}).__vue_app__?.unmount();
        original.style.display = 'none';
    }
    Settings.defaultLocale = 'en';
    fluxRegisterIcons(icons);
    host = document.createElement('div');
    host.id = 'flux-validation';
    host.style.cssText = 'width:864px;max-width:100%;margin:30px auto;';
    document.body.append(host);
    const component = framework === 'vue' ? (await examples[`../../code/${name}`]() as {default: Component}).default : ReactExample;
    const needsApplication = name.startsWith('application/') && name.endsWith('/snippet.vue') && !['application/snippet.vue'].includes(name);
    const example = () => framework === 'react' ? h(component, {example: name}) : needsApplication ? h(FluxApplication, {}, {default: () => h(component)}) : h(component);
    app = createApp({render: () => h(FluxRoot, {}, {default: () => framework === 'react' || hasPreview ? example() : h(Preview, {}, {default: example})})});
    app.use(createI18n({legacy: false, locale: 'en', fallbackLocale: 'en', fallbackWarn: false, missingWarn: false, messages: {en: {}}}));
    const router = createRouter({history: createMemoryHistory(), routes: [{path: '/:pathMatch(.*)*', component: {render: () => null}}, ...['overview', 'activity'].map(name => ({name: `dashboard.${name}`, path: `/dashboard/${name}`, component: {render: () => null}}))]});
    app.use(router);
    for (const [name, component] of Object.entries({FluxView, Preview, PreviewColumn})) app.component(name, component);
    app.mount(host);
    if (framework === 'react') {
        const providers = document.createElement('div');
        host.append(providers);
        dispose = mountProviders(providers);
    }
    await nextTick();
}
