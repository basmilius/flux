<template>
    <svg
        ref="root"
        aria-hidden="true"
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

            <pattern
                v-if="glow"
                :id="glowId"
                :width="width"
                :height="height"
                patternUnits="userSpaceOnUse"
                :x="-1"
                :y="-1">
                <path
                    :class="$glow.glowLine"
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
            v-if="squares?.length"
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

        <rect
            v-if="glow"
            :class="[$glow.glowLayer, active && $glow.isActive]"
            width="100%"
            height="100%"
            stroke-width="0"
            :fill="`url(#${glowId})`"/>
    </svg>
</template>

<script
    lang="ts"
    setup>
    import { ref, unref, useId, useTemplateRef, watch } from 'vue';
    import $glow from '~flux/visuals/css/component/PatternGlow.module.scss';
    import $style from '~flux/visuals/css/component/Visual.module.scss';

    const {
        width = 42,
        height = 42,
        strokeDasharray = 0,
        squares,
        glow = false
    } = defineProps<{
        readonly width?: number;
        readonly height?: number;
        readonly strokeDasharray?: number | string;
        readonly squares?: Array<[x: number, y: number]>;
        readonly glow?: boolean;
    }>();

    const id = useId();
    const glowId = `${id}-glow`;
    const rootRef = useTemplateRef<SVGSVGElement>('root');
    const active = ref(false);

    // The pattern svg has pointer-events: none, so the cursor is tracked on the
    // parent scroll/overflow container instead. The position is written straight
    // to CSS custom properties to avoid a re-render on every pointermove.
    watch([rootRef, () => glow], (_, __, onCleanup) => {
        const root = unref(rootRef);

        if (!glow || !root || !root.parentElement) {
            return;
        }

        const parent = root.parentElement;

        const onPointerMove = (event: PointerEvent): void => {
            const rect = parent.getBoundingClientRect();
            root.style.setProperty('--pattern-glow-x', `${event.clientX - rect.left}px`);
            root.style.setProperty('--pattern-glow-y', `${event.clientY - rect.top}px`);
        };

        const onPointerEnter = (): void => {
            active.value = true;
        };

        const onPointerLeave = (): void => {
            active.value = false;
        };

        parent.addEventListener('pointermove', onPointerMove, {passive: true});
        parent.addEventListener('pointerenter', onPointerEnter);
        parent.addEventListener('pointerleave', onPointerLeave);

        onCleanup(() => {
            active.value = false;
            parent.removeEventListener('pointermove', onPointerMove);
            parent.removeEventListener('pointerenter', onPointerEnter);
            parent.removeEventListener('pointerleave', onPointerLeave);
        });
    }, {immediate: true});
</script>
