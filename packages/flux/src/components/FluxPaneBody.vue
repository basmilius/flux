<template>
    <div class="flux-pane-body">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-pane-body {
        padding: 21px;
    }

    .flux-pane-body > .flux-stack {
        flex-grow: 1;
    }

    .flux-pane > .flux-pane-body + .flux-pane-body {
        padding-top: 0;
    }
</style>
