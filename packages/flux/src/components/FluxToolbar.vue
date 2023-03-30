<template>
    <nav
        class="flux-toolbar"
        :class="{
            'flux-surface': floatingMode,
            'flux-toolbar-floating': floatingMode,
            'flux-toolbar-floating-free': floatingMode === 'free',
            'flux-toolbar-floating-top-start': floatingMode === 'top-start',
            'flux-toolbar-floating-top-end': floatingMode === 'top-end',
            'flux-toolbar-floating-bottom-start': floatingMode === 'bottom-start',
            'flux-toolbar-floating-bottom-end': floatingMode === 'bottom-end'
        }">
        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly floatingMode?: 'free' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-toolbar {
        display: flex;
        padding: 6px;
        gap: 6px;

        &-floating {
            position: absolute;
            box-shadow: var(--shadow);

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
