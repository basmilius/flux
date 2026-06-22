import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/view/Layout.vue'),
        children: [
            {
                path: '',
                redirect: {name: 'overview'}
            },
            {
                path: 'overview',
                name: 'overview',
                components: {
                    default: () => import('@/view/overview/Page.vue'),
                    top: () => import('@/view/overview/Top.vue')
                }
            },
            {
                path: 'realtime',
                name: 'realtime',
                component: () => import('@/view/realtime/Page.vue')
            },
            {
                path: 'audience',
                name: 'audience',
                components: {
                    default: () => import('@/view/audience/Page.vue'),
                    top: () => import('@/view/audience/Top.vue')
                }
            },
            {
                path: 'acquisition',
                name: 'acquisition',
                components: {
                    default: () => import('@/view/acquisition/Page.vue'),
                    top: () => import('@/view/acquisition/Top.vue')
                }
            },
            {
                path: 'behavior',
                name: 'behavior',
                components: {
                    default: () => import('@/view/behavior/Page.vue'),
                    top: () => import('@/view/behavior/Top.vue')
                }
            },
            {
                path: 'conversions',
                name: 'conversions',
                components: {
                    default: () => import('@/view/conversions/Page.vue'),
                    top: () => import('@/view/conversions/Top.vue')
                }
            },
            {
                path: 'reports',
                name: 'reports',
                components: {
                    default: () => import('@/view/reports/Page.vue'),
                    top: () => import('@/view/reports/Top.vue')
                }
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('@/view/settings/Page.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: {name: 'overview'}
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});
