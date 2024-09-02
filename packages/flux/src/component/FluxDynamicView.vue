<template>
    <VNodeRenderer
        v-if="vnode"
        :vnode="vnode"/>
</template>

<script
    setup
    lang="ts">
    import { VNode } from 'vue';
    import { VNodeRenderer } from './primitive';

    export type Props = {
        readonly vnode?: VNode;
    };

    defineProps<Props>();
</script>
