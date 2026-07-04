<template>
    <div style="position: relative; overflow: hidden; width: 100%; padding: 60px 30px; background: linear-gradient(135deg, #1e1b4b, #111827); border-radius: var(--radius);">
        <strong style="display: block; font-size: 21px; color: #f8fafc;">Film grain</strong>
        <span style="display: block; margin-top: 6px; font-size: 14px; color: rgb(255 255 255 / .65);">Animated noise adds a lively, cinematic texture.</span>

        <FluxVisualNoise
            animated
            :opacity="0.08"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualNoise } from '@flux-ui/visuals';
</script>
