<template>
    <FluxMenuGroup>
        <FluxFormInput
            v-if="isSearchable"
            v-model="modelSearch"
            auto-complete="off"
            is-secondary
            icon-before="magnifying-glass"
            :placeholder="searchPlaceholder"
            type="search"/>

        <FluxMenuItem
            v-if="isLoading && options.length === 0"
            disabled
            is-loading/>

        <template
            v-else
            v-for="option of options">
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
    import type { FluxFilterOptionItem, FluxFilterOptionRow, FluxFilterValueSingle } from '@/data';
    import { isFluxFilterOptionHeader, isFluxFilterOptionItem } from '@/data';
    import FluxMenuItem from '../FluxMenuItem.vue';
    import FluxFormInput from '../FluxFormInput.vue';
    import FluxMenuGroup from '../FluxMenuGroup.vue';
    import FluxMenuSubHeader from '../FluxMenuSubHeader.vue';

    export type Emits = {
        (e: 'select', value: FluxFilterValueSingle): void;
    };

    export type Props = {
        readonly isLoading?: boolean;
        readonly isSearchable?: boolean;
        readonly options: FluxFilterOptionRow[];
        readonly selected: FluxFilterValueSingle[];
        readonly searchPlaceholder?: string;
    };

    const emit = defineEmits<Emits>();
    const modelSearch = defineModel<string>('searchQuery', {default: ''});
    defineProps<Props>();

    function select(option: FluxFilterOptionItem): void {
        emit('select', option.value);
    }
</script>
