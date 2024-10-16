<template>
    <div :class="$style.formColumn">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Form.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
