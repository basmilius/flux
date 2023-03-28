<template>
    <flux-stack
        class="flux-action-bar"
        axis="horizontal"
        :gap="9">
        <slot name="primary"/>

        <flux-spacer/>

        <slot name="search"/>

        <flux-flyout>
            <template
                v-if="$slots.filter"
                #opener="bindings">
                <slot
                    name="filterOpener"
                    v-bind="bindings">
                    <flux-secondary-button
                        icon-before="filter"
                        @click="bindings.open"/>
                </slot>
            </template>

            <template #default="bindings">
                <slot
                    name="filter"
                    v-bind="bindings"/>
            </template>
        </flux-flyout>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlyout, FluxSecondaryButton, FluxSpacer, FluxStack } from '.';
</script>

<style lang="scss">
    @layer cosy {
        .flux-action-bar .flux-form-input {
            width: unset;
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
    }
</style>
