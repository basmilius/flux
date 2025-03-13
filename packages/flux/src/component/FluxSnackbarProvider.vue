<template>
    <TransitionGroup
        name="flux-snackbars"
        tag="div"
        :class="$style.snackbars"
        :enter-active-class="$style.snackbarsEnterActive"
        :enter-from-class="$style.snackbarsEnterFrom"
        :leave-active-class="$style.snackbarsLeaveActive"
        :leave-to-class="$style.snackbarsLeaveTo"
        :move-class="$style.snackbarsMove">
        <FluxSnackbar
            v-for="snackbar of snackbars.toReversed()"
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
    import { useFluxStore } from '$flux/data';
    import type { FluxSnackbarObject } from '$flux/types';
    import FluxSnackbar from './FluxSnackbar.vue';
    import $style from '$flux/css/component/Snackbar.module.scss';

    const {snackbars} = useFluxStore();

    function onAction(snackbar: FluxSnackbarObject): (actionKey: string) => void {
        return actionKey => snackbar.onAction?.(actionKey);
    }
</script>
