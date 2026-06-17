<template>
    <FluxMenuGroup :is-horizontal="isHorizontal">
        <template v-for="item in items">
            <component :is="item"/>
        </template>
    </FluxMenuGroup>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree } from '@flux-ui/internals';
    import { cloneVNode, computed, unref, type VNode } from 'vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';

    const modelValue = defineModel<number>({
        required: true
    });

    const {
        isPersistent = true,
        mode = 'highlight'
    } = defineProps<{
        readonly isHorizontal?: boolean;
        readonly isPersistent?: boolean;
        readonly mode?: 'highlight' | 'select';
    }>();

    const slots = defineSlots<{
        default(): VNode[];
    }>();

    // Options menus stay open while selecting by default (isPersistent defaults to true). The behaviour
    // is injected directly as a prop on each item rather than via the FluxMenuPersistentInjectionKey
    // provider, because the cloned option vnodes do not resolve a provide from this component.
    const items = computed(() => flattenVNodeTree(slots.default())
        .map((item: VNode, index: number) => cloneVNode(item, {
            isHighlighted: mode === 'highlight' && unref(modelValue) === index,
            isPersistent,
            isSelectable: mode === 'select',
            isSelected: mode === 'select' && unref(modelValue) === index,
            onClick: () => modelValue.value = index
        })));
</script>
