import { Ref } from 'vue-demi';

declare module 'vue-demi' {
    declare type UnwrapRefSimple<T> = T;

    declare function ref<T extends object>(value: T): [T] extends [Ref] ? T : Ref<T>;

    declare function ref<T>(value: T): Ref<T>;
}

declare module '@vue/reactivity' {
    export interface RefUnwrapBailTypes {
        runtimeDOMBailTypes: Node | Window;
    }
}
