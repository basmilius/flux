import { computed, type ComputedRef, toRef } from 'vue';
import useNamedRoutes from '../routing/useNamedRoutes';

export default function (name: string = 'menu'): UseApplicationContextMenu {
    const matches = useNamedRoutes(toRef(() => name));

    const hasContextMenu = computed(() => matches.value.length > 0);
    const contextMenuKey = computed(() => matches.value.map(m => m.record.path).join('|') || undefined);

    return {
        contextMenuKey,
        hasContextMenu
    };
}

type UseApplicationContextMenu = {
    readonly contextMenuKey: ComputedRef<string | undefined>;
    readonly hasContextMenu: ComputedRef<boolean>;
};
