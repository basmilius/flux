<template>
    <header :class="$style.dashboardTopBar">
        <slot/>
    </header>
</template>

<script
    lang="ts"
    setup>
    import $style from '$fluxDashboard/css/component/Dashboard.module.scss';
</script>
