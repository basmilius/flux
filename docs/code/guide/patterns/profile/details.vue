<template>
    <Preview>
        <FluxPane>
            <FluxExpandableGroup>
                <FluxExpandable
                    icon="circle-info"
                    label="Personal information">
                    <FluxDescriptionList>
                        <FluxDescriptionItem
                            icon="user"
                            label="Full name">
                            Jane Doe
                        </FluxDescriptionItem>

                        <FluxDescriptionItem
                            icon="calendar"
                            label="Member since">
                            March 2021
                        </FluxDescriptionItem>
                    </FluxDescriptionList>
                </FluxExpandable>

                <FluxExpandable
                    icon="lock"
                    label="Security">
                    <p>Two-factor authentication is enabled. Last password change was 3 months ago.</p>
                </FluxExpandable>

                <FluxExpandable
                    icon="puzzle-piece"
                    label="Integrations">
                    <p>Connected to Slack and Google Calendar. Manage these from the integrations settings.</p>
                </FluxExpandable>
            </FluxExpandableGroup>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxDescriptionItem, FluxDescriptionList, FluxExpandable, FluxExpandableGroup, FluxPane } from '@flux-ui/components';
</script>
