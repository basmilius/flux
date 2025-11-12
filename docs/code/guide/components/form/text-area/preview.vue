<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxFormTextArea
                    v-model="value"
                    placeholder="Why are you contacting us?"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTextArea, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref('');
</script>
