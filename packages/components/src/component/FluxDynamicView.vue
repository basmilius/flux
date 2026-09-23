<template>
    <VNodeRenderer
        v-if="vnode"
        :vnode="vnode"/>
</template>

<script
    lang="ts"
    setup>
    import { VNodeRenderer } from '@flux-ui/internals';
    import type { VNode } from 'vue';

    defineProps<{
        readonly vnode?: VNode;
    }>();
</script>
