<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Overlay"/>

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

        <flux-overlay>
            <flux-pane
                v-if="isReAuthenticateVisible"
                style="width: 420px">
                <flux-pane-body
                    :gap="27"
                    is-content-centered
                    is-larger-padded>
                    <flux-icon
                        :size="30"
                        variant="lock"
                        style="color: rgb(var(--danger-7))"/>

                    <div>
                        <h2>You've been signed out.</h2>
                        <p>To continue using your account, please sign in again using your password.</p>
                    </div>
                </flux-pane-body>

                <flux-pane-body>
                    <flux-form-column>
                        <flux-form-field label="E-mail">
                            <flux-form-input
                                is-disabled
                                is-readonly
                                model-value="bas@tibbaa.com"
                                type="email"/>
                        </flux-form-field>

                        <flux-form-field label="Password">
                            <flux-form-input type="password"/>
                        </flux-form-field>
                    </flux-form-column>
                </flux-pane-body>

                <flux-pane-footer>
                    <flux-button-stack
                        axis="vertical"
                        is-fill>
                        <flux-primary-button
                            icon-after="circle-arrow-right"
                            label="Sign in"
                            @click="isReAuthenticateVisible = false"/>

                        <flux-secondary-button
                            label="Cancel"
                            @click="isReAuthenticateVisible = false"/>
                    </flux-button-stack>
                </flux-pane-footer>
            </flux-pane>
        </flux-overlay>

        <preview>
            <flux-button-stack>
                <flux-secondary-button
                    icon-before="clone"
                    label="Overlay"
                    @click="isOverlayVisible = !isOverlayVisible"/>

                <flux-secondary-button
                    icon-before="lock"
                    label="Re-authenticate"
                    @click="isReAuthenticateVisible = !isReAuthenticateVisible"/>
            </flux-button-stack>
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
                <template #props>
                    <tr>
                        <td><code>is-closeable</code><code>boolean</code></td>
                        <td>Enables the escape key and the close event for the overlay.</td>
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
    import { FluxButtonStack, FluxFormColumn, FluxFormField, FluxFormInput, FluxIcon, FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
    import { ref } from 'vue';

    const isOverlayVisible = ref(false);
    const isReAuthenticateVisible = ref(false);
</script>
