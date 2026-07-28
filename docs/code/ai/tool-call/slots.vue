<template>
    <FluxAiToolCall
        :arguments="{status: 'degraded'}"
        :duration="0.9"
        is-expanded
        name="list_services">
        <template #result>
            <FluxFlex
                :gap="6"
                wrap="wrap">
                <FluxBadge
                    v-for="service of services"
                    :key="service.name"
                    :color="service.isHealthy ? 'success' : 'danger'"
                    :icon="service.isHealthy ? 'circle-check' : 'circle-exclamation'"
                    :label="service.name"/>
            </FluxFlex>
        </template>
    </FluxAiToolCall>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiToolCall } from '@flux-ui/ai';
    import { FluxBadge, FluxFlex } from '@flux-ui/components';

    const services = [
        {name: 'api', isHealthy: true},
        {name: 'worker', isHealthy: false},
        {name: 'scheduler', isHealthy: true},
        {name: 'mailer', isHealthy: false}
    ];
</script>
