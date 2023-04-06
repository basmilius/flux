import type { ConcreteComponent, Ref, UnwrapRef, VNode } from 'vue-demi';
import { h, unref } from 'vue-demi';
import { hyphenateTag } from './dom';

export function flattenVNodeTree(vnodes: VNode[]): VNode[] {
    const flattened: VNode[] = [];

    for (const vnode of vnodes) {
        // note: This is a Vue 3 Fragment (could be a v-for for example) and needs to be flattened.
        if (typeof vnode.type === 'symbol' && Array.isArray(vnode.children)) {
            flattened.push(...(vnode.children as VNode[]));
            continue;
        }

        flattened.push(vnode);
    }

    return flattened;
}

export function getNormalizedComponentName(component: any): string {
    let name = 'flux-unknown';

    if (component.type && component.type.__name) {
        name = component.type.__name;
    }

    if (component.componentOptions && component.componentOptions.tag) {
        name = component.componentOptions.tag;
    }

    return hyphenateTag(name);
}

export function getNormalizedComponentProps<T extends object>(component: any): T {
    if (component.props) {
        return component.props;
    }

    if (component.componentOptions && component.componentOptions.propsData) {
        return component.componentOptions.propsData;
    }

    return {} as T;
}

export function isVNode(vnode: unknown): vnode is VNode {
    return typeof vnode === 'object' && !!vnode && (vnode.hasOwnProperty('__v_isVNode') || vnode.hasOwnProperty('componentOptions'));
}

export function render<P>(component: ConcreteComponent<P>, spec?: RenderSpec<P>): VNode {
    if (!spec) {
        return h(component);
    }

    const {
        attrs,
        children,
        on,
        props,
        slots
    } = spec;

    if (children && slots) {
        throw new Error('[Flux] Cannot use children and slots at the same time.');
    }

    const options: any = {};
    let content;

    // Vue 2.7
    if ('staticRenderFns' in component) {
        options.domProps = attrs;
        options.on = on;
        options.props = props;
        options.scopedSlots = slots;
        content = children;
    } else {
        if (on) {
            for (let key in on) {
                options[`on${key.substring(0, 1).toUpperCase()}${key.substring(1)}`] = on[key];
            }
        }

        if (attrs) {
            for (let key in attrs) {
                options[key] = attrs[key];
            }
        }

        if (props) {
            for (let key in props) {
                options[key] = props[key];
            }
        }

        content = slots || children;
    }

    return h(component, options, content);
}

export function unrefObject<T>(obj: RefObject<T>): UnrefObject<T> {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            unref(value)
        ])
    ) as UnrefObject<T>;
}

interface RenderSpec<P> {
    readonly attrs?: Record<string, unknown>;
    readonly children?: RawChildren;
    readonly on?: Record<string, Function>;
    readonly props?: P;
    readonly slots?: RawSlots;
}

type RefObject<T = Record<string, Ref<unknown>>> = {
    [K in keyof T]: T[K];
};

type UnrefObject<T> = {
    [K in keyof T]: UnwrapRef<T[K]>;
};

type RawChildren = string | number | boolean | VNode | VNode[] | (() => any);
type RawSlots = { [name: string]: unknown; };
