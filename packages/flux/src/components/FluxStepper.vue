<template>
    <div class="flux-stepper">
        <slot
            name="steps"
            v-bind="{activate, activeIndex, steps}">
            <FluxStepperSteps
                :amount="steps"
                :current="activeIndex + 1"
                @activate="activate"/>
        </slot>

        <slot
            name="content"
            v-bind="{activate, activeIndex, children, isTransitioningBack, steps, view}">
            <FluxWindowTransition :is-back="isTransitioningBack">
                <FluxDynamicView
                    :key="activeIndex"
                    :vnode="view"/>
            </FluxWindowTransition>
        </slot>
    </div>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'model-value',
            event: 'update:model-value'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import { computed, ref, toRefs, unref, watch } from 'vue-demi';
    import { useSlotVNodes } from '@/composables';
    import { FluxWindowTransition } from '@/transition';
    import FluxDynamicView from './FluxDynamicView.vue';
    import FluxStepperSteps from './FluxStepperSteps.vue';

    export interface Emits {
        (e: 'activate', index: number): void;

        (e: 'update:model-value', index: number): void;
    }

    export interface Props {
        readonly modelValue: number;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {modelValue} = toRefs(props);

    const children = useSlotVNodes('default');

    const activeIndex = ref(0);
    const isTransitioningBack = ref(false);

    const steps = computed(() => unref(children).length);
    const view = computed(() => unref(children)[unref(activeIndex)] ?? null);

    function activate(index: number): void {
        emit('activate', index);
    }

    watch(activeIndex, (newIndex, oldIndex) => {
        isTransitioningBack.value = newIndex < oldIndex;
        emit('update:model-value', newIndex);
    });

    watch(modelValue, modelValue => activeIndex.value = modelValue, {immediate: true});
</script>

<style lang="scss">
    .flux-stepper {
        display: contents;
    }
</style>
