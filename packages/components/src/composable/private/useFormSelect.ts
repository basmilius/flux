import type { FluxFormSelectEntry, FluxFormSelectOption, FluxFormSelectOptions, FluxFormSelectValue } from '@flux-ui/types';
import { computed, type Ref, unref } from 'vue';
import { isFluxFormSelectGroup, isFluxFormSelectOption } from '~flux/components/data';

export default function (modelValue: Ref<FluxFormSelectValue>, isMultiple: boolean, options: Ref<FluxFormSelectEntry[]>, searchQuery?: Ref<string>, selectionOptions: Ref<FluxFormSelectEntry[]> = options) {
    const values = computed(() => {
        const model = unref(modelValue);
        return Array.isArray(model) ? model : [model];
    });

    const selectedValues = computed(() => new Set(unref(values)));
    const optionByValue = computed(() => {
        const index = new Map<FluxFormSelectOption['value'], FluxFormSelectOption>();

        for (const option of unref(selectionOptions)) {
            if (isFluxFormSelectOption(option) && !index.has(option.value)) {
                index.set(option.value, option);
            }
        }

        return index;
    });

    const groups = computed(() => {
        const groups: FluxFormSelectOptions[] = [];
        const search = unref(searchQuery)?.trim().toLowerCase();

        const available = unref(options)
            .filter(o => isFluxFormSelectGroup(o) || (!search || o.label.toLowerCase().includes(search)))
            .filter(o => isFluxFormSelectGroup(o) || !isMultiple || !unref(selectedValues).has(o.value));

        if (available.length === 0) {
            return [];
        }

        if (!available.find(isFluxFormSelectGroup)) {
            return [[null, available]] as FluxFormSelectOptions[];
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
        .map(v => unref(optionByValue).get(v))
        .filter(isFluxFormSelectOption));

    return {
        groups,
        selected,
        values
    };
}
