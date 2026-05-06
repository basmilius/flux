<template>
    <FluxFlex
        :class="$style.itemStack"
        direction="vertical">
        <slot/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import FluxFlex from './FluxFlex.vue';
    import $style from '~flux/components/css/component/Item.module.scss';
</script>
