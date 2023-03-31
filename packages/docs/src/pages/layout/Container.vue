<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Container"/>

        <preview>
            <flux-pane style="height: 108px; width: 75%;"/>
        </preview>

        <api-section>
            <p>
                The primary container which dynamically changes widths based on the viewport.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="Container">
                <template #props>
                    <tr>
                        <td><code>gutter</code><code>number</code></td>
                        <td>The gutter on each side of the container.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
