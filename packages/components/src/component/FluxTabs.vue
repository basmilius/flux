<template>
    <div :class="$style.tabs">
        <slot
            v-bind="{children, modelValue, tabs, activate}"
            name="tabs">
            <FluxTabBar :class="$style.tabsBar">
                <template
                    v-for="(tab, index) of tabs"
                    :key="index">
                    <FluxTabBarItem
                        :id="`${baseId}-tab-${index}`"
                        :aria-controls="`${baseId}-panel-${index}`"
                        :icon="tab.icon"
                        :is-active="modelValue === index"
                        :label="tab.label"
                        @click="activate(index)"/>
                </template>
            </FluxTabBar>
        </slot>

        <slot
            v-bind="{children, modelValue, tabs, activate}"
            name="content">
            <FluxWindowTransition :is-back="isTransitioningBack">
                <VNodeRenderer
                    :key="modelValue"
                    :vnode="children[modelValue]"/>
            </FluxWindowTransition>
        </slot>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree, getComponentProps } from '@flux-ui/internals';
    import type { FluxIconName } from '@flux-ui/types';
    import { cloneVNode, computed, ref, unref, useId, type VNode, watch } from 'vue';
    import { FluxWindowTransition } from '$flux/transition';
    import { VNodeRenderer } from './primitive';
    import FluxTabBar from './FluxTabBar.vue';
    import FluxTabBarItem from './FluxTabBarItem.vue';
    import $style from '$flux/css/component/Tab.module.scss';

    const modelValue = defineModel<number>({
        default: 0
    });

    const slots = defineSlots<{
        default(): VNode[];

        content(props: {
            activate(index: number): void;

            readonly children: VNode[];
            readonly modelValue: number;
            readonly tabs: {
                readonly icon?: FluxIconName;
                readonly label?: string;
            }[];
        }): VNode[];

        tabs(props: {
            activate(index: number): void;

            readonly children: VNode[];
            readonly modelValue: number;
            readonly tabs: {
                readonly icon?: FluxIconName;
                readonly label?: string;
            }[];
        }): VNode[];
    }>();

    const baseId = useId();
    const isTransitioningBack = ref(false);

    const rawChildren = computed(() => flattenVNodeTree(slots.default?.() ?? []));

    const children = computed(() => unref(rawChildren).map((child, index) => cloneVNode(child, {
        id: `${baseId}-panel-${index}`,
        'aria-labelledby': `${baseId}-tab-${index}`
    })));

    const tabs = computed<{ icon?: FluxIconName; label?: string; }[]>(() => unref(rawChildren)
        .filter((child: VNode) => getComponentProps<any>(child).icon || getComponentProps<any>(child).label)
        .map((child: VNode) => ({
            icon: getComponentProps<any>(child).icon,
            label: getComponentProps<any>(child).label
        }))
    );

    function activate(index: number): void {
        modelValue.value = index;
    }

    watch(modelValue, (newIndex, oldIndex) => {
        isTransitioningBack.value = newIndex < oldIndex;
    });
</script>
