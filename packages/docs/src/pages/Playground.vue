<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <flux-slide-over>
            <flux-pane v-if="isSlideOverOpened">
                <flux-pane-header title="Slide over">
                    <flux-secondary-button
                        icon-before="xmark"
                        @click="isSlideOverOpened = false"/>
                </flux-pane-header>

                <flux-tabs>
                    <template #tabs="{activeIndex, tabs, activate}">
                        <flux-tab-bar>
                            <template
                                v-for="(tab, index) of tabs"
                                :key="index">
                                <flux-tab-bar-item
                                    :icon="tab.icon"
                                    :is-active="activeIndex === index"
                                    :label="tab.label"
                                    @click="activate(index)"/>
                            </template>
                        </flux-tab-bar>
                    </template>

                    <flux-tab label="Common">
                        <flux-pane-body>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
                        </flux-pane-body>
                    </flux-tab>

                    <flux-tab label="Advanced">
                        <flux-pane-body>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur dolorem dolorum ducimus enim, fuga, hic illo labore libero, magnam minima odio pariatur porro quasi quidem quis repellat reprehenderit vero?
                        </flux-pane-body>
                    </flux-tab>
                </flux-tabs>

                <flux-pane-group>
                    <flux-expandable-group>
                        <flux-expandable
                            v-for="n in 3"
                            :label="`Expandable ${n}`">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto, earum eum eveniet ex explicabo id illo incidunt libero maiores nobis, praesentium quaerat quis repellendus rerum sint vel veritatis voluptatum?
                        </flux-expandable>
                    </flux-expandable-group>

                    <flux-pane-body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci deserunt dolor dolorum ea, eius facilis hic illo incidunt ipsum laudantium necessitatibus odit perferendis placeat praesentium quibusdam quis repudiandae vitae voluptates!
                    </flux-pane-body>

                    <flux-pane-body>
                        <flux-pane>
                            <flux-pane-group>
                                <flux-pane-body>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid assumenda blanditiis et eveniet expedita ipsam iusto maiores mollitia nesciunt nihil nulla obcaecati quo ratione reprehenderit suscipit ut veniam, vitae.
                                </flux-pane-body>
                            </flux-pane-group>
                            <flux-pane-group>
                                <flux-pane-body>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid, animi consequatur dolor eligendi est expedita explicabo facilis iste modi molestias nam, necessitatibus odit quam qui reprehenderit soluta, ullam? Dicta.
                                </flux-pane-body>
                            </flux-pane-group>
                            <flux-pane-group>
                                <flux-pane-body>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolores eius eveniet fugiat hic iste magni molestias, necessitatibus non quasi rem reprehenderit rerum saepe sint soluta temporibus totam unde voluptate?
                                </flux-pane-body>
                            </flux-pane-group>
                        </flux-pane>
                    </flux-pane-body>
                </flux-pane-group>

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

        <section>
            <preview>
                <flux-secondary-button
                    icon-before="clone"
                    label="Slide over"
                    @click="isSlideOverOpened = true"/>
            </preview>

            <preview>
                <span style="font-size: 60px">🙂</span>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxExpandable, FluxExpandableGroup, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneGroup, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSlideOver, FluxSpacer, FluxStack, FluxTab, FluxTabBar, FluxTabBarItem, FluxTabs } from '@fancee/flux';
    import { ref } from 'vue';
    import { PageTitle, Preview } from '@/components';

    const isSlideOverOpened = ref(false);
</script>
