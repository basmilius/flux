<template>
    <flux-secondary-button
        icon-before="circle-check"
        label="Open SlideOver"
        @click="isOpened = true"/>

    <flux-slide-over
        is-closeable
        @close="isOpened = false">
        <flux-pane v-if="isOpened">
            <flux-pane-header title="Slide over with dropdowns"/>
            <flux-pane-body>
                <flux-form-select
                    v-model="selectValue"
                    is-multiple
                    is-searchable
                    :options="dataset"
                    placeholder="Search options..."/>
            </flux-pane-body>
            <flux-pane-body>
                <flux-form-date-time-input v-model="dateTimeValue"/>
            </flux-pane-body>
        </flux-pane>
    </flux-slide-over>
</template>

<script lang="ts">
    export const enabled = true;
</script>

<script
    lang="ts"
    setup>
    import { FluxFormDateTimeInput, FluxFormSelect, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton, FluxSlideOver } from '@fancee/flux';
    import { ref } from 'vue';
    import dataset from '../components/formSelect/dataset.json';

    const isOpened = ref(false);
    const dateTimeValue = ref(null);
    const selectValue = ref([]);
</script>
