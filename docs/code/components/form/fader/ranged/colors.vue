<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody style="display: flex; flex-direction: column; gap: 9px">
            <FluxFormRangeFader
                label="Primary"
                v-model="a"/>

            <FluxFormRangeFader
                color="danger"
                label="Danger"
                v-model="b"/>

            <FluxFormRangeFader
                color="success"
                label="Success"
                v-model="c"/>

            <FluxFormRangeFader
                color="warning"
                label="Warning"
                v-model="d"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRangeFader, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const a = ref<[number, number]>([25, 75]);
    const b = ref<[number, number]>([20, 60]);
    const c = ref<[number, number]>([35, 80]);
    const d = ref<[number, number]>([10, 55]);
</script>
