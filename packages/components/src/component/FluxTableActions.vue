<template>
    <FluxActionStack :class="$style.tableActions">
        <slot/>
    </FluxActionStack>
</template>

<script
    lang="ts"
    setup>
    import FluxActionStack from './FluxActionStack.vue';
    import $style from '$flux/css/component/Table.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
