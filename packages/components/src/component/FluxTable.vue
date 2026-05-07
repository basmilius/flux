<template>
    <div
        ref="base"
        :class="[
            $style.table,
            isBordered && $style.isBordered
        ]">
        <table :class="$style.tableBase">
            <slot name="colgroups"/>

            <thead v-if="slots.header">
            <slot name="header"/>
            </thead>

            <tbody v-if="slots.default">
            <slot/>

            <FluxTableRow
                v-if="fillColumns"
                :class="$style.tableFill">
                <FluxTableCell v-for="_ of fillColumns"/>
            </FluxTableRow>
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
            :class="$style.tableLoader"
            :style="{transform: `translate(${x}px, ${y}px)`}">
            <FluxSpinner/>
        </div>

        <FluxPaneBody
            v-if="slots.pagination"
            :class="$style.tablePagination">
            <slot name="pagination"/>
        </FluxPaneBody>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useScrollPosition } from '@flux-ui/internals';
    import { provide, useTemplateRef, type VNode } from 'vue';
    import { FluxTableInjectionKey } from '~flux/components/data';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import FluxTableCell from './FluxTableCell.vue';
    import FluxTableRow from './FluxTableRow.vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    const {
        captionSide = 'bottom',
        isBordered = true,
        isHoverable = false,
        isLoading = false,
        isSeparated = true,
        isStriped = false
    } = defineProps<{
        readonly captionSide?: 'top' | 'bottom';
        readonly fillColumns?: number;
        readonly isBordered?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSeparated?: boolean;
        readonly isStriped?: boolean;
    }>();

    const slots = defineSlots<{
        default?(): VNode;
        colgroups?(): VNode;
        caption?(): VNode;
        footer?(): VNode;
        header?(): VNode;
        pagination?(): VNode;
    }>();

    const base = useTemplateRef('base');
    const {x, y} = useScrollPosition(base);

    provide(FluxTableInjectionKey, {
        isBordered,
        isHoverable,
        isSeparated,
        isStriped
    });
</script>
