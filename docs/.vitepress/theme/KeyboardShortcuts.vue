<template>
    <h2 id="keyboard-shortcuts">Keyboard shortcuts</h2>

    <ul>
        <li v-for="({key, action}) of shortcuts" :key="`${key}-${action}`">
            <code><strong>{{ key }}</strong></code>
            <br>
            {{ action }}
        </li>
    </ul>
</template>

<script
    lang="ts"
    setup>
    import { useData } from 'vitepress';
    import { computed, unref } from 'vue';

    const {frontmatter} = useData();

    const shortcuts = computed(() => unref(frontmatter).keyboardShortcuts || []);
</script>
