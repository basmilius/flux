<template>
    <div :class="$style.colorPalette">
        <div
            :class="$style.colorPaletteHeader"
            :style="{
                '--background': `rgb(var(--${name}-7))`,
                '--foreground': `rgb(var(--${name}-0))`
            }"/>

        <div
            v-for="i of 12"
            :class="$style.colorPaletteShade"
            :style="{
                '--background': `rgb(var(--${name}-${i - 1}))`,
                '--foreground': `rgb(var(--${name}-${i - 1 >= 7 ? 2 : 11}))`
            }">
            --{{ name }}-{{ i - 1 }}
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    defineProps<{
        readonly name: 'primary' | 'gray' | 'danger' | 'info' | 'success' | 'warning';
    }>();
</script>

<style
    lang="scss"
    module>
    .colorPalette {
        display: flex;
        margin: 16px 0;
        flex-flow: column;
        gap: 1px;
    }

    .colorPaletteShade {
        display: flex;
        height: 42px;
        padding: 0 12px;
        align-items: center;
        background: var(--background);
        color: var(--foreground);
        font-family: var(--vp-font-family-mono), monospace;
        font-size: 12px;
        font-weight: 500;

        &:last-child {
            border-radius: 0 0 8px 8px;
        }
    }

    .colorPaletteHeader {
        composes: colorPaletteShade;

        height: 84px;
        border-radius: 8px 8px 0 0;
        font-weight: 700;
    }
</style>
