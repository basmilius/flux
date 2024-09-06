import type { MaybeRef, Ref } from 'vue';
import { computed, unref } from 'vue';
import { isFluxFormSelectGroup, isFluxFormSelectOption } from '@/data';
import type { FluxFormSelectEntry, FluxFormSelectGroup, FluxFormSelectOption } from '@/types';

export default function (modelValue: Ref<FormSelectValue>, isMultiple: boolean, options: MaybeRef<FluxFormSelectEntry[]>, searchQuery?: Ref<string>) {
    const values = computed(() => {
        const model = unref(modelValue);
        return Array.isArray(model) ? model : [model];
    });

    const groups = computed(() => {
        const groups: FormSelectGroup[] = [];
        const search = unref(searchQuery)?.trim().toLowerCase();

        const available = unref(options)
            .filter(o => !('id' in o) || (!search || o.label.toLowerCase().includes(search)))
            .filter(o => !('id' in o) || !isMultiple || !unref(selected).find(s => s.id === o.id));

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

export type FormSelectGroup = [FormSelectOption | null, FluxFormSelectOption[]];
export type FormSelectOption = FluxFormSelectGroup | FluxFormSelectOption;
export type FormSelectValue = FormSelectValueSingle | FormSelectValueSingle[];
export type FormSelectValueSingle = string | number | null;
