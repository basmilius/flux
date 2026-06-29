<template>
    <FluxPane style="max-width: 420px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Add-ons">
                    <FluxFormCheckboxGroup
                        v-model="addons"
                        is-connected>
                        <FluxFormCheckboxTile
                            value="seats"
                            icon="user-plus"
                            label="Extra seats"
                            sub-label="Invite more teammates to your workspace."/>

                        <FluxFormCheckboxTile
                            value="support"
                            icon="bolt"
                            label="Priority support"
                            sub-label="Get faster responses from our team."/>

                        <FluxFormCheckboxTile
                            value="analytics"
                            icon="gauge-high"
                            label="Advanced analytics"
                            sub-label="Unlock detailed usage reports."/>
                    </FluxFormCheckboxGroup>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormCheckboxGroup, FluxFormCheckboxTile, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const addons = ref(['support']);
</script>
