<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormField label="Do you agree with the terms of conditions?">
                <FluxToggle
                    v-model="value"
                    icon-off="xmark"
                    icon-on="check"/>
            </FluxFormField>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormField, FluxPane, FluxPaneBody, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(false);
</script>
