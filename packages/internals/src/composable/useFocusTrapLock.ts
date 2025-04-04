import type { Ref } from 'vue';
import { onMounted, onUnmounted, ref, unref } from 'vue';
import { FOCUS_TRAP_LOCKS } from '../util';

let lockId = 0;

export default function (autoFocus: boolean = false): Ref<boolean> {
    const id = ref(`focus-trap-${++lockId}`);
    const enabled = ref(false);

    onMounted(() => FOCUS_TRAP_LOCKS.add(unref(id), isEnabled => enabled.value = isEnabled, autoFocus));
    onUnmounted(() => FOCUS_TRAP_LOCKS.remove(unref(id)));

    return enabled;
}
