import type { Ref } from 'vue';
import { onUnmounted, ref, unref } from 'vue';

export default function (disabled: Ref<boolean>): void {
    const target = ref<HTMLElement | null>(document.activeElement as HTMLElement | null);

    onUnmounted(() => {
        if (unref(disabled)) {
            return;
        }

        requestAnimationFrame(() => unref(target)?.focus());
    });
}
