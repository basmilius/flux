<template>
    <flux-notice-stack>
        <flux-notice
            icon="circle-exclamation"
            is-loading
            title="Not activated"
            message="Your account is not yet activated, please check your email to activate it."
            variant="gray"/>

        <flux-notice
            icon="sparkles"
            is-loading
            title="Flux 2.0"
            message="A new release of Flux is available! It contains a new documentation website among many more new features."
            variant="primary"/>

        <flux-notice
            icon="circle-exclamation"
            is-loading
            title="Account suspended"
            message="Your account has been suspended due to suspicious activity. Contact support for more information about the suspension."
            variant="danger"/>

        <flux-notice
            icon="circle-info"
            is-loading
            title="Sales graph"
            message="This graph displays the amount of leads against the amount of expired carts."
            variant="info"/>

        <flux-notice
            icon="circle-check"
            is-loading
            title="Profile updated"
            message="Your profile details are successfully updated."
            variant="success"/>

        <flux-notice
            icon="circle-exclamation"
            is-loading
            title="Storage 95% full"
            message="Go to your account storage settings to increase your storage subscription or delete older files to free up storage."
            variant="warning"/>
    </flux-notice-stack>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxNotice,
        FluxNoticeStack
    } from '@fancee/flux';
</script>
