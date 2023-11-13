<template>
    <div
        class="flux-pane-illustration"
        :class="{
            'is-masked': isMasked
        }">
        <div class="flux-pane-illustration-magic">
            <FluxAnimatedColors
                class="flux-gridlines flux-pane-illustration-canvas"
                :colors="animatedColors"
                :opacity="props.animatedOpacity"
                :seed="animatedSeed"/>
        </div>

        <div
            v-if="slots.controlled"
            class="flux-pane-illustration-content is-controlled">
            <slot name="controlled"/>
        </div>

        <div
            v-if="slots.default"
            class="flux-pane-illustration-content">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs, unref, useSlots } from 'vue-demi';
    import { useComponentId } from '@/composables';
    import { hexToRGB } from '@/utils';
    import FluxAnimatedColors from './FluxAnimatedColors.vue';

    export interface Props {
        readonly animatedColors: string[] | null;
        readonly animatedOpacity?: number;
        readonly animatedSeed?: number | null;
        readonly aspectRatio?: number;
        readonly isMasked?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        animatedColors: null,
        animatedOpacity: .5,
        animatedSeed: null,
        aspectRatio: 16 / 9
    });
    const {animatedColors} = toRefs(props);

    const id = useComponentId();
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

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-pane-illustration {
        --mask: linear-gradient(to bottom, black, transparent);
        --mask-content: linear-gradient(to bottom, black, rgb(0 0 0 / .75), transparent);

        position: relative;
        aspect-ratio: v-bind(aspectRatio);
        border-radius: calc(var(--radius) - 1px);

        &:not(:first-child) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        &:not(:last-child) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        &-content {
            position: relative;
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;

            &.is-controlled {
                overflow: hidden;

                -webkit-mask-image: var(--mask-content);
                mask-image: var(--mask-content);
            }
        }

        &-magic {
            position: absolute;
            inset: -1px;
            border: 1px solid v-bind(borderColor);
            border-radius: inherit;
        }

        &-canvas {
            --grid: linear-gradient(to bottom, rgb(0 0 0 / .48) calc(100% - 1px), black calc(100% - 1px)), linear-gradient(to right, rgb(0 0 0 / .48) calc(100% - 1px), black calc(100% - 1px));
            --size: 30px;
        }

        &.is-masked &-magic {
            -webkit-mask-image: var(--mask);
            mask-image: var(--mask);
        }

        + :where(.flux-pane-body, .flux-pane-header) {
            position: relative;
            margin-top: -60px;
        }
    }
</style>
