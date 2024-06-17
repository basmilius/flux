<template>
    <FluxButtonStack>
        <FluxFlyout
            axis="horizontal"
            :width="360">
            <template #opener="{open}">
                <FluxSecondaryButton
                    icon-after="question"
                    @click="open"/>
            </template>

            <template #default="{close}">
                <FluxPaneBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam cum deleniti dicta distinctio ea error eum excepturi facilis illo laudantium, maxime modi molestiae neque quisquam unde velit veritatis voluptatibus.
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSpacer/>

                    <FluxSecondaryButton
                        label="Close"
                        @click="close"/>
                </FluxPaneFooter>
            </template>
        </FluxFlyout>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxFlyout, FluxPaneBody, FluxPaneFooter, FluxSecondaryButton, FluxSpacer } from '@basmilius/flux';
</script>
