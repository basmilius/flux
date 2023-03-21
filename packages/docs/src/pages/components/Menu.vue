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

        <section>
            <p>
                The menu component is used for side navigation and in flyouts. It displays the children vertically and
                gives them a gap. Menus provide more options for a set context.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Components">
                <template #head>
                    <tr>
                        <th>Name</th>
                        <th>When to use</th>
                    </tr>
                </template>
                <template #body>
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
                </template>
            </api-table>

            <api-table title="Props: FluxMenu">
                <template #body>
                    <tr>
                        <td><code>is-large</code><code>boolean</code></td>
                        <td>Use a larger variant of the menu.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxMenuGroup">
                <template #body>
                    <tr>
                        <td><code>is-horizontal</code><code>boolean</code></td>
                        <td>Render items in a row.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxMenuItem">
                <template #body>
                    <tr>
                        <td><code>command</code><code>string</code></td>
                        <td>Adds a keyboard shortcut.</td>
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
            </api-table>

            <api-table title="Props: FluxMenuSubHeader">
                <template #body>
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
            </api-table>

            <api-table title="Emits: FluxMenuItem">
                <template #body>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the menu item is clicked.</td>
                    </tr>
                </template>
            </api-table>

            <p><br/></p>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <p>
                A basic menu that consists of a few items.
            </p>
            <code-preview
                :code="basicCode as string"
                :component="basic"/>

            <h3>Group</h3>
            <p>
                Menus can have groups, to group similar items together.
            </p>
            <code-preview
                :code="groupCode as string"
                :component="group"/>

            <h3>Pane</h3>
            <p>
                Panes have first class support for menus inside them. Place a menu directly inside a Pane
                to create a nice side menu for example.
            </p>
            <code-preview
                :code="paneCode as string"
                :component="pane"/>

            <h3>Sub header</h3>
            <p>
                Menu groups can have a sub header. A sub header can be used to categorize the underlying
                menu items and improve readability.
            </p>
            <code-preview
                :code="subHeaderCode as string"
                :component="subHeader"/>

            <h3>Larger menus</h3>
            <p>
                These types of menus can be used within dashboard sidebars. They're a bit larger than other
                menus and may contain indented sub items.
            </p>
            <code-preview
                :code="largeCode as string"
                :component="large"/>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator, FluxStack } from '@fancee/flux';
    import { ApiTable, CodePreview, PageTitle, Preview } from '@/components';
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
