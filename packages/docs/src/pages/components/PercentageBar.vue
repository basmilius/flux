<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="PercentageBar"/>

        <Preview>
            <FluxPane style="width: 75%">
                <FluxPaneBody>
                    <FluxFormField label="Sales per gender">
                        <FluxPercentageBar
                            is-legend-visible
                            :items="[
                                {color: '#06b6d4', icon: 'mars', label: 'Male', value: .35},
                                {color: '#ec4899', icon: 'venus', label: 'Female', value: .27},
                                {color: '#f59e0b', icon: 'genderless', label: 'Other', value: .13},
                                {color: '#cbd5e1', icon: 'genderless', label: 'Not specified', value: .25}
                            ]"/>
                    </FluxFormField>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                A dynamic percentage bar visually represents the distribution of various items, offering a
                user-friendly interface to discern the proportional breakdown. Additionally, a legend can be
                shown for further clarification and enhanced data interpretation.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="PercentageBar">
                <template #props>
                    <tr>
                        <td><code>is-legend-visible</code><code>boolean</code></td>
                        <td>Indicates that the legend is visible.</td>
                    </tr>
                    <tr>
                        <td><code>items</code><code>FluxPercentageBarItemSpec[]</code></td>
                        <td>The items within the percentage bar.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormField, FluxPane, FluxPaneBody, FluxPercentageBar, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@docs/components';
</script>
