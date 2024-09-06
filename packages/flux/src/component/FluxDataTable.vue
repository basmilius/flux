<template>
    <FluxTable
        :is-bordered="isBordered"
        :is-hoverable="isHoverable"
        :is-loading="isLoading"
        :is-separated="isSeparated"
        :is-striped="isStriped">
        <template
            v-if="slots.header"
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
                    <template v-if="name !== 'footer' && name !== 'header'">
                        <slot
                            :name="name"
                            v-bind="{index, page, perPage, row, rows, total}"/>
                    </template>
                </template>
            </FluxTableRow>
        </template>

        <template
            v-if="slots.footer"
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
    import { computed, useSlots } from 'vue';
    import FluxTable from './FluxTable.vue';
    import FluxTableRow from './FluxTableRow.vue';

    const {
        isBordered = true,
        isHoverable = false,
        isLoading = false,
        isSeparated = true,
        isStriped = false,
        dataSet,
        page = 1,
        perPage = 1000
    } = defineProps<{
        readonly dataSet: T[];
        readonly isBordered?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSeparated?: boolean;
        readonly isStriped?: boolean;
        readonly page?: number;
        readonly perPage?: number;
        readonly total: number;
        readonly uniqueKey?: string;
    }>();

    defineSlots<{
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

    const slots = useSlots();

    const rows = computed(() => dataSet.slice(0, perPage));
</script>
