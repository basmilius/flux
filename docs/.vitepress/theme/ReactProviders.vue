<template>
    <div ref="container"/>
</template>

<script lang="ts" setup>
    import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';

    const container = useTemplateRef<HTMLDivElement>('container');
    let dispose: (() => void) | undefined;
    let cancelled = false;

    onMounted(async () => {
        const {mountProviders} = await import('../react/runtime.tsx');
        if (!cancelled && container.value) dispose = mountProviders(container.value);
    });

    onBeforeUnmount(() => {
        cancelled = true;
        dispose?.();
    });
</script>
