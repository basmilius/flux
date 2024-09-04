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

        <slot name="icon-before">
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

        <slot name="icon-after">
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

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { toRefs, unref } from 'vue';
    import { FluxIcon, FluxSpinner } from '@/component';
    import type { FluxRoutingLocation, IconNames } from '@/data';
    import styles from '@/css/component/base/Button.module.scss';
    import ButtonComponent from './ButtonComponent.vue';

    export type Emits = {
        click: [MouseEvent];
        mouseenter: [MouseEvent];
        mouseleave: [MouseEvent];
    };

    export type Props = {
        readonly type?: 'button' | 'link' | 'route';
        readonly cssClass: string;
        readonly cssClassIcon: string;
        readonly cssClassLabel: string;
        readonly disabled?: boolean;
        readonly iconAfter?: IconNames | null;
        readonly iconBefore?: IconNames | null;
        readonly isLoading?: boolean;
        readonly isSubmit?: boolean;
        readonly label?: string;
        readonly size?: 'small' | 'medium' | 'large' | 'xl';
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
    };

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        size: 'medium',
        type: 'button'
    });

    const {disabled, isLoading} = toRefs(props);

    function onClick(evt: MouseEvent): void {
        if (unref(disabled) || unref(isLoading)) {
            evt.preventDefault();
            evt.stopPropagation();
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
