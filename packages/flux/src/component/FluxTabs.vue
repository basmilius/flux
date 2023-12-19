<template>
    <div class="flux-tabs">
        <slot
            name="tabs"
            v-bind="{activeIndex, children, tabs, activate}">
            <FluxTabBar class="flux-tabs-bar">
                <template
                    v-for="(tab, index) of tabs"
                    :key="index">
                    <FluxTabBarItem
                        :icon="tab.icon"
                        :is-active="activeIndex === index"
                        :label="tab.label"
                        @click="activate(index)"/>
                </template>
            </FluxTabBar>
        </slot>

        <slot
            name="content"
            v-bind="{activeIndex, children, tabs, activate}">
            <FluxWindowTransition :is-back="isTransitioningBack">
                <VNodeRenderer
                    :key="activeIndex"
                    :vnode="children[activeIndex]"/>
            </FluxWindowTransition>
        </slot>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import { computed, ref, unref, watch } from 'vue';
    import { useSlotVNodes } from '@/composable';
    import type { IconNames } from '@/data';
    import { FluxWindowTransition } from '@/transition';
    import { getComponentProps } from '@/util';
    import { VNodeRenderer } from './primitive';
    import FluxTabBar from './FluxTabBar.vue';
    import FluxTabBarItem from './FluxTabBarItem.vue';

    export interface Emits {
        (e: 'update:model-value', index: number): void;
    }

    export interface Props {
        readonly modelValue?: number;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    const children = useSlotVNodes('default');

    const activeIndex = ref(0);
    const isTransitioningBack = ref(false);

    const tabs = computed<{ icon?: IconNames; label?: string; }[]>(() => unref(children).map((child: VNode) => ({
        icon: getComponentProps<any>(child).icon,
        label: getComponentProps<any>(child).label
    })));

    function activate(index: number): void {
        activeIndex.value = index;
    }

    watch(activeIndex, (newIndex, oldIndex) => {
        isTransitioningBack.value = newIndex < oldIndex;
        emit('update:model-value', newIndex);
    });

    watch(() => props.modelValue, modelValue => activeIndex.value = modelValue ?? 0, {immediate: true});
</script>

<style lang="scss">
    .flux-tabs {
        display: flex;
        flex-flow: column;
        overflow: visible;

        &-bar {
            margin-bottom: 18px;
        }
    }

    .flux-pane > .flux-tabs > .flux-tabs-bar {
        margin-bottom: 0;
    }
</style>
