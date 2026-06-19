import type { FluxIconName } from '@flux-ui/types';
import { onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useUiStore } from '@/store';

// Sets the application top-bar icon/title for a page and clears it on leave.
export default function defineTitle(icon: FluxIconName, title: string): void {
    const {setIcon, setTitle} = useUiStore();

    onMounted(() => {
        setIcon(icon);
        setTitle(title);
    });

    onBeforeRouteLeave(() => {
        setIcon();
        setTitle();
    });
}
