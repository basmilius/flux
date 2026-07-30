import { computed, type ComputedRef, onMounted, ref } from 'vue';

const HYDRATION_SAFE_LOCALE = 'en-US';

// The browser locale is unknown while server rendering, so the first render uses a fixed
// locale on both sides and switches to the real one once mounted, before the first paint.
export default function (options?: Intl.NumberFormatOptions): ComputedRef<Intl.NumberFormat> {
    const locale = ref<string>();

    onMounted(() => {
        locale.value = navigator.language;
    });

    return computed(() => new Intl.NumberFormat(locale.value ?? HYDRATION_SAFE_LOCALE, options));
}
