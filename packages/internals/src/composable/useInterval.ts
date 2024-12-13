import type { Ref } from 'vue';
import { onMounted, onUnmounted, ref, unref } from 'vue';

export default function (interval: Ref<number> | number, fn: Function): void {
    const intervalRef = ref<any>();

    onMounted(() => {
        tick();
    });

    onUnmounted(() => {
        clearTimeout(intervalRef.value);
    });

    function schedule(): void {
        intervalRef.value = setTimeout(() => requestAnimationFrame(tick), unref(interval));
    }

    function tick(): void {
        schedule();
        fn();
    }
}
