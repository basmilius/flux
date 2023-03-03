<template>
    <flux-stack
        class="flux-action-bar"
        axis="horizontal"
        :gap="9">
        <slot name="primary"/>

        <flux-spacer/>

        <flux-flyout>
            <template
                v-if="$slots.filter"
                #opener="bindings">
                <slot
                    name="filterOpener"
                    v-bind="bindings"/>
            </template>

            <template #default="bindings">
                <flux-pane-body>
                    <slot
                        name="filter"
                        v-bind="bindings"/>
                </flux-pane-body>
            </template>
        </flux-flyout>

        <slot name="search"/>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlyout, FluxPaneBody, FluxSpacer, FluxStack } from '.';
</script>

<style lang="scss">
    .flux-action-bar {
        .flux-form-input {
            width: unset;
        }
    }

    .flux-pane > .flux-action-bar {
        padding: 21px;
        background: var(--surface-footer);
        border: 1px solid var(--surface-stroke);
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
