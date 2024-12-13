import { onMounted, onUnmounted, ref } from 'vue';
import type { FocusTrapListener } from '@/util';
import { FOCUS_TRAP_LOCKS } from '@/util';

export default function (listener: FocusTrapListener): void {
    const unsubscribe = ref<Function | null>(null);

    onMounted(() => unsubscribe.value = FOCUS_TRAP_LOCKS.subscribe(listener));
    onUnmounted(() => unsubscribe.value?.());
}
