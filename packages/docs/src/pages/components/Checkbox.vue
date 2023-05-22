<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Checkbox"/>

        <Preview>
            <FluxPane style="width: 420px">
                <FluxPaneBody>
                    <FluxFormField label="Newsletter">
                        <FluxCheckbox
                            v-model="isChecked"
                            label="Send me a weekly update newsletter."/>
                    </FluxFormField>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The Checkbox Component is an interactive UI element that allows users to select one or
                more options from a list. This component is commonly used in forms, surveys, and other
                applications where users need to make binary or multiple selections. The Checkbox
                Component consists of a small box that can be selected or deselected by the user, and
                a label that describes the option being selected.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['check', 'minus']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Checkbox">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>boolean | null</code></td>
                        <td>The state of the checkbox. If null is given, the checkbox will show a indeterminate state.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label that is shown next to the checkbox.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: boolean): void;</code></td>
                        <td>Triggered when the checkbox state changes.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxCheckbox, FluxFormField, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@docs/components';
    import { ref } from 'vue';

    const isChecked = ref(true);
</script>
