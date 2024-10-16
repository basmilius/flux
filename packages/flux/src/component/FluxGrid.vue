<template>
    <div
        :class="$style.grid"
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
    import $style from '@/css/component/Grid.module.scss';

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
