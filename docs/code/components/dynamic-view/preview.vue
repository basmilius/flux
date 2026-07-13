<template>
    <Preview>
        <FluxDynamicView :vnode="vnode"/>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxDynamicView, FluxSecondaryButton } from '@flux-ui/components';
    import { h } from 'vue';

    const vnode = h(FluxSecondaryButton, {
        label: 'Rendered from a VNode'
    });
</script>
