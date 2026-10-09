<template>
    <FluxMenuGroup>
        <FluxFilterSearch
            v-if="isSearchable"
            v-model="modelSearch"
            :placeholder="searchPlaceholder"/>

        <FluxMenuItem
            v-if="isLoading && options.length === 0"
            disabled
            is-loading/>

        <template
            v-else
            v-for="option of options"
            :key="isFluxFilterOptionItem(option) ? String(option.value) : option.title">
            <FluxMenuSubHeader
                v-if="isFluxFilterOptionHeader(option)"
                :label="option.title"/>

            <FluxMenuItem
                v-else-if="isFluxFilterOptionItem(option)"
                is-selectable
                :is-selected="selected.includes(option.value)"
                :label="option.label"
                @click="select(option)"/>
        </template>
    </FluxMenuGroup>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterOptionItem, FluxFilterOptionRow, FluxFilterValueSingle } from '@flux-ui/types';
    import { isFluxFilterOptionHeader, isFluxFilterOptionItem } from '~flux/components/util';
    import FluxFilterSearch from '../filter/FluxFilterSearch.vue';
    import FluxMenuGroup from '../menu/FluxMenuGroup.vue';
    import FluxMenuItem from '../menu/FluxMenuItem.vue';
    import FluxMenuSubHeader from '../menu/FluxMenuSubHeader.vue';

    const emit = defineEmits<{
        select: [FluxFilterValueSingle];
    }>();

    const modelSearch = defineModel<string>('searchQuery', {
        default: ''
    });

    defineProps<{
        readonly isLoading?: boolean;
        readonly isSearchable?: boolean;
        readonly options: FluxFilterOptionRow[];
        readonly selected: FluxFilterValueSingle[];
        readonly searchPlaceholder?: string;
    }>();

    function select(option: FluxFilterOptionItem): void {
        emit('select', option.value);
    }
</script>
