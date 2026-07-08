<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody style="display: flex; flex-direction: column; gap: 12px">
            <FluxFormCheckbox
                :model-value="true"
                disabled
                label="Checked and disabled"/>

            <FluxFormCheckbox
                :model-value="false"
                disabled
                label="Unchecked and disabled"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormCheckbox, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
