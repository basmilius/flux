<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Form pin input"/>

        <Preview>
            <FluxFormColumn style="align-items: center;">
                <FluxFormField label="PIN">
                    <FluxFormPinInput
                        v-model="pin"
                        :is-private="isPrivate"/>
                </FluxFormField>

                <FluxFormField label="Private?">
                    <FluxToggle v-model="isPrivate"/>
                </FluxFormField>
            </FluxFormColumn>
        </Preview>

        <ApiSection>
            <p>
                A pin input displays a given amount of boxes where the user can type a pin-like value. This
                can for example be a TOTP code generated in a authenticator app.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="FormPinInput">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>object | string | number</code></td>
                        <td>The value of the input.</td>
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
                        <td><code>is-private</code><code>boolean</code></td>
                        <td>Indicates that the field is private and should hide its input.</td>
                    </tr>
                    <tr>
                        <td><code>max-length</code><code>number</code></td>
                        <td>Maximum value length of the input.</td>
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
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormColumn, FluxFormField, FluxFormPinInput, FluxStack, FluxToggle } from '@basmilius/flux';
    import { ref } from 'vue';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@docs/components';

    const isPrivate = ref(false);
    const pin = ref('13');
</script>
