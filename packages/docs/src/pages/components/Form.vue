<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Form"/>

        <preview>
            <flux-pane style="width: 60%">
                <flux-pane-header
                    icon="clone"
                    title="Questions?"/>

                <flux-pane-body>
                    <flux-form-column>
                        <flux-form-row>
                            <flux-form-field label="First name">
                                <flux-form-input
                                    auto-complete="given_name"
                                    placeholder="E.g. Bas"/>
                            </flux-form-field>

                            <flux-form-field label="Last name">
                                <flux-form-input
                                    auto-complete="family_name"
                                    placeholder="E.g. Milius"/>
                            </flux-form-field>
                        </flux-form-row>

                        <flux-form-field label="Email">
                            <flux-form-input
                                auto-complete="email"
                                placeholder="E.g. bas@tibbaa.com"
                                type="email"/>
                        </flux-form-field>

                        <flux-form-field label="Question">
                            <flux-form-text-area
                                auto-complete="email"
                                placeholder="E.g. What does API mean in the Medium ticketing package?"/>
                        </flux-form-field>

                        <flux-form-field label="Phone number">
                            <flux-form-input-group>
                                <flux-form-input-addition icon="phone"/>

                                <flux-form-input
                                    auto-complete="phone_number"
                                    placeholder="E.g. +31 6 12345678"
                                    type="phone"/>
                            </flux-form-input-group>
                        </flux-form-field>

                        <flux-form-field label="Job">
                            <flux-form-input-group>
                                <flux-form-input-addition icon="user"/>

                                <flux-form-select
                                    :options="[
                                        {id: 1, label: 'Developer'},
                                        {id: 2, label: 'Other'}
                                    ]"
                                    placeholder="Select an option..."/>
                            </flux-form-input-group>
                        </flux-form-field>
                    </flux-form-column>
                </flux-pane-body>

                <flux-pane-footer>
                    <flux-secondary-button label="Back"/>

                    <flux-spacer/>

                    <flux-primary-button
                        icon-before="circle-check"
                        label="Send"/>
                </flux-pane-footer>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                When it comes to designing forms on a website, the layout is just as important as the individual form
                components themselves. The way that input fields, dropdown menus, checkboxes, and other form elements
                are arranged can impact how easily users can navigate and complete the form. That's why it's important
                to have a set of components specifically designed for form layout.
            </p>
        </api-section>

        <api-section title="API">
            <api-components>
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
            </api-components>

            <api-component name="FormColumn">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Form elements within the column.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="FormRow">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Form elements within the row.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="FormInputAddition">
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
            </api-component>

            <api-component name="FormInputGroup">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Inputs, additions and buttons to group together.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormColumn, FluxFormField, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, FluxFormRow, FluxFormSelect, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@/components';
</script>
