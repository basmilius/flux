<template>
    <div
        :class="$style.menuPane"
        data-flux-menu-pane
        role="group"
        @keydown="onKeydown">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Menu.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();

    // Arrow keys must drive the embedded control (slider, coordinate picker, stepper) rather than the
    // menu's roving focus. FluxMenu skips this subtree via the `[data-flux-menu-pane]` selector, but its
    // <nav> keydown listener still fires on bubbling — stopping arrow keys here keeps it from calling
    // preventDefault on them. Escape and Tab deliberately keep bubbling so the menu can still close and
    // the focus trap keeps working.
    function onKeydown(evt: KeyboardEvent): void {
        if (evt.key.startsWith('Arrow')) {
            evt.stopPropagation();
        }
    }
</script>
