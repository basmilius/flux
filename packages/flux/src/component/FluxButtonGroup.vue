<template>
    <div :class="$style.buttonGroup">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Button.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
