<template>
    <FluxColorSelect
        v-model="color"
        :colors="[emerald500, teal500, cyan500, sky500, blue500, indigo500]"
        is-custom-allowed/>

    <kbd>{{ color }}</kbd>
</template>

<script
    lang="ts"
    setup>
    import { FluxColorSelect } from '@flux-ui/components';
    import { blue500, cyan500, emerald500, indigo500, sky500, teal500 } from '@flux-ui/internals';
    import { ref } from 'vue';

    const color = ref(indigo500);
</script>
