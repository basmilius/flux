<template>
    <nav
        ref="controlRef"
        :class="isFill ? styles.segmentedControlFill : styles.segmentedControlInline">
        <div
            :class="styles.segmentedControlHighlight"
            :style="{
                left: `${activeItemX}px`,
                width: `${activeItemWidth}px`
            }"/>

        <template v-for="(item, index) of items">
            <div
                v-if="index > 0"
                :class="clsx(
                    styles.segmentedControlSeparator,
                    (index === modelValue || index === modelValue + 1) && styles.isActive
                )"
                role="separator"/>

            <button
                ref="itemRefs"
                :class="clsx(
                    styles.segmentedControlItem,
                    index === modelValue && styles.isActive
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
    import { onMounted, onUpdated, ref, unref } from 'vue';
    import type { FluxSegmentedControlItemSpec } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/SegmentedControl.module.scss';

    export type Props = {
        readonly isFill?: boolean;
        readonly items: FluxSegmentedControlItemSpec[];
    };

    const modelValue = defineModel<number>({default: 0});
    defineProps<Props>();

    onMounted(() => activate(unref(modelValue)));
    onUpdated(() => activate(unref(modelValue)));

    const activeItemX = ref(0);
    const activeItemWidth = ref(0);
    const controlRef = ref<HTMLDivElement>();
    const itemRefs = ref<HTMLButtonElement[]>([]);

    function activate(index: number): void {
        const itemRef = itemRefs.value[index];
        const {left: controlX} = controlRef.value!.getBoundingClientRect();
        const {width, left: x} = itemRef.getBoundingClientRect();

        activeItemX.value = x - controlX;
        activeItemWidth.value = width + 6;
        modelValue.value = index;
    }
</script>
