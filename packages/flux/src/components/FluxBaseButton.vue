<template>
    <component
        :is="component"
        class="flux-button"
        type="button"
        :aria-disabled="disabled"
        :disabled="disabled"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <slot name="before"/>

        <slot name="icon-before">
            <flux-icon
                v-if="iconBefore && !isLoading"
                class="flux-button-icon"
                :variant="iconBefore"/>

            <flux-spinner
                v-if="isLoading && (iconBefore || !iconAfter)"
                :size="20"/>
        </slot>

        <span
            v-if="label"
            class="flux-button-label">
            {{ label }}
        </span>

        <slot name="icon-after">
            <flux-spinner
                v-if="isLoading && (!iconBefore && iconAfter)"
                :size="20"/>

            <flux-icon
                v-else-if="iconAfter"
                class="flux-button-icon"
                :variant="iconAfter"/>
        </slot>

        <slot name="after"/>
    </component>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs, unref } from 'vue-demi';
    import { FluxRoutingLocation, IconNames } from '../data';
    import { FluxIcon, FluxSpinner } from '.';

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
        readonly label?: string;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        type: 'button'
    });

    const {disabled, isLoading, type} = toRefs(props);

    const component = computed(() => {
        if (type.value === 'link') {
            return 'a';
        }

        if (type.value === 'route') {
            return 'router-link';
        }

        return 'button';
    });

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
    .flux-button {
        display: inline-flex;
        height: 42px;
        padding: 0 12px;
        align-items: center;
        gap: 12px;
        justify-content: center;
        background: var(--background);
        background-clip: padding-box;
        border: 1px solid var(--stroke);
        border-radius: var(--radius);
        box-shadow: 0 1px 1px rgb(0 0 0 / .03);
        cursor: pointer;
        font: inherit;
        outline: 0;
        text-decoration: none;
        transition: 180ms var(--swift-out);
        transition-property: background, box-shadow, color;
        user-select: none;

        > * {
            color: var(--foreground);
        }

        &:focus-visible {
            box-shadow: 0 0 0 2px rgb(var(--gray-0)), 0 0 0 4px rgb(var(--primary-7));
            z-index: 1;
        }

        &-icon {
            color: var(--icon);

            &:only-child {
                margin-left: -2px;
                margin-right: -2px;
            }
        }

        &-label {
            display: inline-block;
            font-weight: 500;
            text-align: center;

            &:only-child {
                min-width: 42px;
            }
        }

        &:hover {
            background: var(--background-hover);
            background-clip: padding-box;
        }

        &:active {
            background: var(--background-active);
            background-clip: padding-box;
            box-shadow: none;
        }

        &:disabled,
        &[aria-disabled="true"] {
            opacity: .5;
            pointer-events: none;
        }
    }
</style>
