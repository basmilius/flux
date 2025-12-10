<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormSelect
                v-model="selectedValue"
                :options="dataset"
                is-multiple
                placeholder="Select multiple options..."/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormSelect, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';
    import dataset from '../../../../../assets/select-dataset.json' with { type: 'json' };

    const selectedValue = ref([]);
</script>
