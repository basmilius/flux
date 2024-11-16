import useDisabledInjection from './useDisabledInjection';
import { computed, Ref, unref } from 'vue';

export default function (componentDisabled: Ref<boolean>) {
    const treeDisabled = useDisabledInjection();

    return computed(() => unref(componentDisabled) || unref(treeDisabled));
}
