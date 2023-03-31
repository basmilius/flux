<template>
    <div class="flux-form-input-group">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-form-input-group {
        display: flex;
        z-index: 0;

        > :where(.flux-button, .flux-form-input, .flux-form-input-addition) {
            &:not(:first-child) {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            &:not(:last-child) {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }

            + & {
                margin-left: -1px;
            }

            &:focus,
            &:focus-within {
                z-index: 1;
            }
        }
    }
</style>
