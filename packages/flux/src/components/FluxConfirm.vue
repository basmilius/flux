<template>
    <flux-pane class="flux-confirm">
        <flux-pane-header
            :icon="confirm.icon"
            :title="confirm.title"/>

        <flux-pane-body v-html="confirm.message"/>

        <flux-pane-footer>
            <flux-spacer/>
            <flux-secondary-button
                :label="translate('cancel')"
                @click="confirm.onCancel"/>
            <flux-primary-button
                :label="translate('ok')"
                @click="confirm.onConfirm"/>
        </flux-pane-footer>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import { FluxConfirmSpec } from '../data';
    import { useTranslate } from '../composables';
    import { FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer } from '.';

    export interface Props {
        readonly confirm: FluxConfirmSpec;
    }

    defineProps<Props>();

    const translate = useTranslate();
</script>

<style lang="scss">
    .flux-confirm {
        max-width: 540px;
        width: calc(100dvw - 90px);
    }
</style>
