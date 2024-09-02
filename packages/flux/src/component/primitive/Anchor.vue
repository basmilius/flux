<template>
    <component :is="tagName">
        <slot/>
    </component>
</template>

<script
    lang="ts"
    setup>
    export type Props = {
        readonly tagName: keyof HTMLElementTagNameMap;
    };

    defineProps<Props>();
</script>
