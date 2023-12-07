<template>
    <div :class="styles.paneGroup">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Pane.module.scss';
</script>
