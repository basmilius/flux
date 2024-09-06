<template>
    <div :class="styles.faderItem">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Fader.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
