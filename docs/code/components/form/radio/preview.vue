<template>
    <Preview>
        <FluxFormRadioGroup v-model="value">
            <FluxFormRadio
                value="a"
                label="Option A"/>

            <FluxFormRadio value="b">
                <strong>Option B</strong>&nbsp;&mdash; with custom content
            </FluxFormRadio>
        </FluxFormRadioGroup>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRadio, FluxFormRadioGroup } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref('a');
</script>
