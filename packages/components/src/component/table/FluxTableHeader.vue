<template>
    <div
        ref="header"
        :class="clsx(
            $style.tableHeader,
            isResizable && $style.isResizable,
            isShrinking && $style.isShrinking,
            pinnedSide === 'start' && $style.isPinnedStart,
            pinnedSide === 'end' && $style.isPinnedEnd,
            isPinnedEdge && $style.isPinnedEdge
        )"
        role="columnheader"
        :aria-sort="isSortable ? (sort ?? 'none') : undefined"
        :style="headerStyle">
        <slot/>

        <FluxFlyout v-if="isSortable">
            <template #opener="{open}">
                <button
                    :class="$style.tableSort"
                    :aria-label="translate('flux.sort')"
                    type="button"
                    @click="open">
                    <FluxIcon
                        :size="12"
                        :name="sortingIcon"/>
                </button>
            </template>

            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        :is-highlighted="sort === 'ascending'"
                        :icon-leading="ascendingIcon"
                        :label="translate('flux.sortAscending')"
                        @click="$emit('sort', 'ascending')"/>

                    <FluxMenuItem
                        :is-highlighted="sort === 'descending'"
                        :icon-leading="descendingIcon"
                        :label="translate('flux.sortDescending')"
                        @click="$emit('sort', 'descending')"/>
                </FluxMenuGroup>

                <template v-if="sort">
                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="circle-xmark"
                            is-destructive
                            :label="translate('flux.sortRemove')"
                            @click="$emit('sort', null)"/>
                    </FluxMenuGroup>
                </template>
            </FluxMenu>
        </FluxFlyout>

        <button
            v-if="isResizable"
            ref="resizeHandle"
            :class="clsx($style.tableResize, isDragging && $style.isDragging)"
            role="separator"
            aria-orientation="vertical"
            :aria-label="translate('flux.resizeColumn')"
            :aria-valuemax="maxWidth"
            :aria-valuemin="minWidth ?? MIN_RESIZE_WIDTH"
            :aria-valuenow="resizedWidth ?? width"
            type="button"
            @dblclick="resetWidth"
            @keydown="onResizeKeyDown"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clamp } from '@basmilius/utils';
    import { usePointerDrag } from '@basmilius/common';
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, onUnmounted, ref, unref, useTemplateRef, type VNode, watch } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import { useTableColumnIndex, useTranslate } from '~flux/components/composable/private';
    import type { FluxTableColumnDef } from '~flux/components/data';
    import FluxFlyout from '../FluxFlyout.vue';
    import FluxIcon from '../FluxIcon.vue';
    import FluxMenu from '../menu/FluxMenu.vue';
    import FluxMenuGroup from '../menu/FluxMenuGroup.vue';
    import FluxMenuItem from '../menu/FluxMenuItem.vue';
    import FluxSeparator from '../FluxSeparator.vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    const MIN_RESIZE_WIDTH = 48;
    const RESIZE_STEP = 12;
    const RESIZE_STEP_LARGE = 48;
    const RESIZE_THRESHOLD = 3;

    const emit = defineEmits<{
        resize: [number | null];
        sort: ['ascending' | 'descending' | null];
    }>();

    const {
        align,
        dataType = 'text',
        isNumeric,
        isShrinking,
        maxWidth,
        minWidth,
        noWrap,
        pinned,
        sort,
        width
    } = defineProps<{
        readonly align?: 'start' | 'center' | 'end';
        readonly dataType?: 'text' | 'numeric' | 'date';
        readonly isNumeric?: boolean;
        readonly isResizable?: boolean;
        readonly isShrinking?: boolean;
        readonly isSortable?: boolean;
        readonly maxWidth?: number;
        readonly minWidth?: number;
        readonly noWrap?: boolean;
        readonly pinned?: boolean | 'start' | 'end';
        readonly sort?: 'ascending' | 'descending';
        readonly width?: number;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const header = useTemplateRef('header');
    const resizeHandle = useTemplateRef<HTMLButtonElement>('resizeHandle');

    const resizedWidth = ref<number | null>(null);

    const {
        columns,
        pinnedEdges,
        pinnedOffsets,
        registerColumn
    } = useTableInjection();

    const translate = useTranslate();

    let dragStartWidth = 0;
    let widthBeforeDrag: number | null = null;

    const {isDragging} = usePointerDrag(resizeHandle, {
        axis: 'x',
        threshold: RESIZE_THRESHOLD,
        onStart() {
            dragStartWidth = unref(header)?.getBoundingClientRect().width ?? 0;
            widthBeforeDrag = unref(resizedWidth);
        },
        onMove({dx}) {
            resizedWidth.value = clampWidth(dragStartWidth + dx);
        },
        onEnd() {
            if (unref(resizedWidth) === widthBeforeDrag) {
                return;
            }

            emit('resize', unref(resizedWidth));
        }
    });

    const columnIndex = useTableColumnIndex(header, columns);

    const pinnedSide = computed<'start' | 'end' | null>(() => {
        if (pinned === true || pinned === 'start') {
            return 'start';
        }

        if (pinned === 'end') {
            return 'end';
        }

        return null;
    });

    const columnDef = computed<FluxTableColumnDef>(() => ({
        align,
        isNumeric,
        isShrinking,
        maxWidth,
        minWidth,
        noWrap,
        pinned: pinnedSide.value,
        width: resizedWidth.value ?? width
    }));

    const isPinnedEdge = computed(() => {
        if (!pinnedSide.value) {
            return false;
        }

        return pinnedSide.value === 'start'
            ? columnIndex.value === pinnedEdges.value.start
            : columnIndex.value === pinnedEdges.value.end;
    });

    const headerStyle = computed(() => {
        const style: Record<string, string> = {};

        if (align) {
            style.justifyContent = align;
            style.textAlign = align;
        }

        if (pinnedSide.value) {
            const offset = pinnedOffsets.value.get(columnIndex.value) ?? 0;

            if (pinnedSide.value === 'start') {
                style.left = `${offset}px`;
            } else {
                style.right = `${offset}px`;
            }
        }

        return style;
    });

    const ascendingIcon = computed((): FluxIconName => {
        switch (dataType) {
            case 'numeric':
                return 'arrow-down-1-9';

            case 'date':
                return 'arrow-down-short-wide';

            default:
                return 'arrow-down-a-z';
        }
    });

    const descendingIcon = computed((): FluxIconName => {
        switch (dataType) {
            case 'numeric':
                return 'arrow-up-9-1';

            case 'date':
                return 'arrow-up-wide-short';

            default:
                return 'arrow-up-a-z';
        }
    });

    const sortingIcon = computed((): FluxIconName => {
        switch (sort) {
            case 'ascending':
                return unref(ascendingIcon);

            case 'descending':
                return unref(descendingIcon);

            default:
                return 'arrow-up-arrow-down';
        }
    });

    watch(() => width, () => {
        resizedWidth.value = null;
    });

    function clampWidth(value: number): number {
        return Math.round(clamp(value, minWidth ?? MIN_RESIZE_WIDTH, maxWidth ?? Number.POSITIVE_INFINITY));
    }

    function resetWidth(): void {
        resizedWidth.value = null;
        emit('resize', null);
    }

    function onResizeKeyDown(evt: KeyboardEvent): void {
        if (evt.key === 'Home') {
            evt.preventDefault();
            resetWidth();
            return;
        }

        if (evt.key !== 'ArrowLeft' && evt.key !== 'ArrowRight') {
            return;
        }

        evt.preventDefault();

        const step = evt.shiftKey ? RESIZE_STEP_LARGE : RESIZE_STEP;
        const current = unref(resizedWidth) ?? unref(header)?.getBoundingClientRect().width ?? 0;

        resizedWidth.value = clampWidth(current + (evt.key === 'ArrowLeft' ? -step : step));
        emit('resize', unref(resizedWidth));
    }

    const unregisterColumn = registerColumn(header, columnDef);
    onUnmounted(unregisterColumn);
</script>
