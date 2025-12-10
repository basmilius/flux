<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxStepperSteps
                    :amount="4"
                    :current="current + 1"
                    @activate="current = $event"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxStepperSteps } from '@flux-ui/components';
    import { ref } from 'vue';

    const current = ref(0);
</script>
