<template>
    <flux-overlay
        is-closeable
        size="large"
        @close="isOverlayVisible = false">
        <flux-pane v-if="isOverlayVisible">
            <flux-pane-body>
                <h2>Overlay</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur, consequuntur debitis eligendi eum magnam necessitatibus nulla perferendis sequi voluptate. Aut consequatur ducimus, quaerat quos ratione sequi veniam? Quis, rem.</p>
                <p>Alias dolorum laboriosam pariatur qui ut. Debitis distinctio expedita impedit ipsam voluptatem? Asperiores assumenda dolorem ducimus earum nam placeat ut velit. Ab debitis dicta in itaque quos ut veritatis voluptatum.</p>
                <p>Ducimus nemo officiis, quas saepe sequi tempora unde! Debitis dolores eos exercitationem itaque laboriosam magni nam, neque officiis, pariatur quis ratione recusandae reiciendis repudiandae tempore temporibus veritatis vero, voluptates? Earum?</p>
            </flux-pane-body>

            <flux-pane-footer>
                <flux-spacer/>

                <flux-secondary-button
                    label="Close"
                    @click="isOverlayVisible = false"/>
            </flux-pane-footer>
        </flux-pane>
    </flux-overlay>

    <flux-secondary-button
        icon-before="clone"
        label="Toggle overlay"
        @click="isOverlayVisible = !isOverlayVisible"/>
</template>

<script lang="ts">
    export const enabled = true;
</script>

<script
    lang="ts"
    setup>
    import { FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxSecondaryButton, FluxSpacer } from '@fancee/flux';
    import { ref } from 'vue';

    const isOverlayVisible = ref(false);
</script>
