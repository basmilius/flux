<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Menu"/>

        <preview>
            <flux-pane style="width: 210px">
                <flux-menu>
                    <flux-menu-group>
                        <flux-menu-item
                            icon-before="scissors"
                            label="Cut"/>
                        <flux-menu-item
                            icon-before="clone"
                            label="Copy"/>
                        <flux-menu-item
                            icon-before="paste"
                            label="Paste"/>
                    </flux-menu-group>

                    <flux-separator/>

                    <flux-menu-group>
                        <flux-menu-item
                            icon-before="gear"
                            label="Preferences"/>
                    </flux-menu-group>
                </flux-menu>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                The menu component is used for side navigation and in flyouts. It displays the children vertically and
                gives them a gap. Menus provide more options for a set context.
            </p>
        </api-section>

        <api-section title="API">
            <api-components>
                <tr>
                    <td><code>FluxMenu</code></td>
                    <td>The base of the menu. When the menu retrieves focus, it traps it.</td>
                </tr>
                <tr>
                    <td><code>FluxMenuGroup</code></td>
                    <td>Groups multiple menu items together. Reduces the gap between its items.</td>
                </tr>
                <tr>
                    <td><code>FluxMenuItem</code></td>
                    <td>A single menu item that can perform an action.</td>
                </tr>
                <tr>
                    <td><code>FluxMenuSubHeader</code></td>
                    <td>A title that can be used within a group.</td>
                </tr>
            </api-components>

            <api-component name="Menu">
                <template #props>
                    <tr>
                        <td><code>is-large</code><code>boolean</code></td>
                        <td>Use a larger variant of the menu.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the menu.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="MenuGroup">
                <template #props>
                    <tr>
                        <td><code>is-horizontal</code><code>boolean</code></td>
                        <td>Render items in a row.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the menu group.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="MenuItem">
                <template #props>
                    <tr>
                        <td><code>command</code><code>string</code></td>
                        <td>Adds a command.</td>
                    </tr>
                    <tr>
                        <td><code>command-icon</code><code>IconNames</code></td>
                        <td>Adds an icon for the command.</td>
                    </tr>
                    <tr>
                        <td><code>disabled</code><code>boolean</code></td>
                        <td>Indicates that the menu item should be disabled.</td>
                    </tr>
                    <tr>
                        <td><code>icon-after</code><code>IconNames</code></td>
                        <td>The icon that is used as a suffix.</td>
                    </tr>
                    <tr>
                        <td><code>icon-before</code><code>IconNames</code></td>
                        <td>The icon that is used as a prefix.</td>
                    </tr>
                    <tr>
                        <td><code>is-active</code><code>boolean</code></td>
                        <td>Indicates that the menu item is active.</td>
                    </tr>
                    <tr>
                        <td><code>is-destructive</code><code>boolean</code></td>
                        <td>Indicates that the menu item activates a destructive action.</td>
                    </tr>
                    <tr>
                        <td><code>is-highlighted</code><code>boolean</code></td>
                        <td>Adds a highlight to the menu item. This is used in the FluxFormSelect component for example.</td>
                    </tr>
                    <tr>
                        <td><code>is-indented</code><code>boolean</code></td>
                        <td>Wether the menu item should be indented.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Sets a loading state to the menu item. This also disables it. The spinner will replace the icon used in the menu item.</td>
                    </tr>
                    <tr>
                        <td><code>is-selectable</code><code>boolean</code></td>
                        <td>Allows the menu item to be selected, this removes the icon before.</td>
                    </tr>
                    <tr>
                        <td><code>is-selected</code><code>boolean</code></td>
                        <td>Indicates that the menu item is currently selected. Requires is-selectable.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label displayed within the menu item.</td>
                    </tr>
                    <tr>
                        <td><code>href</code><code>string</code></td>
                        <td>HTMLAnchorElement.href</td>
                    </tr>
                    <tr>
                        <td><code>rel</code><code>string</code></td>
                        <td>HTMLAnchorElement.rel</td>
                    </tr>
                    <tr>
                        <td><code>target</code><code>string</code></td>
                        <td>HTMLAnchorElement.target</td>
                    </tr>
                    <tr>
                        <td><code>to</code><code>FluxRoutingLocation</code></td>
                        <td>A routing location, same as vue-router.</td>
                    </tr>
                    <tr>
                        <td><code>type</code><code>'button' | 'link' | 'route'</code></td>
                        <td>The type of button changes how the button handles a click.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the menu item is clicked.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="MenuSubHeader">
                <template #props>
                    <tr>
                        <td><code>icon-after</code><code>IconNames</code></td>
                        <td>The icon that is used as a suffix.</td>
                    </tr>
                    <tr>
                        <td><code>icon-before</code><code>IconNames</code></td>
                        <td>The icon that is used as a prefix.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label displayed within the menu item.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic menu that consists of a few items."/>

            <api-example
                :code="groupCode"
                :component="group"
                title="Group"
                description="Menus can have groups, to group similar items together."/>

            <api-example
                :code="paneCode"
                :component="pane"
                title="Pane"
                description="Panes have first class support for menus inside them. Place a menu directly inside a Pane to create a nice side menu for example."/>

            <api-example
                :code="subHeaderCode"
                :component="subHeader"
                title="Sub header"
                description="Menu groups can have a sub header. A sub header can be used to categorize the underlying menu items and improve readability."/>

            <api-example
                :code="largeCode"
                :component="large"
                title="Larger menus"
                description="These types of menus can be used within dashboard sidebars. They're a bit larger than other menus and may contain indented sub items."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/menu/basic.vue';
    import basicCode from '@/code/components/menu/basic.vue?raw';
    import group from '@/code/components/menu/group.vue';
    import groupCode from '@/code/components/menu/group.vue?raw';
    import large from '@/code/components/menu/large.vue';
    import largeCode from '@/code/components/menu/large.vue?raw';
    import pane from '@/code/components/menu/pane.vue';
    import paneCode from '@/code/components/menu/pane.vue?raw';
    import subHeader from '@/code/components/menu/subHeader.vue';
    import subHeaderCode from '@/code/components/menu/subHeader.vue?raw';
</script>
