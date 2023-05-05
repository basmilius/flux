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
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxPaneHeader from './FluxPaneHeader.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';

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
