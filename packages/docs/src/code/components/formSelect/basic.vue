<template>
    <flux-form-select
        v-model="selectValue"
        :options="[
            {id: 1, label: 'Option 1'},
            {id: 2, label: 'Option 2'},
            {id: 3, label: 'Option 3'},
            {id: 4, label: 'Option 4'},
            {id: 5, label: 'Option 5'},
            {id: 6, label: 'Option 6'}
        ]"
        placeholder="Pick an option..."/>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormSelect } from '@fancee/flux';
    import { ref } from 'vue';

    const selectValue = ref(0);
</script>
