<template>
    <div :class="styles.paneFooter">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Pane.module.scss';
</script>
