<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Table"/>

        <preview>
            <flux-pane is-contained>
                <flux-table is-hoverable>
                    <template #header>
                        <flux-table-row>
                            <flux-table-header
                                v-for="header in 3"
                                :key="header">
                                Header {{ header }}
                            </flux-table-header>

                            <flux-table-header is-shrinking/>
                        </flux-table-row>
                    </template>

                    <template #rows>
                        <flux-table-row
                            v-for="row in 5"
                            :key="row">
                            <flux-table-cell
                                v-for="cell in 3"
                                :key="cell">
                                Cell {{ cell }}&times;{{ row }}
                            </flux-table-cell>

                            <flux-table-cell>
                                <flux-table-actions>
                                    <flux-table-action icon="pen"/>
                                    <flux-table-action icon="ellipsis-h"/>
                                </flux-table-actions>
                            </flux-table-cell>
                        </flux-table-row>
                    </template>
                </flux-table>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                Tables are a popular and effective way to display information in a clear and concise manner. They
                offer a structured way to present data, making it easy for users to scan through and locate the
                information they need. By using rows and columns to organize information, tables provide a
                systematic approach to displaying data that can help users identify patterns and insights.
            </p>
        </api-section>

        <api-section title="API">
            <api-components>
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
            </api-components>

            <api-component name="Table">
                <template #props>
                    <tr>
                        <td><code>caption-side</code><code>'top' | 'bottom'</code></td>
                        <td>Where the caption of the table should be placed.</td>
                    </tr>
                    <tr>
                        <td><code>is-hoverable</code><code>boolean</code></td>
                        <td>When provided, the table rows will have a hover state when hovered.</td>
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
            </api-component>

            <api-component name="TableAction">
                <template #props>
                    <tr>
                        <td><code>destructive</code><code>boolean</code></td>
                        <td>Indicates that the action should be a destructive action.</td>
                    </tr>
                    <tr>
                        <td><code>disabled</code><code>boolean</code></td>
                        <td>Indicates that the action should be disabled.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon that is used.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Sets a loading state to the action. This also disables it. The spinner will replace the icon used in the action.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label displayed within the action.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the action is clicked.</td>
                    </tr>
                    <tr>
                        <td><code>mouseenter</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the cursor enters the action.</td>
                    </tr>
                    <tr>
                        <td><code>mouseleave</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the cursor leaves the action.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="TableActions">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Actions for the table actions nav.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="TableCell">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the cell.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="TableHeader">
                <template #props>
                    <tr>
                        <td><code>is-shrinking</code><code>boolean</code></td>
                        <td>When provided, cell group will shrink to its contents.</td>
                    </tr>
                    <tr>
                        <td><code>is-sticky</code><code>boolean</code></td>
                        <td>When provided, the table header cell will be sticky to the top when scrolled.</td>
                    </tr>
                    <tr>
                        <td><code>min-width</code><code>number</code></td>
                        <td>Minimal width of the cell group.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the header cell.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="TableRow">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the row.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="Basic table containing three rows and 3 columns."/>

            <api-example
                :code="paneCode"
                :component="pane"
                title="Pane"
                description="A table within a pane has a different style."/>

            <api-example
                :code="captionCode"
                :component="caption"
                title="Caption"
                description="Tables can have a caption with an explanation about the table."/>

            <api-example
                :code="stickyCode"
                :component="sticky"
                title="Sticky header"
                description="Headers can be sticky, when the user scrolls the header remains visible."/>

            <api-example
                :code="hoverableCode"
                :component="hoverable"
                title="Hoverable"
                description="Rows can have a hover state."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxStack, FluxTable, FluxTableAction, FluxTableActions, FluxTableCell, FluxTableHeader, FluxTableRow } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '../../code/components/table/basic.vue';
    import basicCode from '../../code/components/table/basic.vue?raw';
    import caption from '../../code/components/table/caption.vue';
    import captionCode from '../../code/components/table/caption.vue?raw';
    import hoverable from '../../code/components/table/hoverable.vue';
    import hoverableCode from '../../code/components/table/hoverable.vue?raw';
    import pane from '../../code/components/table/pane.vue';
    import paneCode from '../../code/components/table/pane.vue?raw';
    import sticky from '../../code/components/table/sticky.vue';
    import stickyCode from '../../code/components/table/sticky.vue?raw';
</script>
