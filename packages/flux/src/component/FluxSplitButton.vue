<template>
    <FluxFlyout
        :axis="flyoutAxis"
        :is-auto-width="flyoutIsAutoWidth"
        :margin="flyoutMargin"
        :width="flyoutWidth">
        <template #opener="{close, open, toggle}">
            <div :class="$style.buttonGroup">
                <slot
                    v-bind="{close, open, toggle}"
                    name="button"/>

                <FluxSecondaryButton
                    :icon-before="buttonIcon"
                    @click="open"/>
            </div>
        </template>

        <template #default="bindings">
            <slot
                v-bind="bindings"
                name="flyout"/>
        </template>
    </FluxFlyout>
</template>

<script
    setup
    lang="ts">
    import type { Axis, IconName } from '@/types';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '@/css/component/Button.module.scss';

    const {
        buttonIcon = 'ellipsis-h'
    } = defineProps<{
        readonly buttonIcon?: IconName;
        readonly flyoutAxis?: Axis;
        readonly flyoutIsAutoWidth?: boolean;
        readonly flyoutMargin?: number;
        readonly flyoutWidth?: number | string;
    }>();

    defineSlots<{
        button(props: {
            close(): void;
            open(): void;
            toggle(): void;
        }): any;

        flyout(props: {
            close(): void;

            readonly paneX: number;
            readonly paneY: number;
            readonly openerWidth: number;
            readonly openerHeight: number;
        }): any;
    }>();
</script>
