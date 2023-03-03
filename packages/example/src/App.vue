<template>
    <flux-root style="margin-top: 60px; margin-bottom: 60px;">
        <flux-predefined-grid layout="sidebar-start">

            <flux-stack>
                <flux-pane>
                    <flux-expandable-group>
                        <flux-expandable label="Expandable 1">
                            <template #body>
                                <flux-menu>
                                    <flux-menu-group>
                                        <flux-menu-item
                                            icon-before="circle"
                                            label="Cut"/>
                                        <flux-menu-item
                                            command="⌘C"
                                            icon-before="circle"
                                            label="Copy"/>
                                        <flux-menu-item
                                            command="⌘V"
                                            icon-before="circle"
                                            label="Paste"/>
                                    </flux-menu-group>
                                    <flux-separator/>
                                    <flux-menu-group>
                                        <flux-menu-item
                                            icon-before="circle"
                                            label="Download..."/>
                                        <flux-menu-item
                                            icon-before="circle"
                                            label="Modify..."/>
                                    </flux-menu-group>
                                    <flux-separator/>
                                    <flux-menu-group>
                                        <flux-menu-item
                                            command="⌘O"
                                            icon-before="circle"
                                            label="Preferences"/>
                                    </flux-menu-group>
                                </flux-menu>
                            </template>
                        </flux-expandable>
                        <flux-expandable label="Expandable 2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium assumenda beatae commodi cum deleniti eius fugit in incidunt ipsam nisi porro repellat saepe sed similique tenetur, voluptate voluptatem. Alias.
                        </flux-expandable>
                        <flux-expandable label="Expandable 3">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consequuntur, dolorem dolores ipsa quibusdam quis sapiente! Dignissimos dolore error exercitationem, incidunt ipsam itaque laborum minus nemo, odit officia tempore voluptate.
                        </flux-expandable>
                    </flux-expandable-group>
                </flux-pane>

                <flux-pane>
                    <flux-pane-body>
                        <flux-info-stack>
                            <flux-info icon="circle">
                                Short info item.
                            </flux-info>
                            <flux-info icon="circle">
                                Info item that spans over multiple lines so that we can see how that looks.
                            </flux-info>
                        </flux-info-stack>
                    </flux-pane-body>
                </flux-pane>
            </flux-stack>

            <flux-stack>
                <flux-pane>
                    <flux-aspect-ratio :aspect-ratio="16/9">
                        <flux-fader>
                            <flux-fader-item>
                                <img
                                    src="https://staging.fanc.ee/uploads/shops/headers/bh40dmg5.uwr.jpg"
                                    alt="">
                            </flux-fader-item>
                            <flux-fader-item>
                                <img
                                    src="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"
                                    alt="">
                            </flux-fader-item>
                            <flux-fader-item>
                                <img
                                    src="https://staging.fanc.ee/uploads/shops/headers/q5mvww5g.2lu.jpg"
                                    alt="">
                            </flux-fader-item>
                        </flux-fader>
                    </flux-aspect-ratio>
                </flux-pane>

                <flux-pane>
                    <flux-action-bar>
                        <template #primary>
                            <flux-primary-button
                                icon-before="circle-plus"
                                label="Event"/>
                        </template>

                        <template #filter="{close}">
                            <flux-secondary-button
                                icon-before="filter"
                                label="Filter"
                                @click="close"/>
                        </template>

                        <template #filterOpener="{open}">
                            <flux-secondary-button
                                icon-before="filter"
                                label="Filter"
                                @click="open"/>
                        </template>

                        <template #search>
                            <flux-form-input
                                type="search"
                                placeholder="Type anything to search..."
                                style="width: 240px"/>
                        </template>
                    </flux-action-bar>

                    <flux-pane-body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque molestias nihil repellat. Atque deserunt earum esse laudantium pariatur quod quos reprehenderit tenetur vitae voluptatum? Fugit illum optio possimus quae.
                    </flux-pane-body>

                    <flux-pane-footer>
                        <flux-pagination
                            arrows
                            :page="paginationPage"
                            :per-page="10"
                            :total="250"
                            @navigate="paginationPage = $event"/>
                    </flux-pane-footer>
                </flux-pane>

                <flux-pane>
                    <flux-pane-header title="Pane Title"/>

                    <flux-pane-body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci amet at beatae dolorem, dolores facilis ipsum itaque iure iusto nemo officia praesentium recusandae reiciendis repudiandae, tenetur vel vero voluptatem.
                    </flux-pane-body>

                    <flux-pane-body>
                        <flux-stack
                            axis="horizontal"
                            is-wrapping>
                            <flux-button-group>
                                <flux-secondary-button label="Download"/>
                                <flux-secondary-button icon-before="ellipsis-h"/>
                            </flux-button-group>

                            <flux-split-button :flyout-width="360">
                                <template #button>
                                    <flux-secondary-button label="Download"/>
                                </template>

                                <template #flyout>
                                    <flux-pane-body>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolores minima molestias obcaecati placeat quisquam quos repudiandae sequi voluptate? Accusamus aliquam architecto blanditiis corporis fugit obcaecati pariatur repellat repellendus soluta.
                                    </flux-pane-body>
                                </template>
                            </flux-split-button>

                            <flux-quantity-selector
                                v-model="quantitySelectorValue"
                                :step="5"/>
                        </flux-stack>
                    </flux-pane-body>

                    <flux-pane-body>
                        <flux-badge-stack>
                            <flux-badge
                                dot
                                is-clickable
                                color="primary"
                                label="Badge"/>

                            <flux-badge
                                icon="circle"
                                is-clickable
                                is-loading
                                color="primary"
                                label="Badge"/>
                        </flux-badge-stack>
                    </flux-pane-body>

                    <flux-pane-body>
                        <flux-form-column>
                            <flux-form-field label="Form field">
                                <flux-form-input/>
                            </flux-form-field>

                            <flux-form-field label="Form field">
                                <flux-form-input-group>
                                    <flux-form-input-addition icon="plus"/>
                                    <flux-form-input/>
                                    <flux-secondary-button label="Add"/>
                                </flux-form-input-group>
                            </flux-form-field>
                        </flux-form-column>
                    </flux-pane-body>

                    <flux-pane-footer>
                        <flux-flyout>
                            <template #opener="{toggle}">
                                <flux-secondary-button
                                    label="Flyout"
                                    @click="toggle"/>
                            </template>

                            <template #default="{close}">
                                <flux-menu>
                                    <flux-menu-group>
                                        <flux-menu-item
                                            icon-before="circle"
                                            label="Cut"
                                            @click="close"/>
                                        <flux-menu-item
                                            command="⌘C"
                                            icon-before="circle"
                                            label="Copy"
                                            @click="close"/>
                                        <flux-menu-item
                                            command="⌘V"
                                            icon-before="circle"
                                            label="Paste"
                                            @click="close"/>
                                    </flux-menu-group>
                                    <flux-separator/>
                                    <flux-menu-group>
                                        <flux-menu-item
                                            icon-before="circle"
                                            label="Download..."
                                            @click="close"/>
                                        <flux-menu-item
                                            icon-before="circle"
                                            label="Modify..."
                                            @click="close"/>
                                    </flux-menu-group>
                                    <flux-separator/>
                                    <flux-menu-group>
                                        <flux-menu-item
                                            command="⌘O"
                                            icon-before="circle"
                                            label="Preferences"
                                            @click="close"/>
                                    </flux-menu-group>
                                </flux-menu>
                            </template>
                        </flux-flyout>
                        <flux-spacer/>
                        <flux-secondary-button label="Annuleren"/>
                        <flux-primary-button
                            is-loading
                            label="Opslaan"/>
                    </flux-pane-footer>
                </flux-pane>

                <flux-pane>
                    <flux-pane-body>
                        <flux-typography>
                            <h1>Heading 1</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam blanditiis doloremque, dolorum eaque esse magni placeat praesentium qui quo quos reiciendis sed sequi sint, ut. Asperiores error ipsam sit.</p>
                            <p>Ab accusantium alias aliquam atque blanditiis consequuntur cupiditate debitis delectus deserunt, ea eos esse est fuga maxime, odit praesentium quas qui quia quibusdam sit sunt, totam ullam ut veniam voluptates.</p>

                            <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem consequatur consequuntur debitis deserunt, eius eos, eum in inventore laudantium magnam modi mollitia non nostrum rerum soluta suscipit voluptate, voluptatibus.</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur dolorum facilis molestiae, molestias mollitia, natus nihil omnis quasi quia quibusdam quos repellendus saepe ullam velit veritatis voluptas voluptatem voluptatibus.</p>
                            <blockquote>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias atque dolor doloribus eos exercitationem fugit harum id in labore laborum maiores nemo nulla omnis provident, quia quidem quod sit voluptas.</blockquote>
                            <p>Cumque esse labore magnam. Aspernatur autem dicta, eos eveniet hic odio omnis quibusdam repudiandae tempore ullam. Accusantium aliquid commodi esse neque nobis, ut veritatis! Dolor iusto natus nihil quae sint.</p>

                            <img
                                src="https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt=""/>

                            <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corporis culpa maxime nisi recusandae totam. Amet debitis dicta dignissimos fugiat hic iste natus, neque possimus, rem similique tenetur vitae, voluptate?</h3>
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cumque exercitationem fugiat fugit id impedit laborum rerum sunt, vel. Animi consequuntur delectus eius excepturi modi praesentium quaerat quisquam unde! Voluptatum.</li>
                                <li>Accusantium ducimus eligendi esse placeat repellendus. Ad aperiam asperiores autem consectetur deleniti dolore, doloribus, dolorum ducimus explicabo, in ipsa iure labore natus necessitatibus nesciunt nihil officiis reprehenderit veritatis vitae voluptates!</li>
                                <li>Assumenda at culpa debitis delectus deleniti, deserunt explicabo inventore nostrum nulla rem sint tempore velit. Accusamus aliquid amet aperiam, delectus esse et fugit molestias, nihil omnis pariatur perferendis, placeat rem.</li>
                            </ul>

                            <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corporis culpa maxime nisi recusandae totam. Amet debitis dicta dignissimos fugiat hic iste natus, neque possimus, rem similique tenetur vitae, voluptate?</h3>
                            <ol>
                                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cumque exercitationem fugiat fugit id impedit laborum rerum sunt, vel. Animi consequuntur delectus eius excepturi modi praesentium quaerat quisquam unde! Voluptatum.</li>
                                <li>Accusantium ducimus eligendi esse placeat repellendus. Ad aperiam asperiores autem consectetur deleniti dolore, doloribus, dolorum ducimus explicabo, in ipsa iure labore natus necessitatibus nesciunt nihil officiis reprehenderit veritatis vitae voluptates!</li>
                                <li>Assumenda at culpa debitis delectus deleniti, deserunt explicabo inventore nostrum nulla rem sint tempore velit. Accusamus aliquid amet aperiam, delectus esse et fugit molestias, nihil omnis pariatur perferendis, placeat rem.</li>
                            </ol>

                            <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolorem id itaque maiores quam! Adipisci at blanditiis cum, deleniti esse eum ipsa ipsum molestiae, quibusdam repellat repudiandae totam velit veniam.</h4>
                            <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolorem id itaque maiores quam! Adipisci at blanditiis cum, deleniti esse eum ipsa ipsum molestiae, quibusdam repellat repudiandae totam velit veniam.</h5>
                            <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolorem id itaque maiores quam! Adipisci at blanditiis cum, deleniti esse eum ipsa ipsum molestiae, quibusdam repellat repudiandae totam velit veniam.</h6>
                        </flux-typography>
                    </flux-pane-body>
                </flux-pane>
            </flux-stack>

        </flux-predefined-grid>
    </flux-root>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue';
    import {
        FluxActionBar,
        FluxAspectRatio,
        FluxBadge,
        FluxBadgeStack,
        FluxButtonGroup,
        FluxExpandable,
        FluxExpandableGroup,
        FluxFader,
        FluxFaderItem,
        FluxFlyout,
        FluxFormColumn,
        FluxFormField,
        FluxFormInput,
        FluxFormInputAddition,
        FluxFormInputGroup,
        FluxInfo,
        FluxInfoStack,
        FluxMenu,
        FluxMenuGroup,
        FluxMenuItem,
        FluxPagination,
        FluxPane,
        FluxPaneBody,
        FluxPaneFooter,
        FluxPaneHeader,
        FluxPredefinedGrid,
        FluxPrimaryButton,
        FluxQuantitySelector,
        FluxRoot,
        FluxSecondaryButton,
        FluxSeparator,
        FluxSpacer,
        FluxSplitButton,
        FluxStack,
        FluxTypography
    } from '@fancee/flux';

    const paginationPage = ref(1);
    const quantitySelectorValue = ref(0);
</script>
