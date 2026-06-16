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
        is-searchable
        :is-creatable="isCreatable"
        :is-loading="isLoading"
        :is-multiple="isMultiple"
        :options="groups"
        :placeholder="placeholder"
        :selected="selected"
        @create="onCreate"
        @deselect="onDeselect"
        @select="onSelect"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormInputBaseProps, FluxFormSelectEntry, FluxFormSelectOption, FluxFormSelectValue } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, ref, toRef, unref } from 'vue';
    import { SelectBase } from '~flux/components/component/primitive';
    import { useDisabled } from '~flux/components/composable';
    import { useFormSelect } from '~flux/components/composable/private';
    import { isFluxFormSelectGroup, isFluxFormSelectOption } from '~flux/components/data';
    import $formStyle from '~flux/components/css/component/Form.module.scss';

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
        readonly isCreatable?: boolean;
        readonly isMultiple?: boolean;
        readonly options: FluxFormSelectEntry[];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const createdOptions = ref<FluxFormSelectOption[]>([]);

    const allOptions = computed<FluxFormSelectEntry[]>(() => {
        const seen = new Set<string | number | null>();

        return [...options, ...createdOptions.value].filter(o => {
            if (isFluxFormSelectGroup(o)) {
                return true;
            }

            if (seen.has(o.value)) {
                return false;
            }

            seen.add(o.value);
            return true;
        });
    });

    const {groups, selected, values} = useFormSelect(modelValue, isMultiple, allOptions, modelSearch);

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

    function onCreate(query: string): void {
        const exists = unref(allOptions).some(o => isFluxFormSelectOption(o) && o.value === query);

        if (!exists) {
            createdOptions.value = [...createdOptions.value, {label: query, value: query}];
        }

        onSelect(query);
    }
</script>
