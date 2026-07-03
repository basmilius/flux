<template>
    <div :class="$style.expandableGroup">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { type ComponentInternalInstance, provide, type VNode } from 'vue';
    import { FluxExpandableGroupInjectionKey } from '~flux/components/data';
    import $style from '~flux/components/css/component/Expandable.module.scss';

    const {
        isControlled
    } = defineProps<{
        readonly isControlled?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const expandables: { [key: number]: ComponentInternalInstance; } = {};

    // Go through the exposed close()/open() functions instead of writing to the exposed
    // isOpen ref, so the expandable's own toggle emit fires when the group changes it.
    function closeAll(): void {
        Object.values(expandables).forEach(expandable => {
            (expandable.exposed?.close as (() => void) | undefined)?.();
        });
    }

    function register(uid: number, expandable: ComponentInternalInstance): void {
        expandables[uid] = expandable;

        if (!isControlled && Object.values(expandables).length === 1) {
            (expandable.exposed?.open as (() => void) | undefined)?.();
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
