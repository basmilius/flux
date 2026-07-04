<template>
    <Preview>
        <div style="position: relative; overflow: hidden; width: 100%; padding: 60px 30px; background: linear-gradient(135deg, var(--primary-500), var(--primary-700)); border-radius: var(--radius);">
            <strong style="display: block; font-size: 21px; color: white;">Textured hero</strong>
            <span style="display: block; margin-top: 6px; font-size: 14px; color: rgb(255 255 255 / .8);">A subtle grain over a flat gradient.</span>

            <FluxVisualNoise/>
        </div>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualNoise } from '@flux-ui/visuals';
</script>
