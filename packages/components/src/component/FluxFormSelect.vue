<template>
    <SelectBase
        v-model:searchQuery="modelSearch"
        :disabled="disabled"
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
    import type { FluxFormSelectEntry, FluxFormSelectValue } from '@flux-ui/types';
    import { toRef, unref } from 'vue';
    import { SelectBase } from '$flux/component/primitive';
    import { useDisabled } from '$flux/composable';
    import { useFormSelect } from '$flux/composable/private';

    const modelSearch = defineModel<string>('searchQuery', {
        default: ''
    });

    const modelValue = defineModel<FluxFormSelectValue>({
        required: true
    });

    const {
        disabled: componentDisabled,
        isMultiple,
        options
    } = defineProps<{
        readonly disabled?: boolean;
        readonly isMultiple?: boolean;
        readonly placeholder?: string;
        readonly isSearchable?: boolean;
        readonly options: FluxFormSelectEntry[];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {groups, selected, values} = useFormSelect(modelValue, isMultiple, options, modelSearch);

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
