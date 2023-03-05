<template>
    <flux-flyout
        :axis="flyoutAxis"
        :is-auto-width="flyoutIsAutoWidth"
        :margin="flyoutMargin"
        :width="flyoutWidth">
        <template #opener="bindings">
            <div class="flux-button-group flux-split-button">
                <slot
                    name="button"
                    v-bind="bindings"/>

                <flux-secondary-button
                    :icon-before="buttonIcon ?? 'ellipsis-h'"
                    @click="bindings.open"/>
            </div>
        </template>

        <template #default="bindings">
            <slot
                name="flyout"
                v-bind="bindings"/>
        </template>
    </flux-flyout>
</template>

<script
    setup
    lang="ts">
    import { IconNames } from '../data';
    import { FluxFlyout, FluxSecondaryButton } from '.';

    export interface Props {
        readonly buttonIcon?: IconNames;
        readonly flyoutAxis?: 'horizontal' | 'vertical';
        readonly flyoutIsAutoWidth?: boolean;
        readonly flyoutMargin?: number;
        readonly flyoutWidth?: number | string;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-button-group {
        display: inline-flex;
        flex-flow: row nowrap;

        .flux-button {
            border-radius: 0;

            &:first-child {
                border-radius: var(--radius) 0 0 var(--radius);
            }

            &:last-child {
                border-radius: 0 var(--radius) var(--radius) 0;
            }
        }

        .flux-button + .flux-button {
            margin-left: -1px;
        }
    }
</style>
