<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormTextArea
                v-model="value"
                :rows="5"
                placeholder="Why are you contacting us?"/>
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
