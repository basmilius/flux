<template>
    <SelectBase
        v-model:search-query="modelSearch"
        :aria-invalid="error ? true : undefined"
        :class="clsx(
            isCondensed && $formStyle.isCondensed,
            isSecondary && $formStyle.isSecondary,
            error && $formStyle.isInvalid
        )"
        :auto-focus="autoFocus"
        :disabled="disabled"
        :is-loading="isLoading || isFetchingLoading"
        :is-multiple="isMultiple"
        :is-readonly="isReadonly"
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
    import { computed, ref, type Ref, toRef, unref, watch } from 'vue';
    import { SelectBase } from '~flux/components/component/primitive';
    import { useDisabled } from '~flux/components/composable';
    import { useFormSelect } from '~flux/components/composable/private';
    import { isFluxFormSelectOption } from '~flux/components/data';
    import $formStyle from '~flux/components/css/component/Form.module.scss';

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
        readonly fetchOptions: (ids: FluxFormSelectValueSingle[]) => Promise<FluxFormSelectEntry[]>;
        readonly fetchRelevant: () => Promise<FluxFormSelectEntry[]>;
        readonly fetchSearch: (searchQuery: string) => Promise<FluxFormSelectEntry[]>;

        readonly isMultiple?: boolean;
    }>();

    const selectedOptions = ref<FluxFormSelectEntry[]>([]);
    const visibleOptions = ref<FluxFormSelectEntry[]>([]);

    let selectedGeneration = 0;
    let visibleGeneration = 0;

    const disabled = useDisabled(toRef(() => componentDisabled));

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

    watch(values, async values => {
        const definedValues = values.filter(value => value !== null && value !== undefined);

        if (definedValues.length === 0) {
            ++selectedGeneration;
            selectedOptions.value = [];
            return;
        }

        const generation = ++selectedGeneration;
        const options = await unref(fetchOptions)(definedValues);

        if (generation === selectedGeneration) {
            selectedOptions.value = options;
        }
    }, {immediate: true});

    watch(debouncedModelSearch, async searchQuery => {
        const generation = ++visibleGeneration;
        const options = searchQuery.length > 0
            ? await unref(fetchSearch)(searchQuery)
            : await unref(fetchRelevant)();

        if (generation === visibleGeneration) {
            visibleOptions.value = options;
        }
    });

    function onDeselect(id: string | number | null): void {
        if (isMultiple) {
            modelValue.value = unref(values).filter(v => v !== id);
        }
    }

    async function onOpen(): Promise<void> {
        const generation = ++visibleGeneration;
        const search = unref(modelSearch).trim();
        const options = search.length > 0
            ? await unref(fetchSearch)(search)
            : await unref(fetchRelevant)();

        if (generation === visibleGeneration) {
            visibleOptions.value = options;
        }
    }

    function onSelect(id: string | number | null): void {
        if (isMultiple) {
            modelValue.value = [...unref(values), id];
        } else {
            modelValue.value = id;
        }
    }
</script>
