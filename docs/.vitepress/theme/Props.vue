<template>
    <h2 id="props">Props</h2>

    <p v-for="({name, description, type, optional, default: defaultValue}) of props">
        <template v-if="typeof type === 'string'">
            <code><strong>{{ name }}</strong>{{ optional ? '?' : '' }}: {{ type }}</code>
        </template>

        <template v-else-if="Array.isArray(type)">
            <code><strong>{{ name }}</strong>{{ optional ? '?' : '' }}: {{ type.map(String).join(' | ') }}</code>
        </template>

        <template v-else>
            <code>
                <strong>{{ name }}</strong>{{ optional ? '?' : '' }}: {<br>
                    <template v-for="(value, key) in type">
                        &nbsp;&nbsp;&nbsp;&nbsp;readonly {{ key }}: {{ value }};<br>
                    </template>
                }
            </code>
        </template>

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
