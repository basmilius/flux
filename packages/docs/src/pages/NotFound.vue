<template>
    <flux-stack>
        <page-title
            section="Oops"
            title="Not found"/>

        <flux-notice
            icon="circle-exclamation"
            message="Please keep in mind that the documentation website is still in progress."
            variant="warning"/>

        <section>
            <p>
                Oops, it seems you've hit a snag! The page you are looking for cannot be found. It could be possible that the
                page has been removed or the URL has been changed. We apologize for any inconvenience this may have caused.
            </p>
            <p>
                Please check the URL again to make sure it's correct. If you arrived here by clicking on a link, it might be
                broken. In this case, we recommend you return to the homepage and try to navigate to the page you need using
                the menu.
            </p>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice, FluxStack } from '@fancee/flux';
    import { PageTitle } from '@/components';
</script>
