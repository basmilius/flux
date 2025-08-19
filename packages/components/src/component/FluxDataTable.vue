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
            <slot name="filter" v-bind="{page, perPage, items: limitedItems, total}"/>

            <FluxTableRow>
                <slot
                    name="header"
                    v-bind="{page, perPage, items: limitedItems, total}"/>
            </FluxTableRow>
        </template>

        <template
            v-if="'footer' in slots"
            #footer>
            <FluxTableRow>
                <slot
                    name="footer"
                    v-bind="{page, perPage, items: limitedItems, total}"/>
            </FluxTableRow>
        </template>

        <template
            v-if="total > limits[0]"
            #pagination>
            <slot
                name="pagination"
                v-bind="{page, perPage, items: limitedItems, total}">
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
            v-for="(item, index) of limitedItems"
            :key="uniqueKey ? item[uniqueKey] : index">
            <template v-for="(_, name) of slots">
                <slot
                    v-if="!IGNORED_SLOTS.includes(name as string)"
                    v-bind="{index, item, items: limitedItems, page, perPage, total}"
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

    const IGNORED_SLOTS: string[] = ['filter', 'header', 'footer', 'colgroups', 'pagination'];

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
        items,
        perPage
    } = defineProps<{
        readonly fillColumns?: number;
        readonly isBordered?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSeparated?: boolean;
        readonly isStriped?: boolean;
        readonly items: T[];
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
            readonly item: T;
            readonly items: T[];
            readonly total: number;
        }) => VNode;

        filter(props: {
            readonly page: number;
            readonly perPage: number;
            readonly items: T[];
            readonly total: number;
        }): VNode;

        footer(props: {
            readonly page: number;
            readonly perPage: number;
            readonly items: T[];
            readonly total: number;
        }): VNode;

        header(props: {
            readonly page: number;
            readonly perPage: number;
            readonly items: T[];
            readonly total: number;
        }): VNode;

        pagination(props: {
            readonly page: number;
            readonly perPage: number;
            readonly items: T[];
            readonly total: number;
        }): VNode;

        colgroups(): VNode;
    }>();

    const limitedItems = computed(() => items.slice(0, perPage));
</script>
