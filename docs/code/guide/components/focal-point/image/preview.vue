<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxFocalPointImage
                    :focal-point="{ x: 75, y: 50 }"
                    src="/assets/demo/image-2.jpg"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFocalPointImage, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
