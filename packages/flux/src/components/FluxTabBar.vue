<template>
    <nav class="flux-tab-bar">
        <slot/>
    </nav>
</template>

<style lang="scss">
    .flux-tab-bar {
        --tab-padding: 12px;

        display: flex;
        align-items: flex-end;
        gap: 21px;
        border-bottom: 2px solid rgb(var(--gray-3));
    }

    .flux-pane > .flux-tab-bar,
    .flux-pane > .flux-tabs > .flux-tab-bar {
        --tab-padding: 18px;

        padding-left: 21px;
        padding-right: 21px;
        background: rgb(var(--gray-1));

        &:first-child {
            border-radius: var(--radius) var(--radius) 0 0;
        }

        &:not(:first-child) {
            border-top: 1px solid rgb(var(--gray-3));
        }
    }

    .flux-pane > .flux-pane-header + .flux-tab-bar,
    .flux-pane > .flux-pane-header + .flux-tabs > .flux-tab-bar {
        padding-top: 6px;
    }

    .flux-pane-header:has(+ .flux-tab-bar),
    .flux-pane-header:has(+ .flux-tabs > .flux-tab-bar) {
        background: rgb(var(--gray-1));
    }
</style>
