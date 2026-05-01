import { inject } from 'vue';
import { FluxCalendarInjectionKey, type FluxCalendarInjection } from '~flux/components/data';

export default function (): FluxCalendarInjection | null {
    return inject(FluxCalendarInjectionKey, null);
}
