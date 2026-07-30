import { inject } from 'vue';
import { type FluxFormCheckboxGroupInjection, FluxFormCheckboxGroupInjectionKey } from '~flux/components/data';

export default function (): FluxFormCheckboxGroupInjection | null {
    return inject(FluxFormCheckboxGroupInjectionKey, null);
}
