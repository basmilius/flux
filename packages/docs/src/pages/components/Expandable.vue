<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Expandable"/>

        <preview>
            <flux-pane>
                <flux-expandable label="More options...">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad culpa debitis deleniti dignissimos dolorem ducimus earum error facilis, fugit hic modi nulla odit praesentium rerum voluptate. Ipsum neque quasi sint?
                </flux-expandable>
            </flux-pane>
        </preview>

        <section>
            <p>
                A component that provides a toggleable container for additional content. It consists of a header with
                a label, and a body that holds the expandable content. When the header button is clicked, the body
                opens or closes to reveal or hide the content.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>Header label of the expandable.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits">
                <template #body>
                    <tr>
                        <td><code>toggle</code><code>(isOpen: boolean): void;</code></td>
                        <td>Triggered when the expandable is toggled.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{label, close}</code></td>
                        <td>Contents of the expandable.</td>
                    </tr>
                    <tr>
                        <td><code>body</code><code>{label, close}</code></td>
                        <td>Contents of the expandable, but without padding.</td>
                    </tr>
                    <tr>
                        <td><code>header</code><code>{label, isOpen, close, open, toggle}</code></td>
                        <td>Header of the expandable.</td>
                    </tr>
                </template>
            </api-table>

            <p><br/></p>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <p>
                The most basic form of an expandable.
            </p>
            <code-preview
                :code="basicCode as string"
                :component="basic"/>

            <h3>Group</h3>
            <p>
                An expandable group makes sure that only one expandable is open at ant moment. It closes other
                expandables when one is opened.
            </p>
            <code-preview
                :code="groupCode as string"
                :component="group"/>

            <h3>Group in Pane</h3>
            <p>
                Grouped expandables are especially nice within a Pane.
            </p>
            <code-preview
                :code="groupPaneCode as string"
                :component="groupPane"/>

            <h3>Custom header</h3>
            <p>
                The header of an expandable can be overwritten with a slot called <code>header</code>. That slot
                is provided with an <code>isOpen</code> boolean and three functions to control the expandable.
            </p>
            <code-preview
                :code="customHeaderCode as string"
                :component="customHeader"/>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxExpandable, FluxPane, FluxStack } from '@fancee/flux';
    import { ApiTable, CodePreview, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/expandable/basic.vue';
    import basicCode from '@/code/components/expandable/basic.vue?raw';
    import group from '@/code/components/expandable/group.vue';
    import groupCode from '@/code/components/expandable/group.vue?raw';
    import groupPane from '../../code/components/expandable/groupPane.vue';
    import groupPaneCode from '../../code/components/expandable/groupPane.vue?raw';
    import customHeader from '../../code/components/expandable/customHeader.vue';
    import customHeaderCode from '../../code/components/expandable/customHeader.vue?raw';
</script>
