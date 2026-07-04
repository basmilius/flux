<template>
    <FluxVisualBorderBeam
        style="width: 320px;"
        variant="line">
        <FluxFormInput
            v-model="query"
            icon-leading="magnifying-glass"
            placeholder="Search anything..."/>
    </FluxVisualBorderBeam>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormInput } from '@flux-ui/components';
    import { FluxVisualBorderBeam } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const query = ref('');
</script>
