import type { FluxFormSelectGroup, FluxFormSelectOption } from '@/data';
import { isFluxFormSelectGroup, isFluxFormSelectOption } from '@/data';
import { computed, ComputedRef, Ref, unref } from 'vue';

export default function (modelValue: Ref<FormSelectValue>, isMultiple: Ref<boolean>, options: Ref<FormSelectOption[]>, searchQuery?: Ref<string>): UseFormSelect {
    const values = computed(() => {
        const model = unref(modelValue);
        return Array.isArray(model) ? model : [model];
    });

    const groups = computed(() => {
        const groups: FormSelectGroup[] = [];
        const search = unref(searchQuery)?.trim().toLowerCase();

        const available = unref(options)
            .filter(o => isFluxFormSelectGroup(o) || (!search || o.label.toLowerCase().includes(search)))
            .filter(o => isFluxFormSelectGroup(o) || !unref(isMultiple) || !unref(selected).find(s => s.id === o.id));

        if (available.length === 0) {
            return [];
        }

        if (!available.find(isFluxFormSelectGroup)) {
            return [[null, available]] as FormSelectGroup[];
        }

        for (let i = 0; i < available.length;) {
            const item = available[i];

            if (isFluxFormSelectOption(item)) {
                ++i;
                groups.push([null, [item]]);
                continue;
            }

            const subItems: FluxFormSelectOption[] = [];

            for (++i; i <= available.length; ++i) {
                const subItem = available[i];

                if (isFluxFormSelectGroup(subItem) || i === available.length) {
                    if (subItems.length > 0) {
                        groups.push([item, subItems]);
                    }

                    break;
                }

                subItems.push(subItem);
            }
        }

        return groups;
    });

    const selected = computed(() => unref(values)
        .map(v => unref(options).find(o => isFluxFormSelectOption(o) && o.id === v))
        .filter(isFluxFormSelectOption));

    return {
        groups,
        selected,
        values
    };
}

type UseFormSelect = {
    readonly groups: ComputedRef<FormSelectGroup[]>;
    readonly selected: ComputedRef<FluxFormSelectOption[]>;
    readonly values: ComputedRef<FormSelectValueSingle[]>;
};

type UseFormSelectProps = {
    readonly isDisabled?: boolean;
    readonly isMultiple?: boolean;
    readonly placeholder?: string;
};

export type UseFormSelectAsyncProps = UseFormSelectProps & {
    readonly fetchOptions: (ids: FormSelectValueSingle[]) => Promise<FormSelectOption[]>;
    readonly fetchRelevant: () => Promise<FormSelectOption[]>;
    readonly fetchSearch: (searchQuery: string) => Promise<FormSelectOption[]>;
};

export type UseFormSelectStaticProps = UseFormSelectProps & {
    readonly isSearchable?: boolean;
    readonly options: FormSelectOption[];
};

export type FormSelectGroup = [FormSelectOption | null, FluxFormSelectOption[]];
export type FormSelectOption = FluxFormSelectGroup | FluxFormSelectOption;
export type FormSelectValue = FormSelectValueSingle | FormSelectValueSingle[];
export type FormSelectValueSingle = string | number | null;
