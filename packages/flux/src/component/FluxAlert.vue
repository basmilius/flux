<template>
    <FluxPane>
        <FluxPaneHeader
            :icon="alert.icon"
            :title="alert.title"/>

        <FluxPaneBody v-html="alert.message"/>

        <FluxPaneFooter>
            <FluxSpacer/>

            <FluxPrimaryButton
                icon-before="circle-check"
                :label="translate('flux_ok')"
                @click="alert.onClose()"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { useTranslate } from '@/composable/private';
    import type { FluxAlertSpec } from '@/data';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxPaneHeader from './FluxPaneHeader.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';

    export interface Props {
        readonly alert: FluxAlertSpec;
    }

    defineProps<Props>();

    const translate = useTranslate();
</script>
