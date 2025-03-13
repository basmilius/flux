<template>
    <nav
        :class="$style.tabBar"
        role="tablist"
        aria-orientation="horizontal">
        <button
            v-if="isStartArrowVisible"
            :class="$style.tabBarArrowStart"
            tabindex="-1"
            type="button"
            @click="scrollToStart">
            <FluxIcon variant="angle-left"/>
        </button>

        <div
            ref="tabBar"
            :class="clsx(
                $style.tabBarTabs,
                isEndArrowVisible && $style.isEndMasked,
                isStartArrowVisible && $style.isStartMasked
            )">
            <slot/>
        </div>

        <button
            v-if="isEndArrowVisible"
            :class="$style.tabBarArrowEnd"
            tabindex="-1"
            type="button"
            @click="scrollToEnd">
            <FluxIcon variant="angle-right"/>
        </button>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { unrefTemplateElement, useEventListener, useMutationObserver } from '@basmilius/flux-internals';
    import { clsx } from 'clsx';
    import { onMounted, ref, useTemplateRef } from 'vue';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Tab.module.scss';

    defineSlots<{
        default(): any;
    }>();

    const tabBarRef = useTemplateRef('tabBar');

    useEventListener(tabBarRef, 'scroll', () => checkScroll());
    useMutationObserver(tabBarRef, () => checkScroll(), {childList: true});

    const isEndArrowVisible = ref(false);
    const isStartArrowVisible = ref(false);

    onMounted(() => checkScroll());

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
