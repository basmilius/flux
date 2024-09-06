<template>
    <div
        :class="styles.gridLines"
        :style="{
            '--size': `${size}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Visual.module.scss';

    const {
        size = 30
    } = defineProps<{
        readonly size: number;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
