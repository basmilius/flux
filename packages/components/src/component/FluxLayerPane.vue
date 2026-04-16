<template>
    <div :class="$style.layerPane">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/LayerPane.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
