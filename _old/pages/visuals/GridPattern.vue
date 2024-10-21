<template>
    <FluxStack>
        <PageTitle
            section="Visuals"
            title="Grid pattern"/>

        <Preview>
            <FluxPane style="width: 420px; height: 210px; contain: paint;">
                <FluxGridPattern
                    :width="30"
                    :height="30"
                    :squares="[
                        [3, 4],
                        [7, 5],
                        [11, 2],
                        [10, 1]
                    ]"
                    :stroke-dasharray="2"/>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The grid pattern component is a stylish SVG-based Vue component that renders a
                customizable grid pattern. This pattern can seamlessly fill any container and is
                tailored through properties such as grid size, positioning, and stroke style.
                Additionally, it supports highlighting specific squares within the grid, making
                it versatile for various design and visualization purposes. Ideal for use in
                backgrounds, overlays, or interactive graphical elements.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="GridPattern">
                <template #props>
                    <tr>
                        <td><code>width</code><code>number</code></td>
                        <td>The width of each grid cell.</td>
                    </tr>
                    <tr>
                        <td><code>height</code><code>number</code></td>
                        <td>The height of each grid cell.</td>
                    </tr>
                    <tr>
                        <td><code>x</code><code>number</code></td>
                        <td>The x-coordinate offset for the pattern.</td>
                    </tr>
                    <tr>
                        <td><code>y</code><code>number</code></td>
                        <td>The y-coordinate offset for the pattern.</td>
                    </tr>
                    <tr>
                        <td><code>stroke-dasharray</code><code>number</code></td>
                        <td>The dash pattern for the grid strokes.</td>
                    </tr>
                    <tr>
                        <td><code>squares</code><code>[x: number, y: number][]</code></td>
                        <td>An array of coordinates to highlight specific squares within the grid.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxGridPattern, FluxPane, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
