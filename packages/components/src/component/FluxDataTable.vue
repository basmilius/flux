<template>
    <FluxTable
        ref="table"
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
            v-if="'header' in slots || selectionMode || hasExpandable"
            #header>
            <slot
                name="filter"
                v-bind="{page, perPage, items: limitedItems, total}"/>

            <FluxTableRow>
                <FluxTableHeader
                    v-if="selectionMode"
                    is-shrinking
                    :class="$style.tableCellSelection">
                    <FluxFormCheckbox
                        v-if="selectionMode === 'multiple'"
                        :model-value="selectAllState"
                        @update:model-value="onSelectAll"/>
                </FluxTableHeader>

                <FluxTableHeader
                    v-if="hasExpandable"
                    is-shrinking
                    :class="$style.tableCellExpand"/>

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

        <template
            v-for="(item, index) of limitedItems"
            :key="uniqueKey ? item[uniqueKey] : index">
            <FluxTableRow
                :class="selectionMode && !treeDisabled && $style.isSelectableRow"
                :is-selected="selectionMode ? isItemSelected(item) : false"
                @click="onRowClick(item, $event)">
                <FluxTableCell
                    v-if="selectionMode"
                    :class="$style.tableCellSelection">
                    <FluxFormCheckbox
                        :model-value="isItemSelected(item)"
                        @update:model-value="onSelectRow(item)"/>
                </FluxTableCell>

                <FluxTableCell
                    v-if="hasExpandable"
                    :class="$style.tableCellExpand">
                    <FluxTableActions>
                        <FluxAction
                            :class="clsx($style.tableExpandToggle, isItemExpanded(item) && $style.isExpanded)"
                            icon="angle-right"
                            :aria-expanded="isItemExpanded(item)"
                            :aria-label="isItemExpanded(item) ? translate('flux.collapseRow') : translate('flux.expandRow')"
                            @click="toggleExpand(item)"/>
                    </FluxTableActions>
                </FluxTableCell>

                <template v-for="(_, name) of slots">
                    <slot
                        v-if="!IGNORED_SLOTS.includes(name as string)"
                        v-bind="{index, item, items: limitedItems, page, perPage, total, isSelected: isItemSelected(item)}"
                        :name="name"/>
                </template>
            </FluxTableRow>

            <FluxTableRow
                v-if="hasExpandable && isItemExpanded(item)"
                :class="$style.tableExpandRow">
                <FluxTableCell :colspan="columnCount">
                    <template #content>
                        <div :class="$style.tableExpandContent">
                            <slot
                                name="expandable"
                                v-bind="{index, item, isExpanded: true, toggle: () => toggleExpand(item)}"/>
                        </div>
                    </template>
                </FluxTableCell>
            </FluxTableRow>
        </template>
    </FluxTable>
</template>

<script
    lang="ts"
    setup
    generic="T extends Record<string, any>">
    import { clsx } from 'clsx';
    import { computed, unref, useTemplateRef, type VNode, watch } from 'vue';
    import { useDisabledInjection } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxAction from './FluxAction.vue';
    import FluxFormCheckbox from './FluxFormCheckbox.vue';
    import FluxPaginationBar from './FluxPaginationBar.vue';
    import FluxTable from './FluxTable.vue';
    import FluxTableCell from './FluxTableCell.vue';
    import FluxTableHeader from './FluxTableHeader.vue';
    import FluxTableRow from './FluxTableRow.vue';
    import $style from '~flux/components/css/component/Table.module.scss';
    import FluxTableActions from '~flux/components/component/FluxTableActions.vue';

    type SelectionId = string | number;
    type SelectionValue = SelectionId | null | SelectionId[];

    const IGNORED_SLOTS: string[] = ['filter', 'header', 'footer', 'colgroups', 'pagination', 'expandable'];

    const emit = defineEmits<{
        limit: [number];
        navigate: [number];
    }>();

    const selected = defineModel<SelectionValue>('selected');
    const expanded = defineModel<SelectionId[]>('expanded', {
        default: () => []
    });

    const {
        expandMode = 'multiple',
        isBordered = true,
        isHoverable = false,
        isLoading = false,
        isSeparated = true,
        isStriped = false,
        items,
        perPage,
        selectionMode,
        uniqueKey
    } = defineProps<{
        readonly expandMode?: 'single' | 'multiple';
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
        readonly selectionMode?: 'single' | 'multiple';
        readonly total: number;
        readonly uniqueKey?: string;
    }>();

    const slots = defineSlots<{
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

        expandable(props: {
            readonly index: number;
            readonly item: T;
            readonly isExpanded: boolean;

            toggle(): void;
        }): VNode;
    } & {
        [key: string]: (props: {
            readonly index: number;
            readonly page: number;
            readonly perPage: number;
            readonly item: T;
            readonly items: T[];
            readonly total: number;
            readonly isSelected: boolean;
        }) => VNode;
    }>();

    const table = useTemplateRef('table');
    const treeDisabled = useDisabledInjection();
    const translate = useTranslate();

    const limitedItems = computed(() => items.slice(0, perPage));

    const hasExpandable = computed(() => 'expandable' in slots);
    const columnCount = computed(() => {
        const userColumns = Object.keys(slots).filter(name => !IGNORED_SLOTS.includes(name)).length;
        return userColumns + (selectionMode ? 1 : 0) + (unref(hasExpandable) ? 1 : 0);
    });

    const currentPageIds = computed<SelectionId[]>(() => {
        if (!uniqueKey) {
            return [];
        }

        return unref(limitedItems).map(item => item[uniqueKey] as SelectionId);
    });

    const selectAllState = computed<boolean | null>(() => {
        const ids = unref(currentPageIds);
        const value = unref(selected);

        if (ids.length === 0 || !Array.isArray(value)) {
            return false;
        }

        const selectedOnPage = ids.filter(id => value.includes(id)).length;

        if (selectedOnPage === 0) {
            return false;
        }

        if (selectedOnPage === ids.length) {
            return true;
        }

        return null;
    });

    function getItemId(item: T): SelectionId | undefined {
        if (!uniqueKey) {
            return undefined;
        }

        return item[uniqueKey] as SelectionId;
    }

    function isItemSelected(item: T): boolean {
        if (!selectionMode) {
            return false;
        }

        const id = getItemId(item);

        if (id === undefined) {
            return false;
        }

        const value = unref(selected);

        if (Array.isArray(value)) {
            return value.includes(id);
        }

        return value === id;
    }

    function onRowClick(item: T, event: MouseEvent): void {
        if (!selectionMode || unref(treeDisabled)) {
            return;
        }

        const target = event.target as HTMLElement | null;

        if (target?.closest('a, button, input, label, select, textarea, [role="button"]')) {
            return;
        }

        onSelectRow(item);
    }

    function onSelectRow(item: T): void {
        const id = getItemId(item);

        if (id === undefined) {
            return;
        }

        if (selectionMode === 'multiple') {
            const current = Array.isArray(unref(selected)) ? unref(selected) as SelectionId[] : [];
            selected.value = current.includes(id)
                ? current.filter(v => v !== id)
                : [...current, id];
            return;
        }

        if (selectionMode === 'single') {
            selected.value = isItemSelected(item) ? null : id;
        }
    }

    function onSelectAll(value: boolean | null): void {
        if (selectionMode !== 'multiple') {
            return;
        }

        const ids = unref(currentPageIds);
        const current = Array.isArray(unref(selected)) ? unref(selected) as SelectionId[] : [];

        if (value) {
            const additions = ids.filter(id => !current.includes(id));
            selected.value = [...current, ...additions];
            return;
        }

        selected.value = current.filter(id => !ids.includes(id));
    }

    function isItemExpanded(item: T): boolean {
        const id = getItemId(item);
        return id !== undefined && unref(expanded).includes(id);
    }

    function toggleExpand(item: T): void {
        const id = getItemId(item);

        if (id === undefined) {
            return;
        }

        const current = unref(expanded);

        if (current.includes(id)) {
            expanded.value = current.filter(v => v !== id);
            return;
        }

        expanded.value = expandMode === 'single' ? [id] : [...current, id];
    }

    if (import.meta.env.DEV && selectionMode && !uniqueKey) {
        console.warn('[FluxDataTable] `uniqueKey` is required when `selectionMode` is set, otherwise rows cannot be tracked across renders.');
    }

    if (import.meta.env.DEV && unref(hasExpandable) && !uniqueKey) {
        console.warn('[FluxDataTable] `uniqueKey` is required when the `expandable` slot is used, otherwise rows cannot be tracked across renders.');
    }

    watch(() => items, () => {
        unref(table)?.$el.scrollTo(0, 0);
    });
</script>
