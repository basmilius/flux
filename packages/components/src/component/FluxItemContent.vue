<template>
    <div :class="$style.itemContent">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Item.module.scss';
</script>
