<template>
    <nav class="flux-tab-bar">
        <button
            v-if="isStartArrowVisible"
            class="flux-tab-bar-arrow flux-tab-bar-arrow-start"
            tabindex="-1"
            type="button"
            @click="scrollToStart">
            <FluxIcon variant="angle-left"/>
        </button>

        <div
            ref="tabBarRef"
            class="flux-tab-bar-tabs"
            :class="{
                'mask-end': isEndArrowVisible,
                'mask-start': isStartArrowVisible
            }">
            <slot/>
        </div>

        <button
            v-if="isEndArrowVisible"
            class="flux-tab-bar-arrow flux-tab-bar-arrow-end"
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
    import { onMounted, ref } from 'vue-demi';
    import { useEventListener, useMutationObserver } from '@/composables';
    import { unrefElement } from '@/helpers';
    import FluxIcon from './FluxIcon.vue';

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

<style lang="scss">
    .flux-tab-bar {
        --tab-padding: 12px;

        position: relative;
        box-shadow: inset 0 -2px rgb(var(--gray-3));
        z-index: 0;

        &-arrow {
            position: absolute;
            display: flex;
            top: 3px;
            height: calc(100% - 6px);
            width: 30px;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: 0;
            border-radius: var(--radius);
            color: var(--foreground);
            cursor: pointer;
            outline: 0;
            transition: background 180ms var(--swift-out);
            z-index: 1;

            &:hover {
                background: rgb(var(--gray-3) / .75);
            }

            &-start {
                left: -6px;
            }

            &-end {
                right: -6px;
            }
        }

        &-tabs {
            --mask-start: 0%;
            --mask-end: 100%;

            display: flex;
            align-items: flex-end;
            gap: 21px;
            overflow: hidden;

            -webkit-mask-image: linear-gradient(to right, transparent, black var(--mask-start), black, black var(--mask-end), transparent);
            mask-image: linear-gradient(to right, transparent, black var(--mask-start), black, black var(--mask-end), transparent);

            &.mask-end {
                --mask-end: calc(100% - 60px);
            }

            &.mask-start {
                --mask-start: 60px;
            }
        }
    }

    .flux-pane > .flux-tab-bar,
    .flux-pane > .flux-tabs > .flux-tab-bar {
        --tab-padding: 18px;

        padding-left: 21px;
        padding-right: 21px;
        background: rgb(var(--gray-1));

        &:first-child {
            border-radius: var(--radius) var(--radius) 0 0;
        }

        &:not(:first-child) {
            border-top: 1px solid rgb(var(--gray-3));
        }
    }

    .flux-pane > .flux-pane-header + .flux-tab-bar,
    .flux-pane > .flux-pane-header + .flux-tabs > .flux-tab-bar {
        padding-top: 6px;
    }

    .flux-pane-header:has(+ .flux-tab-bar),
    .flux-pane-header:has(+ .flux-tabs > .flux-tab-bar) {
        background: rgb(var(--gray-1));
    }
</style>
