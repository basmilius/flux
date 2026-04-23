<template>
    <div :class="$style.stepperStep">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Stepper.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
