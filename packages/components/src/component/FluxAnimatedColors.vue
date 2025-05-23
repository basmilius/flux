<template>
    <canvas
        ref="canvas"
        :class="$style.animatedColors"/>
</template>

<script
    lang="ts"
    setup>
    import { mulberry32 } from '@basmilius/utils';
    import { useComponentId } from '@flux-ui/internals';
    import { computed, onBeforeUnmount, onMounted, ref, unref, useTemplateRef, watch } from 'vue';
    import $style from '$flux/css/component/Visual.module.scss';

    type Polygon = [number, number, string, PolygonPoint[]];
    type PolygonPoint = [number, number, number];

    const {
        colors,
        incrementor = 1,
        opacity = .5,
        seed
    } = defineProps<{
        readonly colors?: string[];
        readonly incrementor?: number;
        readonly opacity?: number;
        readonly seed?: number;
    }>();

    const canvasRef = useTemplateRef('canvas');
    const componentId = useComponentId();

    const contextRef = ref<CanvasRenderingContext2D>();
    const animationFrame = ref(0);
    const tick = ref(0);

    const polygons = computed(() => {
        if (!colors || colors.length === 0) {
            return [];
        }

        const mulberry = mulberry32(seed ?? unref(componentId));
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

    onMounted(() => schedule());
    onBeforeUnmount(() => cancel());

    function cancel(): void {
        cancelAnimationFrame(animationFrame.value);
    }

    function schedule(): void {
        animationFrame.value = requestAnimationFrame(update);
        tick.value += incrementor;
    }

    function update(): void {
        const context = unref(contextRef);
        const shapes = unref(polygons);

        if (!context || shapes.length === 0) {
            return;
        }

        const width = context.canvas.offsetWidth;
        const height = context.canvas.offsetHeight;
        context.canvas.width = width;
        context.canvas.height = height;

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

        schedule();
    }

    watch(canvasRef, canvas => {
        if (!canvas) {
            contextRef.value = undefined;
            return;
        }

        contextRef.value = canvas.getContext('2d', {
            alpha: true,
            colorSpace: 'display-p3'
        })!;
    }, {immediate: true});

    watch(polygons, () => {
        cancel();
        schedule();
    });
</script>
