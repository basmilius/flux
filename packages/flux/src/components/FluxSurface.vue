<template>
    <div :class="styles.surface">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/base/Surface.module.scss';
</script>
