<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Tabs"/>

        <preview>
            <flux-stack style="width: 60%">
                <flux-pane>
                    <flux-pane-header
                        icon="folder"
                        title="Tabs"/>

                    <flux-pane-body>
                        <flux-tabs>
                            <flux-tab label="Common">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
                            </flux-tab>

                            <flux-tab label="Advanced">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur dolorem dolorum ducimus enim, fuga, hic illo labore libero, magnam minima odio pariatur porro quasi quidem quis repellat reprehenderit vero?
                            </flux-tab>
                        </flux-tabs>
                    </flux-pane-body>
                </flux-pane>

                <flux-pane>
                    <flux-pane-header
                        icon="folder"
                        title="Tabs"/>

                    <flux-tabs>
                        <template #tabs="{activeIndex, tabs, activate}">
                            <flux-tab-bar>
                                <template
                                    v-for="(tab, index) of tabs"
                                    :key="index">
                                    <flux-tab-bar-item
                                        :icon="tab.icon"
                                        :is-active="activeIndex === index"
                                        :label="tab.label"
                                        @click="activate(index)"/>
                                </template>
                            </flux-tab-bar>
                        </template>

                        <flux-tab label="Common">
                            <flux-pane-body>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
                            </flux-pane-body>
                        </flux-tab>

                        <flux-tab label="Advanced">
                            <flux-pane-body>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur dolorem dolorum ducimus enim, fuga, hic illo labore libero, magnam minima odio pariatur porro quasi quidem quis repellat reprehenderit vero?
                            </flux-pane-body>
                        </flux-tab>
                    </flux-tabs>
                </flux-pane>
            </flux-stack>
        </preview>

        <section>
            <p>
                Tabs are a user interface element used for organizing and navigating content within an application. It
                consists of clickable tabs that correspond to different content areas, and a content area that displays
                relevant content based on the selected tab.
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
                        <td><code>FluxTabs</code></td>
                        <td>This component does all the "tab"-work for you. It may contain multiple FluxTab components. The component will render a FluxTabBar for you.</td>
                    </tr>
                    <tr>
                        <td><code>FluxTab</code></td>
                        <td>A single tab within a FluxTabs component.</td>
                    </tr>
                    <tr>
                        <td><code>FluxTabBar</code></td>
                        <td>A navigation stack that displays multiple FluxTabBarItems.</td>
                    </tr>
                    <tr>
                        <td><code>FluxTabBarItem</code></td>
                        <td>A single tab within a FluxTabBar.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxTabs">
                <template #body>
                    <tr>
                        <td><code>model-value</code><code>number</code></td>
                        <td>The current active tab index.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxTab">
                <template #body>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>An icon for the tab.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label for the tab.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxTabBarItem">
                <template #body>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>An icon for the tab.</td>
                    </tr>
                    <tr>
                        <td><code>is-active</code><code>boolean</code></td>
                        <td>Determines if the tab is active.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label for the tab.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits: FluxTabs">
                <template #body>
                    <tr>
                        <td><code>update:model-value</code><code>(index: number): void;</code></td>
                        <td>Triggered when a new tab is activated.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits: FluxTabBarItem">
                <template #body>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the tab is clicked.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxTabs">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contains all the tabs that are visible within.</td>
                    </tr>
                    <tr>
                        <td><code>content</code><code>{activeIndex, children, tabs, activate}</code></td>
                        <td>Where the content is rendered.</td>
                    </tr>
                    <tr>
                        <td><code>tabs</code><code>{activeIndex, children, tabs, activate}</code></td>
                        <td>Where the tabbar is rendered.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxTab">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the tab.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxTabBar">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the tabbar.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxStack, FluxTab, FluxTabBar, FluxTabBarItem, FluxTabs } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
