<template>
    <flux-stack axis="vertical">
        <flux-form-select
            v-model="selectValue"
            v-model:search="searchValue"
            is-multiple
            is-searchable
            :options="dataset"
            placeholder="Search multiple options..."/>

        <pre>{{ {searchValue, selectValue} }}</pre>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormSelect, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import dataset from './dataset.json';

    const searchValue = ref('');
    const selectValue = ref([]);
</script>
