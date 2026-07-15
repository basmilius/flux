<template>
    <FluxMenuGroup>
        <div
            v-if="isSearchable"
            :class="$style.filterSearch">
            <FluxFormInput
                ref="search"
                v-model="modelSearch"
                auto-complete="off"
                is-secondary
                icon-leading="magnifying-glass"
                :placeholder="searchPlaceholder"
                type="search"/>
        </div>

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
    import { onMounted, useTemplateRef } from 'vue';
    import { isFluxFilterOptionHeader, isFluxFilterOptionItem } from '~flux/components/util';
    import FluxFormInput from '../FluxFormInput.vue';
    import FluxMenuGroup from '../FluxMenuGroup.vue';
    import FluxMenuItem from '../FluxMenuItem.vue';
    import FluxMenuSubHeader from '../FluxMenuSubHeader.vue';
    import $style from '~flux/components/css/component/Filter.module.scss';

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

    const searchInputRef = useTemplateRef<{ focus(): void }>('search');

    onMounted(() => {
        requestAnimationFrame(() => searchInputRef.value?.focus());
    });

    function select(option: FluxFilterOptionItem): void {
        emit('select', option.value);
    }
</script>
