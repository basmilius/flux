<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Form field"/>

        <Preview>
            <FluxPane style="width: 60%">
                <FluxPaneBody>
                    <FluxFormField
                        hint="This is your email address"
                        label="Username">
                        <FluxFormInput
                            type="email"
                            placeholder="E.g. bas@fanc.ee"/>
                    </FluxFormField>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The form field component is a base component that wraps a single form control, such as FluxFormInput. It
                provides a label, error and hint. Fields can also be marked optional.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['circle-exclamation', 'circle-info']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="FormField">
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
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormField, FluxFormInput, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
</script>
