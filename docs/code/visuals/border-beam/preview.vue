<template>
    <Preview>
        <FluxVisualBorderBeam>
            <FluxPane style="max-width: 360px;">
                <FluxPaneHeader title="Introducing AI assist"/>

                <FluxPaneBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet assumenda beatae commodi culpa fugit laboriosam nihil quasi quibusdam veniam!
                </FluxPaneBody>

                <FluxPaneBody>
                    <FluxSecondaryButton
                        icon-leading="sparkles"
                        label="Try it out"/>
                </FluxPaneBody>
            </FluxPane>
        </FluxVisualBorderBeam>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualBorderBeam } from '@flux-ui/visuals';
</script>
