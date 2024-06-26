<template>
    <BaseButton
        class="flux-menu-item"
        :class="{
            'is-active': isActive,
            'is-destructive': isDestructive,
            'is-highlighted': isHighlighted,
            'is-indented': isIndented,
            'is-selected': isSelectable && isSelected
        }"
        :="{type, disabled, iconAfter, iconBefore, isLoading, label, href, rel, target, to}"
        :role="isSelectable ? 'menuitemradio' : 'menuitem'"
        tabindex="0"
        :aria-checked="isSelectable ? isSelected : undefined"
        @click="$emit('click', $event)">
        <template
            v-if="isSelectable"
            #icon-before>
            <FluxIcon
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

        <FluxSpinner
            v-if="commandLoading"
            class="flux-button-icon flux-menu-item-command-icon"
            :size="16"/>

        <template
            v-if="command || commandIcon || commandLoading"
            #after>
            <FluxSpinner
                v-if="commandLoading"
                class="flux-button-icon flux-menu-item-command-icon"
                :size="16"/>

            <template v-else>
                <kbd
                    v-if="command"
                    class="flux-menu-item-command">
                    {{ command }}
                </kbd>

                <FluxIcon
                    v-if="commandIcon"
                    class="flux-button-icon flux-menu-item-command-icon"
                    :variant="commandIcon"/>
            </template>
        </template>
    </BaseButton>
</template>

<script
    lang="ts"
    setup>
    import type { FluxRoutingLocation, IconNames } from '@/data';
    import { BaseButton } from './primitive';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';

    // note: It is currently not possible to reuse Emits and Props from
    //  base button, because of a limitation of vite and vue compiler-sfc.
    //  Extending from those types is also not possible.
    //  https://vuejs.org/api/sfc-script-setup.html#typescript-only-features

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly type?: 'button' | 'link' | 'route';
        readonly command?: string | null;
        readonly commandIcon?: IconNames | null;
        readonly commandLoading?: boolean;
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
    .flux-menu-item {
        --button-background: transparent;
        --button-background-hover: rgb(var(--gray-2));
        --button-background-active: rgb(var(--gray-3));
        --button-foreground: var(--foreground);
        --button-icon: var(--foreground-prominent);
        --button-stroke: transparent;

        height: unset;
        min-height: 42px;
        padding: 6px 12px;
        gap: 15px;
        justify-content: start;
        border: 0;
        box-shadow: none;
        text-align: left;

        span {
            flex-grow: 1;
            font-weight: 400;
            text-align: left;
            transition: inherit;
            transition-property: color, font-weight;

            &:only-child {
                margin-left: 0;
                margin-right: 0;
                min-width: unset;
            }
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &-icon {
                margin-right: -6px;
                flex-shrink: 0;
                color: var(--foreground-secondary);
                font-size: 16px;

                --spinner-value: var(--foreground-secondary);
            }

            & + &-icon {
                margin-left: -9px;
            }
        }

        &-image {
            margin-left: -3px;
            height: 20px;
            width: 20px;
        }

        &.is-active &-command {
            color: rgb(var(--primary-4));
        }

        @at-root .flux-menu.is-large & {
            position: relative;
            padding-left: 15px;
            padding-right: 15px;
            color: var(--foreground-prominent);

            &::after {
                position: absolute;
                display: block;
                top: 12px;
                right: 12px;
                bottom: 12px;
                width: 4px;
                content: '';
                background: rgb(var(--primary-7));
                border-radius: 99px;
                opacity: 0;
                transition: opacity 180ms var(--swift-out);
            }

            &.is-active {
                &.is-indented {
                    background: rgb(var(--gray-3));

                    span {
                        color: var(--foreground-prominent);
                    }
                }

                &::after {
                    opacity: 1;
                }
            }

            &:not(.is-indented) {
                height: 48px;

                &::after {
                    background: rgb(var(--primary-0));
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

    [dark] .flux-menu-item.is-highlighted {
        --button-background: rgb(var(--primary-11) / .5);
    }
</style>
