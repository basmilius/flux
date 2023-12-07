<template>
    <VNodeRenderer
        v-if="vnode"
        :vnode="vnode"/>
</template>

<script
    setup
    lang="ts">
    import { VNode } from 'vue';
    import { VNodeRenderer } from '@/components/primitive';

    export interface Props {
        readonly vnode?: VNode;
    }

    defineProps<Props>();
</script>
