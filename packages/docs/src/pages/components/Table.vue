<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Table"/>

        <Preview>
            <FluxPane>
                <FluxTable is-hoverable>
                    <template #header>
                        <FluxTableRow>
                            <FluxTableHeader
                                v-for="header in 3"
                                :key="header">
                                Header {{ header }}
                            </FluxTableHeader>

                            <FluxTableHeader is-shrinking/>
                        </FluxTableRow>
                    </template>

                    <template #rows>
                        <FluxTableRow
                            v-for="row in 5"
                            :key="row">
                            <FluxTableCell
                                v-for="cell in 3"
                                :key="cell">
                                Cell {{ cell }}&times;{{ row }}
                            </FluxTableCell>

                            <FluxTableCell>
                                <FluxTableActions>
                                    <FluxAction icon="pen"/>
                                    <FluxAction icon="ellipsis-h"/>
                                </FluxTableActions>
                            </FluxTableCell>
                        </FluxTableRow>
                    </template>
                </FluxTable>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                Tables are a popular and effective way to display information in a clear and concise manner. They
                offer a structured way to present data, making it easy for users to scan through and locate the
                information they need. By using rows and columns to organize information, tables provide a
                systematic approach to displaying data that can help users identify patterns and insights.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxTable</code></td>
                    <td>The Table itself.</td>
                </tr>
                <tr>
                    <td><code>FluxTableAction</code></td>
                    <td>An action for a single row within the table.</td>
                </tr>
                <tr>
                    <td><code>FluxTableActions</code></td>
                    <td>A group of actions for a single row within the table.</td>
                </tr>
                <tr>
                    <td><code>FluxTableCell</code></td>
                    <td>A single cell within the table.</td>
                </tr>
                <tr>
                    <td><code>FluxTableHeader</code></td>
                    <td>A header cell within the table.</td>
                </tr>
                <tr>
                    <td><code>FluxTableRow</code></td>
                    <td>A row containing multiple cells within the table.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Table">
                <template #props>
                    <tr>
                        <td><code>caption-side</code><code>'top' | 'bottom'</code></td>
                        <td>Where the caption of the table should be placed.</td>
                    </tr>
                    <tr>
                        <td><code>is-bordered</code><code>boolean</code></td>
                        <td>Applies borders to all sides of the table cells.</td>
                    </tr>
                    <tr>
                        <td><code>is-hoverable</code><code>boolean</code></td>
                        <td>Adds a hover to each rows within the table body.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Indicates that the table is loading.</td>
                    </tr>
                    <tr>
                        <td><code>is-separated</code><code>boolean</code></td>
                        <td>Adds a border between each row in the table body.</td>
                    </tr>
                    <tr>
                        <td><code>is-striped</code><code>boolean</code></td>
                        <td>Adds alternating colors to each row in the table body.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>caption</code><code>{}</code></td>
                        <td>Optional caption for the table.</td>
                    </tr>
                    <tr>
                        <td><code>footer</code><code>{}</code></td>
                        <td>Footer rows for the table.</td>
                    </tr>
                    <tr>
                        <td><code>header</code><code>{}</code></td>
                        <td>Header rows for the table.</td>
                    </tr>
                    <tr>
                        <td><code>rows</code><code>{}</code></td>
                        <td>Rows of the table.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="TableActions">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Actions for the table actions nav.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="TableCell">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the cell.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="TableHeader">
                <template #props>
                    <tr>
                        <td><code>is-shrinking</code><code>boolean</code></td>
                        <td>When provided, cell group will shrink to its contents.</td>
                    </tr>
                    <tr>
                        <td><code>is-sortable</code><code>boolean</code></td>
                        <td>When provided, the table header cell will render a sorting flyout.</td>
                    </tr>
                    <tr>
                        <td><code>is-sticky</code><code>boolean</code></td>
                        <td>When provided, the table header cell will be sticky to the top when scrolled.</td>
                    </tr>
                    <tr>
                        <td><code>min-width</code><code>number</code></td>
                        <td>Minimal width of the cell group.</td>
                    </tr>
                    <tr>
                        <td><code>sort</code><code>'ascending' | 'descending' | null</code></td>
                        <td>The current sorting that is applied on the table header cell.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the header cell.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>sort</code><code>(sort: 'ascending' | 'descending' | null): void</code></td>
                        <td>Triggered when the sorting changes.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="TableRow">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the row.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="Basic table containing three rows and 3 columns."/>

            <ApiExample
                :code="paneCode"
                :component="pane"
                title="Pane"
                description="A table within a pane has a different style."/>

            <ApiExample
                :code="captionCode"
                :component="caption"
                title="Caption"
                description="Tables can have a caption with an explanation about the table."/>

            <ApiExample
                :code="stickyCode"
                :component="sticky"
                title="Sticky header"
                description="Headers can be sticky, when the user scrolls the header remains visible."/>

            <ApiExample
                :code="hoverableCode"
                :component="hoverable"
                title="Hoverable"
                description="Rows can have a hover state."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxPane, FluxStack, FluxTable, FluxTableActions, FluxTableCell, FluxTableHeader, FluxTableRow } from '@basmilius/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiSection, PageTitle, Preview } from '@docs/components';
    import basic from '@docs/code/components/table/basic.vue';
    import basicCode from '@docs/code/components/table/basic.vue?raw';
    import caption from '@docs/code/components/table/caption.vue';
    import captionCode from '@docs/code/components/table/caption.vue?raw';
    import hoverable from '@docs/code/components/table/hoverable.vue';
    import hoverableCode from '@docs/code/components/table/hoverable.vue?raw';
    import pane from '@docs/code/components/table/pane.vue';
    import paneCode from '@docs/code/components/table/pane.vue?raw';
    import sticky from '@docs/code/components/table/sticky.vue';
    import stickyCode from '@docs/code/components/table/sticky.vue?raw';
</script>
