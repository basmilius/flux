<template>
    <RouterView/>

    <FluxOverlay
        :key="overlayRoute?.fullPath"
        size="medium">
        <RouterView
            v-if="overlayRoute"
            name="overlay"
            :route="overlayRoute"/>
    </FluxOverlay>
</template>

<script
    lang="ts"
    setup>
    import { FluxOverlay } from '@flux-ui/components';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const overlayRoute = computed(() => {
        const match = route.matched.find(record => 'overlay' in (record.components ?? {}));

        if (!match) {
            return null;
        }

        return route;
    });
</script>
