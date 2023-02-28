<template>
    <transition name="flux-fade">
        <slot/>
    </transition>
</template>

<style lang="scss">
    .flux-fade-enter-active,
    .flux-fade-leave-active {
        transition: opacity 150ms var(--swift-out);
    }

    .flux-fade-enter-from,
    .flux-fade-leave-to {
        opacity: 0;
    }
</style>
