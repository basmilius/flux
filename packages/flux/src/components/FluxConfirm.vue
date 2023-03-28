<template>
    <flux-pane class="flux-confirm">
        <flux-pane-header
            :icon="confirm.icon"
            :title="confirm.title"/>

        <flux-pane-body v-html="confirm.message"/>

        <flux-pane-footer>
            <flux-spacer/>
            <flux-secondary-button
                :label="translate('flux_cancel')"
                @click="confirm.onCancel"/>
            <flux-primary-button
                :label="translate('flux_ok')"
                @click="confirm.onConfirm"/>
        </flux-pane-footer>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import type { FluxConfirmSpec } from '../data';
    import { useTranslate } from '../composables';
    import { FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer } from '.';

    export interface Props {
        readonly confirm: FluxConfirmSpec;
    }

    defineProps<Props>();

    const translate = useTranslate();
</script>

<style lang="scss">
    @layer component {
        .flux-confirm {
            max-width: 540px;
            width: calc(100dvw - 90px);
        }
    }
</style>
