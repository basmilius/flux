<template>
    <FluxActionBar
        :class="[$style.itemActions, isCenter && $style.isCenter]"
        #primary>
        <slot/>
    </FluxActionBar>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Item.module.scss';
    import FluxActionBar from './FluxActionBar.vue';

    defineProps<{
        readonly isCenter?: boolean;
    }>();
</script>
