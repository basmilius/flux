import { inject } from 'vue';
import type { FluxCalendarInjection } from '$flux/data/di';
import { FluxCalendarInjectionKey } from '$flux/data/di';

export default function (): FluxCalendarInjection | null {
    return inject(FluxCalendarInjectionKey, null);
}
