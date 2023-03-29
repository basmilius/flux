<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Container"/>

        <preview>
            <flux-pane style="height: 108px; width: 75%;"/>
        </preview>

        <section>
            <p>
                The primary container which dynamically changes widths based on the viewport.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>gutter</code><code>number</code></td>
                        <td>The gutter on each side of the container.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
