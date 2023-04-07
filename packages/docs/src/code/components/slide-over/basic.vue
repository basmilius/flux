<template>
    <flux-button-stack>
        <flux-secondary-button
            icon-before="clone"
            label="Open"
            @click="isSlideOverOpened = true"/>
    </flux-button-stack>

    <flux-slide-over>
        <flux-pane v-if="isSlideOverOpened">
            <flux-pane-header title="Slide over">
                <flux-secondary-button
                    icon-before="xmark"
                    @click="isSlideOverOpened = false"/>
            </flux-pane-header>

            <flux-pane-body>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae dolore et ex facere itaque iusto labore minima, neque repellat sint vitae. Adipisci aliquid deserunt ea itaque laudantium quaerat sequi!</p>
                <p>Atque beatae delectus dolor ducimus eius officiis reprehenderit! Accusamus accusantium ex laudantium libero magnam minus numquam odio pariatur, perferendis quisquam veritatis voluptates. Aperiam, autem temporibus! Dolore harum nesciunt odit rem.</p>
                <p>Assumenda error illum, necessitatibus nihil provident ratione repellat repudiandae vero. Eius eveniet ex hic id incidunt molestiae perspiciatis quaerat quidem sed ullam. Aut cumque delectus laborum minima sunt voluptas voluptatibus?</p>
            </flux-pane-body>

            <flux-pane-footer>
                <flux-secondary-button
                    label="Close"
                    @click="isSlideOverOpened = false"/>

                <flux-spacer/>

                <flux-primary-button
                    icon-before="circle-check"
                    label="Save"
                    @click="isSlideOverOpened = false"/>
            </flux-pane-footer>
        </flux-pane>
    </flux-slide-over>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSlideOver, FluxSpacer } from '@fancee/flux';
    import { ref } from 'vue';

    const isSlideOverOpened = ref(false);
</script>
