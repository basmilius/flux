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
    import type { FluxAlertObject } from '@flux-ui/types';
    import { useTranslate } from '$flux/composable/private';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import { DialogLayout } from './primitive';

    defineProps<{
        readonly alert: FluxAlertObject;
    }>();

    const translate = useTranslate();
</script>
