<template>
    <FluxMenuGroup>
        <FluxFormInput
            v-if="isSearchable"
            v-model="searchQuery"
            auto-complete="off"
            is-secondary
            icon-before="magnifying-glass"
            :placeholder="searchPlaceholder"
            type="search"/>

        <template
            v-for="(option, index) of options"
            :key="index">
            <FluxMenuSubHeader
                v-if="isFluxFilterOptionHeader(option)"
                :label="option.title"/>

            <FluxMenuItem
                v-else-if="isFluxFilterOptionItem(option)"
                is-selectable
                :is-selected="isSelected(option)"
                :label="option.label"
                @click="select(option)"/>
        </template>
    </FluxMenuGroup>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterOptionHeader, FluxFilterOptionItem, IconNames } from '@/data';
    import { isFluxFilterOptionHeader, isFluxFilterOptionItem } from '@/data';
    import { computed, ref, toRefs, unref, watch } from 'vue-demi';
    import { useFilterInjection } from '@/composables';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxMenuGroup from './FluxMenuGroup.vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import FluxMenuSubHeader from './FluxMenuSubHeader.vue';

    export interface Emits {
        (e: 'update:search', searchQuery: string): void;
    }

    export interface Props {
        readonly icon?: IconNames;
        readonly isSearchable?: boolean;
        readonly label: string;
        readonly name: string;
        readonly options: (FluxFilterOptionHeader | FluxFilterOptionItem)[];
        readonly search?: string;
        readonly searchPlaceholder?: string;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {search} = toRefs(props);

    const {back, state, setValue} = useFilterInjection();

    const searchQuery = ref('');

    const currentValue = computed(() => unref(state)[props.name]);

    function isSelected(option: FluxFilterOptionItem): boolean {
        return unref(currentValue) === option.value;
    }

    function select(option: FluxFilterOptionItem): void {
        if (unref(currentValue) === option.value) {
            setValue(props.name, undefined);
        } else {
            setValue(props.name, option.value);
        }

        back();
    }

    watch(() => search, () => searchQuery.value = search?.value ?? '', {immediate: true});

    watch(searchQuery, searchQuery => emit('update:search', searchQuery));
</script>
