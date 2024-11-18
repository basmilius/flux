<template>
    <h2 id="slots">Slots</h2>

    <p v-for="({name, description, type}) of slots">
        <code>
            <strong>{{ name }}</strong>
            <template v-if="type">
                ({
                    <br>

                    <template v-for="(value, key) in type">
                        <template v-if="value.startsWith('(')">
                            &nbsp;&nbsp;&nbsp;&nbsp;{{ key }}{{ value }};<br>
                        </template>

                        <template v-else>
                            &nbsp;&nbsp;&nbsp;&nbsp;readonly {{ key }}: {{ value }};<br>
                        </template>
                    </template>
                })
            </template>
        </code>
        <template v-if="description">
            <br>
            {{ description }}
        </template>
    </p>
</template>

<script
    lang="ts"
    setup>
    import { useData } from 'vitepress';
    import { computed, unref } from 'vue';

    const {frontmatter} = useData();

    const slots = computed(() => unref(frontmatter).slots || []);
</script>
