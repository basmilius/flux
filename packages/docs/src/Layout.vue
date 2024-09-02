<template>
    <div :class="$style.docs">
        <div :class="$style.docsTopBar">
            <FluxContainer :class="$style.docsTopBarContainer">
                <slot name="top-bar"/>
            </FluxContainer>
        </div>

        <FluxContainer :class="$style.docsContainer">
            <div :class="$style.docsNavigation">
                <nav :class="$style.docsNavigationNav">
                    <slot name="navigation"/>
                </nav>
            </div>

            <main :class="$style.docsContent">
                <slot/>
            </main>
        </FluxContainer>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxContainer } from '@basmilius/flux';
</script>

<style
    lang="scss"
    module>
    .docs {
        background: rgb(var(--gray-0));
        z-index: 0;
    }

    .docsContainer {
        display: grid;
        grid-template-columns: 1fr minmax(0, 3fr);
    }

    .docsContent {
        position: relative;
        padding: 90px 0 90px 60px;
        z-index: 0;
    }

    .docsNavigation {
        position: sticky;
        top: 90px;
        height: calc(100dvh - 90px);
        z-index: 1;

        &::before {
            position: absolute;
            display: block;
            inset: 0 0 0 -50vw;
            content: '';
            background: rgb(var(--gray-1));
        }

        .menuGroup + .menuGroup {
            margin-top: 33px;
        }

        .menuItem {
            min-height: 36px;
            transition-property: all;
        }

        .menuItemLabel {
            font-size: 15px;
        }

        .menuItemActive {
            background: transparent;
            transform: translate3d(3px, 0, 0);
        }

        .menuItemActive .menuItemLabel {
            color: rgb(var(--primary-7));
        }

        .menuSubHeader {
            position: relative;
            background: unset;
        }

        .menuSubHeaderLabel {
            color: var(--foreground-prominent);
            font-weight: 700;
        }
    }

    .docsNavigationNav {
        position: relative;
        height: 100%;
        margin-left: -50vw;
        padding: 90px 60px 90px 50vw;
        overflow: auto;
    }

    .docsTopBar {
        position: sticky;
        top: 0;
        background: rgb(var(--gray-0));
        box-shadow: var(--shadow-md);
        z-index: 2;
    }

    .docsTopBarContainer {
        display: flex;
        height: 90px;
        align-items: center;
        gap: 15px;
    }

    [dark] .docsTopBar {
        background: rgb(var(--gray-2));
    }
</style>
