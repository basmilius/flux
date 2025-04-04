<template>
    <Preview>
        <FluxPane style="margin-inline: -30px; width: calc(100% + 60px);">
            <FluxPaneHeader title="Filter"/>

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

            <FluxPaneBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque neque nobis quasi recusandae reprehenderit. Ad amet, blanditiis, delectus dolorem dolorum error, esse expedita explicabo mollitia quam quia quisquam reiciendis temporibus?
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxActionBar, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSeparator } from '@basmilius/flux';
    import { ref } from 'vue';

    const searchQuery = ref('');
</script>
