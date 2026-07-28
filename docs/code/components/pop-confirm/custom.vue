<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="12">
        <FluxPopConfirm
            confirm-label="Sign out"
            is-destructive
            label="Sign out"
            @confirm="signOut()">
            <template #opener="{ toggle }">
                <FluxSecondaryButton
                    icon-leading="arrow-right-from-bracket"
                    label="Sign out"
                    @click="toggle()"/>
            </template>

            <FluxFlex
                direction="vertical"
                :gap="9">
                <strong>Sign out of this device?</strong>

                <FluxFormCheckbox
                    v-model="isEverywhere"
                    label="Also sign out everywhere else"/>
            </FluxFlex>
        </FluxPopConfirm>

        <span v-if="signedOut">{{ signedOut }}</span>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxFormCheckbox, FluxPopConfirm, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isEverywhere = ref(false);
    const signedOut = ref('');

    function signOut(): void {
        signedOut.value = isEverywhere.value
            ? 'Signed out of every device.'
            : 'Signed out of this device.';
    }
</script>
