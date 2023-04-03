<template>
    <flux-button-stack>
        <flux-primary-button
            icon-before="bullhorn"
            label="Show Snackbar"
            @click="show"/>
    </flux-button-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton, FluxSnackbar, useFluxStore } from '@fancee/flux';

    const {showSnackbar} = useFluxStore();

    function show(): void {
        showSnackbar(3000, {
            icon: 'bullhorn',
            title: 'Snackbar',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate est exercitationem fuga impedit iusto nam nesciunt pariatur porro praesentium quidem! A, accusamus blanditiis dicta esse in itaque neque rerum. Enim!'
        });
    }
</script>
