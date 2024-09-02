<template>
    <TransitionGroup
        name="flux-snackbars"
        tag="div"
        :class="styles.snackbars"
        :enter-active-class="styles.snackbarsEnterActive"
        :enter-from-class="styles.snackbarsEnterFrom"
        :leave-active-class="styles.snackbarsLeaveActive"
        :leave-to-class="styles.snackbarsLeaveTo"
        :move-class="styles.snackbarsMove">
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
    import { FluxSnackbarSpec, useFluxStore } from '@/data';
    import FluxSnackbar from './FluxSnackbar.vue';
    import styles from '@/css/component/Snackbar.module.scss';

    const {snackbars} = useFluxStore();

    function onAction(snackbar: FluxSnackbarSpec): (actionKey: string) => void {
        return actionKey => snackbar.onAction?.(actionKey);
    }
</script>
