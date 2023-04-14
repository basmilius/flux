<template>
    <flux-stack axis="horizontal">
        <flux-form-select
            v-model="selectValue"
            v-model:search="searchValue"
            is-multiple
            is-searchable
            :options="dataset"
            placeholder="Search multiple options..."/>

        <strong style="white-space: nowrap">Search: {{ searchValue }}</strong>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormSelect, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import dataset from './dataset.json';

    const searchValue = ref('5');
    const selectValue = ref([]);
</script>
