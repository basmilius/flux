<template>
    <div :class="styles.table">
        <table :class="styles.tableBase">
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
            :class="styles.tableLoader">
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
    import styles from '@/css/component/Table.module.scss';

    export type Props = {
        readonly captionSide?: 'top' | 'bottom';
        readonly isBordered?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSeparated?: boolean;
        readonly isStriped?: boolean;
    };

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
