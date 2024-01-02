<template>
    <FluxWindowTransition :is-back="isBack">
        <template v-for="(_, slot) of slots">
            <slot
                v-bind="{back, navigate}"
                v-if="slot === view"
                :name="slot"/>
        </template>
    </FluxWindowTransition>
</template>

<script
    lang="ts"
    setup>
    import { ref, useSlots } from 'vue';
    import { FluxWindowTransition } from '@/transition';

    const slots = useSlots();

    const isBack = ref(false);
    const view = ref<string>('default');

    function back(to: string = 'default'): void {
        isBack.value = true;
        view.value = to;
    }

    function navigate(to: string): void {
        isBack.value = false;
        view.value = to;
    }

    defineExpose({
        back,
        navigate
    });
</script>
