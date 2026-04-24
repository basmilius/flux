import type { Ref } from 'vue';
import type { FluxApplicationLayout } from '../data';
import useApplicationInjection from './useApplicationInjection';

export default function (): {
    readonly isMenuCollapsed: Ref<boolean>;
    readonly layout: Ref<FluxApplicationLayout>;
    close(): void;
    open(): void;
    toggle(): void;
} {
    const {isMenuCollapsed, layout} = useApplicationInjection();

    return {
        isMenuCollapsed,
        layout,
        close: () => isMenuCollapsed.value = true,
        open: () => isMenuCollapsed.value = false,
        toggle: () => isMenuCollapsed.value = !isMenuCollapsed.value
    };
}
