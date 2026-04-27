<template>
    <header :class="$style.applicationHero">
        <slot name="start"/>

        <div :class="$style.applicationHeroBody">
            <slot name="before"/>

            <h1>{{ title }}</h1>

            <p
                v-if="subtitle"
                :class="$style.applicationHeroSubtitle">
                {{ subtitle }}
            </p>

            <slot name="after"/>
        </div>

        <slot name="end"/>
    </header>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '../css/component/ApplicationHero.module.scss';

    defineProps<{
        readonly title: string;
        readonly subtitle?: string;
    }>();

    defineSlots<{
        after?(): VNode[];
        before?(): VNode[];
        end?(): VNode[];
        start?(): VNode[];
    }>();
</script>
