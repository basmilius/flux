import { inject, useId } from 'vue';
import { FluxFormFieldInjectionKey } from '~flux/components/data';

export default function () {
    const field = inject(FluxFormFieldInjectionKey, null);

    if (field?.registerControl) {
        return {id: field.registerControl()};
    }

    return {id: field?.id ?? useId()};
}
