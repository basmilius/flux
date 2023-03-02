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

        img {
            position: absolute;
            display: block;
            inset: 0;
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: center;
        }

        &:not(.is-current) {
            opacity: 0;
            scale: 1.05;
            transition-delay: 90ms;
        }
    }
</style>
