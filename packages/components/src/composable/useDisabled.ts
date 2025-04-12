import type { Ref } from 'vue';
import { computed, unref } from 'vue';
import useDisabledInjection from './useDisabledInjection';

export default function (componentDisabled: Ref<boolean>) {
    const treeDisabled = useDisabledInjection();

    return computed(() => unref(componentDisabled) || unref(treeDisabled));
}
