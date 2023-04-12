<template>
    <flux-stack>
        <page-title
            section="Visuals"
            title="Gridlines"/>

        <preview>
            <flux-pane style="height: 240px; width: 360px">
                <flux-gridlines
                    :size="30"
                    style="height: 100%"/>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                Draws a grid within the parent element. Be noted that no elements can be placed within this component, because
                this will be masked within the grid.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="AnimatedColors">
                <template #props>
                    <tr>
                        <td><code>size</code><code>number</code></td>
                        <td>The size of each grid cell.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxGridlines, FluxPane, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
