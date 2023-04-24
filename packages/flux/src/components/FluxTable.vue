<template>
    <div
        class="flux-table"
        :class="{
            'is-hoverable': isHoverable
        }">
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

            <caption v-if="slots.caption">
                <slot name="caption"/>
            </caption>
        </table>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue-demi';

    export interface Props {
        readonly captionSide?: 'top' | 'bottom';
        readonly isHoverable?: boolean;
    }

    withDefaults(defineProps<Props>(), {
        captionSide: 'bottom'
    });

    const slots = useSlots();
</script>

<style lang="scss">
    .flux-table {
        overflow: auto;

        &-base {
            min-width: 100%;
            border: 0;
            border-spacing: 0;
            text-align: left;
        }

        caption {
            caption-side: v-bind(captionSide);
            color: var(--foreground-secondary);
            font-size: 14px;
            text-align: left;
        }
    }

    .flux-pane > .flux-table caption {
        padding: 12px 21px;
        border-top: 1px solid rgb(var(--gray-3));
    }
</style>
