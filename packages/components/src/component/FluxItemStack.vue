<template>
    <FluxStack
        :class="$style.itemStack"
        :gap="0">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import FluxStack from './FluxStack.vue';
    import $style from '$flux/css/component/Item.module.scss';
</script>
