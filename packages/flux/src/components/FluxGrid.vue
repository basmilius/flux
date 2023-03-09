<template>
    <div class="flux-grid">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-grid {
        display: grid;
        gap: 30px;
        grid-template-columns: repeat(12, 1fr);
    }
</style>
