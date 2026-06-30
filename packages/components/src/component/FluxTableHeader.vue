<template>
    <th
        :class="clsx(
            $style.tableHeader,
            isShrinking && $style.isShrinking,
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
    </th>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, unref, type VNode } from 'vue';
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
        dataType = 'text',
        minWidth = 0,
        sort
    } = defineProps<{
        readonly align?: 'start' | 'center' | 'end';
        readonly dataType?: 'text' | 'numeric' | 'date';
        readonly isShrinking?: boolean;
        readonly isSortable?: boolean;
        readonly minWidth?: number;
        readonly pinned?: boolean;
        readonly sort?: 'ascending' | 'descending';
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const translate = useTranslate();

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
