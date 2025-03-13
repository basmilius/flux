<template>
    <FluxPane>
        <FluxPaneHeader
            :icon="alert.icon"
            :title="alert.title"/>

        <FluxPaneBody v-html="alert.message"/>

        <FluxPaneFooter>
            <FluxSpacer/>

            <FluxPrimaryButton
                icon-leading="circle-check"
                :label="translate('flux.ok')"
                @click="alert.onClose()"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { useTranslate } from '$flux/composable/private';
    import type { FluxAlertObject } from '$flux/types';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxPaneHeader from './FluxPaneHeader.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';

    defineProps<{
        readonly alert: FluxAlertObject;
    }>();

    const translate = useTranslate();
</script>
