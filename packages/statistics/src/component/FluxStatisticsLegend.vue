<template>
    <div :class="$style.statisticsLegend">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$fluxStatistics/css/Legend.module.scss';
</script>
