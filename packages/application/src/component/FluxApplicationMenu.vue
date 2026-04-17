<template>
    <aside :class="$style.applicationMenu">
        <slot/>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import $style from '$fluxApplication/css/component/ApplicationMenu.module.scss';
</script>
