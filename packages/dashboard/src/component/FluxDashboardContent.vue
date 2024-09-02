<template>
    <main :class="styles.dashboardContent">
        <slot/>
    </main>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Dashboard.module.scss';
</script>
