<template>
    <div class="flux-ticks">
        <template
            v-for="tick of ticks"
            :key="tick">
            <div
                class="flux-tick"
                :style="{
                        '--position': (tick - lower) / (upper - lower)
                    }">
                <span>{{ tick }}</span>
            </div>
        </template>

        <template
            v-for="tick of smallTicks"
            :key="tick">
            <div
                class="flux-tick is-small"
                :style="{
                        '--position': (tick - lower) / (upper - lower)
                    }"/>
        </template>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs } from 'vue-demi';
    import { generateStepTicks } from '../utils';

    export interface Props {
        readonly lower: number;
        readonly upper: number;
    }

    const props = defineProps<Props>();
    const {lower, upper} = toRefs(props);

    const smallTicks = computed(() => generateStepTicks(lower.value, upper.value, 50, true).filter(s => !ticks.value.includes(s)));
    const ticks = computed(() => generateStepTicks(lower.value, upper.value, 5));
</script>

<style lang="scss">
    .flux-tick {
        position: absolute;
        left: calc(var(--position) * 100% - 1px);
        bottom: 0;
        height: 9px;
        width: 2px;
        background: rgb(var(--gray-5));
        border-radius: 99px;
        color: var(--foreground-prominent);
        font-size: 10px;
        font-weight: 600;
        pointer-events: none;

        &.is-small {
            height: 6px;
            opacity: .5;
        }

        span {
            position: relative;
            display: inline-block;
            translate: -50% -100%;
        }

        &s {
            position: relative;
            display: block;
            height: 21px;
        }
    }
</style>
