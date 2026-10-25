<template>
    <div :data-react-example="example" :data-react-state="error ? 'error' : ready ? 'ready' : 'loading'" style="display: contents" data-flux>
        <div ref="container" style="display: contents"/>
        <p v-if="error" role="alert">This React example could not render: {{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
    import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';

    const {example, bare = false} = defineProps<{
        readonly example: string;
        readonly bare?: boolean;
    }>();

    const container = useTemplateRef<HTMLDivElement>('container');
    const error = ref('');
    const ready = ref(false);
    let dispose: (() => void) | undefined;
    let cancelled = false;

    onMounted(async () => {
        try {
            const {mountExample} = await import('../react/runtime.tsx');
            if (cancelled || !container.value) return;
            const unmount = await mountExample(container.value, example, message => error.value = message, bare);
            if (cancelled) unmount();
            else {
                dispose = unmount;
                ready.value = true;
            }
        } catch (cause) {
            error.value = cause instanceof Error ? cause.message : String(cause);
        }
    });

    onBeforeUnmount(() => {
        cancelled = true;
        dispose?.();
    });
</script>

