<template>
    <FluxActions :class="$style.tableActions">
        <slot/>
    </FluxActions>
</template>

<script
    lang="ts"
    setup>
    import FluxActions from './FluxActions.vue';
    import $style from '@/css/component/Table.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
