<template>
    <div
        class="flux-pane-illustration"
        :class="{
            'is-masked': isMasked
        }">
        <div class="flux-pane-illustration-grid">
            <template v-for="polygon of polygons">
                <div
                    class="flux-pane-illustration-polygon"
                    :style="{
                    '--x': polygon[0],
                    '--y': polygon[1],
                    '--w': polygon[2],
                    '--h': polygon[3],
                    '--polygon': generateClipPath(polygon)
                }"/>
            </template>
            <slot name="grid"/>
        </div>
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, onMounted, onUnmounted, toRefs, unref, watch } from 'vue-demi';
    import { useComponentId } from '../composables';
    import { Mulberry32, mulberry32 } from '../utils';
    import { ref } from 'vue';

    type Polygon = [number, number, number, number, PolygonPoint[]];
    type PolygonPoint = [number, number];

    export interface Props {
        readonly aspectRatio?: number;
        readonly isMasked?: boolean;
        readonly seed: number | null;
    }

    const props = withDefaults(defineProps<Props>(), {
        aspectRatio: 16 / 9,
        seed: 0
    });
    const {seed} = toRefs(props);

    const id = useComponentId();

    const animationFrameRef = ref(0);
    const mulberryRef = ref<Mulberry32>();
    const polygonsRef = ref<Polygon[]>([]);
    const tickRef = ref<number>(0);

    onMounted(() => update());

    onUnmounted(() => cancelAnimationFrame(animationFrameRef.value));

    const polygons = computed(() => unref(polygonsRef).map(polygon => {
        const tick = unref(tickRef);
        const copy = [...polygon];

        copy[4] = polygon[4].map(([x, y]) => [
            (1 + Math.cos(x + tick / 200)) * 50 % 100,
            (1 + Math.sin(y + tick / 200)) * 50 % 100
        ]);

        return copy;
    }));

    function generateClipPath([, , , , shape]: Polygon): string {
        return `polygon(${shape.map(([x, y]) => `${x}% ${y}%`).join(', ')})`;
    }

    function generatePolygon(mulberry: Mulberry32): Polygon {
        const points: PolygonPoint[] = [];
        const count = Math.round(mulberry.nextBetween(5, 8));

        for (let i = 0; i < count; ++i) {
            const x = Math.round(mulberry.nextBetween(0, 100));
            const y = Math.round(mulberry.nextBetween(0, 100));

            points.push([x, y]);
        }

        return [
            Math.round(mulberry.nextBetween(0, 100)),
            Math.round(mulberry.nextBetween(0, 100)),
            Math.round(mulberry.nextBetween(50, 75)),
            Math.round(mulberry.nextBetween(50, 75)),
            points
        ];
    }

    function update(): void {
        tickRef.value++;
        animationFrameRef.value = requestAnimationFrame(update);
    }

    watch(seed, seed => mulberryRef.value = mulberry32(seed ?? id.value), {immediate: true});

    watch(mulberryRef, mulberry => {
        console.log('updated mulberry');

        const count = Math.round(mulberry!.nextBetween(2, 3));
        polygonsRef.value = [];

        for (let i = 0; i < count; ++i) {
            polygonsRef.value.push(generatePolygon(mulberry!));
        }
    }, {immediate: true});
</script>

<style lang="scss">
    .flux-pane-illustration {
        --pane-illustration-grid: linear-gradient(to bottom, transparent calc(100% - 1px), black calc(100% - 1px)), linear-gradient(to right, transparent calc(100% - 1px), black calc(100% - 1px));
        --pane-illustration-mask: linear-gradient(to bottom, black, transparent);

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

        &-grid {
            position: absolute;
            display: block;
            inset: -1px;
            border: 1px solid transparent;
            border-radius: inherit;
            overflow: hidden;

            &::before {
                position: absolute;
                display: block;
                inset: 0;
                content: '';
                -webkit-mask-image: var(--pane-illustration-grid);
                -webkit-mask-position: top left;
                -webkit-mask-size: 30px 30px;
                mask-image: var(--pane-illustration-grid);
                mask-position: top left;
                mask-size: 30px 30px;
            }
        }

        &-polygon {
            position: absolute;
            display: block;
            inset: 0;
            height: 100%;
            width: 100%;
            filter: blur(60px) opacity(.25);

            &::before {
                position: absolute;
                display: block;
                inset: 0;
                background: crimson;
                clip-path: var(--polygon);
                content: '';
            }
        }

        &.is-masked &-grid {
            inset: -1px -1px 0;
            border-bottom-width: 0;
            -webkit-mask-image: var(--pane-illustration-mask);
            mask-image: var(--pane-illustration-mask);
        }

        + :where(.flux-pane-body, .flux-pane-header) {
            position: relative;
            margin-top: -60px;
        }
    }

    .flux-pane-illustration {
        &-grid {
            background: #fef2ff;
            border-color: rgb(213 188 243 / .75);

            &::before {
                background: rgb(234 222 249 / .5);
            }
        }

        $-colors: (#6071b5, #f07db7, #ffa600);

        @for $n from 1 to length($-colors) {
            &-polygon:nth-child(#{$n})::before {
                background: nth($-colors, $n);
            }
        }
    }
</style>
