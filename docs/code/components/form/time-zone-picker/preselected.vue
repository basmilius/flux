<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormTimeZonePicker v-model="timezone"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTimeZonePicker, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const timezone = ref('Europe/Amsterdam');
</script>
