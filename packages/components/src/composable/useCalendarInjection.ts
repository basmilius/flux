import { inject } from 'vue';
import { FluxCalendarInjectionKey, type FluxCalendarInjection } from '$flux/data';

export default function (): FluxCalendarInjection | null {
    return inject(FluxCalendarInjectionKey, null);
}
