<template>
    <svg
        ref="root"
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

            <pattern
                v-if="glow"
                :id="glowId"
                :width="width"
                :height="height"
                patternContentUnits="userSpaceOnUse"
                patternUnits="userSpaceOnUse"
                :x="-1"
                :y="-1">
                <circle
                    :class="$glow.glowDot"
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
        width = 16,
        height = 16,
        cr = 1,
        cx = 1,
        cy = 1,
        glow = false
    } = defineProps<{
        readonly width?: number;
        readonly height?: number;
        readonly cr?: number;
        readonly cx?: number;
        readonly cy?: number;
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
