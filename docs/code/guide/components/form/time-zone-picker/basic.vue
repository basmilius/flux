<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormTimeZonePicker
                v-model="timezone"
                placeholder="Select your timezone ..."/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTimeZonePicker, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const timezone = ref(null);
</script>
