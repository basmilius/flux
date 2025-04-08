<template>
    <FluxColorSelect
        v-model="color"
        :colors="[red500, orange500, amber500, yellow500, lime500, green500]"/>

    <kbd>{{ color }}</kbd>
</template>

<script
    lang="ts"
    setup>
    import { FluxColorSelect } from '@flux-ui/flux';
    import { amber500, green500, lime500, orange500, red500, yellow500 } from '@flux-ui/internals';
    import { ref } from 'vue';

    const color = ref(red500);
</script>
