<template>
    <div :class="$style.item">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '~flux/components/css/component/Item.module.scss';
</script>
