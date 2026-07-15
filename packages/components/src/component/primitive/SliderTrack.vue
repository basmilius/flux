<template>
    <div :class="$style.sliderTrack">
        <div
            :class="$style.sliderTrackValue"
            :style="style"/>
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxDirection } from '@flux-ui/types';
    import { computed, type CSSProperties } from 'vue';
    import $style from '~flux/components/css/component/primitive/Slider.module.scss';

    const {
        direction = 'horizontal',
        percentageLower,
        percentageUpper
    } = defineProps<{
        readonly direction?: FluxDirection;
        readonly percentageLower: number;
        readonly percentageUpper: number;
    }>();

    const style = computed<CSSProperties>(() => direction === 'vertical'
        ? {bottom: `${percentageLower * 100}%`, height: `${(percentageUpper - percentageLower) * 100}%`}
        : {left: `${percentageLower * 100}%`, width: `${(percentageUpper - percentageLower) * 100}%`});
</script>
