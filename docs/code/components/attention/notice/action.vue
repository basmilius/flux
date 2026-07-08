<template>
    <FluxNotice
        color="info"
        icon="circle-info"
        message="You're using 90% of your available storage.">
        <template #end>
            <FluxSecondaryButton label="Upgrade"/>
        </template>
    </FluxNotice>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice, FluxSecondaryButton } from '@flux-ui/components';
</script>
