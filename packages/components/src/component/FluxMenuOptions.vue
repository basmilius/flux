<template>
    <FluxMenuGroup :is-horizontal="isHorizontal">
        <template
            v-for="(item, index) in items"
            :key="identityOf(item, index)">
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

    const modelValue = defineModel<string | number>({
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
        .map((item: VNode, index: number) => {
            const identity = identityOf(item, index);

            return cloneVNode(item, {
                isHighlighted: mode === 'highlight' && unref(modelValue) === identity,
                isPersistent,
                isSelectable: mode === 'select',
                isSelected: mode === 'select' && unref(modelValue) === identity,
                onClick: () => modelValue.value = identity
            });
        }));

    // Each item is identified by its vnode key when it is a string or number, falling back to its
    // position. Keying the items makes the selection survive conditional or reordered items — without a
    // usable key the index is the only stable handle, so it keeps working for simple static lists.
    function identityOf(item: VNode, index: number): string | number {
        const key = item.key;

        return typeof key === 'string' || typeof key === 'number' ? key : index;
    }
</script>
