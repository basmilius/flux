<template>
    <div :class="$style.application">
        <slot name="menu"/>

        <div :class="$style.applicationBody">
            <slot/>
        </div>

        <slot name="side"/>

        <button
            type="button"
            aria-label="Close menu"
            :class="$style.applicationMenuBackdrop"
            @click="isMenuCollapsed = true"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useBreakpoints } from '@flux-ui/components';
    import { useRemembered } from '@flux-ui/internals';
    import { computed, onMounted, onUnmounted, provide, ref, shallowRef, toRef, type VNode, watch } from 'vue';
    import { type FluxApplicationContextInfo, FluxApplicationInjectionKey, type FluxApplicationLayout } from '../data';
    import { useNamedRoutes, useRoute } from '../routing';
    import $style from '~flux/application/css/component/Application.module.scss';

    const {
        contextMenuName = 'menu',
        showDesktopMenuToggle = false
    } = defineProps<{
        readonly contextMenuName?: string;
        readonly showDesktopMenuToggle?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
        menu(): VNode[];
        side(): VNode[];
    }>();

    let readyFrame: number | undefined;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const contextStack = shallowRef<FluxApplicationContextInfo[]>([]);
    const layout = ref<FluxApplicationLayout>('default');
    const viewIndex = ref(0);

    const isMenuCollapsed = useRemembered('application-menu-collapsed', true);
    const matchedMenuRoutes = useNamedRoutes(toRef(() => contextMenuName));
    const route = useRoute();
    const {lg, xl} = useBreakpoints();

    const activeContext = computed(() => contextStack.value.at(-1));
    const contexts = computed(() => contextStack.value);
    const totalLevels = computed(() => 1 + matchedMenuRoutes.value.length);

    watch(() => route.fullPath, () => {
        viewIndex.value = totalLevels.value - 1;

        if (!lg.value && !xl.value) {
            isMenuCollapsed.value = true;
        }
    });

    watch(totalLevels, (next) => {
        viewIndex.value = clampViewIndex(viewIndex.value);

        // On initial route resolve, totalLevels jumps from 1 to its
        // real value. Snap to the deepest level so the user lands on
        // the right context without seeing a slide animation.
        if (viewIndex.value === 0 && next > 1) {
            viewIndex.value = next - 1;
        }
    }, {immediate: true});

    watch(isMenuCollapsed, collapsed => {
        if (typeof document === 'undefined') {
            return;
        }

        if (collapsed) {
            delete document.documentElement.dataset.applicationMenuOpen;
        } else {
            document.documentElement.dataset.applicationMenuOpen = '';
        }
    }, {immediate: true});

    onMounted(() => {
        if (typeof window === 'undefined') {
            return;
        }

        window.addEventListener('resize', onResize, {passive: true});

        // Flag the app as ready one frame past the first paint so the menu
        // sub-header's `@starting-style` transition does not play on page
        // load — it should only animate on later collapse / expand.
        readyFrame = requestAnimationFrame(() => {
            readyFrame = requestAnimationFrame(() => {
                readyFrame = undefined;
                document.documentElement.dataset.applicationReady = '';
            });
        });
    });

    onUnmounted(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', onResize);
        }

        if (readyFrame !== undefined) {
            cancelAnimationFrame(readyFrame);
            readyFrame = undefined;
        }

        if (resizeTimer !== undefined) {
            clearTimeout(resizeTimer);
            resizeTimer = undefined;
        }

        if (typeof document !== 'undefined') {
            delete document.documentElement.dataset.applicationMenuOpen;
            delete document.documentElement.dataset.applicationReady;
            delete document.documentElement.dataset.applicationResizing;
        }
    });

    function clampViewIndex(target: number): number {
        if (target < 0) {
            return 0;
        }
        const max = totalLevels.value - 1;
        if (target > max) {
            return max;
        }
        return target;
    }

    function goToLevel(index: number): void {
        viewIndex.value = clampViewIndex(index);
    }

    function goToMain(): void {
        viewIndex.value = 0;
    }

    function goToCurrent(): void {
        viewIndex.value = totalLevels.value - 1;
    }

    function goToParent(): void {
        viewIndex.value = clampViewIndex(viewIndex.value - 1);
    }

    function goToChild(): void {
        viewIndex.value = clampViewIndex(viewIndex.value + 1);
    }

    function onResize(): void {
        if (typeof document === 'undefined') {
            return;
        }

        document.documentElement.dataset.applicationResizing = '';

        if (resizeTimer !== undefined) {
            clearTimeout(resizeTimer);
        }

        resizeTimer = setTimeout(() => {
            delete document.documentElement.dataset.applicationResizing;
            resizeTimer = undefined;
        }, 150);
    }

    function pushContext(info: FluxApplicationContextInfo): void {
        contextStack.value = [...contextStack.value, info];
    }

    function removeContext(id: symbol): void {
        contextStack.value = contextStack.value.filter(entry => entry.id !== id);
    }

    function updateContext(id: symbol, info: Omit<FluxApplicationContextInfo, 'id'>): void {
        const index = contextStack.value.findIndex(entry => entry.id === id);

        if (index === -1) {
            return;
        }

        const stack = [...contextStack.value];
        stack[index] = {id, ...info};
        contextStack.value = stack;
    }

    provide(FluxApplicationInjectionKey, {
        activeContext,
        contexts,
        isMenuCollapsed,
        layout,
        showDesktopMenuToggle: toRef(() => showDesktopMenuToggle),
        totalLevels,
        viewIndex,
        goToChild,
        goToCurrent,
        goToLevel,
        goToMain,
        goToParent,
        pushContext,
        removeContext,
        updateContext
    });
</script>
