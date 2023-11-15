<template>
    <FluxFormColumn>
        <FluxFormField label="PIN">
            <FluxFormPinInput v-model="pin"/>
        </FluxFormField>

        <FluxFormField label="PIN">
            <FluxFormPinInput
                v-model="pin"
                is-private/>
        </FluxFormField>

        <FluxFormField label="PIN">
            <FluxFormPinInput
                v-model="pin"
                is-disabled/>
        </FluxFormField>

        <FluxFormField label="PIN">
            <FluxFormPinInput
                v-model="pin"
                is-disabled
                is-private/>
        </FluxFormField>

        <FluxFormField label="PIN Value">
            {{ pin }}
        </FluxFormField>
    </FluxFormColumn>
</template>

<script lang="ts">
    export const enabled = true;
</script>

<script
    lang="ts"
    setup>
    import { FluxFormColumn, FluxFormField, FluxFormPinInput } from '@fancee/flux';
    import { ref } from 'vue';

    const pin = ref('');
</script>
