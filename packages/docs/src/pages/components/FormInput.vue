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

        <section>
            <p>
                A form input is a text field that consist of a single line. It accepts various data types
                that can be specified using the type prop.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
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
                        <td><code>is-disabled</code><code>boolean</code></td>
                        <td>Indicates that the field is disabled.</td>
                    </tr>
                    <tr>
                        <td><code>is-readonly</code><code>boolean</code></td>
                        <td>Indicates that the field is readonly.</td>
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
                        <td><code>placeholder</code><code>string</code></td>
                        <td>A placeholder is no value is entered.</td>
                    </tr>
                    <tr>
                        <td><code>type</code><code>'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'</code></td>
                        <td>Value type.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits">
                <template #body>
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
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormInput, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
