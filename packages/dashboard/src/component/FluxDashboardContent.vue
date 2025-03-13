<template>
    <main :class="$style.dashboardContent">
        <slot/>
    </main>
</template>

<script
    lang="ts"
    setup>
    import $style from '$fluxDashboard/css/component/Dashboard.module.scss';
</script>
