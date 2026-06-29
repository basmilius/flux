<template>
    <FluxPane>
        <FluxPaneHeader
            :icon="icon"
            :title="title"/>

        <FluxPaneBody v-if="message">
            {{ message }}
        </FluxPaneBody>

        <FluxPaneBody v-if="$slots.default">
            <slot/>
        </FluxPaneBody>

        <FluxPaneFooter>
            <FluxSpacer/>

            <slot name="footer"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { inject, type VNode, watchEffect } from 'vue';
    import { FluxDialogInjectionKey } from '~flux/components/util';
    import FluxPane from '../FluxPane.vue';
    import FluxPaneBody from '../FluxPaneBody.vue';
    import FluxPaneFooter from '../FluxPaneFooter.vue';
    import FluxPaneHeader from '../FluxPaneHeader.vue';
    import FluxSpacer from '../FluxSpacer.vue';

    const {
        title
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly message?: string;
        readonly title: string;
    }>();

    defineSlots<{
        default?(): VNode[];
        footer(): VNode[];
    }>();

    const dialog = inject(FluxDialogInjectionKey, null);

    watchEffect(() => {
        if (dialog) {
            dialog.label.value = title;
        }
    });
</script>
