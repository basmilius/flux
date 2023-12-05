import { Fragment, Ref, unref, UnwrapRef, VNode } from 'vue';
import { hyphenateTag } from './dom';

export function assertRefNotNull<T>(ref: Ref<T>): asserts ref is Ref<NonNullable<T>> {
    if (!ref.value) {
        throw new Error('[Flux] Ref value is null.');
    }
}

export function flattenVNodeTree(vnodes: VNode[]): VNode[] {
    const flattened: VNode[] = [];

    for (const vnode of vnodes) {
        if (vnode.type === Fragment && Array.isArray(vnode.children)) {
            flattened.push(...(vnode.children as VNode[]));
            continue;
        }

        flattened.push(vnode);
    }

    return flattened;
}

export function getNormalizedComponentName(component: ExtendedVNode): string {
    let name = 'flux-unknown';

    if (component.type && component.type.__name) {
        name = component.type.__name;
    }

    return hyphenateTag(name);
}

export function getNormalizedComponentProps<T extends object>(component: any): T {
    return component.props ?? {} as T;
}

export function unrefObject<T>(obj: RefObject<T>): UnrefObject<T> {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            unref(value)
        ])
    ) as UnrefObject<T>;
}

type RefObject<T = Record<string, Ref<unknown>>> = {
    [K in keyof T]: T[K];
};

type UnrefObject<T> = {
    [K in keyof T]: UnwrapRef<T[K]>;
};

interface ExtendedVNode {
    readonly type: VNode['type'] & {
        readonly __name?: string;
    };
}
