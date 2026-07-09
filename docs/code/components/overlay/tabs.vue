<template>
    <FluxSecondaryButton
        icon-leading="copy"
        label="Open overlay"
        @click="isOpen = true"/>

    <FluxOverlay size="medium">
        <FluxPane v-if="isOpen">
            <FluxPaneHeader title="Overlay">
                <FluxSecondaryButton
                    icon-before="xmark"
                    @click="isOpen = false"/>
            </FluxPaneHeader>

            <FluxTabs>
                <template #tabs="{ modelValue, tabs, activate }">
                    <FluxTabBar>
                        <template
                            v-for="(tab, index) in tabs"
                            :key="index">
                            <FluxTabBarItem
                                :icon="tab.icon"
                                :is-active="modelValue === index"
                                :label="tab.label"
                                @click="activate(index)"/>
                        </template>
                    </FluxTabBar>
                </template>

                <FluxTab label="Common">
                    <FluxPaneBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur, consequuntur debitis eligendi eum magnam necessitatibus nulla perferendis sequi voluptate. Aut consequatur ducimus, quaerat quos ratione sequi veniam? Quis, rem.</p>
                        <p>Alias dolorum laboriosam pariatur qui ut. Debitis distinctio expedita impedit ipsam voluptatem? Asperiores assumenda dolorem ducimus earum nam placeat ut velit. Ab debitis dicta in itaque quos ut veritatis voluptatum.</p>
                        <p>Ducimus nemo officiis, quas saepe sequi tempora unde! Debitis dolores eos exercitationem itaque laboriosam magni nam, neque officiis, pariatur quis ratione recusandae reiciendis repudiandae tempore temporibus veritatis vero, voluptates? Earum?</p>
                        <p>Accusamus adipisci aliquam aperiam beatae dolore, doloremque ducimus eius eligendi eos illo laudantium magnam maxime nam nemo nulla pariatur perferendis quae quas quos, ratione sequi sint tempora tempore veritatis voluptas voluptatem.</p>
                        <p>Consectetur cupiditate deleniti dolorum, ducimus eaque et eum facere fugit id impedit ipsa iste laborum magni molestiae necessitatibus nesciunt nihil nulla obcaecati officia perspiciatis quas quibusdam quidem, quos ratione tempora voluptatibus.</p>
                    </FluxPaneBody>
                </FluxTab>

                <FluxTab label="Advanced">
                    <FluxPaneBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur dolorem dolorum ducimus enim, fuga, hic illo labore libero, magnam minima odio pariatur porro quasi quidem quis repellat reprehenderit vero?</p>
                        <p>Accusamus adipisci aliquam aperiam beatae dolore, doloremque ducimus eius eligendi eos illo laudantium magnam maxime nam nemo nulla pariatur perferendis quae quas quos, ratione sequi sint tempora tempore veritatis voluptas voluptatem.</p>
                        <p>Consectetur cupiditate deleniti dolorum, ducimus eaque et eum facere fugit id impedit ipsa iste laborum magni molestiae necessitatibus nesciunt nihil nulla obcaecati officia perspiciatis quas quibusdam quidem, quos ratione tempora voluptatibus.</p>
                    </FluxPaneBody>
                </FluxTab>
            </FluxTabs>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Close"
                    @click="isOpen = false"/>

                <FluxSpacer/>

                <FluxPrimaryButton
                    icon-before="circle-check"
                    label="Save"
                    @click="isOpen = false"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxOverlay>
</template>

<script
    setup
    lang="ts">
    import { FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxTab, FluxTabBar, FluxTabBarItem, FluxTabs } from '@flux-ui/components';
    import { ref } from 'vue';

    const isOpen = ref(false);
</script>
