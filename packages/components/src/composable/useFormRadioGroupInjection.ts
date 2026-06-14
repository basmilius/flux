import { inject, ref } from 'vue';
import { FluxFormRadioGroupInjectionKey, type FluxFormRadioGroupValue } from '~flux/components/data';

export default function () {
    return inject(FluxFormRadioGroupInjectionKey, {
        name: '',
        modelValue: ref<FluxFormRadioGroupValue | undefined>(undefined),
        disabled: ref(false),
        isReadonly: ref(false),
        error: ref<string | null | undefined>(undefined),
        select: () => undefined
    });
}
