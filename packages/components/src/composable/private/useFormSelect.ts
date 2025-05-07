import type { FluxFormSelectEntry, FluxFormSelectOption, FluxFormSelectOptions, FluxFormSelectValue } from '@flux-ui/types';
import type { Ref } from 'vue';
import { computed, unref } from 'vue';
import { isFluxFormSelectGroup, isFluxFormSelectOption } from '$flux/data';

export default function (modelValue: Ref<FluxFormSelectValue>, isMultiple: boolean, options: Ref<FluxFormSelectEntry[]>, searchQuery?: Ref<string>) {
    const values = computed(() => {
        const model = unref(modelValue);
        return Array.isArray(model) ? model : [model];
    });

    const groups = computed(() => {
        const groups: FluxFormSelectOptions[] = [];
        const search = unref(searchQuery)?.trim().toLowerCase();

        const available = unref(options)
            .filter(o => !('value' in o) || (!search || o.label.toLowerCase().includes(search)))
            .filter(o => !('value' in o) || !isMultiple || !unref(selected).find(s => s.value === o.value));

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
        .map(v => unref(options).find(o => isFluxFormSelectOption(o) && o.value === v))
        .filter(isFluxFormSelectOption));

    return {
        groups,
        selected,
        values
    };
}
