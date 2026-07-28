<template>
    <FluxFlex
        align="center"
        direction="vertical"
        :gap="15">
        <FluxSecondaryButton
            :label="isVisible ? 'Hide' : 'Show'"
            @click="isVisible = !isVisible"/>

        <FluxScaleTransition>
            <FluxPane
                v-if="isVisible"
                style="height: 90px; width: 100%;"/>
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
