<template>
    <svg
        aria-hidden="true"
        :class="$style.dotPattern">
        <defs>
            <pattern
                :id="id"
                :width="width"
                :height="height"
                patternContentUnits="userSpaceOnUse"
                patternUnits="userSpaceOnUse"
                :x="-1"
                :y="-1">
                <circle
                    :r="cr"
                    :cx="width / 2 - cx"
                    :cy="height / 2 - cy"/>
            </pattern>
        </defs>

        <rect
            width="100%"
            height="100%"
            stroke-width="0"
            :fill="`url(#${id})`"/>
    </svg>
</template>

<script
    lang="ts"
    setup>
    import { useId } from 'vue';
    import $style from '~flux/components/css/component/Visual.module.scss';

    const {
        width = 16,
        height = 16,
        cr = 1,
        cx = 1,
        cy = 1
    } = defineProps<{
        readonly width?: number;
        readonly height?: number;
        readonly cr?: number;
        readonly cx?: number;
        readonly cy?: number;
    }>();

    const id = useId();
</script>
