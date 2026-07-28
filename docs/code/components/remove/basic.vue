<template>
    <div :style="{position: 'relative', width: '90px', height: '90px', background: 'var(--surface-sunken)', borderRadius: '9px'}">
        <FluxRemove @click="onRemove"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxRemove, showSnackbar } from '@flux-ui/components';

    function onRemove(): void {
        showSnackbar({
            icon: 'circle-check',
            message: 'The item was removed.'
        });
    }
</script>
