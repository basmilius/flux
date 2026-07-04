<template>
    <div
        aria-hidden="true"
        :class="clsx($style.noise, animated && $style.animated)"
        :style="style"/>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import $style from '~flux/visuals/css/component/Noise.module.scss';

    type NoiseBlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'plus-lighter';

    const {
        animated = false,
        blend = 'overlay',
        opacity = 0.05
    } = defineProps<{
        readonly animated?: boolean;
        readonly blend?: NoiseBlendMode;
        readonly opacity?: number;
    }>();

    const style = computed(() => ({
        '--noise-blend': blend,
        '--noise-opacity': opacity
    }));
</script>
