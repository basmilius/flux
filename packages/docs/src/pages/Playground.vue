<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview>
                <flux-pane>
                    <flux-pane-body :gap="30">
                        <flux-comment is-flipped/>
                        <flux-comment is-received/>
                    </flux-pane-body>
                </flux-pane>
            </preview>

            <preview>
                <span style="font-size: 60px">🙂</span>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxComment, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
</script>
