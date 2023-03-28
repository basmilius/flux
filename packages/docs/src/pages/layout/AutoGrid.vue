<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Auto grid"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <flux-auto-grid
                        :gap="21"
                        :min-column-width="210">
                        <div
                            v-for="i in 3"
                            :key="i"
                            class="column-example"/>
                    </flux-auto-grid>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <section>
            <p>
                The AutoGrid component is a Vue component that automatically adjusts the width of its children to ensure
                they have a minimum width. It intelligently determines the number of columns that fit best within the
                parent container, making it easy to create responsive layouts that adapt to various screen sizes.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>gap</code><code>number</code></td>
                        <td>The gap in pixels between each element.</td>
                    </tr>
                    <tr>
                        <td><code>min-column-width</code><code>number</code></td>
                        <td>The minimum width of each child.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAutoGrid, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
