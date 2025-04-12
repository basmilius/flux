<template>
    <FluxStack
        :class="$style.progressBar"
        :gap="6"
        role="progressbar"
        :aria-valuenow="value"
        :aria-valuemax="max"
        :aria-valuemin="min">
        <div :class="isIndeterminate ? $style.progressBarTrackIndeterminate : $style.progressBarTrack">
            <div
                :class="$style.progressBarValue"
                :style="{
                    width: `${isIndeterminate ? 100 : position * 100}%`
                }"/>
        </div>

        <div
            v-if="status"
            :class="$style.progressBarInfo">
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
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { computed, unref } from 'vue';
    import { FluxFadeTransition } from '$flux/transition';
    import FluxStack from './FluxStack.vue';
    import $style from '$flux/css/component/Progress.module.scss';

    const {
        isIndeterminate,
        max = 1,
        min = 0,
        value
    } = defineProps<{
        readonly isIndeterminate?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly status?: string;
        readonly value?: number;
    }>();

    const position = computed(() => {
        if (isIndeterminate) {
            return 0;
        }

        return ((value ?? min) - min) / (max - min);
    });

    const progress = computed(() => new Intl
        .NumberFormat(navigator.language, {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })
        .format(unref(position) ?? 0));
</script>
