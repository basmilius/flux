<template>
    <flux-snackbar
        v-if="isVisible"
        icon="circle-check"
        message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate est exercitationem fuga impedit iusto nam nesciunt pariatur porro praesentium quidem! A, accusamus blanditiis dicta esse in itaque neque rerum. Enim!"
        title="Snackbar"/>

    <flux-button-stack>
        <flux-primary-button
            icon-before="bullhorn"
            label="Toggle Snackbar"
            @click="isVisible = !isVisible"/>
    </flux-button-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton, FluxSnackbar } from '@fancee/flux';
    import { ref } from 'vue';

    const isVisible = ref(false);
</script>
