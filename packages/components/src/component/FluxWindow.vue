<template>
    <FluxWindowTransition :is-back="isBack">
        <template v-for="(_, slot) of slots">
            <slot
                v-if="slot === view"
                v-bind="{back, navigate}"
                :name="slot"/>
        </template>
    </FluxWindowTransition>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue';
    import { FluxWindowTransition } from '$flux/transition';

    const slots = defineSlots<{
        default(props: {
            back(to?: string): void;
            navigate(to: string): void;
        }): any;

        [key: string]: (props: {
            back(to?: string): void;
            navigate(to: string): void;
        }) => any;
    }>();

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
