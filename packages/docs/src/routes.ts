import { ref } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

export const routerIsLoading = ref(false);

export const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({
        top: 0
    }),
    routes: [
        {
            path: '/',
            component: () => import('./pages/Docs.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('./pages/Home.vue')
                },
                {
                    path: '/getting-started',
                    component: () => import('./pages/GettingStarted.vue')
                },
                {
                    path: '/playground',
                    component: () => import('./pages/Playground.vue')
                },
                {
                    path: '/content/typography',
                    component: () => import('./pages/content/Typography.vue')
                },
                {
                    path: '/components/action-bar',
                    component: () => import('./pages/components/ActionBar.vue')
                },
                {
                    path: '/components/avatar',
                    component: () => import('./pages/components/Avatar.vue')
                },
                {
                    path: '/components/badge',
                    component: () => import('./pages/components/Badge.vue')
                },
                {
                    path: '/components/button',
                    component: () => import('./pages/components/Button.vue')
                },
                {
                    path: '/components/button-group',
                    component: () => import('./pages/components/ButtonGroup.vue')
                },
                {
                    path: '/components/chip',
                    component: () => import('./pages/components/Chip.vue')
                },
                {
                    path: '/components/divider',
                    component: () => import('./pages/components/Divider.vue')
                },
                {
                    path: '/components/expandable',
                    component: () => import('./pages/components/Expandable.vue')
                },
                {
                    path: '/components/fader',
                    component: () => import('./pages/components/Fader.vue')
                },
                {
                    path: '/components/flyout',
                    component: () => import('./pages/components/Flyout.vue')
                },
                {
                    path: '/components/icon',
                    component: () => import('./pages/components/Icon.vue')
                },
                {
                    path: '/components/info',
                    component: () => import('./pages/components/Info.vue')
                },
                {
                    path: '/components/link',
                    component: () => import('./pages/components/Link.vue')
                },
                {
                    path: '/components/menu',
                    component: () => import('./pages/components/Menu.vue')
                },
                {
                    path: '/components/notice',
                    component: () => import('./pages/components/Notice.vue')
                },
                {
                    path: '/components/pagination',
                    component: () => import('./pages/components/Pagination.vue')
                },
                {
                    path: '/components/pane',
                    component: () => import('./pages/components/Pane.vue')
                },
                {
                    path: '/components/quantity-selector',
                    component: () => import('./pages/components/QuantitySelector.vue')
                },
                {
                    path: '/components/root',
                    component: () => import('./pages/components/Root.vue')
                },
                {
                    path: '/components/segmented-control',
                    component: () => import('./pages/components/SegmentedControl.vue')
                },
                {
                    path: '/components/separator',
                    component: () => import('./pages/components/Separator.vue')
                },
                {
                    path: '/components/spinner',
                    component: () => import('./pages/components/Spinner.vue')
                },
                {
                    path: '/components/split-button',
                    component: () => import('./pages/components/SplitButton.vue')
                },
                {
                    path: '/components/statistic',
                    component: () => import('./pages/components/Statistic.vue')
                },
                {
                    path: '/components/tabs',
                    component: () => import('./pages/components/Tabs.vue')
                },
                {
                    path: '/components/timeline',
                    component: () => import('./pages/components/Timeline.vue')
                },
                {
                    path: '/components/toggle',
                    component: () => import('./pages/components/Toggle.vue')
                },
                {
                    path: '/components/toolbar',
                    component: () => import('./pages/components/Toolbar.vue')
                },
                {
                    path: '/components/window',
                    component: () => import('./pages/components/Window.vue')
                },
                {
                    path: '/layout/aspect-ratio',
                    component: () => import('./pages/layout/AspectRatio.vue')
                },
                {
                    path: '/layout/container',
                    component: () => import('./pages/layout/Container.vue')
                },
                {
                    path: '/layout/grid',
                    component: () => import('./pages/layout/Grid.vue')
                },
                {
                    path: '/layout/predefined-grid',
                    component: () => import('./pages/layout/PredefinedGrid.vue')
                },
                {
                    path: '/layout/spacer',
                    component: () => import('./pages/layout/Spacer.vue')
                },
                {
                    path: '/layout/stack',
                    component: () => import('./pages/layout/Stack.vue')
                },
                {
                    path: '/:pathMatch(.*)*',
                    component: () => import('./pages/NotFound.vue')
                }
            ]
        },
        {
            path: '/dashboard',
            component: () => import('./pages/Dashboard.vue')
        }
    ]
});

router.afterEach(() => {
    routerIsLoading.value = false;
});

router.beforeEach((from, to, next) => {
    routerIsLoading.value = true;
    next();
});
