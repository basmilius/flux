<template>
    <div class="flux-fader-item">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-fader-item {
        position: absolute;
        display: block;
        inset: 0;
        transition: 660ms var(--deceleration-curve);

        &:not(.is-current) {
            opacity: 0;
            pointer-events: none;
            scale: 1.05;
            transition-delay: 90ms;
            z-index: 1;
        }

        img {
            position: absolute;
            display: block;
            inset: 0;
            height: 100%;
            width: 100%;

            &:not(.flux-focal-point-image) {
                object-fit: cover;
                object-position: center;
            }
        }
    }
</style>
