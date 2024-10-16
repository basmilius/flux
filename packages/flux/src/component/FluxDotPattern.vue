<template>
    <svg
        ref="svg"
        :class="styles.dotPattern">
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
    import { ref, useId, useTemplateRef, watch } from 'vue';
    import styles from '@/css/component/Visual.module.scss';

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

    const svgRef = useTemplateRef<HTMLElement>('svg');
    const id = useId();

    const svgWidth = ref(0);
    const svgHeight = ref(0);

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
