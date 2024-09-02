<template>
    <div :class="styles.ticks">
        <template
            v-for="tick of ticks"
            :key="tick">
            <div
                :class="styles.tickLarge"
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
                :class="styles.tickSmall"
                :style="{
                    '--position': (tick - lower) / (upper - lower)
                }"/>
        </template>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs } from 'vue';
    import { generateStepTicks } from '@/util';
    import styles from '@/css/component/Form.module.scss';

    export type Props = {
        readonly lower: number;
        readonly upper: number;
    };

    const props = defineProps<Props>();
    const {lower, upper} = toRefs(props);

    const smallTicks = computed(() => generateStepTicks(lower.value, upper.value, 50, true).filter(s => !ticks.value.includes(s)));
    const ticks = computed(() => generateStepTicks(lower.value, upper.value, 5));
</script>
