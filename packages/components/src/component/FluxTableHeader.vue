<template>
    <th
        :class="clsx(
            $style.tableHeader,
            isShrinking && $style.isShrinking,
            isSticky && $style.isSticky,
            pinned && $style.isPinned
        )"
        scope="col"
        :aria-sort="isSortable ? (sort ?? 'none') : undefined"
        :style="{
            minWidth: `${minWidth}px`
        }">
        <div
            :class="$style.tableHeaderContent"
            :style="{
                justifyContent: align,
                textAlign: align
            }">
            <slot/>

            <FluxFlyout v-if="isSortable">
                <template #opener="{open}">
                    <button
                        :class="$style.tableSort"
                        :aria-label="translate('flux.sort')"
                        tabindex="-1"
                        type="button"
                        @click="open">
                        <FluxIcon
                            :size="16"
                            :name="sortingIcon"/>
                    </button>
                </template>

                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            :is-highlighted="sort === 'ascending'"
                            icon-leading="arrow-down-a-z"
                            :label="translate('flux.sortAscending')"
                            @click="$emit('sort', 'ascending')"/>

                        <FluxMenuItem
                            :is-highlighted="sort === 'descending'"
                            icon-leading="arrow-up-a-z"
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
    </th>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, type VNode } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
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
        minWidth = 0,
        sort
    } = defineProps<{
        readonly align?: 'start' | 'center' | 'end';
        readonly isShrinking?: boolean;
        readonly isSortable?: boolean;
        readonly minWidth?: number;
        readonly pinned?: boolean;
        readonly sort?: 'ascending' | 'descending';
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const {isSticky} = useTableInjection();
    const translate = useTranslate();

    const sortingIcon = computed((): FluxIconName => {
        switch (sort) {
            case 'ascending':
                return 'arrow-down-a-z';

            case 'descending':
                return 'arrow-up-a-z';

            default:
                return 'arrow-up-arrow-down';
        }
    });
</script>
