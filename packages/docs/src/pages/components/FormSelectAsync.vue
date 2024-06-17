<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Form select (Async)"/>

        <Preview>
            <FluxPane style="width: 60%">
                <FluxPaneBody>
                    <FluxFormSelectAsync
                        v-model="selectValue"
                        :fetch-options="fetchOptions"
                        :fetch-relevant="fetchRelevant"
                        :fetch-search="fetchSearch"
                        placeholder="Choose your friend..."/>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>

                This is a dynamic form select element that retrieves options dynamically, allowing the user to choose
                from a list of selections. It resembles a drop-down menu but offers enhanced functionality. The select
                element can be tailored to permit the selection of multiple values, making it convenient for users who
                need to choose more than one option. It's particularly beneficial for forms requiring multiple
                selections, such as selecting multiple interests, hobbies, or preferences.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['angle-down', 'magnifying-glass']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="FormSelectAsync">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>string | number | (string | number)[]</code></td>
                        <td>The value of the select.</td>
                    </tr>
                    <tr>
                        <td><code>search-query</code><code>string</code></td>
                        <td>The value of the search box.</td>
                    </tr>
                    <tr>
                        <td><code>fetch-options</code><code>(ids: string[]) => Promise&lt;(FluxFormSelectGroup | FluxFormSelectOption)[]&gt;</code></td>
                        <td>Function to call when the form select needs options by their id.</td>
                    </tr>
                    <tr>
                        <td><code>fetch-relevant</code><code>() => Promise&lt;(FluxFormSelectGroup | FluxFormSelectOption)[]&gt;</code></td>
                        <td>Function to call when the form select needs relevant options.</td>
                    </tr>
                    <tr>
                        <td><code>fetch-search</code><code>(searchQuery: string) => Promise&lt;(FluxFormSelectGroup | FluxFormSelectOption)[]&gt;</code></td>
                        <td>Function to call when the form select needs options based on the given search query.</td>
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
                        <td><code>placeholder</code><code>string</code></td>
                        <td>A placeholder is no value is entered.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: string | number | (string | number)[]): void</code></td>
                        <td>Triggered when the value changes.</td>
                    </tr>
                    <tr>
                        <td><code>update:search-query</code><code>(value: string): void</code></td>
                        <td>Triggered when the value of the search box changes.</td>
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
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormSelectAsync, FluxFormSelectGroup, FluxFormSelectOption, FluxPane, FluxPaneBody, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@docs/components';
    import { ref } from 'vue';
    import basic from '@docs/code/components/formSelectAsync/basic.vue';
    import basicCode from '@docs/code/components/formSelectAsync/basic.vue?raw';
    import multiple from '@docs/code/components/formSelectAsync/multiple.vue';
    import multipleCode from '@docs/code/components/formSelectAsync/multiple.vue?raw';
    import dataset from '@docs/code/components/formSelect/dataset.json';

    const selectValue = ref(null);

    async function fetchOptions(ids: string[]): Promise<(FluxFormSelectGroup | FluxFormSelectOption)[]> {
        return dataset.filter(o => ids.includes(o.id));
    }

    async function fetchRelevant(): Promise<(FluxFormSelectGroup | FluxFormSelectOption)[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return dataset.toSorted();
    }

    async function fetchSearch(searchQuery: string): Promise<(FluxFormSelectGroup | FluxFormSelectOption)[]> {
        return dataset.filter(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }
</script>
