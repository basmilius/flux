<template>
    <div
        :class="$style.menuPane"
        data-flux-menu-pane
        role="group"
        @keydown="onMenuPaneKeydown">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import { onMenuPaneKeydown } from '~flux/components/composable/private';
    import $style from '~flux/components/css/component/Menu.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
