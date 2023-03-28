<template>
    <nav class="flux-toolbar-group">
        <slot/>
    </nav>
</template>

<style lang="scss">
    @layer component {
        .flux-toolbar-group {
            display: flex;
        }
    }
</style>
