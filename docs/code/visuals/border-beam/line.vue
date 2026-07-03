<template>
    <FluxBorderBeam
        style="width: 320px;"
        variant="line">
        <FluxFormInput
            v-model="query"
            icon-leading="magnifying-glass"
            placeholder="Search anything..."/>
    </FluxBorderBeam>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormInput } from '@flux-ui/components';
    import { FluxBorderBeam } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const query = ref('');
</script>
