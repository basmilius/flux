<template>
    <tr :class="styles.tableRow">
        <slot/>
    </tr>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Table.module.scss';
</script>
