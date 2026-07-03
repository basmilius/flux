<template>
    <div
        ref="wrapper"
        :class="clsx(
            $style.borderBeam,
            VARIANT_CLASSES[variant],
            $style[colorVariant],
            isActive && !isFading && $style.isActive,
            isFading && $style.isFading,
            isPaused && $style.isPaused,
            isStatic && $style.isStatic
        )"
        :style="style"
        @animationend="onAnimationEnd">
        <slot/>

        <div
            aria-hidden="true"
            :class="$style.bloom"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useInView } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { computed, ref, unref, useTemplateRef, watch } from 'vue';
    import { useBorderBeamPulse, type BorderBeamVariant } from '~flux/visuals/composable/private';
    import $style from '~flux/visuals/css/component/BorderBeam.module.scss';

    const emit = defineEmits<{
        activate: [];
        deactivate: [];
    }>();

    const {
        active = true,
        brightness,
        colorVariant = 'colorful',
        duration,
        hueRange = 30,
        radius,
        saturation,
        staticColors = false,
        strength = 1,
        variant = 'md'
    } = defineProps<{
        readonly active?: boolean;
        readonly brightness?: number;
        readonly colorVariant?: 'colorful' | 'mono' | 'ocean' | 'sunset';
        readonly duration?: number;
        readonly hueRange?: number;
        readonly radius?: string | number;
        readonly saturation?: number;
        readonly staticColors?: boolean;
        readonly strength?: number;
        readonly variant?: BorderBeamVariant;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const VARIANT_CLASSES: Record<BorderBeamVariant, string> = {
        'sm': $style.sm,
        'md': $style.md,
        'line': $style.line,
        'pulse-inner': $style.pulseInner,
        'pulse-outside': $style.pulseOutside
    };

    const wrapperRef = useTemplateRef('wrapper');
    const inView = useInView(wrapperRef, {initial: true, rootMargin: '256px'});

    const isActive = ref(active);
    const isFading = ref(false);
    const glowScale = ref<{ x: number; y: number; } | null>(null);

    const isPulse = computed(() => variant === 'pulse-inner' || variant === 'pulse-outside');
    const isStatic = computed(() => staticColors || colorVariant === 'mono');
    const isPaused = computed(() => isActive.value && !isFading.value && !inView.value);
    const resolvedDuration = computed(() => duration ?? (variant === 'line' ? 3.1 : isPulse.value ? 2.3 : 1.96));

    const style = computed(() => ({
        '--beam-brightness': brightness,
        '--beam-duration': resolvedDuration.value,
        '--beam-glow-sx': glowScale.value?.x,
        '--beam-glow-sy': glowScale.value?.y,
        '--beam-hue-range': variant === 'line' ? Math.min(hueRange, 13) : hueRange,
        '--beam-radius': typeof radius === 'number' ? `${radius}px` : radius,
        '--beam-saturation': saturation,
        '--beam-strength': Math.max(0, Math.min(1, strength))
    }));

    useBorderBeamPulse({
        duration: resolvedDuration,
        elementRef: wrapperRef,
        enabled: computed(() => (isActive.value || isFading.value) && inView.value),
        staticColors: isStatic,
        variant: computed(() => variant)
    });

    watch(() => active, value => {
        if (value) {
            // Also covers re-activating while the fade-out is still running: cancel the
            // fade, otherwise its animationend would turn the beam off for good.
            isFading.value = false;
            isActive.value = true;
        } else if (isActive.value && !isFading.value) {
            isFading.value = true;
        }
    });

    // The pulse-outside glow geometry is authored in fixed pixels for a reference
    // element of ~350x140; measure the wrapped element and scale the glow per-axis
    // so the halo fits any component it's applied to.
    watch([wrapperRef, () => variant], (_, __, onCleanup) => {
        glowScale.value = null;

        const wrapper = unref(wrapperRef);

        if (!wrapper || variant !== 'pulse-outside' || typeof ResizeObserver === 'undefined') {
            return;
        }

        const child = wrapper.firstElementChild;

        if (!child || !(child instanceof HTMLElement)) {
            return;
        }

        const clamp = (value: number): number => Math.max(.35, Math.min(4, value));

        const measure = (): void => {
            const rect = child.getBoundingClientRect();

            if (!rect.width || !rect.height) {
                return;
            }

            const x = +clamp(rect.width / 350).toFixed(3);
            const y = +clamp(rect.height / 140).toFixed(3);

            if (glowScale.value?.x !== x || glowScale.value?.y !== y) {
                glowScale.value = {x, y};
            }
        };

        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(child);

        onCleanup(() => observer.disconnect());
    }, {immediate: true});

    function onAnimationEnd(event: AnimationEvent): void {
        if (event.target !== event.currentTarget) {
            return;
        }

        if (isFading.value) {
            isActive.value = false;
            isFading.value = false;
            emit('deactivate');
        } else if (isActive.value) {
            emit('activate');
        }
    }
</script>
