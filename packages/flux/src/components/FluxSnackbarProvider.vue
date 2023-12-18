<template>
    <TransitionGroup
        name="flux-snackbars"
        tag="div"
        class="flux-snackbars"
        id="flux-snackbars">
        <FluxSnackbar
            v-for="snackbar of snackbars"
            :key="snackbar.id"
            :="snackbar"
            is-rendered
            @action="onAction(snackbar)"
            @close="() => snackbar.onClose?.()"/>
    </TransitionGroup>
</template>

<script
    lang="ts"
    setup>
    import { FluxSnackbarSpec, useFluxStore } from '@/data';
    import FluxSnackbar from './FluxSnackbar.vue';

    const {snackbars} = useFluxStore();

    function onAction(snackbar: FluxSnackbarSpec): (actionKey: string) => void {
        return actionKey => snackbar.onAction?.(actionKey);
    }
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-snackbars {
        position: fixed;
        display: flex;
        flex-flow: column;
        gap: 15px;
        z-index: 100000;

        @include flux.breakpoint-down(md) {
            left: 15px;
            right: 15px;
            bottom: 15px;
        }

        @include flux.breakpoint-up(lg) {
            width: 480px;
            top: 114px;
            right: 30px;
        }

        &-enter-active,
        &-leave-active,
        &-move {
            transition: 540ms var(--swift-out);
        }

        &-leave-active {
            position: absolute;
            width: 100%;
        }

        &-enter,
        &-enter-from {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
        }

        &-leave-to {
            opacity: 0;
        }
    }
</style>
