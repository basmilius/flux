import { inject, ref, useId } from 'vue';
import { FluxFormRadioGroupInjectionKey, type FluxFormRadioGroupValue } from '~flux/components/data';

export default function () {
    return inject(FluxFormRadioGroupInjectionKey, {
        name: useId(),
        modelValue: ref<FluxFormRadioGroupValue | undefined>(undefined),
        disabled: ref(false),
        isReadonly: ref(false),
        error: ref<string | null | undefined>(undefined),
        select: () => undefined
    });
}
