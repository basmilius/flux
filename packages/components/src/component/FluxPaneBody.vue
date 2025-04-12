<template>
    <div :class="$style.paneBody">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Pane.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
