<template>
    <flux-stack>
        <flux-pane style="width: 330px">
            <flux-filter v-model="filterState">
                <flux-filter-option
                    icon="clone"
                    label="Option"
                    name="selected"
                    :options="[
                        {label: 'First option', value: 'first'},
                        {label: 'Second option', value: 'second'},
                        {label: 'Third option', value: 'third'}
                    ]"/>
            </flux-filter>
        </flux-pane>

        <pre>{{ filterState }}</pre>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterOption, FluxPane, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';

    const filterState = ref({
        selected: 'first'
    });
</script>
