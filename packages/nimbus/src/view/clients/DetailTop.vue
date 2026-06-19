<template>
    <FluxButtonStack>
        <FluxSecondaryButton
            v-if="client"
            icon-leading="envelope"
            label="Email"
            type="link"
            :href="`mailto:${client.email}`"/>

        <FluxPrimaryButton
            icon-leading="circle-plus"
            label="New project"
            type="route"
            :to="{name: 'project-new'}"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useClientsStore } from '@/store';

    const route = useRoute();
    const {getClient} = useClientsStore();

    const client = computed(() => getClient(String(route.params.id)));
</script>
