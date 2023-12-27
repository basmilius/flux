<template>
    <FluxStack
        class="flux-progress-bar"
        :gap="6"
        role="progressbar"
        :aria-valuenow="value"
        :aria-valuemax="max"
        :aria-valuemin="min">
        <div
            class="flux-progress-bar-track"
            :class="{
                'is-indeterminate': isIndeterminate
            }">
            <div
                class="flux-progress-bar-value"
                :style="{
                    width: `${isIndeterminate ? 100 : position * 100}%`
                }"/>
        </div>

        <div
            v-if="status"
            class="flux-progress-bar-info">
            <FluxFadeTransition>
                <span
                    :key="status"
                    class="flux-progress-bar-status">
                    {{ status }}
                </span>
            </FluxFadeTransition>

            <FluxFadeTransition>
                <span
                    v-if="!isIndeterminate"
                    class="flux-progress-bar-progress">
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

    export interface Props {
        readonly isIndeterminate?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly status?: string;
        readonly value?: number;
    }

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

<style lang="scss">
    .flux-progress-bar {
        position: relative;

        &-info {
            display: flex;
            gap: 21px;
            justify-content: flex-end;
            font-size: 14px;
        }

        &-info &-progress {
            flex-shrink: 0;
            font-variant-numeric: tabular-nums;
            font-weight: 500;
        }

        &-info &-status {
            margin-right: auto;
            color: var(--foreground-secondary);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &-track {
            position: relative;
            height: 9px;
            background: rgb(var(--gray-3));
            border-radius: calc(var(--radius) / 2);
            contain: paint;
        }

        &-value {
            position: absolute;
            top: 0;
            left: 0;
            height: inherit;
            background: linear-gradient(to right, rgb(var(--primary-8)) 20%, rgb(var(--primary-6)), rgb(var(--primary-8)) 80%);
            background-size: 150px 100%;
            border-radius: inherit;
            animation: flux-progress-bar-value 1s linear infinite;
        }

        &-track.is-indeterminate &-value {
            background: linear-gradient(to right, rgb(var(--primary-8)) 20%, rgb(var(--primary-6)), rgb(var(--primary-8)) 80%);
            background-size: 90px 100%;
            animation: flux-progress-bar-indeterminate 1s linear infinite;
        }
    }

    .flux-pane > .flux-progress-bar:first-child {
        margin: 9px 9px 0;
    }

    .flux-pane > .flux-progress-bar:last-child {
        margin: 0 9px 9px;
    }

    @keyframes flux-progress-bar-indeterminate {
        from {
            background-position-x: 90px;
        }

        to {
            background-position-x: -90px;
        }
    }

    @keyframes flux-progress-bar-value {
        from {
            background-position-x: -150px;
        }

        to {
            background-position-x: 150px;
        }
    }
</style>
