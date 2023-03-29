<template>
    <flux-flyout
        :axis="flyoutAxis"
        :is-auto-width="flyoutIsAutoWidth"
        :margin="flyoutMargin"
        :width="flyoutWidth">
        <template #opener="bindings">
            <div class="flux-button-group">
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
    import type { IconNames } from '../data';
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
