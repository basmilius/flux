<template>
    <th
        class="flux-table-cell flux-table-header"
        :class="{
            'is-bordered': isBordered,
            'is-shrinking': isShrinking,
            'is-sticky': isSticky
        }"
        :style="{
            minWidth: `${minWidth}px`
        }">
        <div class="flux-table-cell-content flux-table-header-content">
            <slot/>

            <FluxFlyout v-if="isSortable">
                <template #opener="{open}">
                    <button
                        class="flux-table-header-sort"
                        :aria-label="translate('flux.sort')"
                        tabindex="-1"
                        type="button"
                        @click="open">
                        <FluxIcon
                            :size="16"
                            :variant="sortingIcon"/>
                    </button>
                </template>

                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            :is-highlighted="sort === 'ascending'"
                            icon-before="arrow-down-a-z"
                            :label="translate('flux.sortAscending')"
                            @click="$emit('sort', 'ascending')"/>

                        <FluxMenuItem
                            :is-highlighted="sort === 'descending'"
                            icon-before="arrow-up-a-z"
                            :label="translate('flux.sortDescending')"
                            @click="$emit('sort', 'descending')"/>
                    </FluxMenuGroup>

                    <template v-if="sort">
                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-before="circle-xmark"
                                is-destructive
                                :label="translate('flux.sortRemove')"
                                @click="$emit('sort', null)"/>
                        </FluxMenuGroup>
                    </template>
                </FluxMenu>
            </FluxFlyout>
        </div>
    </th>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue';
    import { useTableInjection } from '@/composable';
    import { useTranslate } from '@/composable/private';
    import type { IconNames } from '@/data';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxSeparator from './FluxSeparator.vue';

    export interface Emits {
        (e: 'sort', sort: 'ascending' | 'descending' | null): void;
    }

    export interface Props {
        readonly isShrinking?: boolean;
        readonly isSortable?: boolean;
        readonly isSticky?: boolean;
        readonly minWidth?: number;
        readonly sort?: 'ascending' | 'descending' | null;
    }

    defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        minWidth: 0,
        sort: null
    });

    const {isBordered} = useTableInjection();
    const translate = useTranslate();

    const sortingIcon = computed((): IconNames => {
        switch (props.sort) {
            case 'ascending':
                return 'arrow-down-a-z';

            case 'descending':
                return 'arrow-up-a-z';
        }

        return 'arrow-up-arrow-down';
    });
</script>

<style lang="scss">
    .flux-table-header {
        border-bottom: 2px solid rgb(var(--gray-4) / .75);
        color: var(--foreground-prominent);
        font-size: 14px;

        &.is-shrinking {
            width: 0;
            white-space: nowrap;
        }

        &.is-sticky {
            position: sticky;
            top: 0;
            background: rgb(var(--gray-1));
        }

        &-content {
            align-items: center;
        }

        &-sort {
            display: flex;
            height: 24px;
            width: 24px;
            margin: -3px -6px -3px 6px;
            padding: 0;
            align-items: center;
            justify-content: center;
            background: unset;
            border: 0;
            border-radius: calc(var(--radius) / 2);
            color: var(--foreground-secondary);
            cursor: pointer;
            outline: 0;

            &:hover {
                background: rgb(var(--gray-2));
                color: var(--foreground);
            }
        }
    }
</style>
