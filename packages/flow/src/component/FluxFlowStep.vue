<template>
    <div :class="$style.flowStep">
        {{ value }}
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '~flux/flow/css/component/FlowStep.module.scss';

    defineProps<{
        readonly value: number | string;
    }>();
</script>
