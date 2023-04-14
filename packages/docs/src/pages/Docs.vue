<template>
    <flux-docs>
        <template #navigation>
            <flux-menu class="docs-menu">
                <flux-menu-group>
                    <flux-menu-sub-header label="Setup"/>

                    <flux-menu-item
                        :is-active="path === '/'"
                        label="Introduction"
                        to="/"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/getting-started'"
                        label="Getting started"
                        to="/getting-started"
                        type="route"/>
                </flux-menu-group>

                <flux-menu-group>
                    <flux-menu-sub-header label="Content"/>

                    <flux-menu-item
                        disabled
                        :is-active="path === '/content/icons'"
                        label="Icons"
                        to="/content/icons"
                        type="route"/>

                    <flux-menu-item
                        disabled
                        :is-active="path === '/content/translations'"
                        label="Translations"
                        to="/content/translations"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/content/typography'"
                        label="Typography"
                        to="/content/typography"
                        type="route"/>
                </flux-menu-group>

                <flux-menu-group>
                    <flux-menu-sub-header label="Layout"/>

                    <flux-menu-item
                        :is-active="path === '/layout/aspect-ratio'"
                        label="Aspect ratio"
                        to="/layout/aspect-ratio"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/layout/auto-grid'"
                        label="Auto grid"
                        to="/layout/auto-grid"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/layout/container'"
                        label="Container"
                        to="/layout/container"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/layout/grid'"
                        label="Grid"
                        to="/layout/grid"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/layout/predefined-grid'"
                        label="Predefined grid"
                        to="/layout/predefined-grid"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/layout/spacer'"
                        label="Spacer"
                        to="/layout/spacer"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/layout/stack'"
                        label="Stack"
                        to="/layout/stack"
                        type="route"/>
                </flux-menu-group>

                <flux-menu-group>
                    <flux-menu-sub-header label="Visuals"/>

                    <flux-menu-item
                        :is-active="path === '/visuals/animated-colors'"
                        label="Animated colors"
                        to="/visuals/animated-colors"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/visuals/gridlines'"
                        label="Gridlines"
                        to="/visuals/gridlines"
                        type="route"/>
                </flux-menu-group>

                <flux-menu-group>
                    <flux-menu-sub-header label="Components"/>

                    <flux-menu-item
                        :is-active="path === '/components/action'"
                        label="Action"
                        to="/components/action"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/action-bar'"
                        label="Action bar"
                        to="/components/action-bar"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/avatar'"
                        label="Avatar"
                        to="/components/avatar"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/badge'"
                        label="Badge"
                        to="/components/badge"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/button'"
                        label="Button"
                        to="/components/button"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/button-group'"
                        label="Button group"
                        to="/components/button-group"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/chip'"
                        label="Chip"
                        to="/components/chip"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/comment'"
                        label="Comment"
                        to="/components/comment"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/data-list'"
                        disabled
                        label="Data list"
                        to="/components/data-list"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/data-table'"
                        label="Data table"
                        to="/components/data-table"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/date-picker'"
                        label="Date picker"
                        to="/components/date-picker"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/divider'"
                        label="Divider"
                        to="/components/divider"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/drop-zone'"
                        label="Drop zone"
                        to="/components/drop-zone"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/expandable'"
                        label="Expandable"
                        to="/components/expandable"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/fader'"
                        label="Fader"
                        to="/components/fader"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/feature-card'"
                        label="Feature card"
                        to="/components/feature-card"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/filter'"
                        label="Filter"
                        to="/components/filter"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/flyout'"
                        label="Flyout"
                        to="/components/flyout"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/focal-point-editor'"
                        label="Focal point editor"
                        to="/components/focal-point-editor"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/form'"
                        label="Form"
                        to="/components/form"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/form-date-picker'"
                        label="Form date picker"
                        to="/components/form-date-picker"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/form-field'"
                        label="Form field"
                        to="/components/form-field"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/form-input'"
                        label="Form input"
                        to="/components/form-input"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/form-range-slider'"
                        disabled
                        label="Form range slider"
                        to="/components/form-range-slider"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/form-select'"
                        label="Form select"
                        to="/components/form-select"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/form-slider'"
                        disabled
                        label="Form slider"
                        to="/components/form-slider"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/form-text-area'"
                        label="Form text area"
                        to="/components/form-text-area"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/gallery'"
                        label="Gallery"
                        to="/components/gallery"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/icon'"
                        label="Icon"
                        to="/components/icon"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/info'"
                        label="Info"
                        to="/components/info"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/link'"
                        label="Link"
                        to="/components/link"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/menu'"
                        label="Menu"
                        to="/components/menu"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/notice'"
                        label="Notice"
                        to="/components/notice"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/overlay'"
                        label="Overlay"
                        to="/components/overlay"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/pagination'"
                        label="Pagination"
                        to="/components/pagination"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/pane'"
                        label="Pane"
                        to="/components/pane"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/persona'"
                        label="Persona"
                        to="/components/persona"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/placeholder'"
                        label="Placeholder"
                        to="/components/placeholder"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/quantity-selector'"
                        label="Quantity selector"
                        to="/components/quantity-selector"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/remove'"
                        label="Remove"
                        to="/components/remove"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/root'"
                        label="Root"
                        to="/components/root"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/segmented-control'"
                        label="Segmented control"
                        to="/components/segmented-control"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/separator'"
                        label="Separator"
                        to="/components/separator"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/slide-over'"
                        label="Slide over"
                        to="/components/slide-over"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/snackbar'"
                        label="Snackbar"
                        to="/components/snackbar"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/spinner'"
                        label="Spinner"
                        to="/components/spinner"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/split-button'"
                        label="Split button"
                        to="/components/split-button"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/statistic'"
                        label="Statistic"
                        to="/components/statistic"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/table'"
                        label="Table"
                        to="/components/table"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/tabs'"
                        label="Tabs"
                        to="/components/tabs"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/timeline'"
                        label="Timeline"
                        to="/components/timeline"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/toggle'"
                        label="Toggle"
                        to="/components/toggle"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/toolbar'"
                        label="Toolbar"
                        to="/components/toolbar"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/tooltip'"
                        label="Tooltip"
                        to="/components/tooltip"
                        type="route"/>

                    <flux-menu-item
                        :is-active="path === '/components/window'"
                        label="Window"
                        to="/components/window"
                        type="route"/>
                </flux-menu-group>
            </flux-menu>
        </template>

        <template #top-bar>
            <div class="logo"><span>Flux</span></div>
            <span class="title">Documentation</span>

            <flux-spacer/>

            <theme-toggle/>

            <flux-secondary-button
                type="link"
                icon-before="bitbucket"
                label="BitBucket"
                href="https://bitbucket.org/FanceeDev/Flux"
                target="_blank"/>
        </template>

        <router-view v-slot="{Component}">
            <flux-vertical-window-transition>
                <flux-spinner
                    v-if="routerIsLoading"
                    key="spinner"/>

                <component
                    v-else
                    key="view"
                    :is="Component"/>
            </flux-vertical-window-transition>
        </router-view>
    </flux-docs>
</template>

<script
    lang="ts"
    setup>
    import { FluxDocs, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxSecondaryButton, FluxSpacer, FluxSpinner, FluxVerticalWindowTransition } from '@fancee/flux';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { ThemeToggle } from '../components';
    import { routerIsLoading } from '../routes';

    const route = useRoute();
    const path = computed(() => route.path);
</script>

<style lang="scss">
    .logo {
        display: flex;
        height: 42px;
        padding-left: 12px;
        padding-right: 12px;
        align-items: center;
        justify-content: center;
        background: rgb(var(--primary-7));
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
        &.docs-menu &-group + &-group {
            margin-top: 30px;
        }

        &.docs-menu &-item {
            height: 33px;
            transition-property: all;

            span {
                font-size: 15px;
            }

            &.is-active {
                background: transparent;
                transform: translate3d(3px, 0, 0);

                span {
                    color: rgb(var(--primary-7));
                }
            }
        }

        &.docs-menu &-sub-header {
            position: relative;
            background: none;

            span {
                color: var(--foreground-prominent);
                font-weight: 700;
            }
        }
    }
</style>
