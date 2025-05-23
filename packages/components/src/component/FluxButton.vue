<template>
    <FluxPressable
        :component-type="type"
        :class="clsx(
            cssClass,
            isFilled && $style.isFilled,
            size === 'small' && $style.isSmall,
            size === 'medium' && $style.isMedium,
            size === 'large' && $style.isLarge,
            size === 'xl' && $style.isXl
        )"
        :type="isSubmit ? 'submit' : 'button'"
        :aria-disabled="disabled ? true : undefined"
        :disabled="disabled ? true : undefined"
        :tabindex="disabled ? -1 : tabindex"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <slot name="before"/>

        <slot name="iconLeading">
            <FluxSpinner
                v-if="isLoading && (iconLeading || !iconTrailing)"
                :size="20"/>

            <FluxIcon
                v-else-if="iconLeading"
                :class="cssClassIcon"
                :name="iconLeading"/>
        </slot>

        <slot name="label">
            <span
                v-if="label"
                :class="cssClassLabel">
                {{ label }}
            </span>
        </slot>

        <slot name="iconTrailing">
            <FluxSpinner
                v-if="isLoading && (!iconLeading && iconTrailing)"
                :size="20"/>

            <FluxIcon
                v-else-if="iconTrailing"
                :class="cssClassIcon"
                :name="iconTrailing"/>
        </slot>

        <slot name="after"/>
    </FluxPressable>
</template>

<script lang="ts">
    export const SLOTS = ['default', 'after', 'before', 'iconLeading', 'iconTrailing', 'label'] as const;
</script>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxButtonProps, FluxButtonSlots } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { toRef, unref } from 'vue';
    import { useDisabled } from '$flux/composable';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '$flux/css/component/base/Button.module.scss';

    const emit = defineEmits<FluxButtonEmits>();

    const {
        disabled: componentDisabled,
        isLoading,
        size = 'medium',
        tabindex = 0,
        type = 'button'
    } = defineProps<FluxButtonProps & {
        readonly cssClass: string;
        readonly cssClassIcon: string;
        readonly cssClassLabel: string;
    }>();

    defineSlots<FluxButtonSlots>();

    const disabled = useDisabled(toRef(() => componentDisabled));

    function onClick(evt: MouseEvent): void {
        if (unref(disabled) || isLoading) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }

        emit('click', evt);
    }

    function onMouseEnter(evt: MouseEvent): void {
        emit('mouseenter', evt);
    }

    function onMouseLeave(evt: MouseEvent): void {
        emit('mouseleave', evt);
    }
</script>
