<template>
    <FluxActions :class="styles.tableActions">
        <slot/>
    </FluxActions>
</template>

<script
    lang="ts"
    setup>
    import FluxActions from './FluxActions.vue';
    import styles from '@/css/component/Table.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
