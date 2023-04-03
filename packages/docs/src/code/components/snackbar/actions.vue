<template>
    <flux-snackbar
        v-if="isVisible"
        :actions="{yes: 'Yes', no: 'No'}"
        color="danger"
        icon="circle-exclamation"
        message="Do you really want to remove this event from your account? This cannot be undone."
        title="Really?"
        @action="onAction"/>

    <flux-button-stack>
        <flux-primary-button
            icon-before="bullhorn"
            label="Toggle Snackbar"
            @click="isVisible = !isVisible"/>

        <span>{{ result }}</span>
    </flux-button-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton, FluxSnackbar } from '@fancee/flux';
    import { ref } from 'vue';

    const isVisible = ref(false);
    const result = ref('');

    function onAction(actionKey: string): void {
        isVisible.value = false;
        result.value = actionKey;
    }
</script>
