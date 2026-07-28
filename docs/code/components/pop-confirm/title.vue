<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="12">
        <FluxPopConfirm
            confirm-label="Send"
            icon="paper-plane"
            message="Alex receives an email with a link that is valid for seven days."
            title="Send invitation"
            @confirm="isSent = true">
            <template #opener="{ toggle }">
                <FluxSecondaryButton
                    icon-leading="paper-plane"
                    label="Invite Alex"
                    @click="toggle()"/>
            </template>
        </FluxPopConfirm>

        <span v-if="isSent">The invitation is on its way.</span>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPopConfirm, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isSent = ref(false);
</script>
