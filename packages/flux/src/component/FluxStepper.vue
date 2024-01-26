<template>
    <slot
        name="steps"
        v-bind="{activate, activeIndex: modelValue, modelValue, steps}">
        <FluxStepperSteps
            :amount="steps"
            :current="modelValue + 1"
            @activate="activate"/>
    </slot>

    <slot
        name="content"
        v-bind="{activate, activeIndex: modelValue, children, isTransitioningBack, modelValue, steps, view}">
        <FluxWindowTransition :is-back="isTransitioningBack">
            <FluxDynamicView
                :key="modelValue"
                :vnode="view"/>
        </FluxWindowTransition>
    </slot>
</template>

<script
    lang="ts"
    setup>
    import { computed, ref, unref, useSlots, watch } from 'vue';
    import { FluxWindowTransition } from '@/transition';
    import { flattenVNodeTree } from '@/util';
    import FluxDynamicView from './FluxDynamicView.vue';
    import FluxStepperSteps from './FluxStepperSteps.vue';

    const modelValue = defineModel<number>({default: 0});

    const slots = useSlots();

    const isTransitioningBack = ref(false);

    const children = computed(() => flattenVNodeTree(slots.default?.() ?? []));
    const steps = computed(() => unref(children).length);
    const view = computed(() => unref(children)[unref(modelValue)] ?? null);

    function activate(index: number): void {
        modelValue.value = index;
    }

    watch(modelValue, (newIndex, oldIndex) => {
        isTransitioningBack.value = newIndex < oldIndex;
    });
</script>
