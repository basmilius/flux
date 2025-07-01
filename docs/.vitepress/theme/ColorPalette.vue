<template>
    <div :class="$style.colorPalette">
        <FluxTooltip
            v-for="i of 12"
            :content="`${label} ${i - 1}`">
            <div
                :class="$style.colorPaletteShade"
                :style="{
                    '--background': `var(--${name}-${i - 1})`,
                    '--foreground': `var(--${name}-${i - 1 >= 7 ? 2 : 11})`
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
        border-radius: 99px;
        box-shadow: inset 0 0 0 1px rgb(0 0 0 / .05);
        color: var(--foreground);
        font-family: var(--vp-font-family-mono), monospace;
        font-size: 12px;
        font-weight: 500;
    }
</style>
