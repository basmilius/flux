<template>
    <FluxWindowTransition :is-back="isBack">
        <slot
            :key="view"
            :name="view"
            v-bind="{back, navigate}"/>
    </FluxWindowTransition>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue-demi';
    import { FluxWindowTransition } from '../transition';

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
