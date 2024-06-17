<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Form select"/>

        <Preview>
            <FluxPane style="width: 60%">
                <FluxPaneBody>
                    <FluxFormSelect
                        v-model="selectValue"
                        :options="[
                            {id: 1, label: 'Option 1'},
                            {id: 2, label: 'Option 2'},
                            {id: 3, label: 'Option 3'}
                        ]"
                        placeholder="Select an option..."/>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                This is a form select element that allows the user to choose from a list of options. It is similar to a
                drop-down menu, but with more advanced functionality. The select element can be configured to allow for
                the selection of multiple values, which is useful when the user needs to select more than one option.
                It's a great option for forms that require multiple selections, such as when a user needs to choose
                multiple interests, hobbies, or preferences.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['angle-down', 'magnifying-glass']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="FormSelect">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>string | number | (string | number)[]</code></td>
                        <td>The value of the select.</td>
                    </tr>
                    <tr>
                        <td><code>is-disabled</code><code>boolean</code></td>
                        <td>Indicates that the field is disabled.</td>
                    </tr>
                    <tr>
                        <td><code>is-multiple</code><code>boolean</code></td>
                        <td>Indicates that the select may accept multiple values.</td>
                    </tr>
                    <tr>
                        <td><code>is-searchable</code><code>boolean</code></td>
                        <td>Indicates that the select is searchable.</td>
                    </tr>
                    <tr>
                        <td><code>options</code><code>(FluxFormSelectOption | FluxFormSelectGroup)[]</code></td>
                        <td>The options that are available in the form select.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder</code><code>string</code></td>
                        <td>A placeholder is no value is entered.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: string | number | (string | number)[]): void</code></td>
                        <td>Triggered when the value changes.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic select that is used to select one value."/>

            <ApiExample
                :code="multipleCode"
                :component="multiple"
                title="Multiple"
                description="A select that is used to select multiple values."/>

            <ApiExample
                :code="multipleSearchableCode"
                :component="multipleSearchable"
                title="Multiple searchable"
                description="Searchable multi select that is used to select multiple values within a larger dataset."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormSelect, FluxPane, FluxPaneBody, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@docs/components';
    import { ref } from 'vue';
    import basic from '@docs/code/components/formSelect/basic.vue';
    import basicCode from '@docs/code/components/formSelect/basic.vue?raw';
    import multiple from '@docs/code/components/formSelect/multiple.vue';
    import multipleCode from '@docs/code/components/formSelect/multiple.vue?raw';
    import multipleSearchable from '@docs/code/components/formSelect/multipleSearchable.vue';
    import multipleSearchableCode from '@docs/code/components/formSelect/multipleSearchable.vue?raw';

    const selectValue = ref(null);
</script>
