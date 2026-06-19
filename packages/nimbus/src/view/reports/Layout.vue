<template>
    <RouterView/>
</template>

<script
    lang="ts"
    setup>
    import { RouterView } from 'vue-router';
    import { defineTitle } from '@/composable';

    defineTitle('chart-line', 'Reports');
</script>
