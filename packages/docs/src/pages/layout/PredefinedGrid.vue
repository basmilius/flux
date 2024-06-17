<template>
    <FluxStack>
        <PageTitle
            section="Layout"
            title="Predefined grid"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody>
                    <FluxPredefinedGrid layout="cards">
                        <div class="column-example"/>
                        <div class="column-example"/>
                        <div class="column-example"/>
                    </FluxPredefinedGrid>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The predefined grid component is a basic layout tool for organizing content on your page into columns. It
                provides a straightforward solution for breaking up content into sections, allowing you to present
                information in a clear and organized manner. Unlike customizable grid systems, this component has a fixed
                structure and is not adjustable. The number of columns, their width, and the distribution of content within
                each column are predetermined and cannot be altered.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="PredefinedGrid">
                <template #props>
                    <tr>
                        <td><code>layout</code><code>'cards' | 'full' | 'sidebar-start' | 'sidebar-end' | 'two-column'</code></td>
                        <td>Which grid layout to use for its content.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The elements within the predefined grid.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPredefinedGrid, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@docs/components';
</script>
