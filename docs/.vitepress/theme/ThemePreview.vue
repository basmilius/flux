<template>
    <div :class="$style.themePreview">
        <div
            v-for="scheme of SCHEMES"
            :key="scheme"
            :light="scheme === 'light' || undefined"
            :dark="scheme === 'dark' || undefined"
            :class="$style.themePreviewScheme">
            <span :class="$style.themePreviewLabel">{{ scheme }}</span>
            <div :class="$style.themePreviewContent">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    // Both themes on one page. `light` and `dark` set color-scheme, and every Flux
    // token resolves against the scheme of the element it is used on, so the same
    // markup renders twice without a second stylesheet or a page reload.
    const SCHEMES = ['light', 'dark'] as const;

    defineSlots<{ default(): any }>();
</script>

<style
    lang="scss"
    module>
    .themePreview {
        display: grid;
        margin-block: 24px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;

        @media (max-width: 720px) {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    .themePreviewScheme {
        position: relative;
        padding: 33px 21px 21px;
        background: var(--background);
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
        color: var(--foreground);
        overflow: hidden;
    }

    .themePreviewLabel {
        position: absolute;
        top: 9px;
        left: 21px;
        color: var(--foreground-subtle);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .themePreviewContent {
        display: flex;
        flex-flow: column;
        gap: 15px;
    }
</style>
