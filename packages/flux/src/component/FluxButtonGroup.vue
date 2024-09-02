<template>
    <div :class="styles.buttonGroup">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Button.module.scss';
</script>
