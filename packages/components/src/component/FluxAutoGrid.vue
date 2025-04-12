<template>
    <div
        :class="$style.autoGrid"
        :style="{
            gap: `${gap}px`,
            '--min-column-width': minColumnWidth
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Layout.module.scss';

    const {
        gap = 30
    } = defineProps<{
        readonly gap?: number;
        readonly minColumnWidth: number;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
