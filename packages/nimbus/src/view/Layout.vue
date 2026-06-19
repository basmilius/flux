<template>
    <FluxApplication show-desktop-menu-toggle>
        <template #menu>
            <MainMenu data-tour="menu"/>
        </template>

        <FluxApplicationTop
            :icon="icon"
            :title="title ?? 'Nimbus'">
            <template
                v-if="hasTabs"
                #tabs>
                <RouterView name="tabs"/>
            </template>

            <template #end>
                <RouterView name="top"/>
                <FluxAdaptiveGroup :gap="9">
                    <FluxAdaptiveSlot>
                        <CommandPalette/>
                    </FluxAdaptiveSlot>
                </FluxAdaptiveGroup>
                <NotificationsMenu/>
                <ProfileMenu/>
            </template>
        </FluxApplicationTop>

        <RouterView v-slot="{Component}">
            <FluxRouteTransition>
                <component
                    :is="Component"
                    :key="sectionKey"/>
            </FluxRouteTransition>
        </RouterView>

        <RouterView name="overlay"/>

        <OnboardingTour/>
    </FluxApplication>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplication, FluxApplicationTop } from '@flux-ui/application';
    import { FluxAdaptiveGroup, FluxAdaptiveSlot, FluxRouteTransition } from '@flux-ui/components';
    import { computed } from 'vue';
    import { RouterView, useRoute } from 'vue-router';
    import CommandPalette from '@/component/CommandPalette.vue';
    import MainMenu from '@/component/MainMenu.vue';
    import NotificationsMenu from '@/component/NotificationsMenu.vue';
    import OnboardingTour from '@/component/OnboardingTour.vue';
    import ProfileMenu from '@/component/ProfileMenu.vue';
    import { useUiStore } from '@/store';

    const route = useRoute();
    const {icon, title} = useUiStore();

    // Transition between top-level sections, but not between a detail's sub-routes
    // (e.g. switching a project's Board/Files tabs should not replay the transition).
    const sectionKey = computed(() => route.matched[1]?.path ?? route.path);

    // Only provide the top bar's `#tabs` slot on routes that actually supply a
    // `tabs` named view — otherwise FluxApplicationTop renders an (empty) tab-bar
    // row on every page, which changes the top bar's layout.
    const hasTabs = computed(() => route.matched.some(record => record.components?.tabs != null));
</script>
