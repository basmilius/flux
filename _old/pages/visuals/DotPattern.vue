<template>
    <FluxStack>
        <PageTitle
            section="Visuals"
            title="Dot pattern"/>

        <Preview>
            <FluxPane style="width: 420px; height: 210px; contain: paint;">
                <FluxDotPattern
                    :width="15"
                    :height="15"
                    style="fill: rgb(var(--primary-7) / .2)"/>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The dot pattern component is a stylish SVG-based Vue component that renders a
                customizable dot pattern. This pattern can seamlessly fill any container and is
                tailored through properties such as dot size and positioning. Ideal for use in
                backgrounds, overlays, or interactive graphical elements.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="DotPattern">
                <template #props>
                    <tr>
                        <td><code>width</code><code>number</code></td>
                        <td>The width of each dit.</td>
                    </tr>
                    <tr>
                        <td><code>height</code><code>number</code></td>
                        <td>The height of each dit.</td>
                    </tr>
                    <tr>
                        <td><code>cr</code><code>number</code></td>
                        <td>The radius of each dot.</td>
                    </tr>
                    <tr>
                        <td><code>cx</code><code>number</code></td>
                        <td>The x-coordinate of the center of each dot.</td>
                    </tr>
                    <tr>
                        <td><code>cy</code><code>number</code></td>
                        <td>The y-coordinate of the center of each dot.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxDotPattern, FluxPane, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
