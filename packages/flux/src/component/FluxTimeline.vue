<template>
    <div
        :class="styles.timeline"
        role="feed">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Timeline.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
