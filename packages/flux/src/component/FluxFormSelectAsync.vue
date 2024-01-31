<template>
    <SelectBase
        v-model:search-query="searchQueryModel"
        :is-disabled="isDisabled"
        :is-loading="isLoading"
        :is-multiple="isMultiple"
        is-searchable
        :options="groups"
        :placeholder="placeholder"
        :selected="selected"
        @deselect="onDeselect"
        @open="onOpen()"
        @select="onSelect"/>
</template>

<script
    lang="ts"
    setup>
    import { computed, ref, toRefs, unref, watch } from 'vue';
    import { FormSelectOption, FormSelectValue, FormSelectValueSingle, useFormSelect, useLoaded } from '@/composable/private';
    import { SelectBase } from '@/component/primitive';
    import { isFluxFormSelectOption } from '@/data';

    export type Props = {
        readonly isDisabled?: boolean;
        readonly isMultiple?: boolean;
        readonly placeholder?: string;
        readonly fetchOptions: (ids: FormSelectValueSingle[]) => Promise<FormSelectOption[]>;
        readonly fetchRelevant: () => Promise<FormSelectOption[]>;
        readonly fetchSearch: (searchQuery: string) => Promise<FormSelectOption[]>;
    };

    const searchQueryModel = defineModel<string>('search', {default: ''});
    const modelValue = defineModel<FormSelectValue>({required: true});
    const props = defineProps<Props>();
    const {isMultiple} = toRefs(props);

    const selectedOptions = ref<FormSelectOption[]>([]);
    const visibleOptions = ref<FormSelectOption[]>([]);

    const options = computed(() => {
        const options: FormSelectOption[] = [];
        const selected = unref(selectedOptions);
        const visible = unref(visibleOptions);

        visible.forEach(vo => options.push(vo));

        selected.forEach(so => {
            if (isFluxFormSelectOption(so) && visible.find(vo => isFluxFormSelectOption(vo) && vo.id === so.id)) {
                return;
            }

            options.push(so);
        });

        return options;
    });

    const {groups, selected, values} = useFormSelect(modelValue, isMultiple, options);
    const {isLoading, loaded} = useLoaded();
    const fetchOptions = computed(() => loaded(props.fetchOptions));
    const fetchRelevant = computed(() => loaded(props.fetchRelevant));
    const fetchSearch = computed(() => loaded(props.fetchSearch));

    function onDeselect(id: string | number | null): void {
        if (unref(isMultiple)) {
            modelValue.value = unref(values).filter(v => v !== id);
        }
    }

    async function onOpen(): Promise<void> {
        visibleOptions.value = await unref(fetchRelevant)();
    }

    function onSelect(id: string | number | null): void {
        if (unref(isMultiple)) {
            modelValue.value = [...unref(values), id];
        } else {
            modelValue.value = id;
        }
    }

    watch(values, async values => {
        if (values.length === 0) {
            return;
        }

        selectedOptions.value = await unref(fetchOptions)(values);
    }, {immediate: true});

    watch(searchQueryModel, async searchQuery => {
        if (searchQuery.length > 0) {
            visibleOptions.value = await unref(fetchSearch)(searchQuery);
        } else {
            visibleOptions.value = await unref(fetchRelevant)();
        }
    });
</script>
