<template>
    <div :class="$style.faderItem">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Fader.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
