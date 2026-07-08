<template>
    <FluxNotice
        v-if="isVisible"
        color="info"
        icon="circle-info"
        message="You can dismiss this notice when you're done reading it."
        is-closeable
        @close="onClose"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice } from '@flux-ui/components';
    import { onBeforeUnmount, ref } from 'vue';

    const isVisible = ref(true);

    let timeout: ReturnType<typeof setTimeout>;

    function onClose(): void {
        isVisible.value = false;
        timeout = setTimeout(() => isVisible.value = true, 3000);
    }

    onBeforeUnmount(() => clearTimeout(timeout));
</script>
