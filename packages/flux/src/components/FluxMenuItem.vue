<template>
    <flux-base-button
        class="flux-menu-item"
        :class="{
            'is-active': isActive,
            'is-destructive': isDestructive,
            'is-highlighted': isHighlighted,
            'is-indented': isIndented,
            'is-selected': isSelectable && isSelected
        }"
        tabindex="0"
        v-bind="{type, disabled, iconAfter, iconBefore, isLoading, label, href, rel, target, to}"
        @click="$emit('click', $event)">
        <template
            v-if="isSelectable"
            #icon-before>
            <flux-icon
                class="flux-button-icon flux-menu-item-selectable-icon"
                :variant="isSelected ? 'circle-check' : 'flux-empty'"/>
        </template>

        <template
            v-else-if="imageUrl"
            #icon-before>
            <img
                class="flux-menu-item-image"
                :src="imageUrl"
                alt=""/>
        </template>

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
    import type { FluxRoutingLocation, IconNames } from '../data';
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
        readonly imageUrl?: string;
        readonly isActive?: boolean;
        readonly isDestructive?: boolean;
        readonly isHighlighted?: boolean;
        readonly isIndented?: boolean;
        readonly isLoading?: boolean;
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
        readonly label?: string;
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

        &.is-destructive {
            --button-foreground: rgb(var(--danger-8));
            --button-icon: rgb(var(--danger-7));
        }

        &.is-highlighted {
            --button-background: rgb(var(--primary-2));
            --button-foreground: rgb(var(--primary-7));
            --button-icon: rgb(var(--primary-8));
        }

        &.is-indented {
            margin-left: 33px;
        }

        &.is-selected &-selectable-icon {
            color: rgb(var(--primary-7));
        }

        .flux-button-icon:not(&-command-icon) {
            font-size: 18px;
        }

        &-command {
            margin-left: auto;
            padding-left: 21px;
            flex-grow: 0;
            color: var(--foreground-secondary);
            font: inherit;
            font-size: 14px;
            white-space: nowrap;

            &-icon {
                margin-right: -6px;
                color: var(--foreground-secondary);
                font-size: 16px;
            }

            + &-icon {
                margin-left: -9px;
            }
        }

        &-image {
            margin-left: -3px;
            height: 20px;
            width: 20px;
        }

        @at-root .flux-menu.is-large & {
            padding-left: 15px;
            padding-right: 15px;
            color: var(--foreground-prominent);

            &:not(.is-indented) {
                position: relative;
                height: 48px;

                &::after {
                    position: absolute;
                    display: block;
                    top: 12px;
                    right: 12px;
                    bottom: 12px;
                    width: 4px;
                    content: '';
                    background: rgb(var(--primary-0));
                    border-radius: 99px;
                    opacity: 0;
                    transition: opacity 180ms var(--swift-out);
                }

                &.is-active {
                    &::after {
                        opacity: 1;
                    }

                    span {
                        color: rgb(var(--primary-0));
                    }
                }
            }
        }
    }

    @include flux.dark-mode {
        .flux-menu-item.is-highlighted {
            --button-background: rgb(var(--primary-11) / .5);
        }
    }
</style>
