<template>
    <nav
        ref="control"
        :class="isFill ? $style.segmentedControlFill : $style.segmentedControlInline">
        <div
            v-if="activeItemWidth > 0"
            :class="$style.segmentedControlHighlight"
            :style="{
                left: `${activeItemX}px`,
                width: `${activeItemWidth}px`
            }"/>

        <template v-for="(item, index) of items">
            <div
                v-if="index > 0"
                :class="clsx(
                    $style.segmentedControlSeparator,
                    (index === modelValue || index === modelValue + 1) && $style.isActive
                )"
                role="separator"/>

            <button
                ref="items"
                :class="clsx(
                    $style.segmentedControlItem,
                    index === modelValue && $style.isActive
                )"
                type="button"
                @click="activate(index)">
                <FluxIcon
                    v-if="item.icon"
                    :size="15"
                    :variant="item.icon"/>

                <span>{{ item.label }}</span>
            </button>
        </template>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { onMounted, onUpdated, ref, unref, useTemplateRef } from 'vue';
    import type { FluxSegmentedControlItemObject } from '$flux/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/SegmentedControl.module.scss';

    const modelValue = defineModel<number>({
        default: 0
    });

    defineProps<{
        readonly isFill?: boolean;
        readonly items: FluxSegmentedControlItemObject[];
    }>();

    const controlRef = useTemplateRef<HTMLElement>('control');
    const itemRefs = useTemplateRef<HTMLButtonElement[]>('items');

    const activeItemX = ref(0);
    const activeItemWidth = ref(0);

    onMounted(() => activate(unref(modelValue)));
    onUpdated(() => activate(unref(modelValue)));

    function activate(index: number): void {
        const itemRef = itemRefs.value![index];
        const {left: controlX} = controlRef.value!.getBoundingClientRect();
        const {width, left: x} = itemRef.getBoundingClientRect();

        activeItemX.value = x - controlX - 1;
        activeItemWidth.value = width;
        modelValue.value = index;
    }
</script>
