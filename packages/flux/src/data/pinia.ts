import { defineStore as _defineStore, DefineStoreOptions, Pinia, StateTree, Store, StoreGeneric, storeToRefs as _storeToRefs } from 'pinia';
import { ToRefs } from 'vue-demi';

export function defineStore<Id extends string, S extends StateTree, G, A>(id: Id, options: { getters?: _DefineGetters<S, G>; } & Omit<DefineStoreOptions<Id, S, G, A>, 'id' | 'getters'>): UseStore<Id, S, G, A> {
    return _defineStore(id, options);
}

export interface UseStore<Id extends string, S extends StateTree, G, A> {
    $id: Id;

    (pinia?: Pinia | null, hot?: StoreGeneric): _Store<Id, S, _Getters<G>, A>;
}

type _DefineGetters<S, T> = {
    [Key in keyof T]: (state: S) => T[Key];
};

type _Getter<T> = T;

type _Getters<T> = {
    [K in keyof T]: _Getter<T[K]>;
}

type _Store<Id extends string, S, G, A> = S & G & A & Store<Id, {}, G, A>;

export function storeToRefs<Id extends string, S extends StateTree, G, A>(store: _Store<Id, S, G, A>): ToRefs<S & G> {
    return _storeToRefs(store as StoreGeneric);
}
