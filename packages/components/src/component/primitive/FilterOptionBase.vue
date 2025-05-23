<template>
    <FluxMenuGroup>
        <div
            v-if="isSearchable"
            :class="$style.filterSearch">
            <FluxFormInput
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
    import type { FluxFilterOptionItem, FluxFilterOptionRow, FluxFilterValueSingle } from '@flux-ui/types';
    import { isFluxFilterOptionHeader, isFluxFilterOptionItem } from '$flux/data';
    import FluxMenuItem from '$flux/component/FluxMenuItem.vue';
    import FluxFormInput from '$flux/component/FluxFormInput.vue';
    import FluxMenuGroup from '$flux/component/FluxMenuGroup.vue';
    import FluxMenuSubHeader from '$flux/component/FluxMenuSubHeader.vue';
    import $style from '$flux/css/component/Filter.module.scss';

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
