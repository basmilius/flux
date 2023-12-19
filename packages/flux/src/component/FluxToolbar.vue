<template>
    <FluxStack
        class="flux-toolbar"
        :class="{
            'flux-surface': floatingMode,
            'is-floating': floatingMode,
            'is-floating-free': floatingMode === 'free',
            'is-floating-top-start': floatingMode === 'top-start',
            'is-floating-top-end': floatingMode === 'top-end',
            'is-floating-bottom-start': floatingMode === 'bottom-start',
            'is-floating-bottom-end': floatingMode === 'bottom-end'
        }"
        axis="horizontal"
        :gap="6"
        tag="nav">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import FluxStack from './FluxStack.vue';

    export interface Props {
        readonly floatingMode?: 'free' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-toolbar {
        padding: 6px;

        &.is-floating {
            position: absolute;
            box-shadow: var(--shadow-lg);

            &-free {
                translate: -50% -50%;
            }

            &-top-start {
                top: 0;
                left: 21px;
                translate: 0 -50%;
            }

            &-top-end {
                top: 0;
                right: 21px;
                translate: 0 -50%;
            }

            &-bottom-start {
                left: 21px;
                bottom: 0;
                translate: 0 50%;
            }

            &-bottom-end {
                right: 21px;
                bottom: 0;
                translate: 0 50%;
            }
        }

        > .flux-separator {
            margin-top: 9px;
            margin-bottom: 9px;
        }
    }
</style>
