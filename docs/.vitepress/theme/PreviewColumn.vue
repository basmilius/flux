<template>
    <div :class="$style.previewColumn">
        <slot/>
    </div>
</template>

<style
    lang="scss"
    module>
    .previewColumn {
        display: flex;
        min-width: 90px;
        height: 40px;
        padding: 0 12px;
        align-items: center;
        justify-content: center;

        background: var(--surface-sunken);
        border: 1px dashed var(--surface-stroke-hover);
        border-radius: var(--radius);

        color: var(--foreground-secondary);
        font-size: 13px;
        font-weight: 500;
    }
</style>
