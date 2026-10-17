import { fluxRegisterIcons, FluxRoot, FluxApplication, useFluxStore } from '@flux-ui/react';
import {useFluxStore as useVueStore} from '@flux-ui/components';
import { Component, createElement, useLayoutEffect, type ComponentType, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import examples from './manifest';
import {previewExamples} from './previewExamples';
import {ReactPreview} from './Preview';
import * as icons from '../theme/icons';

fluxRegisterIcons(icons);

class ExampleBoundary extends Component<
    { children: ReactNode; onError(message: string): void },
    { failed: boolean }
> {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error(error, info);
        this.props.onError(error.message);
    }

    render() {
        return this.state.failed ? null : this.props.children;
    }
}

export async function mountExample(element: HTMLElement, name: string, onError: (message: string) => void, bare = false) {
    const load = examples[name as keyof typeof examples];
    if (!load) throw new Error(`Unknown React example: ${name}`);
    const { default: Example } = (await load()) as { default: ComponentType };
    const root = createRoot(element);
    const needsApplication = name.startsWith('application/') && name.endsWith('/snippet.vue') && name !== 'application/snippet.vue';
    const example = needsApplication ? createElement(FluxApplication, null, createElement(Example)) : createElement(Example);
    root.render(createElement(ExampleBoundary, {onError, children: bare || previewExamples.has(name) ? example : createElement(ReactPreview, {children: example})}));
    return () => root.unmount();
}

export function mountProviders(element: HTMLElement) {
    const root = createRoot(element);
    root.render(createElement(Providers));
    return () => root.unmount();
}

function Providers() {
    const {inertMain} = useFluxStore();
    useLayoutEffect(() => {
        if (!inertMain) return;
        // The docs shell belongs to Vue, so its root must also become inert for a React dialog.
        const registration = useVueStore().registerDialog();
        return () => registration.unregister();
    }, [inertMain]);
    return createElement(FluxRoot);
}
