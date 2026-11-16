<template>
    <div
        ref="zone"
        :class="$style.dateScrubber"
        role="slider"
        tabindex="0"/>
</template>

<script
    lang="ts"
    setup>
    import type { DateTime } from 'luxon';
    import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue';
    import { createDateScrubber, type DateScrubber } from '~flux/components/util';
    import $style from '~flux/components/css/component/DateScrubber.module.scss';

    const modelValue = defineModel<number>({default: 0});

    const {
        dates
    } = defineProps<{
        readonly dates: DateTime[];
    }>();

    const zoneRef = useTemplateRef('zone');
    let scrubber: DateScrubber | null = null;

    watch(() => dates, () => {
        destroy();
        create();
    });

    watch(modelValue, index => scrubber?.select(index));

    onMounted(() => create());

    onBeforeUnmount(() => destroy());

    function create(): void {
        if (!zoneRef.value || dates.length < 2) {
            return;
        }

        scrubber = createDateScrubber(zoneRef.value, {
            classes: {
                cap: $style.dateScrubberCap,
                current: $style.isCurrent,
                date: $style.dateScrubberDate,
                fineLabel: $style.dateScrubberFineLabel,
                held: $style.isHeld,
                month: $style.isMonth,
                reel: $style.dateScrubberReel,
                separator: $style.dateScrubberSeparator,
                tick: $style.dateScrubberTick
            },
            dates: dates.map(date => date.toMillis()),
            initialIndex: modelValue.value,
            locale: dates[0].locale ?? undefined,
            onChange: index => modelValue.value = index
        });
    }

    function destroy(): void {
        scrubber?.destroy();
        scrubber = null;
    }
</script>
