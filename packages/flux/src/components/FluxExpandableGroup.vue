<template>
    <div class="flux-expandable-group">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { ComponentInternalInstance } from 'vue-demi';
    import { provide } from 'vue-demi';
    import { setInstanceProperty } from '../utils';

    export interface Props {
        readonly isControlled?: boolean;
    }

    const props = defineProps<Props>();

    const expandables: { [key: number]: ComponentInternalInstance; } = {};

    function closeAll(): void {
        Object.values(expandables).forEach(e => setInstanceProperty(e, 'isOpen', false));
    }

    function register(uid: number, expandable: ComponentInternalInstance): void {
        expandables[uid] = expandable;

        if (!props.isControlled && Object.values(expandables).length === 1) {
            setInstanceProperty(expandable, 'isOpen', true);
        }
    }

    function unregister(uid: number): void {
        delete expandables[uid];
    }

    provide('flux-expandable-group', {
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
    }

    .flux-surface > .flux-expandable-group:first-child .flux-expandable:first-child .flux-expandable-header {
        border-top-left-radius: var(--radius);
        border-top-right-radius: var(--radius);
    }

    .flux-surface > .flux-expandable-group:last-child .flux-expandable:not(.is-open):last-child .flux-expandable-header {
        border-bottom-left-radius: var(--radius);
        border-bottom-right-radius: var(--radius);
    }
</style>
