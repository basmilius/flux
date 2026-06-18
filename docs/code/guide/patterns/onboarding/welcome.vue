<template>
    <Preview>
        <FluxFlex
            align="center"
            direction="vertical"
            :gap="18">
            <FluxAspectRatio
                :aspect-ratio="21 / 9"
                style="width: 100%; max-width: 480px; border-radius: 9px; overflow: hidden">
                <FluxFlickeringGrid/>
            </FluxAspectRatio>

            <FluxBorderBeam
                variant="line"
                style="width: 320px">
                <FluxFormInput
                    v-model="query"
                    icon-leading="sparkles"
                    placeholder="Ask the assistant..."/>
            </FluxBorderBeam>

            <FluxBorderShine
                :colors="['transparent', 'transparent', 'transparent', '#10b981', 'transparent', 'transparent', 'transparent']"
                :duration="3"
                :width="1">
                <FluxPrimaryButton
                    icon-leading="circle-arrow-up"
                    label="Upgrade now"/>
            </FluxBorderShine>

            <FluxPane style="width: 100%; max-width: 480px">
                <FluxPaneBody>
                    <FluxPlaceholder
                        icon="rocket"
                        title="Get started"
                        message="Complete a few quick steps to set up your workspace.">
                        <FluxButtonStack>
                            <FluxSecondaryButton label="Skip"/>

                            <FluxPrimaryButton
                                icon-leading="play"
                                label="Begin"/>
                        </FluxButtonStack>
                    </FluxPlaceholder>
                </FluxPaneBody>
            </FluxPane>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxBorderBeam, FluxBorderShine, FluxButtonStack, FluxFlex, FluxFlickeringGrid, FluxFormInput, FluxPane, FluxPaneBody, FluxPlaceholder, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const query = ref('');
</script>
