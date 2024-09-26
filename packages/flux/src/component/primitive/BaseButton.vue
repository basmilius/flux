<template>
    <ButtonComponent
        :component-type="type"
        :class="clsx(
            cssClass,
            size === 'small' && styles.isSmall,
            size === 'medium' && styles.isMedium,
            size === 'large' && styles.isLarge,
            size === 'xl' && styles.isXl
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
    </ButtonComponent>
</template>

<script lang="ts">
    export const SLOTS = ['default', 'after', 'before', 'iconAfter', 'iconBefore', 'label'] as const;
</script>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { FluxIcon, FluxSpinner } from '@/component';
    import type { ButtonEmits, ButtonProps, ButtonSlots } from '@/types';
    import ButtonComponent from './ButtonComponent.vue';
    import styles from '@/css/component/base/Button.module.scss';

    const emit = defineEmits<ButtonEmits>();

    const {
        disabled,
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

    function onClick(evt: MouseEvent): void {
        if (disabled || isLoading) {
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
