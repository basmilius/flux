<template>
    <header :class="styles.dashboardTopBar">
        <slot/>
    </header>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Dashboard.module.scss';
</script>
