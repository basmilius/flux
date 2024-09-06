<template>
    <div :class="styles.stepperStep">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Stepper.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
