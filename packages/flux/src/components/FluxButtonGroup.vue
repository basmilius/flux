<template>
    <div class="flux-button-group">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-button-group {
        display: flex;
        flex-flow: row nowrap;

        .flux-button {
            border-radius: 0;

            &:first-child {
                border-radius: var(--radius) 0 0 var(--radius);
            }

            &:last-child {
                border-radius: 0 var(--radius) var(--radius) 0;
            }
        }

        .flux-button + .flux-button {
            margin-left: -1px;
        }
    }
</style>
