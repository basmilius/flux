<template>
    <div style="position: relative; overflow: hidden; width: 100%; max-width: 420px; padding: 30px; background: var(--surface); border: 1px solid var(--surface-stroke); border-radius: var(--radius); box-sizing: border-box;">
        <strong style="display: block; font-size: 15px;">Paper texture</strong>
        <span style="display: block; margin-top: 6px; font-size: 14px; color: var(--gray-600);">A faint grain gives flat panes a tactile, printed feel.</span>

        <FluxVisualNoise
            blend="multiply"
            :opacity="0.04"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualNoise } from '@flux-ui/visuals';
</script>
