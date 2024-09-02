<template>
    <div
        ref="elementRef"
        :class="styles.stepperSteps"
        :style="{
            '--progress': progress
        }">
        <template
            v-for="step of amount"
            :key="step">
            <button
                :class="clsx(
                    styles.stepperStepsItem,
                    current > step && styles.stepperStepsItemComplete,
                    current === step && styles.stepperStepsItemCurrent,
                    current < step && styles.stepperStepsItemIdle
                )"
                tabindex="-1"
                type="button"
                @click="activate(step)">
                <span :class="styles.stepperStepsItemParticles"/>

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
    import { clsx } from 'clsx';
    import { computed, ref, toRefs, unref } from 'vue';
    import { FluxFadeTransition } from '@/transition';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Stepper.module.scss';

    export type Emits = {
        activate: [number];
    };

    export type Props = {
        readonly amount: number;
        readonly current: number;
    };

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {amount, current} = toRefs(props);

    const elementRef = ref<HTMLDivElement>();

    const progress = computed(() => (unref(current) - 1) / (unref(amount) - 1));

    function activate(index: number): void {
        emit('activate', index);
    }
</script>
