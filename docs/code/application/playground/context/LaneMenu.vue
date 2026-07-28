<template>
    <FluxApplicationMenuContext
        icon="truck"
        subtitle="Rotterdam to Hamburg"
        title="Lane RTM-HAM"/>

    <FluxMenuGroup>
        <FluxMenuItem
            icon-leading="gauge"
            :is-active="route.name === 'lane'"
            label="Performance"
            @click="router.push({name: 'lane'})"/>

        <FluxMenuItem
            icon-leading="money-bill"
            :is-active="route.name === 'lane.rates'"
            label="Rates"
            @click="router.push({name: 'lane.rates'})"/>

        <FluxMenuItem
            icon-leading="calendar"
            label="Departures"/>

        <FluxMenuItem
            icon-leading="file-lines"
            label="Documents"/>
    </FluxMenuGroup>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationMenuContext } from '@flux-ui/application';
    import { FluxMenuGroup, FluxMenuItem } from '@flux-ui/components';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();
</script>
