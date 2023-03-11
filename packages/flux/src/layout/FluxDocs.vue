<template>
    <div class="flux-docs">
        <div class="flux-docs-top-bar">
            <flux-container class="flux-docs-top-bar-container">
                <slot name="top-bar"/>
            </flux-container>
        </div>

        <flux-container class="flux-docs-container">
            <div class="flux-docs-navigation">
                <nav class="flux-docs-navigation-nav">
                    <slot name="navigation"/>
                </nav>
            </div>

            <main class="flux-docs-content">
                <slot/>
            </main>
        </flux-container>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxContainer } from '../components';
</script>

<style lang="scss">
    .flux-docs {
        background: rgb(var(--gray-0));
        z-index: 0;

        &-container {
            display: grid;
            grid-template-columns: 1fr minmax(0, 3fr);
        }

        &-content {
            position: relative;
            padding: 90px 0 90px 60px;
            z-index: 0;
        }

        &-navigation {
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

            &-nav {
                position: relative;
                height: 100%;
                padding: 90px 60px 90px 0;
                overflow: auto;
            }
        }

        &-top-bar {
            position: sticky;
            top: 0;
            background: rgb(var(--gray-0));
            box-shadow: var(--shadow);
            z-index: 2;

            &-container {
                display: flex;
                height: 90px;
                align-items: center;
                gap: 15px;
            }
        }

        [dark] &-top-bar {
            background: rgb(var(--gray-2));
        }
    }
</style>
