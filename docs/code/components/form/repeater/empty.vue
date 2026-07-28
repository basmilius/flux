<template>
    <FluxPane style="max-width: 480px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormRepeater
                    v-model="attendees"
                    add-label="Invite someone"
                    row-label="Attendee"
                    :new-row="newAttendee">
                    <template #default="{row}">
                        <FluxFormField label="Email address">
                            <FluxFormInput
                                v-model="row.email"
                                type="email"
                                placeholder="E.g. john@example.com"/>
                        </FluxFormField>
                    </template>

                    <template #empty>
                        <FluxPlaceholder
                            icon="user-plus"
                            title="No attendees yet"
                            message="Invite the people who should receive the meeting notes."
                            variant="simple"/>
                    </template>
                </FluxFormRepeater>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormInput, FluxFormRepeater, FluxPane, FluxPaneBody, FluxPlaceholder } from '@flux-ui/components';
    import { ref } from 'vue';

    type Attendee = {
        email: string;
    };

    const attendees = ref<Attendee[]>([]);

    function newAttendee(): Attendee {
        return {email: ''};
    }
</script>
