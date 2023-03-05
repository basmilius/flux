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
            path: '/components/expandable',
            component: () => import('./pages/components/Expandable.vue')
        },
        {
            path: '/components/flyout',
            component: () => import('./pages/components/Flyout.vue')
        },
        {
            path: '/components/notice',
            component: () => import('./pages/components/Notice.vue')
        },
        {
            path: '/components/spinner',
            component: () => import('./pages/components/Spinner.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('./pages/NotFound.vue')
        }
    ]
});
