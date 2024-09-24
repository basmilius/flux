<template>
    <div
        :class="isMasked ? styles.paneIllustrationMasked : styles.paneIllustration"
        :style="{
            aspectRatio
        }">
        <div
            :class="styles.paneIllustrationMagic"
            :style="{
                border: `1px solid ${borderColor}`
            }">
            <FluxGridPattern :stroke-dasharray="3"/>

            <FluxAnimatedColors
                :colors="animatedColors"
                :opacity="animatedOpacity"
                :seed="animatedSeed"/>
        </div>

        <div
            v-if="slots.controlled"
            :class="styles.paneIllustrationContentControlled">
            <slot name="controlled"/>
        </div>

        <div
            v-if="slots.default"
            :class="styles.paneIllustrationContent">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, useSlots } from 'vue';
    import { hexToRGB } from '@/util';
    import FluxAnimatedColors from './FluxAnimatedColors.vue';
    import FluxGridPattern from './FluxGridPattern.vue';
    import styles from '@/css/component/Pane.module.scss';

    const {
        animatedColors,
        aspectRatio = 16 / 9
    } = defineProps<{
        readonly animatedColors: string[];
        readonly animatedOpacity?: number;
        readonly animatedSeed?: number;
        readonly aspectRatio?: number;
        readonly isMasked?: boolean;
    }>();

    defineSlots<{
        default(): any;
        controlled(): any;
    }>();

    const slots = useSlots();

    const borderColor = computed(() => {
        if (!animatedColors || animatedColors.length === 0) {
            return 'transparent';
        }

        const [r, g, b] = hexToRGB(animatedColors[0]);

        return `rgb(${r} ${g} ${b} / .15)`;
    });
</script>
