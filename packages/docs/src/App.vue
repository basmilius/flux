<template>
    <flux-root>
        <flux-docs>
            <template #navigation>
                <flux-menu>
                    <flux-menu-group>
                        <flux-menu-sub-header label="Setup"/>

                        <flux-menu-item
                            label="Introduction"
                            to="/"
                            type="route"/>

                        <flux-menu-item
                            label="Getting started"
                            to="/getting-started"
                            type="route"/>
                    </flux-menu-group>

                    <flux-menu-group>
                        <flux-menu-sub-header label="Content"/>

                        <flux-menu-item
                            label="Icons"
                            to="/content/icons"
                            type="route"/>

                        <flux-menu-item
                            label="Typography"
                            to="/content/typography"
                            type="route"/>
                    </flux-menu-group>

                    <flux-menu-group>
                        <flux-menu-sub-header label="Layout"/>

                        <flux-menu-item
                            label="Aspect ratio"
                            to="/layout/aspect-ratio"
                            type="route"/>

                        <flux-menu-item
                            label="Container"
                            to="/layout/container"
                            type="route"/>

                        <flux-menu-item
                            label="Predefined grid"
                            to="/layout/predefined-grid"
                            type="route"/>

                        <flux-menu-item
                            label="Spacer"
                            to="/layout/spacer"
                            type="route"/>

                        <flux-menu-item
                            label="Stack"
                            to="/layout/stack"
                            type="route"/>
                    </flux-menu-group>

                    <flux-menu-group>
                        <flux-menu-sub-header label="Components"/>

                        <flux-menu-item
                            label="Action bar"
                            to="/components/action-bar"
                            type="route"/>

                        <flux-menu-item
                            label="Badge"
                            to="/components/badge"
                            type="route"/>

                        <flux-menu-item
                            label="Button"
                            to="/components/button"
                            type="route"/>

                        <flux-menu-item
                            label="Divider"
                            to="/components/divider"
                            type="route"/>

                        <flux-menu-item
                            label="Drop zone"
                            to="/components/drop-zone"
                            type="route"/>

                        <flux-menu-item
                            label="Expandable"
                            to="/components/expandable"
                            type="route"/>

                        <flux-menu-item
                            label="Fader"
                            to="/components/fader"
                            type="route"/>

                        <flux-menu-item
                            label="Feature card"
                            to="/components/feature-card"
                            type="route"/>

                        <flux-menu-item
                            label="Flyout"
                            to="/components/flyout"
                            type="route"/>

                        <flux-menu-item
                            label="Form"
                            to="/components/form"
                            type="route"/>

                        <flux-menu-item
                            label="Gallery"
                            to="/components/gallery"
                            type="route"/>

                        <flux-menu-item
                            label="Info"
                            to="/components/info"
                            type="route"/>

                        <flux-menu-item
                            label="Menu"
                            to="/components/menu"
                            type="route"/>

                        <flux-menu-item
                            label="Notice"
                            to="/components/notice"
                            type="route"/>

                        <flux-menu-item
                            label="Overlay"
                            to="/components/overlay"
                            type="route"/>

                        <flux-menu-item
                            label="Pagination"
                            to="/components/pagination"
                            type="route"/>

                        <flux-menu-item
                            label="Pane"
                            to="/components/pane"
                            type="route"/>

                        <flux-menu-item
                            label="Placeholder"
                            to="/components/placeholder"
                            type="route"/>

                        <flux-menu-item
                            label="Remove"
                            to="/components/remove"
                            type="route"/>

                        <flux-menu-item
                            label="Segmented control"
                            to="/components/segmented-control"
                            type="route"/>

                        <flux-menu-item
                            label="Separator"
                            to="/components/separator"
                            type="route"/>

                        <flux-menu-item
                            label="Spinner"
                            to="/components/spinner"
                            type="route"/>

                        <flux-menu-item
                            label="Toggle"
                            to="/components/toggle"
                            type="route"/>

                        <flux-menu-item
                            label="Toolbar"
                            to="/components/toolbar"
                            type="route"/>
                    </flux-menu-group>
                </flux-menu>
            </template>

            <template #top-bar>
                <div class="logo"><span>Flux</span></div>
                <span class="title">Documentation</span>

                <flux-spacer/>

                <flux-secondary-button
                    type="link"
                    icon-before="bitbucket"
                    label="BitBucket"
                    href="https://bitbucket.org/FanceeDev/Flux"
                    target="_blank"/>
            </template>

            <router-view/>
        </flux-docs>
    </flux-root>
</template>

<script
    lang="ts"
    setup>
    import { FluxDocs, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxRoot, FluxSecondaryButton, FluxSpacer } from '@fancee/flux';
</script>

<style lang="scss">
    .logo {
        display: flex;
        height: 42px;
        padding-left: 12px;
        padding-right: 12px;
        align-items: center;
        justify-content: center;
        background: var(--primary-7);
        border-radius: var(--radius);
        color: white;
        font-family: proxima-soft, sans-serif;
        font-size: 17px;
        font-weight: 700;
        letter-spacing: 1px;
        transform: skewX(-27deg);

        span {
            transform: skewX(27deg);
        }
    }

    .title {
        color: var(--foreground-prominent);
        font-family: proxima-soft, sans-serif;
        font-size: 17px;
        font-weight: 700;
    }

    .flux-menu {
        & &-group {
            gap: 0;
        }

        & &-group + &-group {
            margin-top: 30px;
        }

        & &-item {
            height: 36px;

            span {
                font-size: 16px;
            }
        }

        & &-sub-header {
            position: relative;
            background: none;

            span {
                color: var(--foreground-prominent);
                font-weight: 700;
            }
        }
    }
</style>
