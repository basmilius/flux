import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/orders',
        component: () => import('./views/Orders.vue'),
        children: [
            {
                name: 'order',
                path: ':id',
                components: {
                    over: () => import('./views/Order.vue')
                },
                children: [
                    {
                        name: 'order-buyer',
                        path: 'buyer',
                        component: () => import('./views/OrderBuyer.vue')
                    },
                    {
                        name: 'order-payment',
                        path: 'payment',
                        component: () => import('./views/OrderPayment.vue')
                    }
                ]
            }
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
