<template>
    <Preview>
        <FluxFlowActionCard title="Send Invoice">
            Emails the generated invoice to the customer.

            <template #footer>
                <FluxTag icon="envelope" label="Mailer"/>
            </template>
        </FluxFlowActionCard>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxTag } from '@flux-ui/components';
    import { FluxFlowActionCard } from '@flux-ui/flow';
</script>
