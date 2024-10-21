<template>
    <FluxSnackbar
        v-if="isVisible"
        :actions="{yes: 'Yes', no: 'No'}"
        color="danger"
        icon="circle-exclamation"
        message="Do you really want to remove this event from your account? This cannot be undone."
        title="Really?"
        @action="onAction"/>

    <FluxButtonStack>
        <FluxPrimaryButton
            icon-before="bullhorn"
            label="Toggle Snackbar"
            @click="isVisible = !isVisible"/>

        <span>{{ result }}</span>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton, FluxSnackbar } from '@basmilius/flux';
    import { ref } from 'vue';

    const isVisible = ref(false);
    const result = ref('');

    function onAction(actionKey: string): void {
        isVisible.value = false;
        result.value = actionKey;
    }
</script>
