<template>
    <div :class="$style.formRow">
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
