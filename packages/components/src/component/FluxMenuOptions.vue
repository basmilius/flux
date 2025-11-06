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
        mode = 'highlight'
    } = defineProps<{
        readonly isHorizontal?: boolean;
        readonly mode?: 'highlight' | 'select';
    }>();

    const slots = defineSlots<{
        default(): any;
    }>();

    const items = computed(() => flattenVNodeTree(slots.default())
        .map((item: VNode, index: number) => cloneVNode(item, {
            isHighlighted: mode === 'highlight' && unref(modelValue) === index,
            isSelectable: mode === 'select',
            isSelected: mode === 'select' && unref(modelValue) === index,
            onClick: () => modelValue.value = index
        })));
</script>
