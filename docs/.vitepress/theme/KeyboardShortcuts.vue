<template>
    <h2 id="keyboard-shortcuts">Keyboard shortcuts</h2>

    <p v-for="({key, action}) of shortcuts">
        <code><strong>{{ key }}</strong></code>
        <br>
        {{ action }}
    </p>
</template>

<script
    lang="ts"
    setup>
    import { useData } from 'vitepress';
    import { computed, unref } from 'vue';

    const {frontmatter} = useData();

    const shortcuts = computed(() => unref(frontmatter).keyboardShortcuts || []);
</script>
