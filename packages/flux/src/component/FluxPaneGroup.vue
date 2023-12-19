<template>
    <div class="flux-pane-group">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-pane-group {
        position: relative;

        + .flux-pane-group {
            border-top: 1px solid rgb(var(--gray-3));
        }
    }
</style>
