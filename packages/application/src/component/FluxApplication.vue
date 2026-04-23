<template>
    <div :class="$style.application">
        <slot name="menu"/>

        <div :class="$style.applicationBody">
            <slot/>
        </div>

        <slot name="side"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { provide, ref, type VNode } from 'vue';
    import { FluxApplicationInjectionKey, type FluxApplicationLayout } from '../data';
    import $style from '../css/component/Application.module.scss';

    defineSlots<{
        default(): VNode[];
        menu(): VNode[];
        side(): VNode[];
    }>();

    const isMenuCollapsed = ref(true);
    const layout = ref<FluxApplicationLayout>('default');

    provide(FluxApplicationInjectionKey, {
        isMenuCollapsed,
        layout
    });
</script>
