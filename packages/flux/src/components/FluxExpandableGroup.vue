<template>
    <div class="flux-expandable-group">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { ComponentInternalInstance, onMounted, provide } from 'vue-demi';
    import { setInstanceProperty } from '../utils';

    const expandables: { [key: number]: ComponentInternalInstance; } = {};

    onMounted(() => {
        const all = Object.values(expandables);

        if (all.length === 0) {
            return;
        }

        setInstanceProperty(all[0], 'isOpen', true);
    });

    function closeAll(): void {
        Object.values(expandables).forEach(e => setInstanceProperty(e, 'isOpen', false));
    }

    function register(uid: number, expandable: ComponentInternalInstance): void {
        expandables[uid] = expandable;
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
            border-top: 1px solid var(--surface-stroke);
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
