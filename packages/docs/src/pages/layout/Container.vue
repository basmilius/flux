<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Container"/>

        <preview>
            <flux-pane style="height: 108px; width: 75%;"/>
        </preview>

        <section>
            <p>
                The primary container which dynamically changes widths based on the viewport.
            </p>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxStack } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
</script>
