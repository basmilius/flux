<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Overlay"/>

        <preview>
            <flux-overlay
                is-closeable
                @close="isOverlayVisible = false">
                <flux-pane
                    v-if="isOverlayVisible"
                    style="width: 540px;">
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
                label="Overlay"
                @click="isOverlayVisible = !isOverlayVisible"/>
        </preview>

        <api-section>
            <p>
                Overlays can be used to reveal larger contents or options that are hidden behind a button or a
                similar component. The content is animated on top of the document and the rest of the interface
                is blocked.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="Overlay">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the overlay. For the best result, use a FluxPane with a v-if to control its visibility.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxSecondaryButton, FluxSpacer, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
    import { ref } from 'vue';

    const isOverlayVisible = ref(false);
</script>
