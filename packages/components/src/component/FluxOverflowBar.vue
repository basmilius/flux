<template>
    <div
        ref="bar"
        :class="[
            direction === 'horizontal' && $style.overflowBarHorizontal,
            direction === 'vertical' && $style.overflowBarVertical,
            alignment === 'start' && $style.alignStart,
            alignment === 'center' && $style.alignCenter,
            alignment === 'end' && $style.alignEnd
        ]"
        :style="{
            gap: `${gap}px`
        }">
        <template v-for="item of items.slice(0, visibleItems)">
            <FluxDynamicView :vnode="item"/>
        </template>

        <div
            v-if="slots.overflow"
            ref="overflow"
            :class="$style.overflowBarOverflow">
            <slot
                name="overflow"
                v-bind="{items: hiddenItems}"/>
        </div>
    </div>

    <div
        ref="measurer"
        :class="$style.overflowBarMeasurer">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { animationFrameDebounce, flattenVNodeTree, unrefTemplateElement } from '@flux-ui/internals';
    import type { FluxAlignment, FluxDirection } from '@flux-ui/types';
    import { computed, ref, unref, useTemplateRef, watch, type VNode } from 'vue';
    import FluxDynamicView from './FluxDynamicView.vue';
    import $style from '$flux/css/component/OverflowBar.module.scss';

    const {
        alignment = 'center',
        direction = 'horizontal',
        gap = 9
    } = defineProps<{
        readonly alignment?: FluxAlignment;
        readonly direction?: FluxDirection;
        readonly gap?: number;
    }>();

    const slots = defineSlots<{
        default?(): any;
        overflow?(props: { items: VNode[] }): any;
    }>();

    const barRef = useTemplateRef('bar');
    const measurerRef = useTemplateRef('measurer');
    const overflowRef = useTemplateRef('overflow');

    const availableSize = ref(0);
    const itemSizes = ref<number[]>([]);
    const usedSize = ref(0);
    const visibleItems = ref(0);

    const hiddenItems = computed(() => unref(items).slice(unref(visibleItems)));
    const items = computed(() => flattenVNodeTree(slots.default?.()));

    const reflow = animationFrameDebounce(() => {
        const bar = unref(barRef)!;
        const measurer = unref(measurerRef)!;
        const overflow = unrefTemplateElement(overflowRef);

        availableSize.value = direction === 'horizontal' ? bar.offsetWidth : bar.offsetHeight;
        itemSizes.value = Array.from(measurer.children)
            .filter(item => item instanceof HTMLElement)
            .map(item => direction === 'horizontal' ? item.offsetWidth : item.offsetHeight);

        let size = 0;
        let visible = 0;

        if (overflow) {
            size += Array.from(overflow.children)
                .map(item => getComputedStyle(item).display === 'contents' ? item.children[0] : item)
                .filter(item => item instanceof HTMLElement)
                .map(item => direction === 'horizontal' ? item.offsetWidth : item.offsetHeight)
                .reduce((acc, curr, index) => acc + curr + (index === 0 ? 0 : gap), 0);
        }

        for (let i = 0; i < itemSizes.value.length; i++) {
            const newSize = size + itemSizes.value[i] + (size === 0 ? 0 : gap);

            if (newSize > availableSize.value) {
                break;
            }

            visible++;
            size = newSize;
        }

        usedSize.value = size;
        visibleItems.value = visible;
    });

    watch([barRef, measurerRef], async ([bar, measurer], _, onCleanup) => {
        if (!bar || !measurer) {
            return;
        }

        const observer = new ResizeObserver(reflow);
        observer.observe(bar);
        observer.observe(measurer);
        observer.observe(document.documentElement); // observe font-size changes.

        onCleanup(() => {
            observer.disconnect();
        });
    }, {immediate: true});

    watch(items, reflow);
</script>
