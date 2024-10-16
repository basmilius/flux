<template>
    <div :class="$style.ticks">
        <template
            v-for="tick of ticks"
            :key="tick">
            <div
                :class="$style.tickLarge"
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
                :class="$style.tickSmall"
                :style="{
                    '--position': (tick - lower) / (upper - lower)
                }"/>
        </template>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue';
    import { generateStepTicks } from '@/util';
    import $style from '@/css/component/primitive/Slider.module.scss';

    const {
        lower,
        upper
    } = defineProps<{
        readonly lower: number;
        readonly upper: number;
    }>();

    const smallTicks = computed(() => generateStepTicks(lower, upper, 50, true).filter(s => !ticks.value.includes(s)));
    const ticks = computed(() => generateStepTicks(lower, upper, 5));
</script>
