<template>
    <div class="api-example">
        <component :is="titleTag">{{ title }}</component>
        <p v-if="description">{{ description }}</p>

        <code-preview
            v-if="!!component"
            :code="code.toString()"
            :component="component"/>

        <code-preview
            v-else
            html
            :code="code.toString()"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { CodePreview } from '.';

    export interface Props {
        readonly code: any;
        readonly component?: any;
        readonly description?: string;
        readonly title: string;
        readonly titleTag?: 'h2' | 'h3';
    }

    withDefaults(defineProps<Props>(), {
        titleTag: 'h3'
    });
</script>

<style lang="scss">
    .api-example {
        display: flex;
        flex-flow: column;
    }

    .api-example + .api-example {
        margin-top: 45px;
    }
</style>
