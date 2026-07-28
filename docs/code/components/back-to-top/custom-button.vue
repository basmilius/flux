<template>
    <div class="frame">
        <div
            ref="scroller"
            class="scroller">
            <p>Scroll this panel to reveal the custom button.</p>

            <p
                v-for="index of 30"
                :key="index">
                Release note {{ index }} with a short summary of what changed.
            </p>
        </div>

        <FluxBackToTop
            :offset="60"
            :target="scroller"
            #default="{cssClass, scrollToTop}">
            <FluxPrimaryButton
                :class="cssClass"
                icon-leading="arrow-up"
                label="Back to top"
                @click="scrollToTop"/>
        </FluxBackToTop>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxBackToTop, FluxPrimaryButton } from '@flux-ui/components';
    import { useTemplateRef } from 'vue';

    const scroller = useTemplateRef('scroller');
</script>

<style
    scoped
    lang="css">
    /* The transform makes the fixed button sit in this frame instead of the viewport. */
    .frame {
        position: relative;
        width: 100%;
        transform: translate(0);
    }

    .scroller {
        height: 300px;
        overflow-y: auto;
    }
</style>
