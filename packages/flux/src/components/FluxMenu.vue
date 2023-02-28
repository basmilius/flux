<template>
    <nav class="flux-menu">
        <slot/>
    </nav>
</template>

<style lang="scss">
    .flux-menu {
        display: flex;
        flex-flow: column;
        gap: 9px;
    }

    .flux-menu .flux-separator {
        margin-left: 15px;
        margin-right: 15px;
    }

    .flux-pane > .flux-menu {
        margin-left: 9px;
        margin-right: 9px;

        &:first-child {
            margin-top: 9px;
        }

        &:last-child {
            margin-bottom: 9px;
        }
    }

    .flux-expandable-body > .flux-menu {
        margin-left: 9px;
        margin-right: 9px;

        &:last-child {
            margin-bottom: 9px;
        }

        > .flux-separator {
            margin-left: 21px;
            margin-right: 21px;
        }
    }
</style>
