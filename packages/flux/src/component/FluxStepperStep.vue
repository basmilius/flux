<template>
    <div :class="$style.stepperStep">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Stepper.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
