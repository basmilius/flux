<template>
    <FluxFlex
        direction="vertical"
        :gap="15">
        <FluxFlex
            v-for="service in services"
            :key="service.name"
            align="center"
            direction="horizontal"
            justify="between">
            <FluxFlex
                align="center"
                direction="horizontal"
                :gap="9">
                <FluxVisualPing :color="service.color"/>

                <span style="font-weight: 500;">{{ service.name }}</span>
            </FluxFlex>

            <span style="color: var(--gray-500);">{{ service.status }}</span>
        </FluxFlex>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex } from '@flux-ui/components';
    import { FluxVisualPing } from '@flux-ui/visuals';

    const services = [
        {name: 'API gateway', status: 'Operational', color: 'success' as const},
        {name: 'Background jobs', status: 'Degraded', color: 'warning' as const},
        {name: 'Payments', status: 'Outage', color: 'danger' as const}
    ];
</script>
