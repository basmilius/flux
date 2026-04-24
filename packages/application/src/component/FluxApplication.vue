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
    import { useRemembered } from '@flux-ui/internals';
    import { computed, onUnmounted, provide, ref, shallowRef, toRef, type VNode, watch } from 'vue';
    import { type FluxApplicationContextInfo, FluxApplicationInjectionKey, type FluxApplicationLayout } from '../data';
    import useNamedRoutes from '../routing/useNamedRoutes';
    import useRoute from '../routing/useRoute';
    import $style from '../css/component/Application.module.scss';

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

    const route = useRoute();
    const matchedMenuRoutes = useNamedRoutes(toRef(() => contextMenuName));

    const isMenuCollapsed = useRemembered('application-menu-collapsed', true);
    const layout = ref<FluxApplicationLayout>('default');

    const totalLevels = computed(() => 1 + matchedMenuRoutes.value.length);
    const viewIndex = ref(0);

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

    const contextStack = shallowRef<FluxApplicationContextInfo[]>([]);
    const contexts = computed(() => contextStack.value);
    const activeContext = computed(() => contextStack.value.at(-1));

    function pushContext(info: FluxApplicationContextInfo): void {
        contextStack.value = [...contextStack.value, info];
    }

    function removeContext(id: symbol): void {
        contextStack.value = contextStack.value.filter(entry => entry.id !== id);
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
        removeContext
    });

    watch(() => route.fullPath, () => {
        viewIndex.value = totalLevels.value - 1;
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

    onUnmounted(() => {
        if (typeof document !== 'undefined') {
            delete document.documentElement.dataset.applicationMenuOpen;
        }
    });
</script>
