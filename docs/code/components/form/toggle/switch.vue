<template>
    <FluxToggle
        v-model="value"
        is-switch
        icon-on="sun"
        icon-off="moon"/>
</template>

<script
    setup
    lang="ts">
    import { FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(false);
</script>
