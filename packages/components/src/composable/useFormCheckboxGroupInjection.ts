import { inject } from 'vue';
import { FluxFormCheckboxGroupInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxFormCheckboxGroupInjectionKey, null);
}
