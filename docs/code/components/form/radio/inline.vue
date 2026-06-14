<template>
    <Preview>
        <FluxFormRadioGroup
            v-model="size"
            is-inline>
            <FluxFormRadio
                value="s"
                label="Small"/>

            <FluxFormRadio
                value="m"
                label="Medium"/>

            <FluxFormRadio
                value="l"
                label="Large"/>
        </FluxFormRadioGroup>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRadio, FluxFormRadioGroup } from '@flux-ui/components';
    import { ref } from 'vue';

    const size = ref('m');
</script>
