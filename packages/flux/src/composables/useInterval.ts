import { onMounted, onUnmounted, ref, Ref, unref } from 'vue-demi';

export function useInterval(interval: Ref<number>, fn: Function): void {
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
