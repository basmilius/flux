<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Flyout"/>

        <Preview>
            <FluxButtonStack>
                <FluxFlyout>
                    <template #opener="{open}">
                        <FluxSecondaryButton
                            icon-after="ellipsis-h"
                            label="More"
                            @click="open"/>
                    </template>

                    <template #default="{close}">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-before="scissors"
                                    label="Cut"
                                    @click="close"/>
                                <FluxMenuItem
                                    icon-before="clone"
                                    label="Copy"
                                    @click="close"/>
                                <FluxMenuItem
                                    icon-before="paste"
                                    label="Paste"
                                    @click="close"/>
                            </FluxMenuGroup>

                            <FluxSeparator/>

                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-before="gear"
                                    label="Preferences"
                                    @click="close"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </template>
                </FluxFlyout>

                <FluxFlyout
                    axis="horizontal"
                    :width="360">
                    <template #opener="{open}">
                        <FluxSecondaryButton
                            label="Info"
                            @click="open"/>
                    </template>

                    <template #default="{close}">
                        <FluxPaneBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam aspernatur autem debitis dignissimos enim esse, ex incidunt libero nulla odit optio porro quae quisquam similique tempora vero voluptas voluptate.
                        </FluxPaneBody>
                    </template>
                </FluxFlyout>
            </FluxButtonStack>
        </Preview>

        <ApiSection>
            <p>
                A flyout is a hidden element that can be opened by another element. This can be used for hidden menu's
                for example. A flyout can be positioned horizontally or vertically. You may use other elements within
                the flyout, for example pane's with more information about a feature.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Flyout">
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
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="menuCode"
                :component="menu"
                title="Menu"
                description="A menu that is hidden under a three-dot menu. When opened, the flyout reveals more options."/>

            <ApiExample
                :code="popoverCode"
                :component="popover"
                title="Popover"
                description="Popovers can display more information for a context. This can for example be a question mark icon next to a graph, that explains the graph."/>
        </ApiSection>
    </FluxStack>
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
