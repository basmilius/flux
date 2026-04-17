<template>
    <FluxApplication>
        <template #menu>
            <FluxApplicationMenu>
                <FluxMenu>
                    <FluxMenuGroup is-horizontal>
                        <FluxApplicationMenuAccount
                            image-alt="Logo"
                            image-src="https://assets.passly.nl/brand/2026/symbol-primary.svg"
                            label="Acme Inc.">
                            <template #switcher>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            v-for="i of 5"
                                            :label="`Account ${i}`">
                                            <template #before>
                                                <FluxAvatar
                                                    alt="Bas"
                                                    src="https://avatars.githubusercontent.com/u/978257?v=4"
                                                    status="success"/>
                                            </template>
                                        </FluxMenuItem>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </template>
                        </FluxApplicationMenuAccount>

                        <FluxMenuItem
                            icon-leading="square"
                            style="flex-grow: 0"/>
                    </FluxMenuGroup>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="grid-2"
                            label="Dashboard"/>

                        <FluxMenuItem
                            icon-leading="calendar"
                            label="Evenementen"/>

                        <FluxMenuItem
                            icon-leading="receipt"
                            label="Bestellingen"/>

                        <FluxMenuItem
                            icon-leading="user"
                            label="Klanten"/>
                    </FluxMenuGroup>

                    <FluxSpacer/>

                    <FluxApplicationMenuPromo icon="rocket">
                        <strong>Passly is vernieuwd!</strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cumque dolore et illo iusto, porro ratione voluptatem.</p>
                        <router-link to="/app/events">Wat is er nieuw</router-link>
                    </FluxApplicationMenuPromo>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="gear"
                            label="Instellingen"/>
                    </FluxMenuGroup>

                    <FluxMenuGroup is-horizontal>
                        <FluxApplicationMenuAccount label="Bas Milius">
                            <template #avatar>
                                <FluxAvatar
                                    alt="Bas"
                                    src="https://avatars.githubusercontent.com/u/978257?v=4"
                                    status="success"/>
                            </template>
                        </FluxApplicationMenuAccount>

                        <FluxMenuItem
                            icon-leading="circle-question"
                            style="flex-grow: 0"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxApplicationMenu>
        </template>

        <FluxApplicationContent>
            <FluxStack>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto eos ipsa nam necessitatibus nemo porro ratione, ut velit? Accusantium amet assumenda deleniti impedit laboriosam magni non quas soluta tenetur vitae!</p>

                <FluxButtonStack>
                    <FluxPrimaryButton
                        icon-leading="circle-check"
                        label="Opslaan"/>

                    <FluxSecondaryButton
                        icon-leading="circle-check"
                        label="Opslaan"/>

                    <FluxSecondaryButton icon-leading="circle-check"/>
                </FluxButtonStack>
            </FluxStack>
        </FluxApplicationContent>
    </FluxApplication>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxButtonStack, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStack } from '@flux-ui/components';
    import FluxApplication from './FluxApplication.vue';
    import FluxApplicationContent from './FluxApplicationContent.vue';
    import FluxApplicationMenu from './FluxApplicationMenu.vue';
    import FluxApplicationMenuAccount from './FluxApplicationMenuAccount.vue';
    import FluxApplicationMenuPromo from './FluxApplicationMenuPromo.vue';
</script>
