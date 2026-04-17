<template>
    <div :class="$style.application">
        <slot name="menu"/>
        <slot/>
        <slot name="side"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$fluxApplication/css/component/Application.module.scss';
</script>
