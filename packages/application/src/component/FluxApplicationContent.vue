<template>
    <main :class="$style.applicationContent">
        <slot/>
    </main>
</template>

<script
    lang="ts"
    setup>
    import $style from '$fluxApplication/css/component/ApplicationContent.module.scss';
</script>
