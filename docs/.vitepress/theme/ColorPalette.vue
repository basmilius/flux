<template>
    <div :class="$style.colorPalette">
        <FluxTooltip
            v-for="i of [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]"
            :key="i"
            :content="`${label} ${i}`">
            <div
                :class="$style.colorPaletteShade"
                :style="{
                    '--swatch': `var(--palette-${name}-${i})`,
                    '--swatch-foreground': `var(--palette-${name}-${i >= 500 ? 50 : 950})`
                }"/>
        </FluxTooltip>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxTooltip } from '@flux-ui/components';

    defineProps<{
        readonly label: string;
        readonly name: 'primary' | 'gray' | 'danger' | 'info' | 'success' | 'warning';
    }>();
</script>

<style
    lang="scss"
    module>
    .colorPalette {
        display: grid;
        margin: 16px 0;
        grid-template-columns: repeat(12, 1fr);
        gap: 12px;
    }

    .colorPaletteShade {
        display: flex;
        aspect-ratio: 1 / 1;
        align-items: center;
        background: var(--swatch);
        border-radius: var(--radius);
        box-shadow: inset 0 0 0 1px var(--surface-stroke-out);
        color: var(--swatch-foreground);
        font-family: var(--vp-font-family-mono), monospace;
        font-size: 12px;
        font-weight: 500;
    }
</style>
