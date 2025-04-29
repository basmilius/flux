<template>
    <FluxTable
        :fill-columns="fillColumns"
        :is-bordered="isBordered"
        :is-hoverable="isHoverable"
        :is-loading="isLoading"
        :is-separated="isSeparated"
        :is-striped="isStriped">
        <template
            v-if="'colgroups' in slots"
            #colgroups>
            <slot name="colgroups"/>
        </template>

        <template
            v-if="'header' in slots"
            #header>
            <FluxTableRow>
                <slot
                    name="header"
                    v-bind="{page, perPage, rows, total}"/>
            </FluxTableRow>
        </template>

        <template
            v-if="'footer' in slots"
            #footer>
            <FluxTableRow>
                <slot
                    name="footer"
                    v-bind="{page, perPage, rows, total}"/>
            </FluxTableRow>
        </template>

        <template
            v-if="total > limits[0]"
            #pagination>
            <slot
                name="pagination"
                v-bind="{page, perPage, rows, total}">
                <FluxPaginationBar
                    :limits="limits"
                    :page="page"
                    :per-page="perPage"
                    :total="total"
                    @limit="emit('limit', $event)"
                    @navigate="emit('navigate', $event)"/>
            </slot>
        </template>

        <FluxTableRow
            v-for="(row, index) of rows"
            :key="uniqueKey ? row[uniqueKey] : index">
            <template v-for="(_, name) of slots">
                <slot
                    v-if="!IGNORED_SLOTS.includes(name as string)"
                    v-bind="{index, page, perPage, row, rows, total}"
                    :name="name"/>
            </template>
        </FluxTableRow>
    </FluxTable>
</template>

<script
    lang="ts"
    setup
    generic="T extends Record<string, any>">
    import type { VNode } from 'vue';
    import { computed } from 'vue';
    import FluxPaginationBar from './FluxPaginationBar.vue';
    import FluxTable from './FluxTable.vue';
    import FluxTableRow from './FluxTableRow.vue';

    const IGNORED_SLOTS: string[] = ['header', 'footer', 'colgroups', 'pagination'];

    const emit = defineEmits<{
        limit: [number];
        navigate: [number];
    }>();

    const {
        isBordered = true,
        isHoverable = false,
        isLoading = false,
        isSeparated = true,
        isStriped = false,
        dataSet,
        perPage
    } = defineProps<{
        readonly dataSet: T[];
        readonly fillColumns?: number;
        readonly isBordered?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSeparated?: boolean;
        readonly isStriped?: boolean;
        readonly limits: number[];
        readonly page: number;
        readonly perPage: number;
        readonly total: number;
        readonly uniqueKey?: string;
    }>();

    const slots = defineSlots<{
        [key: string]: (props: {
            readonly index: number;
            readonly page: number;
            readonly perPage: number;
            readonly row: T;
            readonly rows: T[];
            readonly total: number;
        }) => VNode;

        footer(props: {
            readonly page: number;
            readonly perPage: number;
            readonly rows: T[];
            readonly total: number;
        }): VNode;

        header(props: {
            readonly page: number;
            readonly perPage: number;
            readonly rows: T[];
            readonly total: number;
        }): VNode;

        pagination(props: {
            readonly page: number;
            readonly perPage: number;
            readonly rows: T[];
            readonly total: number;
        }): VNode;

        colgroups(): VNode;
    }>();

    const rows = computed(() => dataSet.slice(0, perPage));
</script>
