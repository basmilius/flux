<template>
    <div
        ref="viewport"
        :class="$style.virtualScroller">
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
                    :style="{
                        height: `${estimatedItemHeight}px`
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
    import { computed, onMounted, onUnmounted, ref, useTemplateRef, type VNode } from 'vue';
    import { useScrollPosition } from '@flux-ui/internals';
    import $style from '~flux/components/css/component/VirtualScroller.module.scss';

    const {
        estimatedItemHeight = 40,
        items,
        overscan = 4
    } = defineProps<{
        readonly estimatedItemHeight?: number;
        readonly items: T[];
        readonly overscan?: number;
    }>();

    defineSlots<{
        default(props: {readonly index: number; readonly item: T}): VNode[];
    }>();

    const viewport = useTemplateRef<HTMLElement>('viewport');
    const {y} = useScrollPosition(viewport);

    const viewportHeight = ref(0);

    const totalHeight = computed(() => items.length * estimatedItemHeight);
    const startIndex = computed(() => Math.max(0, Math.floor(y.value / estimatedItemHeight) - overscan));
    const endIndex = computed(() => Math.min(items.length, Math.ceil((y.value + viewportHeight.value) / estimatedItemHeight) + overscan));
    const offsetY = computed(() => startIndex.value * estimatedItemHeight);

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
</script>
