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
            <FluxAnimatedColors
                :class="styles.paneIllustrationCanvas"
                :colors="animatedColors"
                :opacity="props.animatedOpacity"
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
    import { computed, toRefs, unref, useSlots } from 'vue';
    import { hexToRGB } from '@/util';
    import FluxAnimatedColors from './FluxAnimatedColors.vue';
    import styles from '@/css/component/Pane.module.scss';

    export type Props = {
        readonly animatedColors: string[] | null;
        readonly animatedOpacity?: number;
        readonly animatedSeed?: number | null;
        readonly aspectRatio?: number;
        readonly isMasked?: boolean;
    };

    const props = withDefaults(defineProps<Props>(), {
        animatedColors: null,
        animatedOpacity: .5,
        animatedSeed: null,
        aspectRatio: 16 / 9
    });
    const {animatedColors} = toRefs(props);

    const slots = useSlots();

    const borderColor = computed(() => {
        const colors = unref(animatedColors);

        if (!colors || colors.length === 0) {
            return 'transparent';
        }

        const [r, g, b] = hexToRGB(colors[0]);

        return `rgb(${r} ${g} ${b} / .15)`;
    });
</script>
