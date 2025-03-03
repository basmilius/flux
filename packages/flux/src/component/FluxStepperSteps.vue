<template>
    <div
        :class="$style.stepperSteps"
        :style="{
            '--progress': progress
        }">
        <template
            v-for="step of amount"
            :key="step">
            <button
                :class="clsx(
                    $style.stepperStepsItem,
                    current > step && $style.stepperStepsItemComplete,
                    current === step && $style.stepperStepsItemCurrent,
                    current < step && $style.stepperStepsItemIdle
                )"
                tabindex="-1"
                type="button"
                @click="activate(step - 1)">
                <span :class="$style.stepperStepsItemParticles"/>

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
    import { computed } from 'vue';
    import { FluxFadeTransition } from '@/transition';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Stepper.module.scss';

    const emit = defineEmits<{
        activate: [number];
    }>();

    const {
        amount,
        current
    } = defineProps<{
        readonly amount: number;
        readonly current: number;
    }>();

    const progress = computed(() => (current - 1) / (amount - 1));

    function activate(index: number): void {
        emit('activate', index);
    }
</script>
