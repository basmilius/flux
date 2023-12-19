<template>
    <ButtonComponent
        :component-type="type"
        class="flux-button"
        :class="[`is-${size}`]"
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
                class="flux-button-icon"
                :variant="iconBefore"/>
        </slot>

        <slot name="label">
            <span
                v-if="label"
                class="flux-button-label">
                {{ label }}
            </span>
        </slot>

        <slot name="icon-after">
            <FluxSpinner
                v-if="isLoading && (!iconBefore && iconAfter)"
                :size="20"/>

            <FluxIcon
                v-else-if="iconAfter"
                class="flux-button-icon"
                :variant="iconAfter"/>
        </slot>

        <slot name="after"/>
    </ButtonComponent>
</template>

<script
    lang="ts"
    setup>
    import { toRefs, unref } from 'vue';
    import { FluxIcon, FluxSpinner } from '@/component';
    import type { FluxRoutingLocation, IconNames } from '@/data';
    import ButtonComponent from './ButtonComponent.vue';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;

        (e: 'mouseenter', evt: MouseEvent): void;

        (e: 'mouseleave', evt: MouseEvent): void;
    }

    export interface Props {
        readonly type?: 'button' | 'link' | 'route';
        readonly disabled?: boolean;
        readonly iconAfter?: IconNames | null;
        readonly iconBefore?: IconNames | null;
        readonly isLoading?: boolean;
        readonly isSubmit?: boolean;
        readonly label?: string;
        readonly size?: 'small' | 'medium' | 'large';
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
    }

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

<style lang="scss">
    @use '../../css/mixin' as flux;

    .flux-button {
        display: inline-flex;
        height: 42px;
        padding: 0 12px;
        align-items: center;
        flex-shrink: 0;
        gap: 12px;
        justify-content: center;
        background: var(--button-background);
        border: 1px solid var(--button-stroke);
        border-radius: var(--radius);
        box-shadow: var(--shadow-px);
        cursor: pointer;
        font: inherit;
        text-decoration: none;
        transition: 180ms var(--swift-out);
        transition-property: background, box-shadow, color, flux.focus-ring-transition-properties();
        user-select: none;

        @include flux.focus-ring(2px);

        > * {
            color: var(--button-foreground);
        }

        &.is-small {
            height: 36px;
            padding: 0 9px;
        }

        &.is-large {
            height: 48px;
            padding: 0 15px;
        }

        &:focus-visible {
            z-index: 1;
        }

        &-icon {
            flex-shrink: 0;
            color: var(--button-icon);

            &:only-child {
                margin-left: -1px;
                margin-right: -1px;
            }
        }

        &-label {
            display: inline-block;
            font-weight: 500;
            text-align: center;

            &:only-child {
                margin-left: 6px;
                margin-right: 6px;
            }
        }

        &:hover {
            background: var(--button-background-hover);
        }

        &:active {
            background: var(--button-background-active);
            box-shadow: none;
        }

        &:disabled,
        &[aria-disabled="true"] {
            box-shadow: none;
            opacity: .5;
            pointer-events: none;
        }
    }
</style>
