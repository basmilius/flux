<template>
    <div
        ref="elementRef"
        class="flux-stepper-steps">
        <template
            v-for="step of amount"
            :key="step">
            <button
                class="flux-stepper-steps-step"
                :class="{
                    'is-active': current > step,
                    'is-complete': current > step,
                    'is-current': current === step
                }"
                tabindex="-1"
                type="button"
                @click="activate(step)">
                <span class="flux-stepper-steps-step-particles"/>

                <FluxFadeTransition>
                    <FluxIcon
                        v-if="current > step"
                        variant="check"/>

                    <span v-else>
                        {{ step }}
                    </span>
                </FluxFadeTransition>
            </button>
        </template>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, onMounted, ref, toRefs, unref } from 'vue-demi';
    import { FluxFadeTransition } from '@/transition';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'activate', index: number): void;
    }

    export interface Props {
        readonly amount: number;
        readonly current: number;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {amount, current} = toRefs(props);

    const elementRef = ref<HTMLDivElement>();

    const progress = computed(() => (unref(current) - 1) / (unref(amount) - 1));

    function activate(index: number): void {
        emit('activate', index);
    }
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-stepper-steps {
        --progress: v-bind(progress);

        position: relative;
        display: flex;
        align-items: center;
        flex-grow: 1;
        justify-content: space-between;
        background: inherit;
        z-index: 0;

        &::before,
        &::after {
            --margin: 15px;
            --max: calc(100% - var(--margin) * 2);

            position: absolute;
            display: block;
            top: calc(50% - 2px);
            left: 0;
            margin-left: var(--margin);
            margin-right: var(--margin);
            height: 4px;
            content: '';
            z-index: -1;
        }

        &::before {
            width: var(--max);
            background: rgb(var(--gray-3));
        }

        &::after {
            width: calc(min(1, var(--progress)) * var(--max));
            background: rgb(var(--primary-7));
            transition: width 300ms var(--swift-out);
        }

        &-step {
            position: relative;
            display: flex;
            height: 33px;
            width: 33px;
            align-items: center;
            justify-content: center;
            background: rgb(var(--gray-3));
            border: 0;
            border-radius: 99px;
            color: var(--foreground);
            cursor: default;
            font-size: 14px;
            font-weight: 700;
            outline: 3px solid transparent;
            outline-offset: -2px;
            transition: 300ms var(--swift-out);
            transition-property: background, border, color, outline;

            @include flux.sparkles();

            &.is-complete {
                background: rgb(var(--primary-7));
                border-color: rgb(var(--primary-7));
                color: rgb(var(--primary-0));
            }

            &.is-current {
                color: var(--foreground-prominent);
                outline-color: rgb(var(--primary-7));
                outline-width: 2px;
                transition-delay: 75ms;
            }

            &:not(.is-complete, .is-current) {
                outline-color: rgb(var(--gray-0));
            }

            .flux-icon {
                overflow: visible;
                scale: .8;

                path {
                    stroke: currentColor;
                    stroke-width: 54px;
                }
            }
        }
    }
</style>
