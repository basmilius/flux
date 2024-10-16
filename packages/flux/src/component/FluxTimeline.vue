<template>
    <div
        :class="$style.timeline"
        role="feed">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Timeline.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
