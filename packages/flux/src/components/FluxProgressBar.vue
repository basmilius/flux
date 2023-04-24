<template>
    <div
        class="flux-progress-bar"
        :class="{
            'is-indeterminate': isIndeterminate
        }">
        <div class="flux-progress-bar-value"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs, unref } from 'vue-demi';

    export interface Props {
        readonly isIndeterminate?: boolean;
        readonly max?: number;
        readonly min?: number;
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
</script>

<style lang="scss">
    .flux-progress-bar {
        position: relative;
        height: 15px;
        background: rgb(var(--gray-3));
        border-radius: calc(var(--radius) / 2);
        contain: paint;

        &-value {
            position: absolute;
            top: 0;
            left: 0;
            height: inherit;
            width: calc(v-bind(position) * 100%);
            background: rgb(var(--primary-8));
            transition: width 300ms var(--swift-out);
        }

        &.is-indeterminate {
        }

        &.is-indeterminate &-value {
            width: 250%;
            background: linear-gradient(to right, rgb(var(--primary-8)) 40%, rgb(var(--primary-4)), rgb(var(--primary-8)) 60%);
            animation: flux-progress-bar 1s var(--swift-out) infinite;
        }
    }

    @keyframes flux-progress-bar {
        0% {
            left: -150%;
        }

        50% {
            left: 0;
        }

        100% {
            left: -150%;
        }
    }
</style>
