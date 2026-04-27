<template>
    <RouterView/>

    <FluxSlideOver :view-key="slideOverRoute?.fullPath">
        <RouterView
            v-if="slideOverRoute"
            name="over"
            :route="slideOverRoute"/>
    </FluxSlideOver>
</template>

<script
    lang="ts"
    setup>
    import { FluxSlideOver } from '@flux-ui/components';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const slideOverRoute = computed(() => {
        const match = route.matched.find(record => 'over' in (record.components ?? {}));

        if (!match) {
            return null;
        }

        return route;
    });
</script>
