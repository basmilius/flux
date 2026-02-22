<template>
    <div :class="[$style.itemContent, isCenter && $style.isCenter]">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Item.module.scss';

    defineProps<{
        readonly isCenter?: boolean;
    }>();
</script>
