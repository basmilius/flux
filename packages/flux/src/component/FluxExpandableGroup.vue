<template>
    <div class="flux-expandable-group">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { ComponentInternalInstance } from 'vue';
    import { provide } from 'vue';
    import { FluxExpandableGroupInjectionKey } from '@/data';
    import { getExposedRef } from '@/util';

    export interface Props {
        readonly isControlled?: boolean;
    }

    const props = defineProps<Props>();

    const expandables: { [key: number]: ComponentInternalInstance; } = {};

    function closeAll(): void {
        Object.values(expandables).forEach(expandable => {
            const isOpenRef = getExposedRef<boolean>(expandable, 'isOpen');
            isOpenRef.value = false;
        });
    }

    function register(uid: number, expandable: ComponentInternalInstance): void {
        expandables[uid] = expandable;

        if (!props.isControlled && Object.values(expandables).length === 1) {
            const isOpenRef = getExposedRef<boolean>(expandable, 'isOpen');
            isOpenRef.value = true;
        }
    }

    function unregister(uid: number): void {
        delete expandables[uid];
    }

    provide(FluxExpandableGroupInjectionKey, {
        closeAll,
        register,
        unregister
    });
</script>

<style lang="scss">
    .flux-expandable-group {
        display: flex;
        flex-flow: column;

        .flux-expandable + .flux-expandable {
            border-top: 1px solid rgb(var(--gray-3));
        }

        &:not(:first-child) {
            border-top: 1px solid rgb(var(--gray-3));
        }

        &:not(:last-child) {
            border-bottom: 1px solid rgb(var(--gray-3));
        }
    }

    .flux-pane > .flux-expandable-group:first-child .flux-expandable:first-child .flux-expandable-header {
        border-top-left-radius: var(--radius);
        border-top-right-radius: var(--radius);
    }

    .flux-pane > .flux-expandable-group:last-child .flux-expandable:not(.is-open):last-child .flux-expandable-header {
        border-bottom-left-radius: var(--radius);
        border-bottom-right-radius: var(--radius);
    }
</style>
