<template>
    <SelectBase
        v-model:searchQuery="modelSearch"
        :aria-invalid="error ? true : undefined"
        :class="clsx(
            isCondensed && $formStyle.isCondensed,
            isSecondary && $formStyle.isSecondary,
            error && $formStyle.isInvalid
        )"
        :disabled="disabled"
        :is-loading="isLoading"
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
    import type { FluxFormInputBaseProps, FluxFormSelectEntry, FluxFormSelectValue } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { toRef, unref } from 'vue';
    import { SelectBase } from '$flux/component/primitive';
    import { useDisabled } from '$flux/composable';
    import { useFormSelect } from '$flux/composable/private';
    import $formStyle from '$flux/css/component/Form.module.scss';

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
    } = defineProps<Pick<FluxFormInputBaseProps, 'autoFocus' | 'disabled' | 'error' | 'isCondensed' | 'isLoading' | 'isReadonly' | 'isSecondary' | 'name' | 'placeholder'> & {
        readonly isMultiple?: boolean;
        readonly isSearchable?: boolean;
        readonly options: FluxFormSelectEntry[];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {groups, selected, values} = useFormSelect(modelValue, isMultiple, toRef(() => options), modelSearch);

    function onDeselect(id: string | number | null): void {
        if (isMultiple) {
            modelValue.value = unref(values).filter(v => v !== id);
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
