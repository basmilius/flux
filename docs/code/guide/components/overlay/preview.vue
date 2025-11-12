<template>
    <Preview>
        <FluxSecondaryButton
            icon-leading="copy"
            label="Open overlay"
            @click="isOpen = true"/>
    </Preview>

    <FluxOverlay size="medium">
        <FluxPane v-if="isOpen">
            <FluxPaneHeader title="Overlay"/>

            <FluxPaneBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur, consequuntur debitis eligendi eum magnam necessitatibus nulla perferendis sequi voluptate. Aut consequatur ducimus, quaerat quos ratione sequi veniam? Quis, rem.</p>
                <p>Alias dolorum laboriosam pariatur qui ut. Debitis distinctio expedita impedit ipsam voluptatem? Asperiores assumenda dolorem ducimus earum nam placeat ut velit. Ab debitis dicta in itaque quos ut veritatis voluptatum.</p>
                <p>Ducimus nemo officiis, quas saepe sequi tempora unde! Debitis dolores eos exercitationem itaque laboriosam magni nam, neque officiis, pariatur quis ratione recusandae reiciendis repudiandae tempore temporibus veritatis vero, voluptates? Earum?</p>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Close"
                    @click="isOpen = false"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxOverlay>
</template>

<script
    setup
    lang="ts">
    import { FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isOpen = ref(false);
</script>
