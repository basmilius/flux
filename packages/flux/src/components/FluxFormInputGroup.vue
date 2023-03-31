<template>
    <div class="flux-form-input-group">
        <slot/>
    </div>
</template>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-form-input-group {
        display: flex;
        border-radius: var(--radius);

        @include flux.focus-ring(-1px, true);

        :where(.flux-button, .flux-form-input, .flux-form-input-addition) {
            outline: 0 !important;

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
        }
    }
</style>
