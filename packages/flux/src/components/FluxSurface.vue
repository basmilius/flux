<template>
    <div class="flux-surface">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-surface {
        background: var(--surface-background);
        background-clip: padding-box;
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
        color: var(--surface-foreground);
    }
</style>
