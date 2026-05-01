<template>
    <div :class="$style.statisticsLegend">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '~flux/statistics/css/Legend.module.scss';
</script>
