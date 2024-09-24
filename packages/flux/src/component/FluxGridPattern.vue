<template>
    <svg
        ref="svg"
        :class="styles.gridPattern">
        <defs>
            <pattern
                :id="id"
                :width="width"
                :height="height"
                patternUnits="userSpaceOnUse"
                :x="x"
                :y="y">
                <path
                    :d="`M.5 ${height}V.5H${width}`"
                    fill="none"
                    :stroke-dasharray="strokeDasharray"/>
            </pattern>
        </defs>

        <rect
            width="100%"
            height="100%"
            stroke-width="0"
            :fill="`url(#${id})`"/>

        <svg
            v-if="squares"
            :x="x"
            :y="y"
            style="overflow: visible;">
            <rect
                v-for="[x, y] of squares"
                :key="`${x}-${y}`"
                :width="width - 1"
                :height="height - 1"
                :x="x * width + 1"
                :y="y * height + 1"
                stroke-width="0"/>
        </svg>
    </svg>
</template>

<script
    lang="ts"
    setup>
    import { computed, ref, useId, useTemplateRef, watch } from 'vue';
    import styles from '@/css/component/Visual.module.scss';

    const {
        width = 42,
        height = 42,
        strokeDasharray = 0,
        squares
    } = defineProps<{
        readonly width?: number;
        readonly height?: number;
        readonly strokeDasharray?: number | string;
        readonly squares?: Array<[x: number, y: number]>;
    }>();

    const svgRef = useTemplateRef('svg');
    const id = useId();

    const svgWidth = ref(0);
    const svgHeight = ref(0);

    const x = computed(() => -((svgWidth.value % width) / 2));
    const y = computed(() => -((svgHeight.value % height) / 2));

    watch(svgRef, (svg, _, onCleanup) => {
        if (!svg) {
            return;
        }

        const onResize = () => {
            svgWidth.value = svg.clientWidth;
            svgHeight.value = svg.clientHeight;
        };

        window.addEventListener('resize', onResize, {passive: true});
        onResize();

        onCleanup(() => {
            window.removeEventListener('resize', onResize);
        });
    }, {immediate: true});
</script>
