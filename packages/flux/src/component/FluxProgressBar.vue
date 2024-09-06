<template>
    <FluxStack
        :class="styles.progressBar"
        :gap="6"
        role="progressbar"
        :aria-valuenow="value"
        :aria-valuemax="max"
        :aria-valuemin="min">
        <div :class="isIndeterminate ? styles.progressBarTrackIndeterminate : styles.progressBarTrack">
            <div
                :class="styles.progressBarValue"
                :style="{
                    width: `${isIndeterminate ? 100 : position * 100}%`
                }"/>
        </div>

        <div
            v-if="status"
            :class="styles.progressBarInfo">
            <FluxFadeTransition>
                <span
                    :key="status"
                    :class="styles.progressBarStatus">
                    {{ status }}
                </span>
            </FluxFadeTransition>

            <FluxFadeTransition>
                <span
                    v-if="!isIndeterminate"
                    :class="styles.progressBarProgress">
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
    import { FluxFadeTransition } from '@/transition';
    import FluxStack from './FluxStack.vue';
    import styles from '@/css/component/Progress.module.scss';

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
