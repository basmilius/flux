<template>
    <div
        v-bind="$attrs"
        :class="$style.root"
        :inert="inertMain">
        <slot/>
    </div>

    <FluxOverlayProvider/>
    <FluxSnackbarProvider/>
    <FluxTooltipProvider/>
</template>

<script
    lang="ts"
    setup>
    import { watch } from 'vue';
    import { useFluxStore } from '$flux/data';
    import FluxOverlayProvider from './FluxOverlayProvider.vue';
    import FluxSnackbarProvider from './FluxSnackbarProvider.vue';
    import FluxTooltipProvider from './FluxTooltipProvider.vue';
    import $style from '$flux/css/component/Root.module.scss';

    defineOptions({
        inheritAttrs: false
    });

    defineSlots<{
        default(): any;
    }>();

    const {inertMain} = useFluxStore();

    watch(inertMain, (inert, _, onCleanup): void => {
        if (!inert) {
            return;
        }

        document.body.classList.add($style.isLocked);
        onCleanup(() => document.body.classList.remove($style.isLocked));
    }, {immediate: true});
</script>
