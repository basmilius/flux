<template>
    <div :class="$style.formColumn">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Form.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
