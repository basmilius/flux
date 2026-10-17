import {FluxStaggerTransition as VueStagger, useFluxStore} from '@flux-ui/components';
import {FluxStaggerTransition, addSnackbar, removeSnackbar, showAlert, showConfirm, showPrompt, showSnackbar, updateSnackbar} from '@flux-ui/react';
import {StrictMode, createElement} from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import {createApp, h, shallowRef} from 'vue';

export function snackbarStore(framework: 'vue' | 'react') {
    if (!import.meta.env.DEV) throw new Error('Motion comparison is only available on the dev server.');
    return framework === 'vue' ? useFluxStore() : {addSnackbar, removeSnackbar, showAlert, showConfirm, showPrompt, showSnackbar, updateSnackbar};
}

export function mountStagger(framework: 'vue' | 'react', grid: boolean) {
    if (!import.meta.env.DEV) throw new Error('Motion comparison is only available on the dev server.');
    const host = document.createElement('div');
    document.body.append(host);
    const style = {display: grid ? 'grid' : 'flex', gridTemplateColumns: 'repeat(3, 100px)', flexDirection: 'column', gap: '15px', width: '330px', margin: '40px'};
    type Item = {id: string; height: number};
    const itemStyle = (item: Item) => ({height: `${item.height}px`, width: '100px', background: '#eee'});
    if (framework === 'vue') {
        const items = shallowRef<Item[]>([]);
        const app = createApp({render: () => h(VueStagger, {style, 'data-motion-list': ''}, {default: () => items.value.map(item => h('div', {key: item.id, 'data-item': item.id, style: itemStyle(item)}, item.id))})});
        app.mount(host);
        return {set(itemsNext: Item[]) {items.value = itemsNext;}, dispose() {app.unmount(); host.remove();}};
    }
    const root = createRoot(host);
    return {
        set(items: Item[]) {
            flushSync(() => root.render(createElement(StrictMode, null, createElement(FluxStaggerTransition, {style: {...style, flexDirection: 'column'}, 'data-motion-list': ''} as Parameters<typeof FluxStaggerTransition>[0], items.map(item => createElement('div', {key: item.id, 'data-item': item.id, style: itemStyle(item)}, item.id))))));
        },
        dispose() {root.unmount(); host.remove();}
    };
}
