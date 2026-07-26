<template>
    <Preview>
        <div style="position: relative; overflow: hidden; width: 100%; padding: 60px 30px; background: linear-gradient(135deg, var(--primary-solid), var(--primary-solid-active)); border-radius: var(--radius);">
            <strong style="display: block; font-size: 21px; color: var(--primary-on-solid);">Textured hero</strong>
            <span style="display: block; margin-top: 6px; font-size: 14px; color: color-mix(in srgb, var(--primary-on-solid) 80%, transparent);">A subtle grain over a flat gradient.</span>

            <FluxVisualNoise/>
        </div>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualNoise } from '@flux-ui/visuals';
</script>
