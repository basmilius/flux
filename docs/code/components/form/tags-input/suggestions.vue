<template>
    <FluxFormTagsInput
        v-model="tags"
        :suggestions="suggestions"
        placeholder="Add skills"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTagsInput } from '@flux-ui/components';
    import { ref } from 'vue';

    const tags = ref(['Vue']);

    const suggestions = [
        {label: 'TypeScript', value: 'typescript'},
        {label: 'JavaScript', value: 'javascript'},
        {label: 'CSS', value: 'css'},
        {label: 'HTML', value: 'html'},
        {label: 'Vue', value: 'vue'},
        {label: 'React', value: 'react'}
    ];
</script>
