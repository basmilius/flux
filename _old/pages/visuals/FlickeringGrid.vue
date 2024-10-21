<template>
    <FluxStack>
        <PageTitle
            section="Visuals"
            title="Flickering grid"/>

        <Preview>
            <FluxPane style="width: 420px; contain: paint;">
                <FluxAspectRatio :aspect-ratio="16 / 9">
                    <FluxFlickeringGrid/>
                </FluxAspectRatio>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The flickering grid component is a visually engaging component that displays a dynamic
                grid of small squares. These squares flicker randomly, creating an eye-catching effect
                reminiscent of old-school digital displays. The grid's color, size, opacity, and spacing
                can be customized. This component is perfect for adding a touch of animated visual
                interest to your web application or interface.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="FlickeringGrid">
                <template #props>
                    <tr>
                        <td><code>color</code><code>string</code></td>
                        <td>The color of the squares in the grid.</td>
                    </tr>
                    <tr>
                        <td><code>flicker-chance</code><code>number</code></td>
                        <td>The likelihood of each square flickering during each render tick.</td>
                    </tr>
                    <tr>
                        <td><code>gap</code><code>number</code></td>
                        <td>The space between adjacent squares.</td>
                    </tr>
                    <tr>
                        <td><code>max-opacity</code><code>number</code></td>
                        <td>The maximum opacity that a square can have.</td>
                    </tr>
                    <tr>
                        <td><code>size</code><code>number</code></td>
                        <td>The size of each square.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxFlickeringGrid, FluxPane, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
