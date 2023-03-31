<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Container"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <flux-grid :gap="21">
                        <flux-grid-column
                            v-for="i in [1, 2, 3]"
                            :md="i === 2 ? 6 : 3">
                            <div class="column-example"/>
                        </flux-grid-column>
                    </flux-grid>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                Our grid component is a powerful tool for creating responsive layouts that adapt to any screen size. With
                12 equal-width columns, it provides maximum flexibility for building complex page designs. You can easily
                combine and rearrange the columns to create custom layouts that suit your specific needs.
            </p>
        </api-section>

        <api-section title="API">
            <api-components>
                <tr>
                    <td><code>FluxGrid</code></td>
                    <td>The grid itself.</td>
                </tr>
                <tr>
                    <td><code>FluxGridColumn</code></td>
                    <td>A single column within the grid.</td>
                </tr>
            </api-components>

            <api-component name="Grid">
                <template #props>
                    <tr>
                        <td><code>columns</code><code>number</code></td>
                        <td>The amount of columns the grid has.</td>
                    </tr>
                    <tr>
                        <td><code>gap</code><code>number</code></td>
                        <td>The gap in pixels between each element.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="GridColumn">
                <template #props>
                    <tr>
                        <td><code>xs</code><code>number</code></td>
                        <td>The column span on the xs breakpoint.</td>
                    </tr>
                    <tr>
                        <td><code>sm</code><code>number</code></td>
                        <td>The column span on the sm breakpoint.</td>
                    </tr>
                    <tr>
                        <td><code>md</code><code>number</code></td>
                        <td>The column span on the md breakpoint.</td>
                    </tr>
                    <tr>
                        <td><code>lg</code><code>number</code></td>
                        <td>The column span on the lg breakpoint.</td>
                    </tr>
                    <tr>
                        <td><code>xl</code><code>number</code></td>
                        <td>The column span on the xl breakpoint.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxGrid, FluxGridColumn, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@/components';
</script>
