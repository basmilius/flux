<template>
    <FluxStack axis="vertical">
        <FluxFormSelect
            v-model="selectValue"
            v-model:search="searchValue"
            is-multiple
            is-searchable
            :options="dataset"
            placeholder="Search multiple options..."/>

        <pre>{{ {searchValue, selectValue} }}</pre>
    </FluxStack>
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
