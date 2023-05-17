import type { Ref, UnwrapRef, UnwrapNestedRefs, UnwrapRefSimple } from 'vue';

declare module 'vue' {
    declare type UnwrapRef<T> = T;

    declare type UnwrapRefSimple<T> = T;

    declare type UnwrapNestedRefs<T> = T;

    declare type UnwrapRefSimple<T> = T;

    declare function ref<T extends object>(value: T): [T] extends [Ref] ? T : Ref<T>;

    declare function ref<T>(value: T): Ref<T>;

    declare function unref<T>(value: Ref<T>): T;
}

declare module '@vue/reactivity' {
    export interface RefUnwrapBailTypes {
        runtimeDOMBailTypes: Node | Window;
    }
}
