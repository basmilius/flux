<template>
    <flux-stack
        class="flux-action-bar"
        axis="horizontal"
        :gap="9">
        <slot name="primary"/>

        <slot name="actions-start"/>

        <flux-spacer/>

        <slot name="actions-before-search"/>

        <slot name="search"/>

        <slot name="actions-after-search"/>

        <flux-flyout v-if="slots.filter">
            <template
                v-if="$slots.filter"
                #opener="bindings">
                <slot
                    v-bind="bindings"
                    name="filter-opener">
                    <flux-button-group>
                        <flux-secondary-button
                            icon-before="filter"
                            :label="translate('flux_filter')"
                            @click="bindings.open"/>

                        <flux-tooltip
                            v-if="isResettable"
                            :content="translate('flux_filter_reset')">
                            <flux-destructive-button
                                icon-before="xmark"
                                @click="$emit('reset')"/>
                        </flux-tooltip>
                    </flux-button-group>
                </slot>
            </template>

            <template #default="bindings">
                <slot
                    v-bind="bindings"
                    name="filter"/>
            </template>
        </flux-flyout>

        <slot name="actions-end"/>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue-demi';
    import { useTranslate } from '../composables';
    import { FluxButtonGroup, FluxDestructiveButton, FluxFlyout, FluxSecondaryButton, FluxSpacer, FluxStack, FluxTooltip } from '.';

    export interface Emits {
        (e: 'reset'): void;
    }

    export interface Props {
        readonly isResettable?: boolean;
    }

    defineEmits<Emits>();
    defineProps<Props>();

    const slots = useSlots();
    const translate = useTranslate();
</script>

<style lang="scss">
    .flux-action-bar .flux-form-input {
        max-width: 240px;
    }

    .flux-action-bar > .flux-separator {
        margin-top: 9px;
        margin-bottom: 9px;
    }

    .flux-pane > .flux-action-bar {
        padding: 15px 21px;
        background: rgb(var(--gray-1));
        border: 1px solid rgb(var(--gray-3));
        border-left: 0;
        border-right: 0;

        &:first-child {
            border-top: 0;
            border-top-left-radius: var(--radius);
            border-top-right-radius: var(--radius);
        }
    }

    .flux-pane-header + .flux-action-bar {
        margin-top: 21px;
    }
</style>
