<template>
    <div :class="styles.expandableGroup">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { ComponentInternalInstance, provide } from 'vue';
    import { FluxExpandableGroupInjectionKey } from '@/data';
    import { getExposedRef } from '@/util';
    import styles from '@/css/component/Expandable.module.scss';

    const {
        isControlled
    } = defineProps<{
        readonly isControlled?: boolean;
    }>();


    defineSlots<{
        default(): any;
    }>();

    const expandables: { [key: number]: ComponentInternalInstance; } = {};

    function closeAll(): void {
        Object.values(expandables).forEach(expandable => {
            const isOpenRef = getExposedRef<boolean>(expandable, 'isOpen');
            isOpenRef.value = false;
        });
    }

    function register(uid: number, expandable: ComponentInternalInstance): void {
        expandables[uid] = expandable;

        if (!isControlled && Object.values(expandables).length === 1) {
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
