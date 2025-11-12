<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxInfoStack>
                    <FluxInfo
                        icon="map-location">
                        Het Blik 60
                        <br>
                        7141 TK Groenlo
                        <br>
                        Nederland
                    </FluxInfo>

                    <FluxInfo
                        icon="circle-info">
                        Accessible for people with the age of 16 or higher. We don't provide refunds when you're not allowed to enter.
                    </FluxInfo>
                </FluxInfoStack>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxInfo, FluxInfoStack, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
