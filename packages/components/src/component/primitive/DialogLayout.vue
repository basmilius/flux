<template>
    <FluxPane>
        <FluxPaneHeader
            :icon="icon"
            :title="title"/>

        <FluxPaneBody
            v-if="message"
            v-html="message"/>

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
    import type { VNode } from 'vue';
    import type { FluxIconName } from '@flux-ui/types';
    import FluxPane from '../FluxPane.vue';
    import FluxPaneBody from '../FluxPaneBody.vue';
    import FluxPaneFooter from '../FluxPaneFooter.vue';
    import FluxPaneHeader from '../FluxPaneHeader.vue';
    import FluxSpacer from '../FluxSpacer.vue';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly message?: string;
        readonly title: string;
    }>();

    defineSlots<{
        default?(): VNode[];
        footer(): VNode[];
    }>();
</script>
