<template>
    <DialogLayout
        :icon="confirm.icon"
        :message="confirm.message"
        :title="confirm.title">
        <template #footer>
            <FluxSecondaryButton
                :label="translate('flux.cancel')"
                @click="confirm.onCancel()"/>

            <FluxPrimaryButton
                icon-leading="circle-check"
                :label="translate('flux.ok')"
                @click="confirm.onConfirm()"/>
        </template>
    </DialogLayout>
</template>

<script
    lang="ts"
    setup>
    import type { FluxConfirmObject } from '@flux-ui/types';
    import { useTranslate } from '$flux/composable/private';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import { DialogLayout } from './primitive';

    defineProps<{
        readonly confirm: FluxConfirmObject;
    }>();

    const translate = useTranslate();
</script>
