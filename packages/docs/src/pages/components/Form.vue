<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Form"/>

        <Preview>
            <FluxPane style="width: 60%">
                <FluxPaneHeader
                    icon="clone"
                    title="Questions?"/>

                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormRow>
                            <FluxFormField label="First name">
                                <FluxFormInput
                                    auto-complete="given_name"
                                    placeholder="E.g. Bas"/>
                            </FluxFormField>

                            <FluxFormField label="Last name">
                                <FluxFormInput
                                    auto-complete="family_name"
                                    placeholder="E.g. Milius"/>
                            </FluxFormField>
                        </FluxFormRow>

                        <FluxFormField label="Email">
                            <FluxFormInput
                                auto-complete="email"
                                placeholder="E.g. bas@tibbaa.com"
                                type="email"/>
                        </FluxFormField>

                        <FluxFormField label="Question">
                            <FluxFormTextArea
                                auto-complete="email"
                                placeholder="E.g. What does API mean in the Medium ticketing package?"/>
                        </FluxFormField>

                        <FluxFormField label="Phone number">
                            <FluxFormInputGroup>
                                <FluxFormInputAddition icon="phone"/>

                                <FluxFormInput
                                    auto-complete="phone_number"
                                    placeholder="E.g. +31 6 12345678"
                                    type="phone"/>
                            </FluxFormInputGroup>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSecondaryButton label="Back"/>

                    <FluxSpacer/>

                    <FluxPrimaryButton
                        icon-before="circle-check"
                        label="Send"/>
                </FluxPaneFooter>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                When it comes to designing forms on a website, the layout is just as important as the individual form
                components themselves. The way that input fields, dropdown menus, checkboxes, and other form elements
                are arranged can impact how easily users can navigate and complete the form. That's why it's important
                to have a set of components specifically designed for form layout.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxFormColumn</code></td>
                    <td>Displays form components in a column.</td>
                </tr>
                <tr>
                    <td><code>FluxFormRow</code></td>
                    <td>Displays form components in a row.</td>
                </tr>
                <tr>
                    <td><code>FluxFormInputAddition</code></td>
                    <td>An addition for an input.</td>
                </tr>
                <tr>
                    <td><code>FluxFormInputGroup</code></td>
                    <td>A group that can combine buttons and other additions with inputs.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="FormColumn">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Form elements within the column.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FormRow">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Form elements within the row.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FormInputAddition">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>Icon to use within the addition.</td>
                    </tr>
                    <tr>
                        <td><code>text</code><code>string</code></td>
                        <td>Text to use within the addition.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FormInputGroup">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Inputs, additions and buttons to group together.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormColumn, FluxFormField, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, FluxFormRow, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@/components';
</script>
