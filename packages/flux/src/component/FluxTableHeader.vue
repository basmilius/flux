<template>
    <th
        :class="clsx(
            styles.tableHeader,
            isBordered && styles.isBordered,
            isShrinking && styles.isShrinking,
            isSticky && styles.isSticky
        )"
        :style="{
            minWidth: `${minWidth}px`
        }">
        <div :class="styles.tableHeaderContent">
            <slot/>

            <FluxFlyout v-if="isSortable">
                <template #opener="{open}">
                    <button
                        :class="styles.tableSort"
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
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import { useTableInjection } from '@/composable';
    import { useTranslate } from '@/composable/private';
    import type { IconName } from '@/types';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxMenu from './FluxMenu.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxSeparator from './FluxSeparator.vue';
    import styles from '@/css/component/Table.module.scss';

    defineEmits<{
        sort: ['ascending' | 'descending' | null];
    }>();

    const {
        minWidth = 0,
        sort
    } = defineProps<{
        readonly isShrinking?: boolean;
        readonly isSortable?: boolean;
        readonly isSticky?: boolean;
        readonly minWidth?: number;
        readonly sort?: 'ascending' | 'descending';
    }>();

    defineSlots<{
        default(): any;
    }>();

    const {isBordered} = useTableInjection();
    const translate = useTranslate();

    const sortingIcon = computed((): IconName => {
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
