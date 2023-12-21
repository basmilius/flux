<template>
    <FluxFlyout
        :axis="flyoutAxis"
        :is-auto-width="flyoutIsAutoWidth"
        :margin="flyoutMargin"
        :width="flyoutWidth">
        <template #opener="{close, open, toggle}">
            <div :class="styles.buttonGroup">
                <slot
                    name="button"
                    v-bind="{close, open, toggle}"/>

                <FluxSecondaryButton
                    :icon-before="buttonIcon ?? 'ellipsis-h'"
                    @click="open"/>
            </div>
        </template>

        <template #default="bindings">
            <slot
                name="flyout"
                v-bind="bindings"/>
        </template>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import styles from '@/css/components/Button.module.scss';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';

    export interface Props {
        readonly buttonIcon?: IconNames;
        readonly flyoutAxis?: 'horizontal' | 'vertical';
        readonly flyoutIsAutoWidth?: boolean;
        readonly flyoutMargin?: number;
        readonly flyoutWidth?: number | string;
    }

    defineProps<Props>();
</script>
