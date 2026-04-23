<template>
    <SelectBase
        v-model:search-query="modelSearch"
        :aria-invalid="error ? true : undefined"
        :class="clsx(
            isCondensed && $formStyle.isCondensed,
            isSecondary && $formStyle.isSecondary,
            error && $formStyle.isInvalid
        )"
        :disabled="disabled"
        :is-loading="isLoading || isFetchingLoading"
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
    import { useDebouncedRef, useLoaded } from '@basmilius/common';
    import type { FluxFormInputBaseProps, FluxFormSelectEntry, FluxFormSelectValue, FluxFormSelectValueSingle } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, type Ref, ref, toRef, unref, watch } from 'vue';
    import { SelectBase } from '$flux/component/primitive';
    import { useDisabled } from '$flux/composable';
    import { useFormSelect } from '$flux/composable/private';
    import { isFluxFormSelectOption } from '$flux/data';
    import $formStyle from '$flux/css/component/Form.module.scss';

    const modelSearch = defineModel<string>('searchQuery', {
        default: ''
    });

    const modelValue = defineModel<FluxFormSelectValue>({
        required: true
    });

    const {
        fetchOptions: fetchOptionsProp,
        fetchRelevant: fetchRelevantProp,
        fetchSearch: fetchSearchProp,
        disabled: componentDisabled,
        isMultiple
    } = defineProps<Pick<FluxFormInputBaseProps, 'autoFocus' | 'disabled' | 'error' | 'isCondensed' | 'isLoading' | 'isReadonly' | 'isSecondary' | 'name' | 'placeholder'> & {
        fetchOptions(ids: FluxFormSelectValueSingle[]): Promise<FluxFormSelectEntry[]>;
        fetchRelevant(): Promise<FluxFormSelectEntry[]>;
        fetchSearch(searchQuery: string): Promise<FluxFormSelectEntry[]>;

        readonly isMultiple?: boolean;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const selectedOptions = ref<FluxFormSelectEntry[]>([]);
    const visibleOptions = ref<FluxFormSelectEntry[]>([]);

    const options = computed(() => {
        const options: FluxFormSelectEntry[] = [];
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
    const {isLoading: isFetchingLoading, loaded} = useLoaded();
    const debouncedModelSearch = useDebouncedRef(modelSearch, 300) as unknown as Ref<string>;
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
