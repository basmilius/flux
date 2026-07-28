<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="15">
        <FluxSecondaryButton
            :label="isVisible ? 'Hide' : 'Show'"
            @click="isVisible = !isVisible"/>

        <FluxScaleTransition origin="top left">
            <FluxPane
                v-if="isVisible"
                style="height: 90px; width: 210px;"/>
        </FluxScaleTransition>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPane, FluxScaleTransition, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isVisible = ref(true);
</script>
