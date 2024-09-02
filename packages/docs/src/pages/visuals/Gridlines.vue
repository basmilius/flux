<template>
    <FluxStack>
        <PageTitle
            section="Visuals"
            title="Gridlines"/>

        <Preview>
            <FluxPane style="height: 240px; width: 360px">
                <FluxGridlines
                    :size="30"
                    style="height: 100%"/>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                Draws a grid within the parent element. Be noted that no elements can be placed within this component, because
                this will be masked within the grid.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="AnimatedColors">
                <template #props>
                    <tr>
                        <td><code>size</code><code>number</code></td>
                        <td>The size of each grid cell.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxGridlines, FluxPane, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
