<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Form text area"/>

        <preview>
            <flux-pane style="width: 60%">
                <flux-pane-body>
                    <flux-form-text-area placeholder="E.g. What does API mean in the Medium ticketing package?"/>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                A form text area is a text field that may have multiple lines of text. It is used for longer
                text and can be used within a contact form to ask for a question.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="FormTextArea">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>object | string | number</code></td>
                        <td>The value of the text area.</td>
                    </tr>
                    <tr>
                        <td><code>auto-complete</code><code>string</code></td>
                        <td>Please refer to the HTMLTextAreaElement documentation for examples of values that can be given here.</td>
                    </tr>
                    <tr>
                        <td><code>auto-focus</code><code>boolean</code></td>
                        <td>Give the text area focus when it is mounted.</td>
                    </tr>
                    <tr>
                        <td><code>is-disabled</code><code>boolean</code></td>
                        <td>Indicates that the field is disabled.</td>
                    </tr>
                    <tr>
                        <td><code>is-readonly</code><code>boolean</code></td>
                        <td>Indicates that the field is readonly.</td>
                    </tr>
                    <tr>
                        <td><code>max-length</code><code>number</code></td>
                        <td>Maximum value length of the text area.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder</code><code>string</code></td>
                        <td>A placeholder is no value is entered.</td>
                    </tr>
                    <tr>
                        <td><code>rows</code><code>number</code></td>
                        <td>The initial amount of rows the text area should reserve.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: object | string | number): void</code></td>
                        <td>Triggered when the value changes.</td>
                    </tr>
                    <tr>
                        <td><code>blur</code><code>(): void</code></td>
                        <td>Triggered when the text area loses focus.</td>
                    </tr>
                    <tr>
                        <td><code>focus</code><code>(): void</code></td>
                        <td>Triggered when the text area gains focus.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormTextArea, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
