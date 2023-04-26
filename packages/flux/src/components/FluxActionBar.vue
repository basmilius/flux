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
                    <flux-secondary-button
                        icon-before="filter"
                        @click="bindings.open"/>
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
    import { FluxFlyout, FluxSecondaryButton, FluxSpacer, FluxStack } from '.';

    const slots = useSlots();
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
