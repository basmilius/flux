<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Pagination"/>

        <Preview>
            <FluxPagination
                arrows
                :page="13"
                :per-page="10"
                :total="200"/>
        </Preview>

        <ApiSection>
            <p>
                A component that displays the pages for paginated content. The component automatically decides
                which pages to show or not.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['angle-left', 'angle-right', 'ellipsis-h']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxPagination</code></td>
                    <td>Simple pagination element.</td>
                </tr>
                <tr>
                    <td><code>FluxPaginationBar</code></td>
                    <td>A pagination bar that contains a pagination element and limit options.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Pagination">
                <template #props>
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

                <template #emits>
                    <tr>
                        <td><code>navigate</code><code>(page: number): void;</code></td>
                        <td>Triggered when a navigation occurred.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="PaginationBar">
                <template #props>
                    <tr>
                        <td><code>limits</code><code>number[]</code></td>
                        <td>The different limits that are available in the pagination bar.</td>
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

                <template #emits>
                    <tr>
                        <td><code>limit</code><code>(limit: number): void;</code></td>
                        <td>Triggered when the user changes the limit.</td>
                    </tr>
                    <tr>
                        <td><code>navigate</code><code>(page: number): void;</code></td>
                        <td>Triggered when a navigation occurred.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Example">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="Pagination can for example be visible in the footer of a Pane."/>

            <ApiExample
                :code="compactCode"
                :component="compact"
                title="Compact"
                description="There is also a compact mode for the pagination component."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPagination, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/pagination/basic.vue';
    import basicCode from '@/code/components/pagination/basic.vue?raw';
    import compact from '@/code/components/pagination/compact.vue';
    import compactCode from '@/code/components/pagination/compact.vue?raw';
</script>
