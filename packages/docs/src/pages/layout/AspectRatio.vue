<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Aspect ratio"/>

        <preview>
            <flux-stack
                axis="horizontal"
                :gap="15">
                <flux-pane>
                    <flux-aspect-ratio
                        :aspect-ratio="1"
                        style="height: 108px"/>
                </flux-pane>

                <flux-pane>
                    <flux-aspect-ratio
                        :aspect-ratio="16 / 9"
                        style="height: 108px"/>
                </flux-pane>

                <flux-pane>
                    <flux-aspect-ratio
                        :aspect-ratio="9 / 16"
                        style="height: 108px"/>
                </flux-pane>
            </flux-stack>
        </preview>

        <section>
            <p>
                The aspect ratio component makes sure that the element has a certain aspect ratio and tries to keep
                it in that ratio. One of height and width should be available for this component to work.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>aspect-ratio</code><code>number</code></td>
                        <td>The aspect ratio, can be a formula such as "16 / 9".</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxPane, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
