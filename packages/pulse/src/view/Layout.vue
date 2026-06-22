<template>
    <FluxApplication show-desktop-menu-toggle>
        <template #menu>
            <MainMenu/>
        </template>

        <FluxApplicationTop
            :icon="icon"
            :title="title ?? 'Pulse'">
            <template #end>
                <RouterView name="top"/>

                <PeriodSelector v-if="showPeriod"/>

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
    import PeriodSelector from '@/component/PeriodSelector.vue';
    import ProfileMenu from '@/component/ProfileMenu.vue';
    import { useUiStore } from '@/store';

    const route = useRoute();
    const {icon, title} = useUiStore();

    const sectionKey = computed(() => route.matched[1]?.path ?? route.path);

    // The global period selector only applies to the time-bound report pages.
    const showPeriod = computed(() => !['realtime', 'settings'].includes(String(route.name ?? '')));
</script>
