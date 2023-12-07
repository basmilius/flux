<template>
    <div :class="styles.docs">
        <div :class="styles.docsTopBar">
            <FluxContainer :class="styles.docsTopBarContainer">
                <slot name="top-bar"/>
            </FluxContainer>
        </div>

        <FluxContainer :class="styles.docsContainer">
            <div :class="styles.docsNavigation">
                <nav :class="styles.docsNavigationNav">
                    <slot name="navigation"/>
                </nav>
            </div>

            <main :class="styles.docsContent">
                <slot/>
            </main>
        </FluxContainer>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxContainer } from '@/components';
    import styles from '@/css/layout/Docs.module.scss';
</script>
