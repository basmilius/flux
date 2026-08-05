<template>
    <FluxFlex
        :class="clsx(
            $style.progressBar,
            color === 'gray' && $style.progressBarGray,
            color === 'primary' && $style.progressBarPrimary,
            color === 'danger' && $style.progressBarDanger,
            color === 'info' && $style.progressBarInfo,
            color === 'success' && $style.progressBarSuccess,
            color === 'warning' && $style.progressBarWarning
        )"
        direction="vertical"
        :gap="6"
        role="progressbar"
        :aria-valuenow="isIndeterminate ? undefined : ariaValueNow"
        :aria-valuemax="max"
        :aria-valuemin="min"
        :aria-valuetext="status ? (isIndeterminate ? status : `${status}: ${progress}`) : undefined">
        <div :class="isIndeterminate ? $style.progressBarTrackIndeterminate : $style.progressBarTrack">
            <div
                :class="position >= 1 ? $style.progressBarValueComplete : $style.progressBarValueIncomplete"
                :style="{
                    width: `${isIndeterminate ? 100 : position * 100}%`
                }"/>
        </div>

        <div
            v-if="status"
            :class="$style.progressBarStatusRow">
            <FluxFadeTransition>
                <span
                    :key="status"
                    :class="$style.progressBarStatus">
                    {{ status }}
                </span>
            </FluxFadeTransition>

            <FluxFadeTransition>
                <span
                    v-if="!isIndeterminate"
                    :class="$style.progressBarProgress">
                    {{ progress }}
                </span>
            </FluxFadeTransition>
        </div>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { clamp } from '@basmilius/utils';
    import { useNumberFormat } from '@flux-ui/internals';
    import type { FluxColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, unref } from 'vue';
    import { FluxFadeTransition } from '~flux/components/transition';
    import FluxFlex from './FluxFlex.vue';
    import $style from '~flux/components/css/component/Progress.module.scss';

    const {
        color = 'primary',
        isIndeterminate,
        max = 1,
        min = 0,
        value
    } = defineProps<{
        readonly color?: FluxColor;
        readonly isIndeterminate?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly status?: string;
        readonly value?: number;
    }>();

    const formatter = useNumberFormat({
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    const ariaValueNow = computed(() => {
        const current = value ?? min;

        return clamp(current, min, max);
    });

    const position = computed(() => {
        if (isIndeterminate) {
            return 0;
        }

        const current = value ?? min;

        if (max <= min) {
            return current >= max ? 1 : 0;
        }

        return clamp((current - min) / (max - min), 0, 1);
    });

    const progress = computed(() => unref(formatter).format(unref(position) ?? 0));
</script>
