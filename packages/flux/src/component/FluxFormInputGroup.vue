<template>
    <div class="flux-form-input flux-form-input-group">
        <slot/>
    </div>
</template>

<style lang="scss">
    @use '../css/mixin' as flux;

    %-inner-styles {
        height: 100%;
        min-height: unset;
        border: 0;
        border-radius: 0;

        @include flux.focus-ring-remove;

        &:first-child {
            border-top-left-radius: calc(var(--radius) - 1px);
            border-bottom-left-radius: calc(var(--radius) - 1px);
        }

        &:last-child {
            border-top-right-radius: calc(var(--radius) - 1px);
            border-bottom-right-radius: calc(var(--radius) - 1px);
        }
    }

    .flux-form-input-group {
        display: flex;
        padding: 0;
        gap: 1px;
        background: rgb(var(--gray-4) / .75);

        @include flux.focus-ring-transition(-1px, true);

        &,
        &:hover {
            border: 1px solid rgb(var(--gray-4) / .75);
        }

        > :is(.flux-form-input, .flux-form-select, .flux-button) {
            @extend %-inner-styles;
        }

        > .flux-button-group > .flux-button {
            @extend %-inner-styles;

            + .flux-button {
                margin-left: 1px;
            }
        }
    }
</style>
