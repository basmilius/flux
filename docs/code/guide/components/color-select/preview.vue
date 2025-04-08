<template>
    <Preview>
        <FluxPane style="width: 390px">
            <FluxPaneBody>
                <FluxColorSelect is-custom-allowed/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxColorSelect, FluxPane, FluxPaneBody } from '@flux-ui/flux';
</script>
