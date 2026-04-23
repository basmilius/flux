<template>
    <div :class="$style.colorPalette">
        <FluxTooltip
            v-for="i of [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]"
            :content="`${label} ${i}`">
            <div
                :class="$style.colorPaletteShade"
                :style="{
                    '--background': `var(--${name}-${i})`,
                    '--foreground': `var(--${name}-${i >= 500 ? 50 : 950})`
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
        background: var(--background);
        border-radius: var(--radius);
        box-shadow: inset 0 0 0 1px rgb(0 0 0 / .075);
        color: var(--foreground);
        font-family: var(--vp-font-family-mono), monospace;
        font-size: 12px;
        font-weight: 500;
    }
</style>
