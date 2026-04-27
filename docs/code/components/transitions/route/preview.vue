<template>
    <Preview>
        <FluxRouteTransition>
            <FluxPane
                v-if="visible"
                style="height: 150px; width: 75%;"/>
        </FluxRouteTransition>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxPane, FluxRouteTransition } from '@flux-ui/components';
    import { ref } from 'vue';

    const visible = ref(true);

    useInterval(1500, () => {
        visible.value = !visible.value;
    });
</script>
