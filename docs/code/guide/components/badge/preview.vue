<template>
    <Preview>
        <FluxBadgeStack>
            <FluxBadge label="Help wanted"/>

            <FluxBadge
                color="danger"
                dot
                label="Attention"/>

            <FluxBadge
                color="success"
                icon="circle-check"
                label="Completed"/>

            <FluxBadge
                is-loading
                label="Running"/>
        </FluxBadgeStack>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@flux-ui/flux';
</script>
