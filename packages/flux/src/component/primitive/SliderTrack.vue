<template>
    <div :class="$style.sliderTrack">
        <div
            :class="$style.sliderTrackValue"
            :style="{
                left: `${percentageLower * 100}%`,
                width: `${(percentageUpper - percentageLower) * 100}%`
            }"/>
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/primitive/Slider.module.scss';

    defineProps<{
        readonly percentageLower: number;
        readonly percentageUpper: number;
    }>();
</script>
