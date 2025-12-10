<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxFormField label="Downloading">
                    <FluxProgressBar
                        status="The Blacklist S01E03 - The Stewmaker"
                        :value="0.75"/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormField, FluxPane, FluxPaneBody, FluxProgressBar } from '@flux-ui/components';
</script>
