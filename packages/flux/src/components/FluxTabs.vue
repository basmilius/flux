<template>
    <div
        v-height-transition
        class="flux-tabs">
        <slot
            name="tabs"
            v-bind="{activeIndex, children, tabs, activate}">
            <flux-tab-bar class="flux-tabs-bar">
                <template
                    v-for="(tab, index) of tabs"
                    :key="index">
                    <flux-tab-bar-item
                        :icon="tab.icon"
                        :is-active="activeIndex === index"
                        :label="tab.label"
                        @click="activate(index)"/>
                </template>
            </flux-tab-bar>
        </slot>

        <slot
            name="content"
            v-bind="{activeIndex, children, tabs, activate}">
            <flux-window-transition :is-back="isTransitioningBack">
                <v-node-renderer
                    :key="activeIndex"
                    :vnode="children[activeIndex]"/>
            </flux-window-transition>
        </slot>
    </div>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'modelValue',
            event: 'update:modelValue'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import { computed, ref, unref, watch } from 'vue-demi';
    import { useSlotVNodes } from '../composables';
    import { heightTransition } from '../directives';
    import { VNodeRenderer } from './primitive';
    import { FluxWindowTransition } from '../transition';
    import { FluxTabBar, FluxTabBarItem } from '.';

    export interface Emits {
        (e: 'update:modelValue', index: number): void;
    }

    export interface Props {
        readonly modelValue?: number;
    }

    const vHeightTransition = heightTransition;

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    const children = useSlotVNodes('default');

    const activeIndex = ref(0);
    const isTransitioningBack = ref(false);

    const tabs = computed<{ icon?: IconNames; label?: string; }[]>(() => unref(children).map(child => ({
        icon: child.props?.icon,
        label: child.props?.label
    })));

    function activate(index: number): void {
        activeIndex.value = index;
    }

    watch(activeIndex, (newIndex, oldIndex) => {
        isTransitioningBack.value = newIndex < oldIndex;
        emit('update:modelValue', newIndex);
    });

    watch(() => props.modelValue, modelValue => activeIndex.value = modelValue ?? 0);
</script>

<style lang="scss">
    .flux-tabs {
        display: flex;
        flex-flow: column;
        overflow: visible !important;

        &-bar {
            margin-bottom: 18px;
        }
    }

    .flux-pane > .flux-tabs > .flux-tabs-bar {
        margin-bottom: 0;
    }
</style>
