<template>
    <FluxBadgeStack>
        <FluxBadge
            is-loading
            label="Pending"/>

        <FluxBadge
            is-loading
            label="Saving"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@fancee/flux';
</script>
