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

        <api-section>
            <p>
                A component that provides a toggleable container for additional content. It consists of a header with
                a label, and a body that holds the expandable content. When the header button is clicked, the body
                opens or closes to reveal or hide the content.
            </p>
        </api-section>

        <api-section title="Required icons">
            <api-required-icons :icons="['minus', 'plus']"/>
        </api-section>

        <api-section title="API">
            <api-components>
                <tr>
                    <td><code>FluxExpandable</code></td>
                    <td>Can reveal more content when opened.</td>
                </tr>
                <tr>
                    <td><code>FluxExpandableGroup</code></td>
                    <td>Ensures that only one expandable is opened at times.</td>
                </tr>
            </api-components>

            <api-component name="Expandable">
                <template #props>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>Header label of the expandable.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>toggle</code><code>(isOpen: boolean): void;</code></td>
                        <td>Triggered when the expandable is toggled.</td>
                    </tr>
                </template>

                <template #slots>
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
            </api-component>

            <api-component name="ExpandableGroup">
                <template #props>
                    <tr>
                        <td><code>is-controlled</code><code>boolean</code></td>
                        <td>Allows the expandable to be controlled through the is-opened prop of a FluxExpandable.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{label, close}</code></td>
                        <td>The expandables that should be part of the group.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="The most basic form of an expandable."/>

            <api-example
                :code="groupCode"
                :component="group"
                title="Group"
                description="An expandable group makes sure that only one expandable is open at ant moment. It closes other expandables when one is opened."/>

            <api-example
                :code="groupPaneCode"
                :component="groupPane"
                title="Group in Pane"
                description="Grouped expandables are especially nice within a Pane."/>

            <api-example
                :code="customHeaderCode"
                :component="customHeader"
                title="Custom header"
                description="The header of an expandable can be overwritten with a slot called header. That slot is provided with an isOpen boolean and three functions to control the expandable."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxExpandable, FluxPane, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/expandable/basic.vue';
    import basicCode from '@/code/components/expandable/basic.vue?raw';
    import customHeader from '@/code/components/expandable/customHeader.vue';
    import customHeaderCode from '@/code/components/expandable/customHeader.vue?raw';
    import group from '@/code/components/expandable/group.vue';
    import groupCode from '@/code/components/expandable/group.vue?raw';
    import groupPane from '@/code/components/expandable/groupPane.vue';
    import groupPaneCode from '@/code/components/expandable/groupPane.vue?raw';
</script>
