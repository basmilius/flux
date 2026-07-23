<template>
    <div :class="$style.descriptionList">
        <div
            v-if="title || slots.header"
            :class="$style.descriptionListHeader">
            <slot name="header">{{ title }}</slot>
        </div>

        <dl
            :class="clsx(
                $style.descriptionListItems,
                direction === 'horizontal' && $style.isHorizontal,
                isAligned && $style.hasLabelWidth
            )"
            :style="isAligned ? {'--label-width': typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth} : undefined">
            <slot/>
        </dl>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, type VNode } from 'vue';
    import $style from '~flux/components/css/component/DescriptionList.module.scss';

    const {
        direction = 'vertical',
        labelWidth
    } = defineProps<{
        readonly direction?: 'horizontal' | 'vertical';
        readonly labelWidth?: number | string;
        readonly title?: string;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
        header(): VNode[];
    }>();

    const isAligned = computed(() => direction === 'vertical' && labelWidth !== undefined);
</script>
