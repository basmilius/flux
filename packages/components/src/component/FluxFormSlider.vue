<template>
    <SliderBase
        :direction="direction"
        :disabled="disabled"
        :is-ticks-visible="isTicksVisible"
        :max="max"
        :min="min"
        :step="step"
        @dragging="onDragging"
        @update="onUpdate">
        <SliderTrack
            :direction="direction"
            :percentage-lower="0"
            :percentage-upper="percentage">
            <SliderThumb
                ref="thumb"
                :aria-label="ariaLabel"
                :aria-valuemax="max"
                :aria-valuemin="min"
                :aria-valuenow="modelValue"
                :direction="direction"
                :disabled="disabled"
                :is-dragging="isDragging"
                :position="percentage"
                @decrement="onDecrement"
                @increment="onIncrement"/>
        </SliderTrack>
    </SliderBase>
</template>

<script
    lang="ts"
    setup>
    import { countDecimals, formatNumber, roundStep } from '@basmilius/utils';
    import type { FluxDirection, FluxFormInputBaseProps } from '@flux-ui/types';
    import { computed, onUnmounted, ref, toRef, unref, useTemplateRef } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { addTooltip, removeTooltip, updateTooltip } from '~flux/components/data';
    import { SliderBase, SliderThumb, SliderTrack } from './primitive';

    const modelValue = defineModel<number>({
        required: true
    });

    const {
        ariaLabel,
        direction = 'horizontal',
        formatter = formatNumber,
        disabled: componentDisabled = false,
        isReadonly,
        isTooltipDisabled,
        max = 100,
        min = 0,
        step = 1
    } = defineProps<Pick<FluxFormInputBaseProps, 'disabled' | 'error' | 'isLoading' | 'isReadonly' | 'name'> & {
        formatter?(value: number, decimals?: number): string;

        readonly ariaLabel?: string;
        readonly direction?: FluxDirection;
        readonly isTicksVisible?: boolean;
        readonly isTooltipDisabled?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const thumbRef = useTemplateRef('thumb');

    const isDragging = ref(false);
    const tooltipId = ref<number | null>(null);

    const span = computed(() => max - min);
    const isRangeValid = computed(() => unref(span) > 0);
    const decimals = computed(() => countDecimals(step));

    const percentage = computed(() => unref(isRangeValid) ? (unref(modelValue) - min) / unref(span) : 0);

    const tooltipContent = computed(() => formatter(modelValue.value, unref(decimals)));

    function snap(value: number): number {
        const stepped = step > 0 ? roundStep(value, step) : value;

        return +Math.max(min, Math.min(max, stepped)).toFixed(unref(decimals));
    }

    function onDragging(is: boolean): void {
        isDragging.value = is;

        if (is && !tooltipId.value && !isTooltipDisabled) {
            tooltipId.value = addTooltip({
                content: unref(tooltipContent),
                direction: direction === 'vertical' ? 'horizontal' : 'vertical',
                origin: unref(thumbRef)?.$el
            });
        } else if (!is && tooltipId.value) {
            removeTooltip(tooltipId.value);
            tooltipId.value = null;
        }
    }

    function onUpdate(value: number): void {
        if (unref(disabled) || isReadonly || !unref(isRangeValid)) {
            return;
        }

        modelValue.value = snap(value * unref(span) + min);

        if (tooltipId.value) {
            updateTooltip(tooltipId.value, {
                content: unref(tooltipContent),
                origin: unref(thumbRef)?.$el
            });
        }
    }

    function onDecrement(): void {
        if (unref(disabled) || isReadonly) {
            return;
        }

        modelValue.value = snap(unref(modelValue) - step);
    }

    function onIncrement(): void {
        if (unref(disabled) || isReadonly) {
            return;
        }

        modelValue.value = snap(unref(modelValue) + step);
    }

    onUnmounted(() => {
        if (tooltipId.value) {
            removeTooltip(tooltipId.value);
            tooltipId.value = null;
        }
    });
</script>
