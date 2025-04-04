<template>
    <SelectBase
        v-model:search-query="modelSearch"
        :disabled="disabled"
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
    import { useDebouncedRef } from '@basmilius/flux-internals';
    import { computed, ref, toRef, unref, watch } from 'vue';
    import { SelectBase } from '$flux/component/primitive';
    import { useDisabled } from '$flux/composable';
    import { FormSelectOption, FormSelectValue, FormSelectValueSingle, useFormSelect, useLoaded } from '$flux/composable/private';
    import { isFluxFormSelectOption } from '$flux/data';

    const modelSearch = defineModel<string>('searchQuery', {
        default: ''
    });

    const modelValue = defineModel<FormSelectValue>({
        required: true
    });

    const {
        fetchOptions: fetchOptionsProp,
        fetchRelevant: fetchRelevantProp,
        fetchSearch: fetchSearchProp,
        disabled: componentDisabled,
        isMultiple
    } = defineProps<{
        fetchOptions(ids: FormSelectValueSingle[]): Promise<FormSelectOption[]>;
        fetchRelevant(): Promise<FormSelectOption[]>;
        fetchSearch(searchQuery: string): Promise<FormSelectOption[]>;

        readonly disabled?: boolean;
        readonly isMultiple?: boolean;
        readonly placeholder?: string;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const selectedOptions = ref<FormSelectOption[]>([]);
    const visibleOptions = ref<FormSelectOption[]>([]);

    const options = computed(() => {
        const options: FormSelectOption[] = [];
        const search = unref(modelSearch);
        const selected = unref(selectedOptions);
        const visible = unref(visibleOptions);

        visible.forEach(vo => options.push(vo));

        selected.forEach(so => {
            if (isFluxFormSelectOption(so) && visible.find(vo => isFluxFormSelectOption(vo) && vo.value === so.value)) {
                return;
            }

            if (isFluxFormSelectOption(so) && !so.label.toLowerCase().includes(search.toLowerCase())) {
                return;
            }

            options.push(so);
        });

        return options;
    });

    const {groups, selected, values} = useFormSelect(modelValue, isMultiple, options);
    const {isLoading, loaded} = useLoaded();
    const debouncedModelSearch = useDebouncedRef(modelSearch, 300);
    const fetchOptions = computed(() => loaded(fetchOptionsProp));
    const fetchRelevant = computed(() => loaded(fetchRelevantProp));
    const fetchSearch = computed(() => loaded(fetchSearchProp));

    function onDeselect(id: string | number | null): void {
        if (isMultiple) {
            modelValue.value = unref(values).filter(v => v !== id);
        }
    }

    async function onOpen(): Promise<void> {
        visibleOptions.value = await unref(fetchRelevant)();
    }

    function onSelect(id: string | number | null): void {
        if (isMultiple) {
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

    watch(debouncedModelSearch, async searchQuery => {
        if (searchQuery.length > 0) {
            visibleOptions.value = await unref(fetchSearch)(searchQuery);
        } else {
            visibleOptions.value = await unref(fetchRelevant)();
        }
    });
</script>
