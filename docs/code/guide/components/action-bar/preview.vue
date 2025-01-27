<template>
    <Preview>
        <FluxPane style="margin-inline: -30px; width: calc(100% + 60px);">
            <FluxPaneHeader title="Filter"/>

            <FluxActionBar>
                <template #primary>
                    <FluxPrimaryButton
                        icon-before="circle-plus"
                        label="Event"/>
                </template>

                <template #filter>
                    <FluxPaneBody>
                        Filter contents.
                    </FluxPaneBody>
                </template>

                <template #filterOpener="{open}">
                    <FluxSecondaryButton
                        icon-before="filter"
                        @click="open()"/>
                </template>

                <template #search>
                    <FluxFormInput
                        type="search"
                        icon-before="magnifying-glass"
                        placeholder="Search anything..."/>
                </template>

                <template #actionsBeforeSearch>
                    <FluxSecondaryButton
                        icon-before="arrow-down-to-line"
                        label="Download"/>
                    <FluxSeparator axis="vertical"/>
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
</script>
