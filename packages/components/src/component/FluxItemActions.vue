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
    import FluxActionBar from './FluxActionBar.vue';
    import $style from '~flux/components/css/component/Item.module.scss';

    defineProps<{
        readonly isCenter?: boolean;
    }>();
</script>
