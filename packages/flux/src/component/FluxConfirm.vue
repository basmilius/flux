<template>
    <FluxPane>
        <FluxPaneHeader
            :icon="confirm.icon"
            :title="confirm.title"/>

        <FluxPaneBody v-html="confirm.message"/>

        <FluxPaneFooter>
            <FluxSpacer/>

            <FluxSecondaryButton
                :label="translate('flux.cancel')"
                @click="confirm.onCancel()"/>

            <FluxPrimaryButton
                icon-before="circle-check"
                :label="translate('flux.ok')"
                @click="confirm.onConfirm()"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { useTranslate } from '@/composable/private';
    import type { FluxConfirmSpec } from '@/data';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxPaneHeader from './FluxPaneHeader.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';

    export type Props = {
        readonly confirm: FluxConfirmSpec;
    };

    defineProps<Props>();

    const translate = useTranslate();
</script>
