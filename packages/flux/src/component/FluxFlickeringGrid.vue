<template>
    <canvas
        ref="canvas"
        :class="$style.flickeringGrid"/>
</template>

<script
    lang="ts"
    setup>
    import { mulberry32 } from '@basmilius/utils';
    import { useInView } from '@flux-ui/internals';
    import { computed, unref, useTemplateRef, watch } from 'vue';
    import $style from '$flux/css/component/Visual.module.scss';

    const {
        color = '#1d4ed8',
        flickerChance = 0.15,
        gap = 6,
        maxOpacity = 0.3,
        size = 3
    } = defineProps<{
        readonly color?: string;
        readonly flickerChance?: number;
        readonly gap?: number;
        readonly maxOpacity?: number;
        readonly size?: number;
    }>();

    const canvasRef = useTemplateRef('canvas');

    const inView = useInView(canvasRef);

    const mulberry = mulberry32(13);

    const rgb = computed(() => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;

        const context = canvas.getContext('2d');

        if (!context) {
            return [0, 0, 0];
        }

        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);

        return context.getImageData(0, 0, 1, 1).data;
    });

    function draw(context: CanvasRenderingContext2D, width: number, height: number, columns: number, rows: number, squares: Float32Array, dpr: number): void {
        context.clearRect(0, 0, width * dpr, height * dpr);

        const [r, g, b] = unref(rgb);

        for (let i = 0; i < columns; ++i) {
            for (let j = 0; j < rows; ++j) {
                const opacity = squares[i * rows + j];
                context.fillStyle = `rgb(${r} ${g} ${b} / ${opacity})`;
                context.fillRect(
                    (i * (size + gap) + width / 2 - (columns / 2 * (size + gap) - gap / 2)) * dpr,
                    (j * (size + gap) + height / 2 - (rows / 2 * (size + gap) - gap / 2)) * dpr,
                    size * dpr,
                    size * dpr
                );
            }
        }
    }

    function setup(canvas: HTMLCanvasElement) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const columns = Math.ceil(width / (size + gap));
        const rows = Math.ceil(height / (size + gap));
        const squares = new Float32Array(columns * rows);

        for (let i = 0; i < squares.length; ++i) {
            squares[i] = mulberry.next() * maxOpacity;
        }

        return {
            width,
            height,
            columns,
            rows,
            squares,
            dpr
        };
    }

    function tick(squares: Float32Array, delta: number): void {
        for (let i = 0; i < squares.length; ++i) {
            if (mulberry.next() < flickerChance * delta) {
                squares[i] = mulberry.next() * maxOpacity;
            }
        }
    }

    watch([canvasRef, inView], ([canvas, inView], _, onCleanup) => {
        if (!canvas || !inView) {
            return;
        }

        const context = canvas.getContext('2d');

        if (!context) {
            return;
        }

        let frame = 0;
        let lastTime = 0;
        let {width, height, columns, rows, squares, dpr} = setup(canvas);

        const animate = (time: number): void => {
            const delta = (time - lastTime) / 1000;
            lastTime = time;

            tick(squares, delta);
            draw(context, width, height, columns, rows, squares, dpr);
            frame = requestAnimationFrame(animate);
        };

        const onResize = () => {
            ({width, height, columns, rows, squares, dpr} = setup(canvas));
        };

        window.addEventListener('resize', onResize, {passive: true});
        requestAnimationFrame(animate);

        onCleanup(() => {
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(frame);
        });
    }, {immediate: true});
</script>
