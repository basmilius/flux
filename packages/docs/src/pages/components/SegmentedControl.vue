<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Segmented control"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <flux-segmented-control
                        v-model="viewIndex"
                        :items="['Options', 'Statistics']"/>
                </flux-pane-body>

                <flux-segmented-view :index="viewIndex">
                    <flux-pane-body>
                        <p>Options</p>
                    </flux-pane-body>

                    <flux-pane-body>
                        <p>Statistics</p>
                    </flux-pane-body>
                </flux-segmented-view>
            </flux-pane>
        </preview>

        <section>
            <p>
                The segmented control component is a UI element that allows users to choose between multiple options, by
                selecting one of the multiple segments. Each segment is represented as a button, with a distinct label,
                and the currently selected segment is indicated visually, for example, by a highlighted background. The
                component is commonly used in navigation, forms, or settings, and provides a compact and intuitive way for
                users to make a choice.
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
                        <td><code>FluxSegmentedControl</code></td>
                        <td>The segment switcher.</td>
                    </tr>
                    <tr>
                        <td><code>FluxSegmentedView</code></td>
                        <td>The view.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxSegmentedControl">
                <template #body>
                    <tr>
                        <td><code>items</code><code>string[]</code></td>
                        <td>A string array of segments.</td>
                    </tr>
                    <tr>
                        <td><code>model-value</code><code>number</code></td>
                        <td>The current active view index.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxSegmentedView">
                <template #body>
                    <tr>
                        <td><code>index</code><code>number</code></td>
                        <td>The current active view index.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits: FluxSegmentedControl">
                <template #body>
                    <tr>
                        <td><code>update:model-value</code><code>(index: number): void;</code></td>
                        <td>Triggered when the view is changed.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxSegmentedView">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The individual segment views.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxSegmentedControl, FluxSegmentedView, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import { ApiTable, PageTitle, Preview } from '@/components';

    const viewIndex = ref(0);
</script>
