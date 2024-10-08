<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Overlay"/>

        <FluxOverlay
            is-closeable
            size="medium"
            @close="isOverlayVisible = false">
            <FluxPane v-if="isOverlayVisible">
                <FluxPaneBody>
                    <h2>Overlay</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur, consequuntur debitis eligendi eum magnam necessitatibus nulla perferendis sequi voluptate. Aut consequatur ducimus, quaerat quos ratione sequi veniam? Quis, rem.</p>
                    <p>Alias dolorum laboriosam pariatur qui ut. Debitis distinctio expedita impedit ipsam voluptatem? Asperiores assumenda dolorem ducimus earum nam placeat ut velit. Ab debitis dicta in itaque quos ut veritatis voluptatum.</p>
                    <p>Ducimus nemo officiis, quas saepe sequi tempora unde! Debitis dolores eos exercitationem itaque laboriosam magni nam, neque officiis, pariatur quis ratione recusandae reiciendis repudiandae tempore temporibus veritatis vero, voluptates? Earum?</p>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSpacer/>

                    <FluxSecondaryButton
                        label="Close"
                        @click="isOverlayVisible = false"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxOverlay>

        <FluxOverlay>
            <FluxPane v-if="isReAuthenticateVisible">
                <FluxPaneBody
                    :gap="27"
                    is-content-centered
                    is-larger-padded>
                    <FluxIcon
                        :size="30"
                        variant="lock"
                        style="color: rgb(var(--danger-7))"/>

                    <div>
                        <h2>You've been signed out.</h2>
                        <p>To continue using your account, please sign in again using your password.</p>
                    </div>
                </FluxPaneBody>

                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormField label="E-mail">
                            <FluxFormInput
                                is-disabled
                                is-readonly
                                model-value="bas@tibbaa.com"
                                type="email"/>
                        </FluxFormField>

                        <FluxFormField label="Password">
                            <FluxFormInput type="password"/>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxButtonStack
                        axis="vertical"
                        is-fill>
                        <FluxPrimaryButton
                            icon-after="circle-arrow-right"
                            label="Sign in"
                            @click="isReAuthenticateVisible = false"/>

                        <FluxSecondaryButton
                            label="Cancel"
                            @click="isReAuthenticateVisible = false"/>
                    </FluxButtonStack>
                </FluxPaneFooter>
            </FluxPane>
        </FluxOverlay>

        <Preview>
            <FluxButtonStack>
                <FluxSecondaryButton
                    icon-before="clone"
                    label="Overlay"
                    @click="isOverlayVisible = !isOverlayVisible"/>

                <FluxSecondaryButton
                    icon-before="lock"
                    label="Re-authenticate"
                    @click="isReAuthenticateVisible = !isReAuthenticateVisible"/>
            </FluxButtonStack>
        </Preview>

        <ApiSection>
            <p>
                Overlays can be used to reveal larger contents or options that are hidden behind a button or a
                similar component. The content is animated on top of the document and the rest of the interface
                is blocked.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Overlay">
                <template #props>
                    <tr>
                        <td><code>is-closeable</code><code>boolean</code></td>
                        <td>Enables the escape key and the close event for the overlay.</td>
                    </tr>
                    <tr>
                        <td><code>size</code><code>'small' | 'medium' | 'large'</code></td>
                        <td>Sets the size of the overlay window. Requires that the child of the Overlay is a Pane.</td>
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
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxFormColumn, FluxFormField, FluxFormInput, FluxIcon, FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
    import { ref } from 'vue';

    const isOverlayVisible = ref(false);
    const isReAuthenticateVisible = ref(false);
</script>
