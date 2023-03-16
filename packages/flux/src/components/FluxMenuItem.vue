<template>
    <flux-base-button
        class="flux-menu-item"
        :class="{
            'is-active': isActive,
            'is-highlighted': isHighlighted,
            'is-indented': isIndented
        }"
        tabindex="0"
        v-bind="{type, disabled, iconAfter, iconBefore, isLoading, label, href, rel, target, to}"
        @click="$emit('click', $event)">
        <template
            v-if="command || commandIcon"
            #after>
            <kbd
                v-if="command"
                class="flux-menu-item-command">
                {{ command }}
            </kbd>

            <flux-icon
                v-if="commandIcon"
                class="flux-button-icon flux-menu-item-command-icon"
                :variant="commandIcon"/>
        </template>
    </flux-base-button>
</template>

<script
    lang="ts"
    setup>
    import { FluxRoutingLocation, IconNames } from '../data';
    import { FluxBaseButton, FluxIcon } from '.';

    // note: It is currently not possible to reuse Emits and Props from
    //  base button, because of a limitation of vite and vue compiler-sfc.
    //  Extending from those types is also not possible.
    //  https://vuejs.org/api/sfc-script-setup.html#typescript-only-features

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly type?: 'button' | 'link' | 'route';
        readonly command?: string;
        readonly commandIcon?: IconNames | null;
        readonly disabled?: boolean;
        readonly iconAfter?: IconNames | null;
        readonly iconBefore?: IconNames | null;
        readonly isActive?: boolean;
        readonly isHighlighted?: boolean;
        readonly isIndented?: boolean;
        readonly isLoading?: boolean;
        readonly label: string;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
    }

    defineEmits<Emits>();

    withDefaults(defineProps<Props>(), {
        type: 'link'
    });
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-menu-item {
        --button-background: transparent;
        --button-background-hover: rgb(var(--gray-2));
        --button-background-active: rgb(var(--gray-3));
        --button-foreground: var(--foreground);
        --button-icon: rgb(var(--foreground-prominent));
        --button-stroke: transparent;

        gap: 15px;
        justify-content: start;
        border: 0;
        box-shadow: none;
        text-align: left;

        span {
            flex-grow: 1;
            font-weight: 400;
            text-align: left;
        }

        &.is-active,
        &.is-highlighted {
            --button-background-hover: var(--button-background);
            --button-background-active: var(--button-background);
        }

        &.is-active {
            --button-background: rgb(var(--primary-7));
            --button-foreground: rgb(var(--primary-1));
            --button-icon: rgb(var(--primary-0));
        }

        &.is-highlighted {
            --button-background: rgb(var(--primary-2));
            --button-foreground: rgb(var(--primary-7));
            --button-icon: rgb(var(--primary-8));
        }

        &.is-indented {
            margin-left: 35px;
        }

        &-command {
            margin-left: auto;
            padding-left: 21px;
            flex-grow: 0;
            color: var(--foreground-secondary);
            font: inherit;
            font-size: 14px;

            &-icon {
                color: var(--foreground-secondary);
                font-size: 16px;
            }

            + &-icon {
                margin-left: -9px;
            }
        }

        .flux-button-icon {
            font-size: 18px;
        }

        @at-root .flux-menu.is-large & {
            height: 48px;
            padding-left: 15px;
            padding-right: 15px;
        }
    }

    @include flux.dark-mode {
        .flux-menu-item.is-highlighted {
            --button-background: rgb(var(--primary-11) / .5);
        }
    }
</style>
