<template>
    <div
        :class="clsx(
            $style.formRating,
            disabled && $style.isDisabled,
            error && $style.isInvalid
        )"
        :id="id"
        ref="root"
        :style="{
            fontSize: size && `${size}px`
        }"
        role="slider"
        :aria-describedby="describedBy"
        :aria-disabled="disabled ? true : undefined"
        :aria-invalid="error ? true : undefined"
        :aria-readonly="isReadonly ? true : undefined"
        :aria-valuemin="0"
        :aria-valuemax="count"
        :aria-valuenow="modelValue ?? 0"
        :aria-valuetext="`${modelValue ?? 0} / ${count}`"
        :tabindex="isInteractive ? 0 : undefined"
        @keydown="onKeyDown"
        @pointerleave="hoverValue = null"
        @pointercancel="hoverValue = null">
        <input
            v-if="name"
            type="hidden"
            :name="name"
            :value="modelValue ?? ''">

        <button
            v-for="star of count"
            :key="star"
            :class="$style.formRatingStar"
            type="button"
            tabindex="-1"
            aria-hidden="true"
            :disabled="!isInteractive"
            :style="{
                '--fill': fillFor(star)
            }"
            @click="onClick(star, $event)"
            @mousedown="onStarMouseDown"
            @pointermove="onMouseMove(star, $event)">
            <FluxIcon
                :class="$style.formRatingStarEmpty"
                :name="icon"
                :size="size"/>

            <FluxIcon
                :class="$style.formRatingStarFull"
                :name="icon"
                :size="size"/>
        </button>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormInputBaseProps, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, ref, toRef, useTemplateRef } from 'vue';
    import { useDisabled, useFormFieldInjection } from '~flux/components/composable';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/FormRating.module.scss';

    const emit = defineEmits<{
        change: [number | null];
    }>();

    const modelValue = defineModel<number | null>({
        default: null
    });

    const {
        allowHalf = false,
        clearable = false,
        count = 5,
        disabled: componentDisabled,
        icon = 'star',
        isReadonly
    } = defineProps<Pick<FluxFormInputBaseProps, 'disabled' | 'error' | 'isReadonly' | 'name'> & {
        readonly allowHalf?: boolean;
        readonly clearable?: boolean;
        readonly count?: number;
        readonly icon?: FluxIconName;
        readonly size?: number;
    }>();

    const rootRef = useTemplateRef('root');
    const hoverValue = ref<number | null>(null);

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id, describedBy} = useFormFieldInjection();

    const isInteractive = computed(() => !disabled.value && !isReadonly);
    const displayValue = computed(() => hoverValue.value ?? modelValue.value ?? 0);

    function fillFor(star: number): number {
        return Math.min(1, Math.max(0, displayValue.value - (star - 1)));
    }

    function resolveStarValue(star: number, evt: MouseEvent): number {
        if (!allowHalf) {
            return star;
        }

        const {left, width} = (evt.currentTarget as HTMLElement).getBoundingClientRect();
        return evt.clientX - left < width / 2 ? star - 0.5 : star;
    }

    function commit(value: number | null): void {
        modelValue.value = value;
        emit('change', value);
    }

    // The stars are aria-hidden mouse targets; keep focus on the role="slider" root so
    // assistive technology and the focus ring stay on the slider after a click.
    function onStarMouseDown(evt: MouseEvent): void {
        evt.preventDefault();
        rootRef.value?.focus();
    }

    function onMouseMove(star: number, evt: MouseEvent): void {
        if (!isInteractive.value) {
            return;
        }

        hoverValue.value = resolveStarValue(star, evt);
    }

    function onClick(star: number, evt: MouseEvent): void {
        if (!isInteractive.value) {
            return;
        }

        const value = resolveStarValue(star, evt);
        commit(clearable && modelValue.value === value ? null : value);
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (!isInteractive.value) {
            return;
        }

        const step = allowHalf ? 0.5 : 1;
        const current = modelValue.value ?? 0;

        switch (evt.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                evt.preventDefault();
                commit(Math.min(count, current + step));
                break;

            case 'ArrowLeft':
            case 'ArrowDown':
                evt.preventDefault();
                commit(Math.max(0, current - step));
                break;

            case 'Home':
                evt.preventDefault();
                commit(0);
                break;

            case 'End':
                evt.preventDefault();
                commit(count);
                break;

            case 'Delete':
            case 'Backspace':
                if (clearable) {
                    evt.preventDefault();
                    commit(null);
                }
                break;

            default:
                if (/^[0-9]$/.test(evt.key)) {
                    const digit = Number(evt.key);

                    if (digit <= count) {
                        evt.preventDefault();
                        commit(digit);
                    }
                }
                break;
        }
    }
</script>
