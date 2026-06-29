<template>
    <div
        ref="control"
        :class="isFill ? $style.segmentedControlFill : $style.segmentedControlInline"
        role="radiogroup"
        @keydown="onKeyDown">
        <div
            v-if="activeItemWidth > 0"
            :class="$style.segmentedControlHighlight"
            :style="{
                left: `${activeItemX}px`,
                width: `${activeItemWidth}px`
            }"/>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useMutationObserver, useResizeObserver } from '@basmilius/common';
    import type { FluxSize } from '@flux-ui/types';
    import { onMounted, provide, ref, toRef, useTemplateRef, watch, type VNode } from 'vue';
    import { FluxSegmentedControlInjectionKey, type FluxSegmentedControlValue } from '~flux/components/data';
    import $style from '~flux/components/css/component/SegmentedControl.module.scss';

    const modelValue = defineModel<FluxSegmentedControlValue>();

    const { size = 'medium' } = defineProps<{
        readonly isFill?: boolean;
        readonly size?: FluxSize;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const controlRef = useTemplateRef<HTMLElement>('control');

    const activeItemX = ref(0);
    const activeItemWidth = ref(0);

    const items = new Map<HTMLElement, FluxSegmentedControlValue>();

    provide(FluxSegmentedControlInjectionKey, {
        modelValue,
        size: toRef(() => size),
        select,
        registerItem(element, value) {
            items.set(element, value);
            updateHighlight();
        },
        unregisterItem(element) {
            items.delete(element);
            updateHighlight();
        }
    });

    onMounted(() => updateHighlight());

    watch(modelValue, () => updateHighlight(), {flush: 'post'});

    useMutationObserver(controlRef, () => updateHighlight(), {childList: true, subtree: true});
    useResizeObserver(controlRef, () => updateHighlight());

    function select(value: FluxSegmentedControlValue): void {
        modelValue.value = value;
    }

    function onKeyDown(evt: KeyboardEvent): void {
        const control = controlRef.value;

        if (!control) {
            return;
        }

        const radios = Array.from(control.querySelectorAll<HTMLButtonElement>('[role=radio]:not([disabled])'));

        if (radios.length === 0) {
            return;
        }

        const activeElement = control.querySelector<HTMLButtonElement>('[role=radio][aria-checked=true]');
        const currentIndex = activeElement ? radios.indexOf(activeElement) : -1;

        let newIndex: number;

        switch (evt.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                newIndex = Math.max(0, currentIndex - 1);
                break;

            case 'ArrowRight':
            case 'ArrowDown':
                newIndex = Math.min(radios.length - 1, currentIndex + 1);
                break;

            case 'Home':
                newIndex = 0;
                break;

            case 'End':
                newIndex = radios.length - 1;
                break;

            default:
                return;
        }

        const target = radios[newIndex];
        const value = items.get(target);

        if (value !== undefined) {
            select(value);
        }

        target.focus();
        evt.preventDefault();
    }

    function updateHighlight(): void {
        const control = controlRef.value;

        if (!control) {
            return;
        }

        const activeElement = control.querySelector<HTMLElement>('[role=radio][aria-checked=true]');

        if (!activeElement) {
            activeItemWidth.value = 0;
            return;
        }

        const width = activeElement.offsetWidth;

        if (width === 0) {
            return;
        }

        activeItemX.value = activeElement.offsetLeft;
        activeItemWidth.value = width;
    }
</script>
