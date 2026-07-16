<template>
    <FluxTable
        ref="table"
        :aria-rowcount="total + 1"
        :is-filled="limitedItems.length !== 0 && isFilled"
        :is-hoverable="isHoverable"
        :is-loading="isLoading"
        :is-sticky="isSticky">
        <template
            v-if="'header' in slots || 'filter' in slots || selectionMode || hasExpandable"
            #header>
            <FluxTableBar v-if="hasSelectionBar">
                <slot
                    name="selection"
                    v-bind="{selected: selectedIds, count: selectedCount, clear: clearSelection}"/>
            </FluxTableBar>

            <slot
                v-else
                name="filter"
                v-bind="{page, perPage, items: limitedItems, total}"/>

            <FluxTableRow aria-rowindex="1">
                <FluxTableHeader
                    v-if="selectionMode"
                    is-shrinking
                    :pinned="leadingPinned ? 'start' : undefined"
                    :class="$style.tableCellSelection">
                    <FluxFormCheckbox
                        v-if="selectionMode === 'multiple'"
                        :model-value="selectAllState"
                        @update:model-value="onSelectAll"/>
                </FluxTableHeader>

                <FluxTableHeader
                    v-if="hasExpandable"
                    is-shrinking
                    :pinned="leadingPinned ? 'start' : undefined"
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

        <component
            :is="chunk.kind === 'group' ? 'div' : PassThrough"
            v-for="chunk of renderChunks"
            :key="chunk.key"
            :class="chunk.kind === 'group' ? $style.tableGroupSection : undefined"
            :role="chunk.kind === 'group' ? 'presentation' : undefined">
            <slot
                v-if="chunk.kind === 'group'"
                name="group"
                v-bind="{
                    id: chunk.id!,
                    index: chunk.index!,
                    items: chunk.items!,
                    isExpanded: !isGroupCollapsed(chunk.id!),
                    toggle: () => toggleGroup(chunk.id!)
                }"/>

            <template
                v-for="entry of chunk.entries"
                :key="entry.key">
                <FluxTableRow
                    :aria-rowindex="(page - 1) * perPage + entry.index + 2"
                    :is-clickable="isRowInteractive"
                    :is-hidden="chunk.isCollapsed"
                    :is-selected="rowStates.get(entry.key)?.isSelected"
                    @row-click="(columnIndex, event) => onRowClick(entry.item, columnIndex, event)">
                    <FluxTableCell
                        v-if="selectionMode"
                        :class="$style.tableCellSelection">
                        <FluxFormCheckbox
                            :model-value="rowStates.get(entry.key)?.isSelected"
                            @update:model-value="onSelectRow(entry.item)"/>
                    </FluxTableCell>

                    <FluxTableCell
                        v-if="hasExpandable"
                        :class="$style.tableCellExpand">
                        <FluxTableActions v-if="rowStates.get(entry.key)?.isExpandable">
                            <FluxAction
                                :class="clsx($style.tableExpandToggle, rowStates.get(entry.key)?.isExpanded && $style.isExpanded)"
                                icon="angle-right"
                                :aria-expanded="rowStates.get(entry.key)?.isExpanded"
                                :aria-label="rowStates.get(entry.key)?.isExpanded ? translate('flux.collapseRow') : translate('flux.expandRow')"
                                @click="toggleExpand(entry.item)"/>
                        </FluxTableActions>
                    </FluxTableCell>

                    <template v-for="(_, name) of slots" :key="name">
                        <slot
                            v-if="!IGNORED_SLOTS.includes(name as string)"
                            v-bind="{index: entry.index, item: entry.item, items: limitedItems, page, perPage, total, isSelected: rowStates.get(entry.key)?.isSelected ?? false}"
                            :name="name"/>
                    </template>
                </FluxTableRow>

                <FluxTableRow
                    v-if="hasExpandable && rowStates.get(entry.key)?.isExpanded"
                    :is-hidden="chunk.isCollapsed">
                    <FluxTableCell :colspan="columnCount">
                        <template #content>
                            <div :class="$style.tableExpandContent">
                                <slot
                                    name="expandable"
                                    v-bind="{index: entry.index, item: entry.item, isExpanded: true, toggle: () => toggleExpand(entry.item)}"/>
                            </div>
                        </template>
                    </FluxTableCell>
                </FluxTableRow>
            </template>
        </component>

        <template
            v-if="'loading' in slots"
            #loading>
            <slot
                name="loading"
                v-bind="{page, perPage, total}"/>
        </template>

        <template
            v-if="!isLoading && limitedItems.length === 0"
            #empty>
            <div
                :class="$style.tableCellBase"
                role="cell"
                :style="{gridColumn: '1 / -1'}">
                <slot name="empty">
                    <div :class="$style.tableEmpty">{{ translate('flux.noItems') }}</div>
                </slot>
            </div>
        </template>
    </FluxTable>
</template>

<script
    lang="ts"
    setup
    generic="T extends Record<string, any>">
    import { clsx } from 'clsx';
    import { computed, getCurrentInstance, unref, useTemplateRef, type VNode, watch } from 'vue';
    import FluxTableActions from './FluxTableActions.vue';
    import { useDisabledInjection } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxAction from './FluxAction.vue';
    import FluxFormCheckbox from './FluxFormCheckbox.vue';
    import FluxPaginationBar from './FluxPaginationBar.vue';
    import FluxTable from './FluxTable.vue';
    import FluxTableBar from './FluxTableBar.vue';
    import FluxTableCell from './FluxTableCell.vue';
    import FluxTableHeader from './FluxTableHeader.vue';
    import FluxTableRow from './FluxTableRow.vue';
    import { PassThrough } from './primitive';
    import $style from '~flux/components/css/component/Table.module.scss';

    type SelectionId = string | number;
    type SelectionValue = SelectionId | null | SelectionId[];
    type ItemEntry = {
        readonly key: SelectionId;
        readonly index: number;
        readonly item: T;
    };
    type RenderChunk = {
        readonly kind: 'group' | 'plain';
        readonly key: SelectionId;
        readonly entries: ItemEntry[];
        readonly isCollapsed?: boolean;
        readonly id?: SelectionId;
        readonly index?: number;
        readonly items?: T[];
    };

    const IGNORED_SLOTS: string[] = ['filter', 'header', 'footer', 'pagination', 'expandable', 'group', 'empty', 'loading', 'selection'];

    const emit = defineEmits<{
        limit: [number];
        navigate: [number];
        rowClick: [item: T, columnIndex: number, event: MouseEvent];
    }>();

    const selected = defineModel<SelectionValue>('selected');
    const expanded = defineModel<SelectionId[]>('expanded', {
        default: () => []
    });
    const collapsedGroups = defineModel<SelectionId[]>('collapsedGroups', {
        default: () => []
    });

    const {
        canExpand,
        collapseMode = 'unmount',
        expandMode = 'multiple',
        groupBy,
        isFilled = false,
        isHoverable = false,
        isLoading = false,
        isSticky = false,
        items,
        page,
        perPage,
        selectionMode,
        total,
        uniqueKey
    } = defineProps<{
        readonly canExpand?: (item: T) => boolean;
        readonly collapseMode?: 'hide' | 'unmount';
        readonly expandMode?: 'single' | 'multiple';
        readonly groupBy?: (item: T) => SelectionId;
        readonly isFilled?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSticky?: boolean;
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

        empty(): VNode;

        loading(props: {
            readonly page: number;
            readonly perPage: number;
            readonly total: number;
        }): VNode;

        selection(props: {
            readonly selected: SelectionId[];
            readonly count: number;

            clear(): void;
        }): VNode;

        expandable(props: {
            readonly index: number;
            readonly item: T;
            readonly isExpanded: boolean;

            toggle(): void;
        }): VNode;

        group(props: {
            readonly id: SelectionId;
            readonly index: number;
            readonly items: T[];
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

    const instance = getCurrentInstance();
    const table = useTemplateRef('table');
    const treeDisabled = useDisabledInjection();
    const translate = useTranslate();

    const hasRowClickListener = computed(() => !!instance?.vnode?.props?.onRowClick);
    const isRowInteractive = computed(() => (!!selectionMode && !unref(treeDisabled)) || unref(hasRowClickListener));

    const limitedItems = computed(() => items.slice(0, perPage));

    const hasExpandable = computed(() => 'expandable' in slots);

    const leadingColumnCount = computed(() => (selectionMode ? 1 : 0) + (unref(hasExpandable) ? 1 : 0));

    const leadingPinned = computed(() => {
        const columns = unref(table)?.columns;

        return columns?.[unref(leadingColumnCount)]?.pinned === 'start';
    });
    const columnCount = computed(() => {
        const userColumns = Object.keys(slots).filter(name => !IGNORED_SLOTS.includes(name)).length;
        return userColumns + (selectionMode ? 1 : 0) + (unref(hasExpandable) ? 1 : 0);
    });

    const renderChunks = computed<RenderChunk[]>(() => {
        const list = unref(limitedItems);

        const toEntry = (item: T, index: number): ItemEntry => ({
            key: uniqueKey ? item[uniqueKey] as SelectionId : index,
            index,
            item
        });

        if (!groupBy) {
            return [{
                kind: 'plain',
                key: 'plain',
                entries: list.map(toEntry)
            }];
        }

        const resolveGroup = groupBy;
        const buckets = new Map<SelectionId, { index: number; item: T }[]>();

        list.forEach((item, index) => {
            const id = resolveGroup(item);
            const bucket = buckets.get(id);

            if (bucket) {
                bucket.push({index, item});
            } else {
                buckets.set(id, [{index, item}]);
            }
        });

        const chunks: RenderChunk[] = [];

        for (const [id, bucket] of buckets) {
            // In 'hide' mode the rows of a collapsed group stay mounted and are
            // hidden by FluxTableRow; in the default 'unmount' mode they are
            // dropped entirely so the group re-mounts on every toggle.
            const isCollapsed = unref(collapsedGroupSet).has(id);

            chunks.push({
                kind: 'group',
                key: `group:${id}`,
                id,
                index: bucket[0].index,
                items: bucket.map(({item}) => item),
                isCollapsed,
                entries: isCollapsed && collapseMode === 'unmount' ? [] : bucket.map(({item, index}) => toEntry(item, index))
            });
        }

        return chunks;
    });

    const currentPageIds = computed<SelectionId[]>(() => {
        if (!uniqueKey) {
            return [];
        }

        return unref(limitedItems).map(item => item[uniqueKey] as SelectionId);
    });

    const selectedSet = computed<ReadonlySet<SelectionId>>(() => {
        const value = unref(selected);

        if (Array.isArray(value)) {
            return new Set(value);
        }

        return new Set(value != null ? [value] : []);
    });

    const expandedSet = computed<ReadonlySet<SelectionId>>(() => new Set(unref(expanded)));
    const collapsedGroupSet = computed<ReadonlySet<SelectionId>>(() => new Set(unref(collapsedGroups)));

    const rowStates = computed(() => {
        const states = new Map<SelectionId, { isExpandable: boolean; isExpanded: boolean; isSelected: boolean }>();

        for (const chunk of unref(renderChunks)) {
            for (const entry of chunk.entries) {
                states.set(entry.key, {
                    isExpandable: isRowExpandable(entry.item),
                    isExpanded: isItemExpanded(entry.item),
                    isSelected: isItemSelected(entry.item)
                });
            }
        }

        return states;
    });

    const selectedIds = computed<SelectionId[]>(() => Array.from(unref(selectedSet)));
    const selectedCount = computed(() => unref(selectedIds).length);
    const hasSelectionBar = computed(() => 'selection' in slots && unref(selectedCount) > 0);

    const selectAllState = computed<boolean | null>(() => {
        const ids = unref(currentPageIds);
        const value = unref(selected);

        if (ids.length === 0 || !Array.isArray(value)) {
            return false;
        }

        const set = unref(selectedSet);
        const selectedOnPage = ids.filter(id => set.has(id)).length;

        if (selectedOnPage === 0) {
            return false;
        }

        if (selectedOnPage === ids.length) {
            return true;
        }

        return null;
    });

    watch(() => items, () => {
        unref(table)?.$el.scrollTo(0, 0);
    });

    function clearSelection(): void {
        selected.value = selectionMode === 'multiple' ? [] : null;
    }

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

        return unref(selectedSet).has(id);
    }

    function onRowClick(item: T, columnIndex: number, event: MouseEvent): void {
        if (unref(treeDisabled)) {
            return;
        }

        if (selectionMode) {
            onSelectRow(item);
            return;
        }

        emit('rowClick', item, columnIndex, event);
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

    function isRowExpandable(item: T): boolean {
        if (!unref(hasExpandable)) {
            return false;
        }

        return canExpand ? canExpand(item) : true;
    }

    function isItemExpanded(item: T): boolean {
        if (!isRowExpandable(item)) {
            return false;
        }

        const id = getItemId(item);
        return id !== undefined && unref(expandedSet).has(id);
    }

    function toggleExpand(item: T): void {
        if (!isRowExpandable(item)) {
            return;
        }

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

    function isGroupCollapsed(id: SelectionId): boolean {
        return unref(collapsedGroupSet).has(id);
    }

    function toggleGroup(id: SelectionId): void {
        const current = unref(collapsedGroups);

        collapsedGroups.value = current.includes(id)
            ? current.filter(v => v !== id)
            : [...current, id];
    }

    if (import.meta.env.DEV && selectionMode && !uniqueKey) {
        console.warn('[FluxDataTable] `uniqueKey` is required when `selectionMode` is set, otherwise rows cannot be tracked across renders.');
    }

    if (import.meta.env.DEV && unref(hasExpandable) && !uniqueKey) {
        console.warn('[FluxDataTable] `uniqueKey` is required when the `expandable` slot is used, otherwise rows cannot be tracked across renders.');
    }
</script>
