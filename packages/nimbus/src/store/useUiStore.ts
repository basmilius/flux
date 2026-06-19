import { useRemembered } from '@flux-ui/internals';
import type { FluxIconName } from '@flux-ui/types';
import { ref, watch } from 'vue';

const title = ref<string>();
const icon = ref<FluxIconName>();
const darkMode = useRemembered('nimbus-dark-mode', false);
const tourSeen = useRemembered('nimbus-tour-seen', false);
const tourActive = ref(false);

watch(darkMode, value => {
    if (typeof document !== 'undefined') {
        document.documentElement.toggleAttribute('dark', value);
    }
}, {immediate: true});

watch(title, value => {
    if (typeof document !== 'undefined') {
        document.title = value ? `${value} — Nimbus` : 'Nimbus';
    }
});

export function useUiStore() {
    return {
        darkMode,
        icon,
        title,
        tourActive,
        tourSeen,
        setIcon(value?: FluxIconName): void {
            icon.value = value;
        },
        setTitle(value?: string): void {
            title.value = value;
        },
        toggleDarkMode(): void {
            darkMode.value = !darkMode.value;
        },
        startTour(): void {
            tourActive.value = true;
        },
        finishTour(): void {
            tourActive.value = false;
            tourSeen.value = true;
        }
    };
}
