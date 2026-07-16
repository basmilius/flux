import { computed, inject, type Ref, useId } from 'vue';
import { FluxFormFieldInjectionKey } from '~flux/components/data';

type UseFormFieldInjectionReturn = {
    readonly id: string;
    readonly describedBy: Readonly<Ref<string | undefined>>;
};

export default function (): UseFormFieldInjectionReturn {
    const field = inject(FluxFormFieldInjectionKey, null);

    const id = field?.registerControl
        ? field.registerControl()
        : field?.id ?? useId();

    const describedBy = computed(() => {
        const ids = [field?.errorId?.value, field?.hintId?.value].filter(Boolean);

        return ids.length > 0 ? ids.join(' ') : undefined;
    });

    return {id, describedBy};
}
