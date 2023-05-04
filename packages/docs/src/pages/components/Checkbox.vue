<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Checkbox"/>

        <preview>
            <flux-pane style="width: 420px">
                <flux-pane-body>
                    <flux-form-field label="Newsletter">
                        <flux-checkbox
                            v-model="isChecked1"
                            label="Send me a weekly update newsletter."/>
                    </flux-form-field>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                The Checkbox Component is an interactive UI element that allows users to select one or
                more options from a list. This component is commonly used in forms, surveys, and other
                applications where users need to make binary or multiple selections. The Checkbox
                Component consists of a small box that can be selected or deselected by the user, and
                a label that describes the option being selected.
            </p>
        </api-section>

        <api-section title="Required icons">
            <api-required-icons :icons="['check', 'minus']"/>
        </api-section>

        <api-section title="API">
            <api-component name="Checkbox">
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
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxCheckbox, FluxFormField, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import { ref } from 'vue';

    const isChecked1 = ref(true);
    const isChecked2 = ref(null);
</script>
