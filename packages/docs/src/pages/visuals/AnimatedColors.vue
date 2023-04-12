<template>
    <flux-stack>
        <page-title
            section="Visuals"
            title="Animated colors"/>

        <preview>
            <flux-aspect-ratio
                :aspect-ratio="16 / 9"
                style="width: 420px">
                <flux-animated-colors
                    :colors="['#6071b5', '#f07db7', '#0284c7']"
                    :incrementor=".5"
                    :opacity="1"
                    :seed="130496"/>
            </flux-aspect-ratio>
        </preview>

        <api-section>
            <p>
                The animated colors component displays an array of colors in an animated blurred way. This visual
                is used for example in the PaneIllustration component.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="AnimatedColors">
                <template #props>
                    <tr>
                        <td><code>colors</code><code>string[]</code></td>
                        <td>An array of hex colors that should be animated. Use RRGGBBAA for applying opacity to individual colors.</td>
                    </tr>
                    <tr>
                        <td><code>incrementor</code><code>number</code></td>
                        <td>Typically not used, but this can control the speed of the animation. The default value is one, which is the default speed.</td>
                    </tr>
                    <tr>
                        <td><code>opacity</code><code>number</code></td>
                        <td>The global opacity level of the animation.</td>
                    </tr>
                    <tr>
                        <td><code>seed</code><code>number</code></td>
                        <td>The randomizer seed to user for the animation.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAnimatedColors, FluxAspectRatio, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
