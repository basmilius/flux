<template>
    <FluxActionBar>
        <template #primary>
            <FluxPrimaryButton
                icon-leading="circle-plus"
                label="Event"/>
        </template>

        <template #filter>
            <FluxPaneBody>
                Filter contents.
            </FluxPaneBody>
        </template>

        <template #filterOpener="{open}">
            <FluxSecondaryButton
                icon-leading="filter"
                @click="open()"/>
        </template>

        <template #search>
            <FluxFormInput
                v-model="searchQuery"
                type="search"
                icon-leading="magnifying-glass"
                placeholder="Search anything..."/>
        </template>

        <template #actionsBeforeSearch>
            <FluxSecondaryButton
                icon-leading="arrow-down-to-line"
                label="Download"/>
            <FluxSeparator direction="vertical"/>
        </template>
    </FluxActionBar>
</template>

<script
    setup
    lang="ts">
    import { FluxActionBar, FluxFormInput, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton, FluxSeparator } from '@flux-ui/components';
    import { ref } from 'vue';

    const searchQuery = ref('');
</script>
