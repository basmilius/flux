<template>
    <span
        aria-hidden="true"
        :class="$style.ping"
        :style="{
            '--ping-color': `var(--${color}-500)`,
            '--ping-size': `${size}px`,
            '--ping-duration': duration
        }"/>
</template>

<script
    lang="ts"
    setup>
    import $style from '~flux/visuals/css/component/Ping.module.scss';

    const {
        color = 'success',
        size = 9,
        duration = 1.4
    } = defineProps<{
        readonly color?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly size?: number;
        readonly duration?: number;
    }>();
</script>
