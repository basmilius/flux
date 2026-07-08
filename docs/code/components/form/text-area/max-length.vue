<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormTextArea
                v-model="value"
                :max-length="120"
                placeholder="Write a short bio (max 120 characters)"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTextArea, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref('');
</script>
