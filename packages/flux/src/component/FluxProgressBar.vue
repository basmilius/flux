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
    import { computed, toRefs, unref } from 'vue';
    import { FluxFadeTransition } from '@/transition';
    import FluxStack from './FluxStack.vue';
    import styles from '@/css/component/Progress.module.scss';

    export type Props = {
        readonly isIndeterminate?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly status?: string;
        readonly value?: number;
    };

    const props = withDefaults(defineProps<Props>(), {
        max: 1,
        min: 0
    });
    const {isIndeterminate, max, min, value} = toRefs(props);

    const position = computed(() => {
        if (unref(isIndeterminate)) {
            return 0;
        }

        const val = unref(value) ?? min.value;

        return (val - min.value) / (max.value - min.value);
    });

    const progress = computed(() => new Intl
        .NumberFormat(navigator.language, {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })
        .format(unref(position) ?? 0));
</script>
