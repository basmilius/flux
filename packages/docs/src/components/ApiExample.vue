<template>
    <div class="api-example">
        <Component :is="titleTag!">{{ title }}</Component>
        <p v-if="description">{{ description }}</p>

        <CodePreview
            v-if="!!component"
            :code="code.toString()"
            :component="component"/>

        <CodePreview
            v-else
            html
            :code="code.toString()"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import CodePreview from './CodePreview.vue';

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
