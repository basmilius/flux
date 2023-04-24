<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Form field"/>

        <preview>
            <flux-pane style="width: 60%">
                <flux-pane-body>
                    <flux-form-field
                        hint="This is your email address"
                        label="Username">
                        <flux-form-input
                            type="email"
                            placeholder="E.g. bas@fanc.ee"/>
                    </flux-form-field>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                The form field component is a base component that wraps a single form control, such as FluxFormInput. It
                provides a label, error and hint. Fields can also be marked optional.
            </p>
        </api-section>

        <api-section title="Required icons">
            <api-required-icons :icons="['circle-exclamation', 'circle-info']"/>
        </api-section>

        <api-section title="API">
            <api-component name="FormField">
                <template #props>
                    <tr>
                        <td><code>error</code><code>string</code></td>
                        <td>Error message showed under the field.</td>
                    </tr>
                    <tr>
                        <td><code>hint</code><code>string</code></td>
                        <td>Hint showed under the field.</td>
                    </tr>
                    <tr>
                        <td><code>is-optional</code><code>boolean</code></td>
                        <td>Indicates that the field is optional.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>Label of the field.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormField, FluxFormInput, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
</script>
