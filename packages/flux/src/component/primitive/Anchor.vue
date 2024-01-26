<template>
    <component :is="tagName">
        <slot/>
    </component>
</template>

<script
    lang="ts"
    setup>
    defineProps<{
        readonly tagName: keyof HTMLElementTagNameMap;
    }>();
</script>
