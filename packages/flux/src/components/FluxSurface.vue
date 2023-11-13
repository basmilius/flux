<template>
    <div class="flux-surface">
        <slot/>
    </div>
</template>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-surface {
        background: rgb(var(--gray-0));
        background-clip: padding-box;
        border: 1px solid rgb(var(--gray-11) / .05);
        border-radius: var(--radius);
    }

    @include flux.dark-mode {
        .flux-surface {
            border-color: rgb(var(--gray-11) / .2);
        }
    }
</style>
