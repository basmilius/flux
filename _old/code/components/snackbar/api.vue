<template>
    <FluxButtonStack>
        <FluxPrimaryButton
            icon-before="bullhorn"
            label="Show Snackbar"
            @click="show"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton, useFluxStore } from '@basmilius/flux';

    const {showSnackbar} = useFluxStore();

    function show(): void {
        showSnackbar({
            icon: 'bullhorn',
            title: 'Snackbar',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate est exercitationem fuga impedit iusto nam nesciunt pariatur porro praesentium quidem! A, accusamus blanditiis dicta esse in itaque neque rerum. Enim!'
        });
    }
</script>
