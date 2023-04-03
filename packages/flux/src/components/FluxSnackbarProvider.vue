<template>
    <transition-group
        name="flux-snackbars"
        tag="div"
        class="flux-snackbars"
        id="flux-snackbars">
        <template
            v-for="snackbar of snackbars"
            :key="snackbar.id">
            <flux-snackbar
                :actions="snackbar.actions"
                :color="snackbar.color"
                :icon="snackbar.icon"
                :is-closeable="snackbar.isCloseable"
                :is-loading="snackbar.isLoading"
                :message="snackbar.message"
                :sub-message="snackbar.subMessage"
                :title="snackbar.title"
                is-rendered
                @action="actionKey => snackbar.onAction?.(actionKey)"
                @close="() => snackbar.onClose?.()"/>
        </template>
    </transition-group>
</template>

<script
    lang="ts"
    setup>
    import { storeToRefs } from 'pinia';
    import { useFluxStore } from '../data';
    import { FluxSnackbar } from '.';

    const fluxStore = useFluxStore();
    const {snackbars} = storeToRefs(fluxStore);
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-snackbars {
        position: fixed;
        display: flex;
        flex-flow: column;
        gap: 15px;
        z-index: 10000;

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

        &-enter-from {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
        }

        &-leave-to {
            opacity: 0;
        }
    }
</style>
