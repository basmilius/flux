<template>
    <FluxPane>
        <FluxPaneHeader
            :icon="confirm.icon"
            :title="confirm.title"/>

        <FluxPaneBody v-html="confirm.message"/>

        <FluxPaneFooter>
            <FluxSpacer/>

            <FluxSecondaryButton
                :label="translate('flux_cancel')"
                @click="confirm.onCancel"/>

            <FluxPrimaryButton
                icon-before="circle-check"
                :label="translate('flux_ok')"
                @click="confirm.onConfirm"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import type { FluxConfirmSpec } from '@/data';
    import { useTranslate } from '@/composables';
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
