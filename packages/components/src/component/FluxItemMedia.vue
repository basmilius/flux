<template>
    <div :class="$style.itemMedia">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Item.module.scss';
</script>
