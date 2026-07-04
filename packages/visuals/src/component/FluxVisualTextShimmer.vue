<template>
    <span
        :class="$style.textShimmer"
        :style="{
            '--shimmer-duration': `${duration}s`,
            '--shimmer-spread': `${spread}`,
            '--shimmer-base': color,
            '--shimmer-color': shimmerColor
        }">
        <slot/>
    </span>
</template>

<script
    lang="ts"
    setup>
    import $style from '~flux/visuals/css/component/TextShimmer.module.scss';

    const {
        color,
        duration = 2,
        shimmerColor,
        spread = 15
    } = defineProps<{
        readonly color?: string;
        readonly duration?: number;
        readonly shimmerColor?: string;
        readonly spread?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
