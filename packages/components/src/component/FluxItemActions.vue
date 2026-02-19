<template>
    <FluxActionBar
        :class="$style.itemActions"
        #primary>
        <slot/>
    </FluxActionBar>
</template>

<script
    lang="ts"
    setup>
    import FluxActionBar from './FluxActionBar.vue';
    import $style from '$flux/css/component/Item.module.scss';
</script>
