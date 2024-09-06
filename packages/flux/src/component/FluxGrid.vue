<template>
    <div
        :class="styles.grid"
        :style="{
            '--gap': `${gap}px`,
            '--columns': columns
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Grid.module.scss';

    const {
        columns = 12,
        gap = 30
    } = defineProps<{
        readonly columns?: number;
        readonly gap?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
