<template>
    <FluxBadgeStack>
        <FluxBadge
            is-tag
            label="Tag"/>

        <FluxBadge
            is-deletable
            is-tag
            label="Removable tag"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@basmilius/flux';
</script>
