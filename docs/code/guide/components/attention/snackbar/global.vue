<template>
    <FluxSnackbar
        v-if="isVisible"
        icon="circle-check"
        message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate est exercitationem fuga impedit iusto nam nesciunt pariatur porro praesentium quidem! A, accusamus blanditiis dicta esse in itaque neque rerum. Enim!"/>

    <FluxPrimaryButton
        label="Toggle Snackbar"
        @click="isVisible = !isVisible"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, FluxSnackbar } from '@flux-ui/flux';
    import { ref } from 'vue';

    const isVisible = ref(false);
</script>
