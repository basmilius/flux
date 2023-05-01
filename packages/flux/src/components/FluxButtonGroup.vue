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
                border-top-left-radius: var(--radius);
                border-bottom-left-radius: var(--radius);
            }

            &:last-child {
                border-top-right-radius: var(--radius);
                border-bottom-right-radius: var(--radius);
            }
        }

        .flux-button + .flux-button {
            margin-left: -1px;
        }
    }
</style>
