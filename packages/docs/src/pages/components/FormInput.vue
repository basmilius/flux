<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Form input"/>

        <preview>
            <flux-pane style="width: 60%">
                <flux-pane-body>
                    <flux-form-input
                        type="email"
                        placeholder="E.g. bas@fanc.ee"/>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                A form input is a text field that consist of a single line. It accepts various data types
                that can be specified using the type prop.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="FormInput">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>object | string | number</code></td>
                        <td>The value of the input.</td>
                    </tr>
                    <tr>
                        <td><code>auto-complete</code><code>string</code></td>
                        <td>Please refer to the HTMLInputElement documentation for examples of values that can be given here.</td>
                    </tr>
                    <tr>
                        <td><code>auto-focus</code><code>boolean</code></td>
                        <td>Give the input focus when it is mounted.</td>
                    </tr>
                    <tr>
                        <td><code>icon-after</code><code>IconNames</code></td>
                        <td>An icon that is rendered at the end of the input.</td>
                    </tr>
                    <tr>
                        <td><code>icon-before</code><code>IconNames</code></td>
                        <td>An icon that is rendered at the start of the input.</td>
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
                        <td><code>is-secondary</code><code>boolean</code></td>
                        <td>Indicates that the field is secondary and is rendered in an alternative style.</td>
                    </tr>
                    <tr>
                        <td><code>max</code><code>number</code></td>
                        <td>Maximum value of the input.</td>
                    </tr>
                    <tr>
                        <td><code>max-length</code><code>number</code></td>
                        <td>Maximum value length of the input.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>number</code></td>
                        <td>Minimum value of the input.</td>
                    </tr>
                    <tr>
                        <td><code>pattern</code><code>string</code></td>
                        <td>The pattern attribute specifies a regular expression the form control's value should match. If a non-null value doesn't conform to the constraints set by the pattern value, the ValidityState object's read-only patternMismatch property will be true.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder</code><code>string</code></td>
                        <td>A placeholder is no value is entered.</td>
                    </tr>
                    <tr>
                        <td><code>step</code><code>number</code></td>
                        <td>The step attribute is a number that specifies the granularity that the value must adhere to or the keyword any. It is valid for the numeric input types, including the date, month, week, time, datetime-local, number and range types.</td>
                    </tr>
                    <tr>
                        <td><code>type</code><code>'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'</code></td>
                        <td>Value type.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: object | string | number): void</code></td>
                        <td>Triggered when the value changes.</td>
                    </tr>
                    <tr>
                        <td><code>blur</code><code>(): void</code></td>
                        <td>Triggered when the input loses focus.</td>
                    </tr>
                    <tr>
                        <td><code>focus</code><code>(): void</code></td>
                        <td>Triggered when the input gains focus.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormInput, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
