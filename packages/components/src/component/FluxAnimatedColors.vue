<template>
    <canvas
        ref="canvas"
        aria-hidden="true"
        :class="$style.animatedColors"/>
</template>

<script
    lang="ts"
    setup>
    import { useComponentId } from '@basmilius/common';
    import { mulberry32 } from '@basmilius/utils';
    import { useInView } from '@flux-ui/internals';
    import { computed, onBeforeUnmount, ref, unref, useTemplateRef, watch } from 'vue';
    import $style from '~flux/components/css/component/Visual.module.scss';

    type Polygon = [number, number, string, PolygonPoint[]];
    type PolygonPoint = [number, number, number];

    const {
        colors,
        incrementor = 1,
        opacity = .5,
        seed,
        static: isStatic
    } = defineProps<{
        readonly colors?: string[];
        readonly incrementor?: number;
        readonly opacity?: number;
        readonly seed?: number;
        readonly static?: boolean;
    }>();

    const canvasRef = useTemplateRef('canvas');
    const componentId = useComponentId();
    const inView = useInView(canvasRef, {initial: true});

    const contextRef = ref<CanvasRenderingContext2D>();
    const animationFrame = ref(0);
    const tick = ref(0);
    const size = ref<{ width: number; height: number; } | null>(null);

    const reducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const polygons = computed(() => {
        if (!colors || colors.length === 0) {
            return [];
        }

        const mulberry = mulberry32(seed ?? componentId.value);
        const polygons: Polygon[] = [];

        for (const color of colors) {
            const localMulberry = mulberry.fork();

            const x = colors.length === 1 ? .5 : localMulberry.next();
            const y = colors.length === 1 ? .5 : localMulberry.next();
            const count = Math.round(localMulberry.nextBetween(6, 9));
            const points: PolygonPoint[] = [];

            for (let p = 0; p < count; ++p) {
                points.push([
                    localMulberry.next(),
                    localMulberry.next(),
                    localMulberry.next()
                ]);
            }

            polygons.push([x, y, color, points]);
        }

        return polygons;
    });

    onBeforeUnmount(() => cancel());

    function cancel(): void {
        cancelAnimationFrame(animationFrame.value);
        animationFrame.value = 0;
    }

    function schedule(): void {
        animationFrame.value = requestAnimationFrame(update);
        tick.value += incrementor;
    }

    function update(): void {
        render();

        if (!isStatic && !reducedMotion && unref(inView)) {
            schedule();
        } else {
            animationFrame.value = 0;
        }
    }

    function render(): void {
        const context = unref(contextRef);
        const shapes = unref(polygons);
        const dimensions = unref(size);

        if (!context || shapes.length === 0 || !dimensions) {
            return;
        }

        const {width, height} = dimensions;
        const widthBasedOpacity = Math.min(1, Math.max(.15, 360 / width));

        context.globalAlpha = opacity * widthBasedOpacity;
        context.globalCompositeOperation = 'screen';
        context.clearRect(0, 0, width, height);

        for (const [tx, ty, color, shape] of shapes) {
            context.save();
            context.translate(tx * width, ty * height);
            context.beginPath();
            context.fillStyle = color;

            for (let i = 0; i < shape.length; ++i) {
                let [x, y, m] = shape[i];

                x = Math.cos(x * Math.PI * 2 + tick.value / (m * 200 + 300)) * (width * .8);
                y = Math.sin(y * Math.PI * 2 + tick.value / (m * 100 + 300)) * (height * .8);

                if (i === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            }

            context.closePath();
            context.fill();
            context.restore();
        }
    }

    function restart(): void {
        cancel();

        if (isStatic || reducedMotion || !unref(inView)) {
            render();
            return;
        }

        schedule();
    }

    watch(canvasRef, (canvas, _, onCleanup) => {
        if (!canvas) {
            contextRef.value = undefined;
            size.value = null;
            return;
        }

        contextRef.value = canvas.getContext('2d', {
            alpha: true,
            colorSpace: 'display-p3'
        })!;

        if (typeof ResizeObserver === 'undefined') {
            size.value = {width: canvas.offsetWidth, height: canvas.offsetHeight};
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            return;
        }

        const observer = new ResizeObserver(() => {
            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;

            if (!width || !height || (size.value?.width === width && size.value?.height === height)) {
                return;
            }

            canvas.width = width;
            canvas.height = height;
            size.value = {width, height};
        });

        observer.observe(canvas);

        onCleanup(() => observer.disconnect());
    }, {immediate: true});

    watch([polygons, () => opacity, size, inView], () => restart());
</script>
