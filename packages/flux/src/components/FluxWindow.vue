<template>
    <transition
        mode="out-in"
        :name="isBack ? 'flux-window-back' : 'flux-window'">
        <slot
            :key="view"
            :name="view"
            v-bind="{back, navigate}"/>
    </transition>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue-demi';

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
</script>

<style lang="scss">
    .flux-window {
        overflow: auto;
        transition: height 150ms var(--deceleration-curve);

        &-enter-active,
        &-back-enter-active {
            transition: 150ms var(--deceleration-curve);
            transition-property: opacity, transform;
        }

        &-leave-active,
        &-back-leave-active {
            transition: 150ms var(--acceleration-curve);
            transition-property: opacity, transform;
        }

        &-enter-from,
        &-back-leave-to {
            opacity: 0;
            transform: translate3d(15px, 0, 0);
        }

        &-leave-to,
        &-back-enter-from {
            opacity: 0;
            transform: translate3d(-15px, 0, 0);
        }
    }
</style>
