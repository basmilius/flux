<template>
    <div class="flux-table">
        <table class="flux-table-base">
            <thead v-if="slots.header">
            <slot name="header"/>
            </thead>

            <tbody>
            <slot name="rows"/>
            </tbody>

            <tfoot v-if="slots.footer">
            <slot name="footer"/>
            </tfoot>

            <caption
                v-if="slots.caption"
                :style="{captionSide}">
                <slot name="caption"/>
            </caption>
        </table>

        <div
            v-if="isLoading"
            class="flux-pane-overlay">
            <FluxSpinner/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { provide, toRefs, useSlots } from 'vue';
    import { FluxTableInjectionKey } from '@/data';
    import FluxSpinner from './FluxSpinner.vue';

    export interface Props {
        readonly captionSide?: 'top' | 'bottom';
        readonly isBordered?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSeparated?: boolean;
        readonly isStriped?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        captionSide: 'bottom',
        isBordered: true,
        isHoverable: false,
        isLoading: false,
        isSeparated: true,
        isStriped: false
    });

    const slots = useSlots();

    provide(FluxTableInjectionKey, toRefs(props));
</script>

<style lang="scss">
    .flux-table {
        position: relative;
        overflow: auto;

        &-base {
            min-width: 100%;
            border: 0;
            border-spacing: 0;
            text-align: left;
        }

        caption {
            color: var(--foreground-secondary);
            font-size: 14px;
            text-align: left;
        }
    }

    .flux-pane > .flux-table caption {
        padding: 12px 21px;
        border-top: 1px solid rgb(var(--gray-3));
    }

    .flux-pane > .flux-table .flux-pane-overlay {
        border-radius: var(--radius);
    }
</style>
