<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Pagination"/>

        <preview>
            <flux-pagination
                arrows
                :page="13"
                :per-page="10"
                :total="200"/>
        </preview>

        <section>
            <p>
                A component that displays the pages for paginated content. The component automatically decides
                which pages to show or not.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>arrows</code><code>boolean</code></td>
                        <td>Enables the navigation arrows.</td>
                    </tr>
                    <tr>
                        <td><code>is-compact</code><code>boolean</code></td>
                        <td>Enables a compact version of the pagination component.</td>
                    </tr>
                    <tr>
                        <td><code>page</code><code>number</code></td>
                        <td>The current active page.</td>
                    </tr>
                    <tr>
                        <td><code>per-page</code><code>number</code></td>
                        <td>The amount of entities that is displayed per page.</td>
                    </tr>
                    <tr>
                        <td><code>total</code><code>number</code></td>
                        <td>The total amount of entities.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits">
                <template #body>
                    <tr>
                        <td><code>navigate</code><code>(page: number): void;</code></td>
                        <td>Triggered when a navigation occurred.</td>
                    </tr>
                </template>
            </api-table>

            <p><br/></p>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <p>
                Pagination can for example be visible in the footer of a Pane.
            </p>
            <code-preview
                :code="basicCode as string"
                :component="basic"/>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPagination, FluxStack } from '@fancee/flux';
    import { ApiTable, CodePreview, PageTitle, Preview } from '@/components';
    import basic from '../../code/components/pagination/basic.vue';
    import basicCode from '../../code/components/pagination/basic.vue?raw';
</script>
