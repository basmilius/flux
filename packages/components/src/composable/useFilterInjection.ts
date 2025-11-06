import { inject, ref } from 'vue';
import { FluxFilterInjectionKey } from '$flux/data';

export default function () {
    return inject(FluxFilterInjectionKey, {
        // note(Bas): The default value is never used, but required by
        //  Vue, so that explains the empty getter and function below.
        state: ref({}),
        back: () => void 0,
        reset: () => void 0,
        getValue: () => void 0,
        hasValue: () => false,
        setValue: () => void 0
    });
}
