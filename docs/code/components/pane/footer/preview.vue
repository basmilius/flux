<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium blanditiis id omnis placeat saepe soluta! Accusantium dolor facilis veritatis! Ab ad autem eaque earum error facere inventore quod sint soluta?
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Cancel"/>

                <FluxSpacer/>

                <FluxDestructiveButton
                    label="Delete"/>
            </FluxPaneFooter>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxDestructiveButton, FluxPane, FluxPaneBody, FluxPaneFooter, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';
</script>
