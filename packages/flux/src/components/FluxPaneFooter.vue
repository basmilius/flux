<template>
    <div class="flux-pane-footer">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-pane-footer {
        display: flex;
        padding: 21px;
        gap: 9px;
        background: rgb(var(--gray-1));
        border-top: 1px solid rgb(var(--gray-3));
    }

    .flux-pane > .flux-pane-footer {
        &:first-child {
            border-radius: var(--radius) var(--radius) 0 0;
        }

        &:last-child {
            border-radius: 0 0 var(--radius) var(--radius);
        }

        &:only-child {
            border: 0;
            border-radius: var(--radius);
        }
    }
</style>
