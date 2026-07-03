<template>
    <FluxFormCheckboxGroup
        v-model="days"
        is-inline
        aria-label="Active days">
        <FluxFormCheckbox
            value="mon"
            label="Mon"/>

        <FluxFormCheckbox
            value="tue"
            label="Tue"/>

        <FluxFormCheckbox
            value="wed"
            label="Wed"/>

        <FluxFormCheckbox
            value="thu"
            label="Thu"/>

        <FluxFormCheckbox
            value="fri"
            label="Fri"/>
    </FluxFormCheckboxGroup>
</template>

<script
    setup
    lang="ts">
    import { FluxFormCheckbox, FluxFormCheckboxGroup } from '@flux-ui/components';
    import { ref } from 'vue';

    const days = ref(['mon', 'wed', 'fri']);
</script>
