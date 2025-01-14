<template>
    <div :class="$style.table">
        <table :class="$style.tableBase">
            <thead v-if="slots.header">
            <slot name="header"/>
            </thead>

            <tbody v-if="slots.rows">
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
            :class="$style.tableLoader">
            <FluxSpinner/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { provide } from 'vue';
    import { FluxTableInjectionKey } from '@/data';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '@/css/component/Table.module.scss';

    const {
        captionSide = 'bottom',
        isBordered = true,
        isHoverable = false,
        isLoading = false,
        isSeparated = true,
        isStriped = false
    } = defineProps<{
        readonly captionSide?: 'top' | 'bottom';
        readonly isBordered?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSeparated?: boolean;
        readonly isStriped?: boolean;
    }>();

    const slots = defineSlots<{
        caption?(): any;
        footer?(): any;
        header?(): any;
        rows?(): any;
    }>();

    provide(FluxTableInjectionKey, {
        isBordered,
        isHoverable,
        isSeparated,
        isStriped
    });
</script>
