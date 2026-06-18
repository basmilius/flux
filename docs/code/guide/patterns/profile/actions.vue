<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="15">
            <FluxPane>
                <FluxPaneHeader title="Contacts"/>

                <FluxActionBar>
                    <template #primary>
                        <FluxPrimaryButton
                            icon-leading="user-plus"
                            label="Add contact"/>
                    </template>

                    <template #filterOpener="{open}">
                        <FluxSecondaryButton
                            icon-leading="filter"
                            @click="open()"/>
                    </template>

                    <template #filter>
                        <FluxPaneBody>
                            Filter contents go here.
                        </FluxPaneBody>
                    </template>

                    <template #search>
                        <FluxFormInput
                            v-model="search"
                            type="search"
                            icon-leading="magnifying-glass"
                            placeholder="Search contacts..."/>
                    </template>

                    <template #actionsBeforeSearch>
                        <FluxSecondaryButton
                            icon-leading="arrow-down-to-line"
                            label="Export"/>

                        <FluxSeparator direction="vertical"/>
                    </template>
                </FluxActionBar>

                <FluxPaneBody>
                    <FluxButtonStack>
                        <FluxPrimaryLinkButton
                            href="#"
                            icon-leading="globe"
                            label="View website"/>

                        <FluxSecondaryLinkButton
                            href="#"
                            icon-leading="arrow-up-right-from-square"
                            label="Open in CRM"/>
                    </FluxButtonStack>
                </FluxPaneBody>
            </FluxPane>

            <FluxActionPane>
                <p>
                    <strong>Upgrade to Pro</strong> &mdash; unlock advanced contact insights, unlimited history and team-wide sharing.
                </p>

                <template #buttons>
                    <FluxPrimaryButton
                        is-filled
                        label="Upgrade now"/>

                    <FluxSecondaryButton
                        is-filled
                        label="Maybe later"/>
                </template>
            </FluxActionPane>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxActionBar, FluxActionPane, FluxButtonStack, FluxFlex, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxPrimaryLinkButton, FluxSecondaryButton, FluxSecondaryLinkButton, FluxSeparator } from '@flux-ui/components';
    import { ref } from 'vue';

    const search = ref('');
</script>
