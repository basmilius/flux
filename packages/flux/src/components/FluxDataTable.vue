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
                    <template v-if="name !== 'header'">
                        <slot
                            :name="name"
                            v-bind="{index, page, perPage, row, rows, total}"/>
                    </template>
                </template>
            </FluxTableRow>
        </template>
    </FluxTable>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs, unref, useSlots } from 'vue-demi';
    import FluxTable from './FluxTable.vue';
    import FluxTableRow from './FluxTableRow.vue';

    export interface Props {
        readonly dataSet: unknown[];
        readonly isBordered?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSeparated?: boolean;
        readonly isStriped?: boolean;
        readonly page?: number;
        readonly perPage?: number;
        readonly total: number;
        readonly uniqueKey?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        isBordered: true,
        isHoverable: false,
        isLoading: false,
        isSeparated: true,
        isStriped: false,
        page: 1,
        perPage: 1000
    });
    const {dataSet, perPage} = toRefs(props);

    const slots = useSlots();

    const rows = computed(() => unref(dataSet).slice(0, unref(perPage)));
</script>
