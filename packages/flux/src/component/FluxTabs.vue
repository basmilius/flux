<template>
    <div :class="$style.tabs">
        <slot
            name="tabs"
            v-bind="{children, modelValue, tabs, activate}">
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
            name="content"
            v-bind="{children, modelValue, tabs, activate}">
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
    import { computed, ref, unref, useSlots, VNode, watch } from 'vue';
    import { FluxWindowTransition } from '@/transition';
    import type { IconName } from '@/types';
    import { flattenVNodeTree, getComponentProps } from '@/util';
    import { VNodeRenderer } from './primitive';
    import FluxTabBar from './FluxTabBar.vue';
    import FluxTabBarItem from './FluxTabBarItem.vue';
    import $style from '@/css/component/Tab.module.scss';

    const modelValue = defineModel<number>({
        default: 0
    });

    defineSlots<{
        default(): any;

        content(props: {
            activate(index: number): void;

            readonly children: VNode[];
            readonly modelValue: number;
            readonly tabs: {
                readonly icon?: IconName;
                readonly label?: string;
            }[];
        }): any;

        tabs(props: {
            activate(index: number): void;

            readonly children: VNode[];
            readonly modelValue: number;
            readonly tabs: {
                readonly icon?: IconName;
                readonly label?: string;
            }[];
        }): any;
    }>();

    const slots = useSlots();

    const isTransitioningBack = ref(false);

    const children = computed(() => flattenVNodeTree(slots.default?.() ?? []));
    const tabs = computed<{ icon?: IconName; label?: string; }[]>(() => unref(children)
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
