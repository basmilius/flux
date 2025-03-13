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
    import { flattenVNodeTree, getComponentProps } from '@basmilius/flux-internals';
    import { computed, ref, unref, VNode, watch } from 'vue';
    import { FluxWindowTransition } from '$flux/transition';
    import type { FluxIconName } from '$flux/types';
    import { VNodeRenderer } from './primitive';
    import FluxTabBar from './FluxTabBar.vue';
    import FluxTabBarItem from './FluxTabBarItem.vue';
    import $style from '$flux/css/component/Tab.module.scss';

    const modelValue = defineModel<number>({
        default: 0
    });

    const slots = defineSlots<{
        default(): any;

        content(props: {
            activate(index: number): void;

            readonly children: VNode[];
            readonly modelValue: number;
            readonly tabs: {
                readonly icon?: FluxIconName;
                readonly label?: string;
            }[];
        }): any;

        tabs(props: {
            activate(index: number): void;

            readonly children: VNode[];
            readonly modelValue: number;
            readonly tabs: {
                readonly icon?: FluxIconName;
                readonly label?: string;
            }[];
        }): any;
    }>();

    const isTransitioningBack = ref(false);

    const children = computed(() => flattenVNodeTree(slots.default?.() ?? []));
    const tabs = computed<{ icon?: FluxIconName; label?: string; }[]>(() => unref(children)
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
