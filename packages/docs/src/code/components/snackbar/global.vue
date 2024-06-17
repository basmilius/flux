<template>
    <FluxSnackbar
        v-if="isVisible"
        icon="circle-check"
        message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate est exercitationem fuga impedit iusto nam nesciunt pariatur porro praesentium quidem! A, accusamus blanditiis dicta esse in itaque neque rerum. Enim!"
        title="Snackbar"/>

    <FluxButtonStack>
        <FluxPrimaryButton
            icon-before="bullhorn"
            label="Toggle Snackbar"
            @click="isVisible = !isVisible"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton, FluxSnackbar } from '@basmilius/flux';
    import { ref } from 'vue';

    const isVisible = ref(false);
</script>
