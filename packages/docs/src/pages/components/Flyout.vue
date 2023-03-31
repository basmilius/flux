<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Flyout"/>

        <preview>
            <flux-button-stack>
                <flux-flyout>
                    <template #opener="{open}">
                        <flux-secondary-button
                            icon-after="ellipsis-h"
                            label="More"
                            @click="open"/>
                    </template>

                    <template #default="{close}">
                        <flux-menu>
                            <flux-menu-group>
                                <flux-menu-item
                                    icon-before="scissors"
                                    label="Cut"
                                    @click="close"/>
                                <flux-menu-item
                                    icon-before="clone"
                                    label="Copy"
                                    @click="close"/>
                                <flux-menu-item
                                    icon-before="paste"
                                    label="Paste"
                                    @click="close"/>
                            </flux-menu-group>

                            <flux-separator/>

                            <flux-menu-group>
                                <flux-menu-item
                                    icon-before="gear"
                                    label="Preferences"
                                    @click="close"/>
                            </flux-menu-group>
                        </flux-menu>
                    </template>
                </flux-flyout>

                <flux-flyout
                    axis="horizontal"
                    :width="360">
                    <template #opener="{open}">
                        <flux-secondary-button
                            label="Info"
                            @click="open"/>
                    </template>

                    <template #default="{close}">
                        <flux-pane-body>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam aspernatur autem debitis dignissimos enim esse, ex incidunt libero nulla odit optio porro quae quisquam similique tempora vero voluptas voluptate.
                        </flux-pane-body>
                    </template>
                </flux-flyout>
            </flux-button-stack>
        </preview>

        <api-section>
            <p>
                A flyout is a hidden element that can be opened by another element. This can be used for hidden menu's
                for example. A flyout can be positioned horizontally or vertically. You may use other elements within
                the flyout, for example pane's with more information about a feature.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="Flyout">
                <template #props>
                    <tr>
                        <td><code>axis</code><code>'horizontal' | 'vertical'</code></td>
                        <td>Controls where the flyout is opened.</td>
                    </tr>
                    <tr>
                        <td><code>is-auto-width</code><code>boolean</code></td>
                        <td>Sets the flyout width to the same as the opener.</td>
                    </tr>
                    <tr>
                        <td><code>margin</code><code>number</code></td>
                        <td>Controls the offset of the flyout from its opener.</td>
                    </tr>
                    <tr>
                        <td><code>width</code><code>number</code></td>
                        <td>Width of the flyout.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{close, paneX, paneY, openerWidth, openerHeight}</code></td>
                        <td>Content within the flyout.</td>
                    </tr>
                    <tr>
                        <td><code>opener</code><code>{close, open, toggle}</code></td>
                        <td>Opener of the flyout. Can be a button for example.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="menuCode"
                :component="menu"
                title="Menu"
                description="A menu that is hidden under a three-dot menu. When opened, the flyout reveals more options."/>

            <api-example
                :code="popoverCode"
                :component="popover"
                title="Popover"
                description="Popovers can display more information for a context. This can for example be a question mark icon next to a graph, that explains the graph."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPaneBody, FluxSecondaryButton, FluxSeparator, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import menu from '@/code/components/flyout/menu.vue';
    import menuCode from '@/code/components/flyout/menu.vue?raw';
    import popover from '@/code/components/flyout/popover.vue';
    import popoverCode from '@/code/components/flyout/popover.vue?raw';
</script>
