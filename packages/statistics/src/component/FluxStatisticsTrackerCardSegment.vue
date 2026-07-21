<template>
    <div
        :class="$style.trackerCardSegment"
        role="listitem"
        :aria-label="label"
        :aria-current="state === 'active' ? 'step' : undefined">
        <span
            :class="clsx(
                $style.trackerCardSegmentBar,
                state === 'active' && $style.isActive,
                state === 'done' && $style.isDone
            )"
            :style="{
                '--color': colorValue,
                '--progress': `${progress * 100}%`
            }"/>

        <span
            v-if="label"
            :class="$style.trackerCardSegmentLabel">
            {{ label }}
        </span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import { resolveChartColor } from '~flux/statistics/util';
    import $style from '~flux/statistics/css/TrackerCard.module.scss';

    const {
        color,
        max = 100,
        min = 0,
        state = 'todo',
        value = 50
    } = defineProps<{
        readonly color?: FluxStatisticsChartColor;
        readonly label?: string;
        readonly max?: number;
        readonly min?: number;
        readonly state?: 'active' | 'done' | 'todo';
        readonly value?: number;
    }>();

    const colorValue = computed(() => resolveChartColor(color));

    // Only read while the segment is active; the other states are either full or empty.
    const progress = computed(() => {
        const range = max - min;

        if (range <= 0) {
            return 0;
        }

        return Math.min(1, Math.max(0, (value - min) / range));
    });
</script>
