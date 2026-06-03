<template>
    <VNodeRenderer
        v-if="vnode"
        :vnode="vnode"/>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import { VNodeRenderer } from './primitive';

    defineProps<{
        readonly vnode?: VNode;
    }>();
</script>
