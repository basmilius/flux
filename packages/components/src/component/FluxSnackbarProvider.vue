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
            v-for="snackbar of reversedSnackbars"
            :key="snackbar.id"
            :="snackbar"
            is-rendered/>
    </TransitionGroup>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue';
    import { useFluxStore } from '~flux/components/data';
    import FluxSnackbar from './FluxSnackbar.vue';
    import $style from '~flux/components/css/component/Snackbar.module.scss';

    const {snackbars} = useFluxStore();
    const reversedSnackbars = computed(() => snackbars.toReversed());
</script>
