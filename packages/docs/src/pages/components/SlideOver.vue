<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Slide over"/>

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

        <preview>
            <flux-secondary-button
                icon-before="arrow-left-to-line"
                label="Slide over"
                @click="isSlideOverOpened = true"/>
        </preview>

        <api-section>
            <p>
                A slide over is a modal-like interface that slides in from the side of the view to display
                additional content or options. It typically allows users to easily access important information
                without disrupting their current workflow. Slide overs are mostly used to reveal opions for
                an entity.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="SlideOver">
                <template #props>
                    <tr>
                        <td><code>is-closeable</code><code>boolean</code></td>
                        <td>Enables the escape key and the close event for the slide over.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>close</code><code>(): void;</code></td>
                        <td>Triggered when the escape key is pressed.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Content of the slide over.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic slide over with some content."/>

            <api-example
                :code="tabsCode"
                :component="tabs"
                title="Tabs"
                description="A slide over with tabs."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSlideOver, FluxSpacer, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '../../code/components/slideOver/basic.vue';
    import basicCode from '../../code/components/slideOver/basic.vue?raw';
    import tabs from '../../code/components/slideOver/tabs.vue';
    import tabsCode from '../../code/components/slideOver/tabs.vue?raw';

    const isSlideOverOpened = ref(false);
</script>
