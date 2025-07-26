import { type Ref, unref, watch } from 'vue';
import { type TemplateRef, unrefTemplateElement } from '../util';

export default function (containerRef: TemplateRef<HTMLElement>, disabled: Ref<boolean>): void {
    watch(containerRef, (_, __, onCleanup) => {
        const container = unrefTemplateElement(containerRef);

        if (!container || unref(disabled)) {
            return;
        }

        const previousTarget = document.activeElement as HTMLElement | null;

        onCleanup(() => {
            requestAnimationFrame(() => previousTarget?.focus());
        });
    });
}
