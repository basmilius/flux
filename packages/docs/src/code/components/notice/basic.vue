<template>
    <FluxNoticeStack>
        <FluxNotice
            icon="circle-exclamation"
            title="Not activated"
            message="Your account is not yet activated, please check your email to activate it."
            variant="gray"/>

        <FluxNotice
            icon="sparkles"
            title="Flux 2.0"
            message="A new release of Flux is available! It contains a new documentation website among many more new features."
            variant="primary"/>

        <FluxNotice
            icon="circle-exclamation"
            title="Account suspended"
            message="Your account has been suspended due to suspicious activity. Contact support for more information about the suspension."
            variant="danger"/>

        <FluxNotice
            icon="circle-info"
            title="Sales graph"
            message="This graph displays the amount of leads against the amount of expired carts."
            variant="info"/>

        <FluxNotice
            icon="circle-check"
            title="Profile updated"
            message="Your profile details are successfully updated."
            variant="success"/>

        <FluxNotice
            icon="circle-exclamation"
            title="Storage 95% full"
            message="Go to your account storage settings to increase your storage subscription or delete older files to free up storage."
            variant="warning"/>
    </FluxNoticeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice, FluxNoticeStack } from '@basmilius/flux';
</script>
