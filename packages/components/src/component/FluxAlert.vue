<template>
    <DialogLayout
        :icon="alert.icon"
        :message="alert.message"
        :title="alert.title">
        <template #footer>
            <FluxPrimaryButton
                icon-leading="circle-check"
                :label="translate('flux.ok')"
                @click="alert.onClose()"/>
        </template>
    </DialogLayout>
</template>

<script
    lang="ts"
    setup>
    import { useTranslate } from '@flux-ui/internals';
    import type { FluxAlertObject } from '@flux-ui/types';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import { DialogLayout } from './primitive';

    defineProps<{
        readonly alert: FluxAlertObject;
    }>();

    const translate = useTranslate();
</script>
