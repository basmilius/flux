<template>
    <div class="api-example">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <code-preview
            :code="code.toString()"
            :component="component"/>
    </div>
</template>

<script lang="ts" setup>
    import { CodePreview } from '.';

    export interface Props {
        readonly code: any;
        readonly component: any;
        readonly description: string;
        readonly title: string;
    }

    defineProps<Props>();
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
