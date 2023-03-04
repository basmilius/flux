<template>
    <flux-button-stack>
        <flux-flyout
            axis="horizontal"
            :width="360">
            <template #opener="{open}">
                <flux-secondary-button
                    icon-after="question"
                    @click="open"/>
            </template>

            <template #default="{close}">
                <flux-pane-body>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam cum deleniti dicta distinctio ea error eum excepturi facilis illo laudantium, maxime modi molestiae neque quisquam unde velit veritatis voluptatibus.
                </flux-pane-body>
                <flux-pane-footer>
                    <flux-spacer/>
                    <flux-secondary-button
                        label="Close"
                        @click="close"/>
                </flux-pane-footer>
            </template>
        </flux-flyout>
    </flux-button-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxFlyout, FluxPaneBody, FluxPaneFooter, FluxSecondaryButton, FluxSpacer } from '@fancee/flux';
</script>
