import { useRemembered } from '@flux-ui/internals';
import type { FluxIconName } from '@flux-ui/types';
import { ref, watch } from 'vue';
import type { Period } from '@/types';

const title = ref<string>();
const icon = ref<FluxIconName>();
const darkMode = useRemembered('pulse-dark-mode', false);
const period = useRemembered<Period>('pulse-period', '28d');

watch(darkMode, value => {
    if (typeof document !== 'undefined') {
        document.documentElement.toggleAttribute('dark', value);
    }
}, {immediate: true});

watch(title, value => {
    if (typeof document !== 'undefined') {
        document.title = value ? `${value} — Pulse` : 'Pulse';
    }
});

export function useUiStore() {
    return {
        darkMode,
        icon,
        title,
        period,
        setIcon(value?: FluxIconName): void {
            icon.value = value;
        },
        setTitle(value?: string): void {
            title.value = value;
        },
        setPeriod(value: Period): void {
            period.value = value;
        },
        toggleDarkMode(): void {
            darkMode.value = !darkMode.value;
        }
    };
}
