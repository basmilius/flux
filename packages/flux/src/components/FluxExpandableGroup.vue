<template>
    <div :class="styles.expandableGroup">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { ComponentInternalInstance } from 'vue';
    import { provide } from 'vue';
    import { FluxExpandableGroupInjectionKey } from '@/data';
    import { setInstanceProperty } from '@/utils';
    import styles from '@/css/components/Expandable.module.scss';

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

    provide(FluxExpandableGroupInjectionKey, {
        closeAll,
        register,
        unregister
    });
</script>
