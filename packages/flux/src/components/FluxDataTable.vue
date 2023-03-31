<template>
    <flux-table :is-hoverable="isHoverable">
        <template
            v-if="slots.header"
            #header>
            <flux-table-row>
                <slot
                    name="header"
                    v-bind="{dataSet, page, perPage, total}"/>
            </flux-table-row>
        </template>

        <template #rows>
            <flux-table-row
                v-for="(row, index) of dataSet.slice(0, perPage)"
                :key="uniqueKey ? row[uniqueKey] : index">
                <template v-for="(_, name) of slots">
                    <template v-if="name !== 'header'">
                        <slot
                            :name="name"
                            v-bind="{dataSet, page, perPage, row, total}"/>
                    </template>
                </template>
            </flux-table-row>
        </template>
    </flux-table>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue-demi';
    import { FluxTable, FluxTableRow } from '.';

    export interface Props {
        readonly dataSet: unknown[];
        readonly isHoverable?: boolean;
        readonly page: number;
        readonly perPage: number;
        readonly total: number;
        readonly uniqueKey?: string;
    }

    defineProps<Props>();

    const slots = useSlots();
</script>
