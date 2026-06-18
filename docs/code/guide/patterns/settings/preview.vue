<template>
    <Preview>
        <FluxPane style="max-width: 540px">
            <FluxForm>
                <FluxPaneHeader title="Profile"/>

                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxNotice
                            color="info"
                            icon="circle-info"
                            message="Changes to your profile are visible to everyone in your team."/>

                        <FluxFormSection title="Account">
                            <FluxFormColumn>
                                <FluxFormRow>
                                    <FluxFormField label="First name">
                                        <FluxFormInput
                                            v-model="firstName"
                                            auto-complete="given_name"
                                            placeholder="E.g. John"/>
                                    </FluxFormField>

                                    <FluxFormField label="Last name">
                                        <FluxFormInput
                                            v-model="lastName"
                                            auto-complete="family_name"
                                            placeholder="E.g. Doe"/>
                                    </FluxFormField>
                                </FluxFormRow>

                                <FluxFormField
                                    label="Username"
                                    hint="This is how others will find you.">
                                    <FluxFormInputGroup>
                                        <FluxFormInputAddition label="@"/>

                                        <FluxFormInput
                                            v-model="username"
                                            placeholder="username"/>

                                        <FluxSecondaryButton
                                            icon-leading="rotate"
                                            @click="randomizeUsername"/>
                                    </FluxFormInputGroup>
                                </FluxFormField>

                                <FluxFormField label="Email">
                                    <FluxFormInput
                                        v-model="email"
                                        auto-complete="email"
                                        placeholder="E.g. john@example.com"
                                        type="email"/>

                                    <FluxFormFieldAddition
                                        icon="lock"
                                        message="We will never share your email address."
                                        mode="hint"/>
                                </FluxFormField>
                            </FluxFormColumn>
                        </FluxFormSection>

                        <FluxDivider/>

                        <FluxFormSection title="About">
                            <FluxFormColumn>
                                <FluxFormField label="Role">
                                    <FluxFormSelect
                                        v-model="role"
                                        :options="roles"
                                        placeholder="Select a role..."/>
                                </FluxFormField>

                                <FluxFormField label="Team">
                                    <FluxFormCombobox
                                        v-model="team"
                                        is-creatable
                                        :options="teams"
                                        placeholder="Pick or create a team"/>
                                </FluxFormField>

                                <FluxFormField label="Bio">
                                    <FluxFormTextArea
                                        v-model="bio"
                                        placeholder="Tell us a little about yourself..."/>
                                </FluxFormField>
                            </FluxFormColumn>
                        </FluxFormSection>

                        <FluxFormSection title="Location">
                            <FluxFormGrid :columns="2">
                                <FluxFormField label="City">
                                    <FluxFormInput placeholder="E.g. Amsterdam"/>
                                </FluxFormField>

                                <FluxFormField label="Postal code">
                                    <FluxFormInput placeholder="E.g. 1234 AB"/>
                                </FluxFormField>
                            </FluxFormGrid>
                        </FluxFormSection>
                    </FluxFormColumn>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSecondaryButton label="Cancel"/>

                    <FluxSpacer/>

                    <FluxPublishButton
                        :is-done="isSaved"
                        :is-loading="isSaving"
                        :label="isSaved ? 'Saved' : (isSaving ? 'Saving' : 'Save changes')"
                        @click="save"/>
                </FluxPaneFooter>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormSelectValue } from '@flux-ui/types';
    import { FluxDivider, FluxForm, FluxFormCombobox, FluxFormColumn, FluxFormField, FluxFormFieldAddition, FluxFormGrid, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, FluxFormRow, FluxFormSection, FluxFormSelect, FluxFormTextArea, FluxNotice, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPublishButton, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';
    import { ref } from 'vue';

    const firstName = ref('John');
    const lastName = ref('Doe');
    const username = ref('johndoe');
    const email = ref('john@example.com');
    const role = ref('engineer');
    const team = ref<FluxFormSelectValue>('engineering');
    const bio = ref('');

    const isSaving = ref(false);
    const isSaved = ref(false);

    const roles = [
        {label: 'Engineer', value: 'engineer'},
        {label: 'Designer', value: 'designer'},
        {label: 'Product manager', value: 'product'},
        {label: 'Marketing', value: 'marketing'}
    ];

    const teams = [
        {label: 'Engineering', value: 'engineering'},
        {label: 'Design', value: 'design'},
        {label: 'Growth', value: 'growth'}
    ];

    const names = ['johndoe', 'john.d', 'jdoe', 'therealjohn'];

    function randomizeUsername(): void {
        username.value = names[Math.floor(Math.random() * names.length)];
    }

    function save(): void {
        isSaving.value = true;

        setTimeout(() => {
            isSaving.value = false;
            isSaved.value = true;
        }, 1200);
    }
</script>
