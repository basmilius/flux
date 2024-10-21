<template>
    <FluxButtonStack>
        <FluxSecondaryButton
            icon-before="arrow-left-to-line"
            label="Open"
            @click="isSlideOverOpened = true"/>
    </FluxButtonStack>

    <FluxSlideOver>
        <FluxPane v-if="isSlideOverOpened">
            <FluxPaneHeader title="Slide over">
                <FluxSecondaryButton
                    icon-before="xmark"
                    @click="isSlideOverOpened = false"/>
            </FluxPaneHeader>

            <FluxPaneBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae dolore et ex facere itaque iusto labore minima, neque repellat sint vitae. Adipisci aliquid deserunt ea itaque laudantium quaerat sequi!</p>
                <p>Atque beatae delectus dolor ducimus eius officiis reprehenderit! Accusamus accusantium ex laudantium libero magnam minus numquam odio pariatur, perferendis quisquam veritatis voluptates. Aperiam, autem temporibus! Dolore harum nesciunt odit rem.</p>
                <p>Assumenda error illum, necessitatibus nihil provident ratione repellat repudiandae vero. Eius eveniet ex hic id incidunt molestiae perspiciatis quaerat quidem sed ullam. Aut cumque delectus laborum minima sunt voluptas voluptatibus?</p>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Close"
                    @click="isSlideOverOpened = false"/>

                <FluxSpacer/>

                <FluxPrimaryButton
                    icon-before="circle-check"
                    label="Save"
                    @click="isSlideOverOpened = false"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxSlideOver>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSlideOver, FluxSpacer } from '@basmilius/flux';
    import { ref } from 'vue';

    const isSlideOverOpened = ref(false);
</script>
