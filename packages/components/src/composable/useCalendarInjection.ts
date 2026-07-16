import { inject } from 'vue';
import { type FluxCalendarInjection, FluxCalendarInjectionKey } from '~flux/components/data';

export default function (): FluxCalendarInjection | null {
    return inject(FluxCalendarInjectionKey, null);
}
