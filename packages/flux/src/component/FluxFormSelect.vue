<template>
    <SelectBase
        v-model:search-query="searchQueryModel"
        :is-disabled="isDisabled"
        :is-multiple="isMultiple"
        :is-searchable="isSearchable"
        :options="groups"
        :placeholder="placeholder"
        :selected="selected"
        @deselect="deselect"
        @select="select"/>
</template>

<script
    lang="ts"
    setup>
    import { toRefs, unref } from 'vue';
    import { FormSelectValue, useFormSelect, UseFormSelectStaticProps } from '@/composable/private';
    import { SelectBase } from '@/component/primitive';

    export type Props = UseFormSelectStaticProps;

    const searchQueryModel = defineModel<string>('search', {default: ''});
    const modelValue = defineModel<FormSelectValue>({required: true});
    const props = defineProps<Props>();
    const {isMultiple, options} = toRefs(props);

    const {groups, selected} = useFormSelect(modelValue, isMultiple, options, searchQueryModel);

    function deselect(id: string | number | null): void {
        const val = unref(modelValue);

        if (Array.isArray(val)) {
            modelValue.value = val.filter(v => v !== id);
        }
    }

    function select(id: string | number | null): void {
        const val = unref(modelValue);

        if (Array.isArray(val)) {
            modelValue.value = [...val, id];
        } else {
            modelValue.value = id;
        }
    }
</script>
