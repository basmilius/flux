<template>
    <FluxSecondaryButton
        :icon-leading="icon"
        :label="label"
        @click="onExport()"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton, showSnackbar } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';

    const {label = 'Export', icon = 'download'} = defineProps<{
        readonly label?: string;
        readonly icon?: FluxIconName;
    }>();

    function onExport(): void {
        showSnackbar({icon: 'download', message: 'Exporting is not available in this demo.'});
    }
</script>
