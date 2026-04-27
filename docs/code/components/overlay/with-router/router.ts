import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/projects',
        component: () => import('./views/Projects.vue'),
        children: [
            {
                name: 'projects-create',
                path: 'create',
                components: {
                    overlay: () => import('./views/ProjectsCreate.vue')
                }
            },
            {
                name: 'projects-edit',
                path: 'edit/:id',
                components: {
                    overlay: () => import('./views/ProjectsEdit.vue')
                }
            }
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
