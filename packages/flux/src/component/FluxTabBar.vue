<template>
    <nav
        :class="styles.tabBar"
        role="tablist"
        aria-orientation="horizontal">
        <button
            v-if="isStartArrowVisible"
            :class="styles.tabBarArrowStart"
            tabindex="-1"
            type="button"
            @click="scrollToStart">
            <FluxIcon variant="angle-left"/>
        </button>

        <div
            ref="tabBarRef"
            :class="clsx(
                styles.tabBarTabs,
                isEndArrowVisible && styles.isEndMasked,
                isStartArrowVisible && styles.isStartMasked
            )">
            <slot/>
        </div>

        <button
            v-if="isEndArrowVisible"
            :class="styles.tabBarArrowEnd"
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
    import { clsx } from 'clsx';
    import { onMounted, ref } from 'vue';
    import { useEventListener, useMutationObserver } from '@/composable';
    import { unrefElement } from '@/util';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Tab.module.scss';

    const isEndArrowVisible = ref(false);
    const isStartArrowVisible = ref(false);
    const tabBarRef = ref<HTMLDivElement>();

    onMounted(() => checkScroll());

    useEventListener(tabBarRef, 'scroll', () => checkScroll());
    useMutationObserver(tabBarRef, () => checkScroll(), {childList: true});

    function checkScroll(): void {
        const tabBar = unrefElement(tabBarRef)!;

        if (tabBar.scrollWidth <= tabBar.offsetWidth) {
            isEndArrowVisible.value = false;
            isStartArrowVisible.value = false;
            return;
        }

        isEndArrowVisible.value = tabBar.scrollLeft < tabBar.scrollWidth - tabBar.offsetWidth;
        isStartArrowVisible.value = tabBar.scrollLeft > 0;
    }

    function scrollToEnd(): void {
        const tabBar = unrefElement(tabBarRef)!;
        tabBar.scrollBy({
            behavior: 'smooth',
            left: tabBar.offsetWidth / 1.5
        });
    }

    function scrollToStart(): void {
        const tabBar = unrefElement(tabBarRef)!;
        tabBar.scrollBy({
            behavior: 'smooth',
            left: tabBar.offsetWidth / -1.5
        });
    }
</script>
