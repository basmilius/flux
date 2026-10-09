<template>
    <FluxTable
        ref="table"
        :aria-rowcount="ariaRowcount"
        :is-filled="limitedItems.length !== 0 && isFilled"
        :is-hoverable="isHoverable"
        :is-loading="isLoading"
        :is-sticky="isSticky">
        <template
            v-if="'header' in slots || 'filter' in slots || selectionMode || hasExpandColumn"
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
                    v-if="hasExpandColumn"
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
            v-if="pagination === 'pages' && total > limits[0]"
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

            <component
                :is="expandStyle === 'card' ? 'div' : PassThrough"
                v-for="entry of chunk.entries"
                :key="entry.key"
                :class="expandStyle === 'card' ? clsx($style.tableCard, rowStates.get(entry.key)?.isExpanded && $style.isExpanded) : undefined"
                :role="expandStyle === 'card' ? 'presentation' : undefined">
                <FluxTableRow
                    :aria-rowindex="(page - 1) * perPage + entry.index + 2"
                    :aria-expanded="rowStates.get(entry.key)?.isToggle ? rowStates.get(entry.key)?.isExpanded : undefined"
                    :color="rowStates.get(entry.key)?.color"
                    :is-clickable="rowStates.get(entry.key)?.isClickable"
                    :is-hidden="chunk.isCollapsed"
                    :is-selected="rowStates.get(entry.key)?.isSelected"
                    @focusin="emit('rowIntent', entry.item)"
                    @pointerenter="onRowPointerEnter(entry.item)"
                    @pointerleave="onRowPointerLeave"
                    @row-click="(columnIndex, event) => onRowClick(entry.item, columnIndex, event)">
                    <FluxTableCell
                        v-if="selectionMode"
                        :class="$style.tableCellSelection">
                        <FluxFormCheckbox
                            :model-value="rowStates.get(entry.key)?.isSelected"
                            @update:model-value="onSelectRow(entry.item)"/>
                    </FluxTableCell>

                    <FluxTableCell
                        v-if="hasExpandColumn"
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

                    <template
                        v-for="(_, name) of slots"
                        :key="name">
                        <slot
                            v-if="!IGNORED_SLOTS.includes(name as string)"
                            v-bind="{index: entry.index, item: entry.item, items: limitedItems, page, perPage, total, isSelected: rowStates.get(entry.key)?.isSelected ?? false}"
                            :name="name"/>
                    </template>
                </FluxTableRow>

                <FluxTableRow
                    v-if="hasExpandable && rowStates.get(entry.key)?.isExpanded"
                    :color="rowStates.get(entry.key)?.color"
                    :is-hidden="chunk.isCollapsed">
                    <FluxTableCell :colspan="columnCount">
                        <template #content>
                            <div :class="$style.tableExpandContent">
                                <div
                                    v-if="isExpandLoading?.(entry.item)"
                                    :class="$style.tableExpandLoading">
                                    <FluxSpinner/>
                                </div>

                                <slot
                                    v-else
                                    name="expandable"
                                    v-bind="{index: entry.index, item: entry.item, isExpanded: true, toggle: () => toggleExpand(entry.item)}"/>
                            </div>
                        </template>
                    </FluxTableCell>
                </FluxTableRow>
            </component>
        </component>

        <FluxTableRow
            v-if="pagination === 'infinite' && (hasMore || isLoadingMore)"
            aria-hidden="true">
            <div
                ref="sentinel"
                :class="$style.tableInfinite"
                role="cell">
                <FluxSpinner v-if="isLoadingMore"/>
            </div>
        </FluxTableRow>

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
    import type { FluxColor } from '@flux-ui/types';
    import { useInView } from '@basmilius/common';
    import { clsx } from 'clsx';
    import { computed, getCurrentInstance, onBeforeUnmount, unref, useTemplateRef, type VNode, watch } from 'vue';
    import FluxTableActions from './table/FluxTableActions.vue';
    import { useDisabledInjection } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxAction from './FluxAction.vue';
    import FluxFormCheckbox from './form/FluxFormCheckbox.vue';
    import FluxPaginationBar from './FluxPaginationBar.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import FluxTable from './table/FluxTable.vue';
    import FluxTableBar from './table/FluxTableBar.vue';
    import FluxTableCell from './table/FluxTableCell.vue';
    import FluxTableHeader from './table/FluxTableHeader.vue';
    import FluxTableRow from './table/FluxTableRow.vue';
    import { PassThrough } from './primitive';
    import $style from '~flux/components/css/component/Table.module.scss';

    type SelectionId = string | number;
    type SelectionValue = SelectionId | null | SelectionId[];
    type ItemEntry = {
        readonly key: SelectionId;
        readonly index: number;
        readonly item: T;
    };
    type RowState = {
        readonly color: FluxColor | undefined;
        readonly isClickable: boolean;
        readonly isExpandable: boolean;
        readonly isExpanded: boolean;
        readonly isSelected: boolean;
        readonly isToggle: boolean;
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

    const emit = defineEmits<{
        limit: [number];
        navigate: [number];
        loadMore: [];
        rowClick: [item: T, columnIndex: number, event: MouseEvent];
        rowIntent: [item: T];
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
        expandStyle = 'inline',
        expandTrigger = 'button',
        groupBy,
        hasMore = false,
        isExpandLoading,
        isFilled = false,
        isHoverable = false,
        isLoading = false,
        isLoadingMore = false,
        isSticky = false,
        items,
        limits = [],
        page = 1,
        pagination = 'pages',
        perPage: perPageProp,
        rowColor,
        selectionMode,
        total: totalProp,
        uniqueKey
    } = defineProps<{
        readonly canExpand?: (item: T) => boolean;
        readonly collapseMode?: 'hide' | 'unmount';
        readonly expandMode?: 'single' | 'multiple';
        readonly expandStyle?: 'inline' | 'card';
        readonly expandTrigger?: 'button' | 'row';
        readonly groupBy?: (item: T) => SelectionId;
        readonly hasMore?: boolean;
        readonly isExpandLoading?: (item: T) => boolean;
        readonly isFilled?: boolean;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isLoadingMore?: boolean;
        readonly isSticky?: boolean;
        readonly items: T[];
        readonly limits?: number[];
        readonly page?: number;
        readonly pagination?: 'pages' | 'infinite';
        readonly perPage?: number;
        readonly rowColor?: (item: T) => FluxColor | undefined;
        readonly selectionMode?: 'single' | 'multiple';
        readonly total?: number;
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

    const IGNORED_SLOTS: string[] = ['filter', 'header', 'footer', 'pagination', 'expandable', 'group', 'empty', 'loading', 'selection'];

    // Long enough to skip the rows a pointer only passes over on its way.
    const INTENT_DELAY = 150;

    let intentTimer = 0;

    const instance = getCurrentInstance();
    const sentinel = useTemplateRef<HTMLElement>('sentinel');
    const table = useTemplateRef('table');
    const treeDisabled = useDisabledInjection();
    const translate = useTranslate();

    const hasRowClickListener = computed(() => !!instance?.vnode?.props?.onRowClick);
    const isRowInteractive = computed(() => (!!selectionMode && !unref(treeDisabled)) || unref(hasRowClickListener));

    const isAtEnd = useInView(sentinel);

    const perPage = computed(() => perPageProp ?? items.length);
    const total = computed(() => totalProp ?? items.length);

    // ARIA marks a row count that is not known (yet) as -1.
    const ariaRowcount = computed(() => totalProp === undefined && hasMore ? -1 : unref(total) + 1);

    const limitedItems = computed(() => pagination === 'infinite' ? items : items.slice(0, unref(perPage)));

    const hasExpandable = computed(() => 'expandable' in slots);
    const hasExpandColumn = computed(() => unref(hasExpandable) && expandTrigger === 'button');

    const leadingColumnCount = computed(() => (selectionMode ? 1 : 0) + (unref(hasExpandColumn) ? 1 : 0));

    const leadingPinned = computed(() => {
        const columns = unref(table)?.columns;

        return columns?.[unref(leadingColumnCount)]?.pinned === 'start';
    });
    const columnCount = computed(() => {
        const userColumns = Object.keys(slots).filter(name => !IGNORED_SLOTS.includes(name)).length;
        return userColumns + unref(leadingColumnCount);
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
        const states = new Map<SelectionId, RowState>();
        const isDisabled = unref(treeDisabled);
        const isInteractive = unref(isRowInteractive);

        for (const chunk of unref(renderChunks)) {
            for (const entry of chunk.entries) {
                const isExpandable = isRowExpandable(entry.item);
                const isToggle = expandTrigger === 'row' && isExpandable;

                states.set(entry.key, {
                    color: rowColor?.(entry.item),
                    isClickable: isInteractive || (isToggle && !isDisabled),
                    isExpandable,
                    isExpanded: isItemExpanded(entry.item),
                    isSelected: isItemSelected(entry.item),
                    isToggle
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
        if (pagination === 'pages') {
            unref(table)?.$el.scrollTo(0, 0);
        }
    });

    // Also after a page arrived, since a short page can leave the end in view.
    watch([isAtEnd, () => items.length], () => {
        if (pagination === 'infinite' && isAtEnd.value && hasMore && !isLoading && !isLoadingMore) {
            emit('loadMore');
        }
    });

    onBeforeUnmount(() => window.clearTimeout(intentTimer));

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

    function onRowPointerEnter(item: T): void {
        window.clearTimeout(intentTimer);
        intentTimer = window.setTimeout(() => emit('rowIntent', item), INTENT_DELAY);
    }

    function onRowPointerLeave(): void {
        window.clearTimeout(intentTimer);
    }

    function onRowClick(item: T, columnIndex: number, event: MouseEvent): void {
        if (unref(treeDisabled)) {
            return;
        }

        if (expandTrigger === 'row' && isRowExpandable(item)) {
            toggleExpand(item);
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
