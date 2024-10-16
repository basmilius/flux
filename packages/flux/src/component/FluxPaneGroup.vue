<template>
    <div :class="$style.paneGroup">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Pane.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
