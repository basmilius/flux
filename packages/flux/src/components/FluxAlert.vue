<template>
    <flux-pane class="flux-alert">
        <flux-pane-header
            :icon="alert.icon"
            :title="alert.title"/>

        <flux-pane-body v-html="alert.message"/>

        <flux-pane-footer>
            <flux-spacer/>
            <flux-primary-button
                :label="translate('flux_ok')"
                @click="alert.onClose"/>
        </flux-pane-footer>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import type { FluxAlertSpec } from '../data';
    import { useTranslate } from '../composables';
    import { FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSpacer } from '.';

    export interface Props {
        readonly alert: FluxAlertSpec;
    }

    defineProps<Props>();

    const translate = useTranslate();
</script>

<style lang="scss">
    @layer component {
        .flux-alert {
            max-width: 540px;
            width: calc(100dvw - 90px);
        }
    }
</style>
