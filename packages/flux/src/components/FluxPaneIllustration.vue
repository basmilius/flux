<template>
    <div
        class="flux-pane-illustration"
        :class="{
            'is-masked': isMasked
        }">
        <div class="flux-pane-illustration-magic">
            <canvas
                ref="canvasRef"
                class="flux-pane-illustration-canvas"/>
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
    import { computed, onBeforeUnmount, onMounted, toRefs, unref, useSlots, watch } from 'vue-demi';
    import { useComponentId } from '../composables';
    import { hexToRGB, mulberry32 } from '../utils';
    import { ref } from 'vue';

    type Polygon = [number, number, string, PolygonPoint[]];
    type PolygonPoint = [number, number, number];

    export interface Props {
        readonly animatedColors: string[] | null;
        readonly animatedSeed: number | null;
        readonly aspectRatio?: number;
        readonly isMasked?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        animatedColors: null,
        animatedSeed: null,
        aspectRatio: 16 / 9
    });
    const {animatedColors, animatedSeed} = toRefs(props);

    const id = useComponentId();
    const slots = useSlots();

    const canvasRef = ref<HTMLCanvasElement>();
    const contextRef = ref<CanvasRenderingContext2D>();
    const animationFrame = ref(0);
    const tick = ref(0);

    const borderColor = computed(() => {
        const colors = unref(animatedColors);

        if (!colors || colors.length === 0) {
            return 'transparent';
        }

        const [r, g, b] = hexToRGB(colors[0]);

        return `rgb(${r} ${g} ${b} / .15)`;
    });

    const polygons = computed(() => {
        const colors = unref(animatedColors);
        const seed = unref(animatedSeed) ?? unref(id);

        if (!colors || !seed) {
            return [];
        }

        const mulberry = mulberry32(seed);
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
        tick.value++;
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

        context.globalCompositeOperation = 'screen';
        context.clearRect(0, 0, width, height);

        for (const [tx, ty, color, shape] of shapes) {
            context.save();
            context.translate(tx * width, ty * height);
            context.beginPath();
            context.fillStyle = color;

            for (let i = 0; i < shape.length; ++i) {
                let [x, y, m] = shape[i];

                x = Math.cos(x * Math.PI * 2 + tick.value / (m * 200 + 200)) * (width * .8);
                y = Math.sin(y * Math.PI * 2 + tick.value / (m * 100 + 200)) * (height * .8);

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

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-pane-illustration {
        --pane-illustration-grid: linear-gradient(to bottom, rgb(0 0 0 / .48) calc(100% - 1px), black calc(100% - 1px)), linear-gradient(to right, rgb(0 0 0 / .48) calc(100% - 1px), black calc(100% - 1px));
        --pane-illustration-mask: linear-gradient(to bottom, black, transparent);
        --pane-illustration-mask-content: linear-gradient(to bottom, black, rgb(0 0 0 / .75), transparent);

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

                -webkit-mask-image: var(--pane-illustration-mask-content);
                mask-image: var(--pane-illustration-mask-content);
            }
        }

        &-magic {
            position: absolute;
            inset: -1px;
            border: 1px solid v-bind(borderColor);
            border-radius: inherit;
        }

        &-canvas {
            height: 100%;
            width: 100%;
            filter: blur(60px) saturate(180%);
            opacity: .5;

            -webkit-mask-image: var(--pane-illustration-grid);
            -webkit-mask-position: top left;
            -webkit-mask-size: 30px 30px;
            mask-image: var(--pane-illustration-grid);
            mask-position: top left;
            mask-size: 30px 30px;
        }

        &.is-masked &-canvas {
            opacity: 1;
        }

        &.is-masked &-magic {
            -webkit-mask-image: var(--pane-illustration-mask);
            mask-image: var(--pane-illustration-mask);
        }

        + :where(.flux-pane-body, .flux-pane-header) {
            position: relative;
            margin-top: -60px;
        }
    }
</style>
