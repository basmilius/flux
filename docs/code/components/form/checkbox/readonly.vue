<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormCheckbox
                :model-value="true"
                is-readonly
                label="This option is locked and cannot be changed."/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormCheckbox, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
