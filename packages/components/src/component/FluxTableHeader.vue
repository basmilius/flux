<template>
    <div
        ref="header"
        :class="clsx(
            $style.tableHeader,
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
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, onUnmounted, unref, useTemplateRef, type VNode } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import type { FluxTableColumnDef } from '~flux/components/data';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxSeparator from './FluxSeparator.vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    defineEmits<{
        sort: ['ascending' | 'descending' | null];
    }>();

    const {
        align,
        dataType = 'text',
        isShrinking,
        maxWidth,
        minWidth,
        pinned,
        sort,
        width
    } = defineProps<{
        readonly align?: 'start' | 'center' | 'end';
        readonly dataType?: 'text' | 'numeric' | 'date';
        readonly isShrinking?: boolean;
        readonly isSortable?: boolean;
        readonly maxWidth?: number;
        readonly minWidth?: number;
        readonly pinned?: boolean | 'start' | 'end';
        readonly sort?: 'ascending' | 'descending';
        readonly width?: number;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const header = useTemplateRef('header');

    const {
        pinnedEdges,
        pinnedOffsets,
        registerColumn
    } = useTableInjection();

    const translate = useTranslate();

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
        isShrinking,
        maxWidth,
        minWidth,
        pinned: pinnedSide.value,
        width
    }));

    const unregisterColumn = registerColumn(header, columnDef);
    onUnmounted(unregisterColumn);

    function getColumnIndex(): number {
        const element = header.value;

        return element?.parentElement ? Array.prototype.indexOf.call(element.parentElement.children, element) : -1;
    }

    const isPinnedEdge = computed(() => {
        if (!pinnedSide.value) {
            return false;
        }

        const columnIndex = getColumnIndex();

        return pinnedSide.value === 'start'
            ? columnIndex === pinnedEdges.value.start
            : columnIndex === pinnedEdges.value.end;
    });

    const headerStyle = computed(() => {
        const style: Record<string, string> = {};

        if (align) {
            style.justifyContent = align;
            style.textAlign = align;
        }

        if (pinnedSide.value) {
            const offset = pinnedOffsets.value.get(getColumnIndex()) ?? 0;

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
</script>
