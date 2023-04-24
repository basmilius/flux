<template>
    <section class="api-section">
        <h2 v-if="title">{{ title }}</h2>
        <div class="api-section-content">
            <slot/>
        </div>
    </section>
</template>

<script lang="ts" setup>
    export interface Props {
        readonly title?: string;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .api-section {
        display: flex;
        flex-flow: column;
        gap: 15px;
        font-size: 17px;

        &-content {
            display: flex;
            flex-flow: column;
        }
    }

    .api-section + .api-section {
        margin-top: 30px;
    }
</style>
