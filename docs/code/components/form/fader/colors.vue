<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody style="display: flex; flex-direction: column; gap: 9px">
            <FluxFormFader
                label="Primary"
                v-model="a"/>

            <FluxFormFader
                color="danger"
                label="Danger"
                v-model="b"/>

            <FluxFormFader
                color="success"
                label="Success"
                v-model="c"/>

            <FluxFormFader
                color="warning"
                label="Warning"
                v-model="d"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormFader, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const a = ref(70);
    const b = ref(85);
    const c = ref(60);
    const d = ref(45);
</script>
