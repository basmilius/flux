import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({
        top: 0
    }),
    routes: [
        {
            path: '/',
            component: () => import('./pages/Home.vue')
        },
        {
            path: '/getting-started',
            component: () => import('./pages/GettingStarted.vue')
        },
        {
            path: '/content/typography',
            component: () => import('./pages/content/Typography.vue')
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
            path: '/components/spinner',
            component: () => import('./pages/components/Spinner.vue')
        },
        {
            path: '/components/split-button',
            component: () => import('./pages/components/SplitButton.vue')
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
});
