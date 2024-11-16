<template>
    <FluxPressable
        :component-type="type"
        :class="clsx(
            cssClass,
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

        <slot name="iconBefore">
            <FluxSpinner
                v-if="isLoading && (iconBefore || !iconAfter)"
                :size="20"/>

            <FluxIcon
                v-else-if="iconBefore"
                :class="cssClassIcon"
                :variant="iconBefore"/>
        </slot>

        <slot name="label">
            <span
                v-if="label"
                :class="cssClassLabel">
                {{ label }}
            </span>
        </slot>

        <slot name="iconAfter">
            <FluxSpinner
                v-if="isLoading && (!iconBefore && iconAfter)"
                :size="20"/>

            <FluxIcon
                v-else-if="iconAfter"
                :class="cssClassIcon"
                :variant="iconAfter"/>
        </slot>

        <slot name="after"/>
    </FluxPressable>
</template>

<script lang="ts">
    export const SLOTS = ['default', 'after', 'before', 'iconAfter', 'iconBefore', 'label'] as const;
</script>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { toRef, unref } from 'vue';
    import { useDisabled } from '@/composable';
    import type { ButtonEmits, ButtonProps, ButtonSlots } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '@/css/component/base/Button.module.scss';

    const emit = defineEmits<ButtonEmits>();

    const {
        disabled: componentDisabled,
        isLoading,
        size = 'medium',
        tabindex = 0,
        type = 'button'
    } = defineProps<ButtonProps & {
        readonly cssClass: string;
        readonly cssClassIcon: string;
        readonly cssClassLabel: string;
    }>();

    defineSlots<ButtonSlots>();

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
