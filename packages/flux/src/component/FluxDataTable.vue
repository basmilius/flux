<template>
    <FluxTable
        :is-bordered="isBordered"
        :is-hoverable="isHoverable"
        :is-loading="isLoading"
        :is-separated="isSeparated"
        :is-striped="isStriped">
        <template
            v-if="'header' in slots"
            #header>
            <FluxTableRow>
                <slot
                    name="header"
                    v-bind="{page, perPage, rows, total}"/>
            </FluxTableRow>
        </template>

        <template #rows>
            <FluxTableRow
                v-for="(row, index) of rows"
                :key="uniqueKey ? row[uniqueKey] : index">
                <template v-for="(_, name) of slots">
                    <slot
                        v-if="name !== 'footer' && name !== 'header'"
                        v-bind="{index, page, perPage, row, rows, total}"
                        :name="name"/>
                </template>
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
    </FluxTable>
</template>

<script
    lang="ts"
    setup
    generic="T extends Record<string, any>">
    import { computed } from 'vue';
    import FluxTable from './FluxTable.vue';
    import FluxTableRow from './FluxTableRow.vue';

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
        readonly isBordered?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSeparated?: boolean;
        readonly isStriped?: boolean;
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
        }) => any;

        footer(props: {
            readonly page: number;
            readonly perPage: number;
            readonly rows: T[];
            readonly total: number;
        }): any;

        header(props: {
            readonly page: number;
            readonly perPage: number;
            readonly rows: T[];
            readonly total: number;
        }): any;
    }>();

    const rows = computed(() => dataSet.slice(0, perPage));
</script>
