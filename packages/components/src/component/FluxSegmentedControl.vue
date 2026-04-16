<template>
    <div
        ref="control"
        :class="isFill ? $style.segmentedControlFill : $style.segmentedControlInline"
        role="radiogroup"
        :aria-label="ariaLabel"
        @keydown="onKeyDown">
        <div
            v-if="activeItemWidth > 0"
            :class="$style.segmentedControlHighlight"
            :style="{
                left: `${activeItemX}px`,
                width: `${activeItemWidth}px`
            }"/>

        <template v-for="(item, index) of items">
            <div
                v-if="index > 0"
                :class="clsx(
                    $style.segmentedControlSeparator,
                    (index === modelValue || index === modelValue + 1) && $style.isActive
                )"
                role="separator"/>

            <button
                ref="items"
                :class="clsx(
                    $style.segmentedControlItem,
                    index === modelValue && $style.isActive
                )"
                role="radio"
                :aria-checked="index === modelValue"
                :aria-label="item.label"
                :tabindex="index === modelValue ? 0 : -1"
                type="button"
                @click="activate(index)">
                <FluxIcon
                    v-if="item.icon"
                    :name="item.icon"
                    :size="15"/>

                <span v-if="item.label">{{ item.label }}</span>
            </button>
        </template>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useResizeObserver } from '@basmilius/common';
    import type { FluxSegmentedControlItemObject } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { onBeforeUnmount, ref, unref, useTemplateRef, watchEffect } from 'vue';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/SegmentedControl.module.scss';

    const modelValue = defineModel<number>({
        default: 0
    });

    defineProps<{
        readonly ariaLabel?: string;
        readonly isFill?: boolean;
        readonly items: FluxSegmentedControlItemObject[];
    }>();

    const controlRef = useTemplateRef<HTMLElement>('control');
    const itemRefs = useTemplateRef<HTMLButtonElement[]>('items');

    const activeItemX = ref(0);
    const activeItemWidth = ref(0);
    const isAlive = ref(true);

    onBeforeUnmount(() => {
        isAlive.value = false;
    });

    watchEffect(() => updateHighlight(unref(modelValue)), {flush: 'post'});

    useResizeObserver(controlRef as any, () => updateHighlight(unref(modelValue)));

    function activate(index: number): void {
        modelValue.value = index;

        const itemRef = itemRefs.value?.[index];
        itemRef?.focus();
    }

    function onKeyDown(evt: KeyboardEvent): void {
        const items = itemRefs.value;

        if (!items) {
            return;
        }

        let newIndex: number | null = null;

        switch (evt.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                newIndex = Math.max(0, unref(modelValue) - 1);
                break;

            case 'ArrowRight':
            case 'ArrowDown':
                newIndex = Math.min(items.length - 1, unref(modelValue) + 1);
                break;

            case 'Home':
                newIndex = 0;
                break;

            case 'End':
                newIndex = items.length - 1;
                break;

            default:
                return;
        }

        activate(newIndex);
        evt.preventDefault();
    }

    function updateHighlight(index: number): void {
        if (!isAlive.value) {
            return;
        }

        const itemRef = itemRefs.value?.[index];
        const control = controlRef.value;

        if (!itemRef || !control) {
            return;
        }

        const width = itemRef.offsetWidth;

        if (width === 0) {
            return;
        }

        const controlRect = control.getBoundingClientRect();
        const itemRect = itemRef.getBoundingClientRect();
        const scaleX = control.offsetWidth > 0 ? controlRect.width / control.offsetWidth : 1;

        activeItemX.value = (itemRect.left - controlRect.left) / scaleX;
        activeItemWidth.value = width;
    }
</script>
