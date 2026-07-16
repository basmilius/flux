<template>
    <nav
        :class="isPills ? $style.tabBarPills : $style.tabBarDefault"
        role="tablist"
        aria-orientation="horizontal"
        @keydown="onKeyDown">
        <FluxFadeTransition>
            <button
                v-if="isStartArrowVisible"
                :class="$style.tabBarArrowStart"
                aria-hidden="true"
                tabindex="-1"
                type="button"
                @click="scrollToStart">
                <FluxIcon name="angle-left"/>
            </button>
        </FluxFadeTransition>

        <div
            ref="tabBar"
            :class="clsx(
                isPills ? $style.tabBarTabsPills : $style.tabBarTabsDefault,
                isEndArrowVisible && $style.isEndMasked,
                isStartArrowVisible && $style.isStartMasked
            )">
            <div
                v-if="activeItemWidth > 0"
                :class="isPills ? $style.tabBarHighlightPills : $style.tabBarHighlightDefault"
                :style="{
                    left: `${activeItemX}px`,
                    width: `${activeItemWidth}px`
                }"/>
            <slot/>
        </div>

        <FluxFadeTransition>
            <button
                v-if="isEndArrowVisible"
                :class="$style.tabBarArrowEnd"
                aria-hidden="true"
                tabindex="-1"
                type="button"
                @click="scrollToEnd">
                <FluxIcon name="angle-right"/>
            </button>
        </FluxFadeTransition>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { useMutationObserver, useResizeObserver } from '@basmilius/common';
    import { unrefTemplateElement, useEventListener } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { onMounted, provide, ref, type Ref, toRef, useTemplateRef, type VNode, watch } from 'vue';
    import { FluxTabBarInjectionKey } from '~flux/components/data';
    import { FluxFadeTransition } from '~flux/components/transition';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Tab.module.scss';

    const {isPills} = defineProps<{
        readonly isPills?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const tabBarRef = useTemplateRef<HTMLElement>('tabBar');

    useEventListener(tabBarRef, 'scroll', () => checkScroll());
    useMutationObserver(tabBarRef, () => {
        checkScroll();
        updateHighlight();
    }, {childList: true});
    useResizeObserver(tabBarRef, () => {
        checkScroll();
        updateHighlight();
    });

    const isEndArrowVisible = ref(false);
    const isStartArrowVisible = ref(false);
    const activeItemX = ref(0);
    const activeItemWidth = ref(0);

    const items = new Map<Element, Ref<boolean>>();
    const itemUnwatchers = new Map<Element, () => void>();

    onMounted(() => checkScroll());

    provide(FluxTabBarInjectionKey, {
        isPills: toRef(() => isPills ?? false),
        registerItem(element, isActive) {
            items.set(element, isActive);
            const unwatch = watch(isActive, () => updateHighlight(), {flush: 'post', immediate: true});
            itemUnwatchers.set(element, unwatch);
        },
        unregisterItem(element) {
            const unwatch = itemUnwatchers.get(element);
            unwatch?.();
            itemUnwatchers.delete(element);
            items.delete(element);
            updateHighlight();
        }
    });

    function onKeyDown(evt: KeyboardEvent): void {
        const tabBar = unrefTemplateElement(tabBarRef);

        if (!tabBar) {
            return;
        }

        const tabs = Array.from(tabBar.querySelectorAll<HTMLElement>('[role=tab]:not([aria-disabled=true])'));

        if (tabs.length === 0) {
            return;
        }

        const activeElement = tabBar.querySelector<HTMLElement>('[role=tab][aria-selected=true]');
        const currentIndex = activeElement ? tabs.indexOf(activeElement) : tabs.indexOf(document.activeElement as HTMLElement);

        let newIndex: number;

        switch (evt.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                newIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
                break;

            case 'ArrowRight':
            case 'ArrowDown':
                newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
                break;

            case 'Home':
                newIndex = 0;
                break;

            case 'End':
                newIndex = tabs.length - 1;
                break;

            default:
                return;
        }

        const target = tabs[newIndex];

        target.focus();
        target.click();
        evt.preventDefault();
    }

    function checkScroll(): void {
        const tabBar = unrefTemplateElement(tabBarRef)!;

        if (tabBar.scrollWidth <= tabBar.offsetWidth) {
            isEndArrowVisible.value = false;
            isStartArrowVisible.value = false;
            return;
        }

        isEndArrowVisible.value = tabBar.scrollLeft < tabBar.scrollWidth - tabBar.offsetWidth;
        isStartArrowVisible.value = tabBar.scrollLeft > 0;
    }

    function updateHighlight(): void {
        const tabBar = unrefTemplateElement(tabBarRef);

        if (!tabBar) {
            return;
        }

        let activeElement: HTMLElement | null = null;

        for (const [element, isActive] of items) {
            if (isActive.value) {
                activeElement = element as HTMLElement;
                break;
            }
        }

        if (!activeElement) {
            activeItemWidth.value = 0;
            return;
        }

        const width = activeElement.offsetWidth;

        if (width === 0) {
            activeItemWidth.value = 0;
            return;
        }

        activeItemX.value = activeElement.offsetLeft;
        activeItemWidth.value = width;
    }

    function scrollToEnd(): void {
        const tabBar = unrefTemplateElement(tabBarRef)!;
        tabBar.scrollBy({
            behavior: 'smooth',
            left: tabBar.offsetWidth / 1.5
        });
    }

    function scrollToStart(): void {
        const tabBar = unrefTemplateElement(tabBarRef)!;
        tabBar.scrollBy({
            behavior: 'smooth',
            left: tabBar.offsetWidth / -1.5
        });
    }
</script>
