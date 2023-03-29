<template>
    <div class="flux-badge-stack">
        <slot/>
    </div>
</template>

<style lang="scss">
    @layer component {
        .flux-badge-stack {
            display: flex;
            flex-flow: row wrap;
            gap: 6px;
        }
    }
</style>
