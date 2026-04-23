<template>
    <FluxApplication>
        <template #menu>
            <FluxApplicationMenu>
                <template #header>
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

                        <FluxApplicationMenuToggle/>
                    </FluxMenuGroup>
                </template>

                <template #footer>
                    <FluxApplicationMenuPromo icon="rocket">
                        <strong>Lorem ipsum dolor!</strong>
                        <p>Consectetur adipisicing elit. Adipisci cumque dolore et illo iusto, porro ratione voluptatem.</p>
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
                </template>

                <template
                    v-if="activeMenuItem === 4"
                    #context>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="heart"
                            label="Menu item"
                            @click="activeMenuItem = 0"/>

                        <FluxMenuItem
                            icon-leading="rocket"
                            label="Menu item"/>

                        <FluxMenuItem
                            icon-leading="circle-check"
                            label="Menu item"/>

                        <FluxMenuItem
                            icon-leading="circle-exclamation"
                            label="Menu item"/>
                    </FluxMenuGroup>
                </template>

                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="grid-2"
                        :is-active="activeMenuItem === 0"
                        label="Dashboard"
                        @click="activeMenuItem = 0"/>

                    <FluxMenuItem
                        icon-leading="calendar"
                        :is-active="activeMenuItem === 1"
                        label="Evenementen"
                        @click="activeMenuItem = 1"/>

                    <FluxMenuItem
                        icon-leading="receipt"
                        :is-active="activeMenuItem === 2"
                        label="Bestellingen"
                        @click="activeMenuItem = 2"/>

                    <FluxMenuItem
                        icon-leading="user"
                        :is-active="activeMenuItem === 3"
                        label="Klanten"
                        @click="activeMenuItem = 3"/>

                    <FluxMenuCollapsible
                        icon-leading="circle"
                        label="Collapsible">
                        <FluxMenuItem label="Menu item"/>
                        <FluxMenuItem label="Menu item"/>
                        <FluxMenuItem label="Menu item"/>
                    </FluxMenuCollapsible>

                    <FluxMenuCollapsible
                        icon-leading="circle"
                        label="Collapsible">
                        <FluxMenuItem label="Menu item"/>
                        <FluxMenuItem label="Menu item"/>
                        <FluxMenuItem label="Menu item"/>
                    </FluxMenuCollapsible>
                </FluxMenuGroup>

                <FluxDivider/>

                <FluxMenuGroup>
                    <FluxMenuSubHeader label="Group"/>

                    <FluxMenuItem
                        icon-leading="heart"
                        :is-active="activeMenuItem === 4"
                        label="Menu item"
                        @click="activeMenuItem = 4"/>

                    <FluxMenuItem
                        icon-leading="rocket"
                        label="Menu item"/>

                    <FluxMenuItem
                        icon-leading="circle-check"
                        label="Menu item"/>

                    <FluxMenuItem
                        icon-leading="circle-exclamation"
                        label="Menu item"/>
                </FluxMenuGroup>
            </FluxApplicationMenu>
        </template>

        <FluxApplicationTop
            icon="grid-2"
            title="Dashboard">
            <template #end>
                <FluxFormInputGroup
                    is-secondary
                    style="width: 24ch">
                    <FluxFormInputAddition icon="magnifying-glass"/>

                    <FluxFormInput
                        placeholder="Zoek naar..."
                        type="search"/>

                    <FluxFormInputAddition label="⌘K"/>
                </FluxFormInputGroup>

                <FluxButtonStack :gap="0">
                    <FluxSecondaryLinkButton
                        icon-leading="bell"
                        size="small"/>

                    <FluxSecondaryLinkButton
                        icon-leading="gift"
                        size="small"/>
                </FluxButtonStack>

                <FluxFlyout>
                    <template #opener="{open}">
                        <FluxAvatar
                            fallback-initials="BM"
                            :size="36"
                            @click="open()"/>
                    </template>

                    <template #default="{close}">
                        <FluxMenu style="width: 240px">
                            <FluxMenuGroup>
                                <FluxPersona
                                    avatar-fallback-initials="BM"
                                    :avatar-size="54"
                                    name="Bas Milius"
                                    title="Passly Demo"
                                    style="pointer-events: none"/>
                            </FluxMenuGroup>

                            <FluxSeparator/>

                            <FluxMenuGroup>
                                <FluxMenuItem
                                    command-icon="angle-right"
                                    icon-leading="right-left-large"
                                    label="Merchants"
                                    @click="close()"/>
                            </FluxMenuGroup>

                            <FluxSeparator/>

                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="palette"
                                    label="Interface settings"
                                    @click="close()"/>

                                <FluxMenuItem
                                    icon-leading="gear"
                                    label="Settings"
                                    @click="close()"/>
                            </FluxMenuGroup>

                            <FluxSeparator/>

                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="right-to-bracket"
                                    is-destructive
                                    label="Logout"
                                    @click="close();"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </template>
                </FluxFlyout>
            </template>

            <template
                v-if="activeMenuItem === 4"
                #tabs>
                <FluxTabBarItem
                    icon="grid-2"
                    is-active
                    label="Overview"/>

                <FluxTabBarItem
                    icon="coin"
                    label="Sales"/>

                <FluxTabBarItem
                    icon="user"
                    label="Buyers"/>

                <FluxTabBarItem
                    disabled
                    icon="calendar"
                    label="Events"/>

                <FluxTabBarItem
                    disabled
                    icon="gears"
                    label="Operations"/>

                <FluxTabBarItem
                    disabled
                    icon="arrow-trend-up"
                    label="Growth"/>

                <FluxTabBarItem
                    disabled
                    icon="lightbulb"
                    label="Insights"/>
            </template>
        </FluxApplicationTop>

        <FluxRouteTransition>
            <FluxApplicationContent :key="activeMenuItem">
                <FluxStack>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor facere iusto magni modi molestias natus quae quisquam similique tenetur totam? Explicabo optio, voluptate. Assumenda consectetur culpa deserunt enim minus voluptas.</p>
                    <p>Ab accusantium aliquam amet at cum eos exercitationem facilis fuga in incidunt laborum magnam magni modi obcaecati placeat porro quae quas qui, quia quo sed sequi sunt velit veritatis voluptatibus.</p>
                    <p>Asperiores, commodi expedita id mollitia nesciunt omnis similique voluptates! Asperiores consequatur enim neque reprehenderit similique sit. Ab excepturi illum praesentium quas. Cupiditate debitis iusto nesciunt nisi, praesentium quam sit unde.</p>
                    <p>Ad aliquid assumenda atque autem commodi consequuntur cupiditate deserunt dicta dolore eius et explicabo harum, inventore ipsam iure labore magni maxime natus officia officiis quia quo recusandae rem ut voluptatum.</p>
                    <p>Autem deserunt, dolore doloremque eum, exercitationem facere facilis perferendis recusandae, temporibus veniam vero vitae. Accusantium autem culpa eum quas rem sapiente? Commodi eaque ex iste necessitatibus, neque quam quo sapiente.</p>
                    <p>Ad animi, aspernatur assumenda atque distinctio doloribus dolorum ea enim esse ex explicabo fugiat fugit, id minus mollitia nam neque non odit provident quasi quidem sint unde, vel voluptas voluptatibus!</p>
                    <p>Aliquam architecto atque blanditiis commodi, consectetur consequatur cumque dolore doloribus fugit hic ipsum odit quos ratione repudiandae sit soluta, temporibus ut? Accusantium amet aperiam id, in ipsam maxime quisquam tenetur.</p>
                    <p>Aliquam atque cumque dolore doloribus eius error esse et explicabo impedit laboriosam magni maiores maxime minus natus nihil pariatur quaerat, quia quibusdam recusandae rem sequi similique suscipit tenetur totam voluptate.</p>
                    <p>Ab, odit, totam! Ad alias aliquid animi, atque autem consectetur dolorum ea eaque et eveniet excepturi maiores nisi perferendis quod reiciendis sequi sint suscipit ullam unde veritatis vero voluptatem, voluptatibus!</p>
                    <p>Animi consectetur magni molestiae molestias sequi sit veniam voluptatibus. Autem, culpa delectus eligendi error iure libero obcaecati optio quia reprehenderit sequi ut, vel? Dicta error, unde. Cupiditate in quae reiciendis.</p>
                    <p>At ex expedita labore laborum veritatis. Assumenda commodi, esse ex illo nulla quaerat quo repellendus voluptatibus? Commodi, consequatur, ducimus ea eveniet facilis fugiat in ipsum officiis quo ratione rem voluptatibus.</p>
                    <p>Accusamus adipisci alias aliquam aliquid assumenda beatae ducimus fuga fugit neque non nulla possimus praesentium quibusdam quo, sequi velit veritatis vero. Alias cum deserunt est hic nisi omnis saepe voluptates.</p>
                    <p>Alias aspernatur dolores ducimus earum hic, ipsum itaque maxime nam natus nesciunt nobis nostrum perferendis quas quasi quibusdam quod, recusandae reprehenderit similique vero voluptas! Accusantium aspernatur saepe sint tenetur ut!</p>
                    <p>Assumenda commodi eveniet, ex, facere illum ipsa, natus neque numquam placeat possimus sed voluptas voluptatibus? At debitis dolore id, ipsa maiores nam officiis omnis optio quidem quod, sapiente suscipit totam.</p>
                    <p>A aliquam ea iste perspiciatis sed sunt? Accusantium, alias culpa cupiditate dicta ex fugit ipsam iure minima molestias neque optio repellat, repudiandae sapiente tempore tenetur ut vero voluptate voluptates! In.</p>
                    <p>Accusantium beatae, commodi culpa cum cupiditate distinctio, doloremque ducimus, eaque facilis fugiat harum id illum laborum minima molestiae nam neque nesciunt quaerat quam quasi quos saepe sit tenetur totam voluptatibus!</p>
                    <p>Accusantium cumque debitis dolor enim eos explicabo fuga modi mollitia nam neque nesciunt numquam odit perferendis quasi sed sit sunt, unde voluptate. Consequuntur debitis deleniti eveniet omnis, praesentium recusandae repellendus.</p>
                    <p>Et eveniet impedit inventore, minus repudiandae sunt? A autem consequatur debitis excepturi maiores necessitatibus nihil sunt tenetur. Corporis cupiditate debitis eaque eum fuga, fugit ipsum nostrum odio placeat quia reiciendis.</p>
                    <p>At ex exercitationem id ipsam laudantium maiores minus nesciunt nulla quidem quis saepe, tempora, unde. Consequatur ex id inventore laudantium, modi praesentium quam repellendus suscipit totam? Explicabo optio perspiciatis reprehenderit.</p>
                    <p>Deserunt distinctio harum illo iure quisquam voluptates. Aperiam aspernatur commodi culpa fugit illum incidunt, nesciunt obcaecati perferendis quam repellat saepe temporibus unde! Ab adipisci, dolore ipsum iure maxime nesciunt soluta!</p>

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
        </FluxRouteTransition>
    </FluxApplication>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxButtonStack, FluxDivider, FluxFlyout, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, FluxMenu, FluxMenuCollapsible, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxPersona, FluxPrimaryButton, FluxRouteTransition, FluxSecondaryButton, FluxSecondaryLinkButton, FluxSeparator, FluxStack, FluxTabBarItem } from '@flux-ui/components';
    import { ref } from 'vue';
    import FluxApplication from './FluxApplication.vue';
    import FluxApplicationContent from './FluxApplicationContent.vue';
    import FluxApplicationMenu from './FluxApplicationMenu.vue';
    import FluxApplicationMenuAccount from './FluxApplicationMenuAccount.vue';
    import FluxApplicationMenuPromo from './FluxApplicationMenuPromo.vue';
    import FluxApplicationMenuToggle from './FluxApplicationMenuToggle.vue';
    import FluxApplicationTop from './FluxApplicationTop.vue';

    const activeMenuItem = ref(0);
</script>
