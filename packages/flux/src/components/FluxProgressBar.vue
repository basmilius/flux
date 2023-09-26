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

        &.is-indeterminate &-value {
            width: 250%;
            background: linear-gradient(to right, rgb(var(--primary-8)) 40%, rgb(var(--primary-6)), rgb(var(--primary-8)) 60%);
            animation: flux-progress-bar 1s ease-out infinite;
        }
    }

    @keyframes flux-progress-bar {
        from {
            left: 0;
        }

        to {
            left: -150%;
        }
    }
</style>
