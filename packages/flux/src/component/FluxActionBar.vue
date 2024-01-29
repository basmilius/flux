<template>
    <FluxStack
        class="flux-action-bar"
        axis="horizontal"
        :gap="9">
        <slot name="primary"/>

        <slot name="actions-start"/>

        <FluxSpacer/>

        <slot name="actions-before-search"/>

        <slot name="search"/>

        <slot name="actions-after-search"/>

        <FluxFlyout v-if="slots.filter">
            <template
                v-if="$slots.filter"
                #opener="{close, open, toggle}">
                <slot
                    v-bind="{close, open, toggle}"
                    name="filter-opener">
                    <FluxButtonGroup>
                        <FluxSecondaryButton
                            icon-before="filter"
                            :label="translate('flux_filter')"
                            @click="open"/>

                        <FluxTooltip
                            v-if="isResettable"
                            :content="translate('flux_filter_reset')">
                            <FluxDestructiveButton
                                icon-before="xmark"
                                @click="$emit('reset')"/>
                        </FluxTooltip>
                    </FluxButtonGroup>
                </slot>
            </template>

            <template #default="bindings">
                <slot
                    v-bind="bindings"
                    name="filter"/>
            </template>
        </FluxFlyout>

        <slot name="actions-end"/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue';
    import { useTranslate } from '@/composable/private';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxDestructiveButton from './FluxDestructiveButton.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import FluxStack from './FluxStack.vue';
    import FluxTooltip from './FluxTooltip.vue';

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
    @use '../css/mixin' as flux;

    .flux-action-bar {
        flex-wrap: wrap;
    }

    @include flux.breakpoint-up(sm) {
        .flux-action-bar > .flux-form-input {
            max-width: 240px;
        }
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
