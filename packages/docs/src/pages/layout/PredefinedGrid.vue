<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Predefined grid"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <flux-predefined-grid layout="cards">
                        <div class="column-example"/>
                        <div class="column-example"/>
                        <div class="column-example"/>
                    </flux-predefined-grid>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                The predefined grid component is a basic layout tool for organizing content on your page into columns. It
                provides a straightforward solution for breaking up content into sections, allowing you to present
                information in a clear and organized manner. Unlike customizable grid systems, this component has a fixed
                structure and is not adjustable. The number of columns, their width, and the distribution of content within
                each column are predetermined and cannot be altered.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="PredefinedGrid">
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
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPredefinedGrid, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
