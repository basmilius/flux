<template>
    <svg
        ref="svg"
        :class="$style.gridPattern">
        <defs>
            <pattern
                :id="id"
                :width="width"
                :height="height"
                patternUnits="userSpaceOnUse"
                :x="-1"
                :y="-1">
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
            style="overflow: visible;">
            <rect
                v-for="[x, y] of squares"
                :key="`${x}-${y}`"
                :width="width - 1"
                :height="height - 1"
                :x="x * width"
                :y="y * height"
                stroke-width="0"/>
        </svg>
    </svg>
</template>

<script
    lang="ts"
    setup>
    import { useId } from 'vue';
    import $style from '$flux/css/component/Visual.module.scss';

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

    const id = useId();
</script>
