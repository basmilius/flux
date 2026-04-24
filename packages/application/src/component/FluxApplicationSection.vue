<template>
    <section :class="$style.applicationSection">
        <header
            v-if="title || info || slots.end"
            :class="$style.applicationSectionHeader">
            <h2 v-if="title">
                {{ title }}
            </h2>

            <slot name="end"/>

            <span
                v-if="info"
                :class="$style.applicationSectionInfo">
                {{ info }}
            </span>
        </header>

        <div :class="$style.applicationSectionContent">
            <slot/>
        </div>
    </section>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '../css/component/ApplicationSection.module.scss';

    defineProps<{
        readonly title?: string;
        readonly info?: string;
    }>();

    const slots = defineSlots<{
        default(): VNode;
        end?(): VNode;
    }>();
</script>
