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

        background: var(--gray-100);
        border: 1px dashed var(--gray-300);
        border-radius: var(--radius);

        color: var(--gray-600);
        font-size: 13px;
        font-weight: 500;
    }
</style>
