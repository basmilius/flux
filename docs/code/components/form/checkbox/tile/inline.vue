<template>
    <FluxPane style="max-width: 519px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Notifications">
                    <FluxFormCheckboxGroup
                        v-model="channels"
                        is-inline>
                        <FluxFormCheckboxTile
                            value="digest"
                            icon="bell"
                            label="Email digest"
                            sub-label="A weekly summary in your inbox."/>

                        <FluxFormCheckboxTile
                            value="calendar"
                            icon="calendar-check"
                            label="Calendar sync"
                            sub-label="Add events to your calendar."/>
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

    const channels = ref(['digest']);
</script>
