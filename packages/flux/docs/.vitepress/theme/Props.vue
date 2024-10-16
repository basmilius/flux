<template>
    <h2 id="props">Props</h2>

    <p v-for="({name, description, type, optional, default: defaultValue}) of props">
        <code><strong>{{ name }}</strong>{{ optional ? '?' : '' }}: {{ typeof type === 'string' ? type : type.join(' | ') }}</code>
        <template v-if="description">
            <br>
            {{ description }}
        </template>
        <template v-if="defaultValue">
            <br>
            <small><small><strong>Default: </strong><code>{{ defaultValue }}</code></small></small>
        </template>
    </p>
</template>

<script
    lang="ts"
    setup>
    import { useData } from 'vitepress';
    import { computed, unref } from 'vue';

    const {frontmatter} = useData();

    const props = computed(() => unref(frontmatter).props || []);
</script>
