<template>
    <Preview>
        <FluxFadeTransition>
            <FluxPane
                v-if="visible"
                style="height: 150px; width: 75%;"/>
        </FluxFadeTransition>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFadeTransition, FluxPane } from '@flux-ui/components';
    import { useInterval } from '@flux-ui/internals';
    import { ref } from 'vue';

    const visible = ref(true);

    useInterval(1500, () => {
        visible.value = !visible.value;
    });
</script>
