<template>
    <div
        ref="viewport"
        :class="$style.virtualScroller"
        role="list"
        :aria-rowcount="items.length">
        <div
            :class="$style.virtualScrollerSpacer"
            :style="{
                height: `${totalHeight}px`
            }">
            <div
                :class="$style.virtualScrollerWindow"
                :style="{
                    transform: `translateY(${offsetY}px)`
                }">
                <div
                    v-for="entry of visibleEntries"
                    :key="entry.index"
                    role="listitem"
                    :aria-setsize="items.length"
                    :aria-posinset="entry.index + 1"
                    :style="{
                        height: `${itemSize}px`
                    }">
                    <slot
                        :index="entry.index"
                        :item="entry.item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup
    generic="T">
    import { computed, onMounted, onUnmounted, ref, useTemplateRef, type VNode, watch } from 'vue';
    import { useScrollPosition } from '@flux-ui/internals';
    import $style from '~flux/components/css/component/VirtualScroller.module.scss';

    const {
        itemSize = 40,
        items,
        overscan = 4
    } = defineProps<{
        readonly itemSize?: number;
        readonly items: T[];
        readonly overscan?: number;
    }>();

    defineSlots<{
        default(props: {readonly index: number; readonly item: T}): VNode[];
    }>();

    const viewport = useTemplateRef<HTMLElement>('viewport');
    const {y} = useScrollPosition(viewport);

    const viewportHeight = ref(0);

    const totalHeight = computed(() => items.length * itemSize);
    const startIndex = computed(() => Math.max(0, Math.floor(y.value / itemSize) - overscan));
    const endIndex = computed(() => Math.min(items.length, Math.ceil((y.value + viewportHeight.value) / itemSize) + overscan));
    const offsetY = computed(() => startIndex.value * itemSize);

    const visibleEntries = computed(() => {
        const entries: {index: number; item: T}[] = [];

        for (let index = startIndex.value; index < endIndex.value; ++index) {
            entries.push({index, item: items[index]});
        }

        return entries;
    });

    let observer: ResizeObserver | null = null;

    onMounted(() => {
        const element = viewport.value;

        if (!element) {
            return;
        }

        viewportHeight.value = element.clientHeight;

        observer = new ResizeObserver(() => {
            if (viewport.value) {
                viewportHeight.value = viewport.value.clientHeight;
            }
        });

        observer.observe(element);
    });

    onUnmounted(() => {
        observer?.disconnect();
        observer = null;
    });

    // Clamp the scroll position when the item count shrinks so the viewport
    // doesn't end up scrolled past the (now smaller) content.
    watch(() => items.length, () => {
        const element = viewport.value;

        if (!element) {
            return;
        }

        const maxScroll = Math.max(0, totalHeight.value - element.clientHeight);

        if (element.scrollTop > maxScroll) {
            element.scrollTop = maxScroll;
        }
    });

    function scrollToIndex(index: number, behavior: ScrollBehavior = 'auto'): void {
        const element = viewport.value;

        if (!element) {
            return;
        }

        const clamped = Math.max(0, Math.min(index, items.length - 1));

        element.scrollTo({
            top: clamped * itemSize,
            behavior
        });
    }

    defineExpose({
        scrollToIndex
    });
</script>
