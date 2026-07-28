<template>
    <Preview>
        <FluxPopConfirm
            confirm-label="Delete"
            icon="trash"
            is-destructive
            message="Delete this invoice? This cannot be undone.">
            <template #opener="{ toggle }">
                <FluxSecondaryButton
                    icon-leading="trash"
                    label="Delete invoice"
                    @click="toggle()"/>
            </template>
        </FluxPopConfirm>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxPopConfirm, FluxSecondaryButton } from '@flux-ui/components';
</script>
