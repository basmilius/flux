import { onMounted, onUnmounted, ref } from 'vue';
import { FOCUS_TRAP_LOCKS, type FocusTrapListener } from '@/util';

export default function (listener: FocusTrapListener): void {
    const unsubscribe = ref<Function | null>(null);

    onMounted(() => unsubscribe.value = FOCUS_TRAP_LOCKS.subscribe(listener));
    onUnmounted(() => unsubscribe.value?.());
}
