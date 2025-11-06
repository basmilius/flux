<template>
    <VNodeRenderer
        v-if="vnode"
        :vnode="vnode"/>
</template>

<script
    setup
    lang="ts">
    import type { VNode } from 'vue';
    import { VNodeRenderer } from './primitive';

    defineProps<{
        readonly vnode?: VNode;
    }>();
</script>
