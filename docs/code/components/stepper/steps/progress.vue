<template>
    <FluxPane>
        <FluxPaneBody style="display: flex; flex-direction: column; gap: 24px">
            <FluxStepperSteps
                :amount="4"
                :current="1"/>

            <FluxStepperSteps
                :amount="4"
                :current="3"/>

            <FluxStepperSteps
                :amount="4"
                :current="5"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxStepperSteps } from '@flux-ui/components';
</script>
