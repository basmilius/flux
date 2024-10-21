<template>
    <section :class="$style.apiSection">
        <h2 v-if="title">{{ title }}</h2>
        <div :class="$style.apiSectionContent">
            <slot/>
        </div>
    </section>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly title?: string;
    }

    defineProps<Props>();
</script>

<style
    lang="scss"
    module>
    .apiSection {
        display: flex;
        flex-flow: column;
        gap: 15px;
        font-size: 17px;
    }

    .apiSectionContent {
        display: flex;
        flex-flow: column;
    }

    .apiSection + .apiSection {
        margin-top: 30px;
    }
</style>
