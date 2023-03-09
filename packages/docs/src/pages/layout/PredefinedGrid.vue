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

        <section>
            <p>
                The container grid component is a basic layout tool for organizing content on your page into columns. It
                provides a straightforward solution for breaking up content into sections, allowing you to present
                information in a clear and organized manner. Unlike customizable grid systems, this component has a fixed
                structure and is not adjustable. The number of columns, their width, and the distribution of content within
                each column are predetermined and cannot be altered.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>layout</code><code>'cards' | 'full' | 'sidebar-start' | 'sidebar-end' | 'two-column'</code></td>
                        <td>Which grid layout to use for its content.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPredefinedGrid, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>

<style
    lang="scss"
    scoped>
    .column-example {
        display: flex;
        height: 90px;
        align-items: center;
        justify-content: center;
        background: rgb(var(--gray-2));
        border: 1px dashed rgb(var(--gray-4));
        border-radius: var(--radius);

        &::before {
            content: 'Column';
            color: rgb(var(--gray-6));
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
    }
</style>
