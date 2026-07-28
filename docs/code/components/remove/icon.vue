<template>
    <div :style="{position: 'relative', width: '90px', height: '90px', background: 'var(--surface-sunken)', borderRadius: '9px'}">
        <FluxRemove icon="trash"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxRemove } from '@flux-ui/components';
</script>
