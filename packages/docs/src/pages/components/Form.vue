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

        <section>
            <p>
                When it comes to designing forms on a website, the layout is just as important as the individual form
                components themselves. The way that input fields, dropdown menus, checkboxes, and other form elements
                are arranged can impact how easily users can navigate and complete the form. That's why it's important
                to have a set of components specifically designed for form layout.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Components">
                <template #head>
                    <tr>
                        <th>Name</th>
                        <th>When to use</th>
                    </tr>
                </template>
                <template #body>
                    <tr>
                        <td><code>FluxFormColumn</code></td>
                        <td>Displays form components in a column.</td>
                    </tr>
                    <tr>
                        <td><code>FluxFormRow</code></td>
                        <td>Displays form components in a row.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormColumn, FluxFormField, FluxFormInput, FluxFormRow, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
