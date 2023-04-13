<template>
    <div class="flux-form-input-group">
        <slot/>
    </div>
</template>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-form-input-group {
        display: flex;
        gap: 1px;
        padding: 1px;
        background: rgb(var(--gray-4) / .75);
        border-radius: var(--radius);
        box-shadow: var(--shadow-px);

        @include flux.focus-ring-transition(-1px, true);

        > :where(.flux-button, .flux-form-input) {
            height: unset;
            min-height: 40px;
            border: 0;
            border-radius: calc(var(--radius) - 1px);
        }

        > :where(.flux-button, .flux-form-input, .flux-form-input-addition) {
            outline: 0 !important;

            &:not(:first-child) {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            &:not(:last-child) {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
    }
</style>
