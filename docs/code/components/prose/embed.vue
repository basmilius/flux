<template>
    <FluxProse>
        <h3>Embedding a component</h3>
        <p>Prose only styles its own HTML elements, so you can drop a Flux component straight into an article. It keeps its own styling and still flows in the vertical rhythm.</p>

        <FluxPane>
            <FluxPaneHeader
                icon="circle-info"
                subtitle="Dropped straight into the prose"
                title="Embedded component"/>
            <FluxPaneBody>
                No wrapper needed. The pane is left untouched by the prose rules, yet it is spaced from the paragraph above just like any other block.
            </FluxPaneBody>
        </FluxPane>

        <p>After the component, the text continues in the same rhythm.</p>
    </FluxProse>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxProse } from '@flux-ui/components';
</script>
