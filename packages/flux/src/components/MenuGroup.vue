<template>
    <nav class="flux-menu-group">
        <slot/>
    </nav>
</template>

<style lang="scss">
    .flux-menu-group {
        display: flex;
        flex-flow: column;
        gap: 1px;
    }
</style>
