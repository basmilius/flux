<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormTextArea
                v-model="value"
                is-readonly/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTextArea, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref('This content is read-only and cannot be edited.');
</script>
