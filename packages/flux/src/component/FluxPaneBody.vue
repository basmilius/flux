<template>
    <div :class="styles.paneBody">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Pane.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
