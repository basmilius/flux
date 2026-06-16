<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxFormCombobox
                    v-model="value"
                    is-creatable
                    :options="options"
                    placeholder="Pick or create a tag"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormCombobox } from '@flux-ui/components';
    import type { FluxFormSelectValue } from '@flux-ui/types';
    import { ref } from 'vue';

    const value = ref<FluxFormSelectValue>(null);

    const options = [
        {label: 'Design', value: 'design'},
        {label: 'Engineering', value: 'engineering'},
        {label: 'Marketing', value: 'marketing'}
    ];
</script>
