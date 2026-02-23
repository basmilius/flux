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
    import $style from '$flux/css/component/Layout.module.scss';

    const {
        gutter = 21
    } = defineProps<{
        readonly gutter?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
