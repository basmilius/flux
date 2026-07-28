<template>
    <Preview>
        <div class="frame">
            <div
                ref="scroller"
                class="scroller">
                <p>Scroll this panel to reveal the button in the corner.</p>

                <p
                    v-for="index of 30"
                    :key="index">
                    Release note {{ index }} with a short summary of what changed.
                </p>
            </div>

            <FluxBackToTop
                :offset="60"
                :target="scroller"/>
        </div>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxBackToTop } from '@flux-ui/components';
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
