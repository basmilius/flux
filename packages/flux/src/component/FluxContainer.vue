<template>
    <div
        :class="$style.container"
        :style="{'--gutter': `${gutter}px`}">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Layout.module.scss';

    const {
        gutter = 30
    } = defineProps<{
        readonly gutter?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
