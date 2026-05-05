import { inject, ref } from 'vue';
import { FluxFilterInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxFilterInjectionKey, {
        // note(Bas): The default value is never used, but required by
        //  Vue, so that explains the empty getter and function below.
        state: ref({}),
        back: () => void 0,
        clear: () => void 0,
        getDefinition: () => undefined,
        getValue: () => void 0,
        hasValue: () => false,
        reset: () => void 0,
        setValue: () => void 0
    });
}
