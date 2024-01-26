<template>
    <div
        class="flux-divider"
        :style="{
            justifyItems: contentPlacement
        }"
        role="separator">
        <div
            v-if="$slots.default"
            class="flux-divider-content">
            <slot/>
        </div>

        <hr
            v-else
            class="flux-divider-line">
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly contentPlacement?: 'start' | 'center' | 'end';
    }

    withDefaults(defineProps<Props>(), {
        contentPlacement: 'center'
    });
</script>

<style lang="scss">
    .flux-divider {
        position: relative;
        display: grid;
        margin: 18px 0;
        align-items: center;
        contain: paint;

        &-content {
            position: relative;
            display: flex;
        }

        &-content::before,
        &-content::after {
            position: absolute;
            display: block;
            top: 50%;
            translate: 0 -50%;
        }

        &-content::before,
        &-content::after,
        &-line {
            height: 1px;
            content: '';
            background: rgb(var(--gray-3));
        }

        &-content::before {
            left: -100dvh;
            right: calc(100% + 15px);
        }

        &-content::after {
            left: calc(100% + 15px);
            right: -100dvh;
        }

        &-line {
            width: 100%;
            border: 0;
        }
    }
</style>
