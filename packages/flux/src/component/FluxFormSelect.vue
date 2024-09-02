<template>
    <SelectBase
        v-model:search-query="searchQueryModel"
        :is-disabled="isDisabled"
        :is-multiple="isMultiple"
        :is-searchable="isSearchable"
        :options="groups"
        :placeholder="placeholder"
        :selected="selected"
        @deselect="onDeselect"
        @select="onSelect"/>
</template>

<script
    lang="ts"
    setup>
    import { toRefs, unref } from 'vue';
    import { SelectBase } from '@/component/primitive';
    import { FormSelectOption, FormSelectValue, useFormSelect } from '@/composable/private';

    export type Props = {
        readonly isDisabled?: boolean;
        readonly isMultiple?: boolean;
        readonly placeholder?: string;
        readonly isSearchable?: boolean;
        readonly options: FormSelectOption[];
    };

    const searchQueryModel = defineModel<string>('search', {default: ''});
    const modelValue = defineModel<FormSelectValue>({required: true});
    const props = defineProps<Props>();
    const {isMultiple, options} = toRefs(props);

    const {groups, selected, values} = useFormSelect(modelValue, isMultiple, options, searchQueryModel);

    function onDeselect(id: string | number | null): void {
        if (unref(isMultiple)) {
            modelValue.value = unref(values).filter(v => v !== id);
        }
    }

    function onSelect(id: string | number | null): void {
        if (unref(isMultiple)) {
            modelValue.value = [...unref(values), id];
        } else {
            modelValue.value = id;
        }
    }
</script>
