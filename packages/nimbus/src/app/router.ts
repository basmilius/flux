import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/view/Layout.vue'),
        children: [
            {
                path: '',
                redirect: {name: 'dashboard'}
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                components: {
                    default: () => import('@/view/dashboard/Page.vue'),
                    top: () => import('@/view/dashboard/Top.vue')
                }
            },
            {
                path: 'projects',
                name: 'projects',
                components: {
                    default: () => import('@/view/projects/Page.vue'),
                    top: () => import('@/view/projects/Top.vue')
                }
            },
            {
                path: 'projects/new',
                name: 'project-new',
                components: {
                    default: () => import('@/view/projects/Page.vue'),
                    top: () => import('@/view/projects/Top.vue'),
                    overlay: () => import('@/view/projects/NewProjectWizard.vue')
                }
            },
            {
                path: 'projects/:id',
                components: {
                    default: () => import('@/view/projects/detail/Layout.vue'),
                    menu: () => import('@/view/projects/detail/Menu.vue'),
                    top: () => import('@/view/projects/detail/Top.vue')
                },
                children: [
                    {
                        path: '',
                        name: 'project',
                        component: () => import('@/view/projects/detail/Overview.vue')
                    },
                    {
                        path: 'board',
                        name: 'project-board',
                        component: () => import('@/view/projects/detail/Board.vue')
                    },
                    {
                        path: 'files',
                        name: 'project-files',
                        component: () => import('@/view/projects/detail/Files.vue')
                    },
                    {
                        path: 'calendar',
                        name: 'project-calendar',
                        component: () => import('@/view/projects/detail/Calendar.vue')
                    },
                    {
                        path: 'activity',
                        name: 'project-activity',
                        component: () => import('@/view/projects/detail/Activity.vue')
                    },
                    {
                        path: 'settings',
                        name: 'project-settings',
                        component: () => import('@/view/projects/detail/Settings.vue')
                    }
                ]
            },
            {
                path: 'clients',
                name: 'clients',
                components: {
                    default: () => import('@/view/clients/Page.vue'),
                    top: () => import('@/view/clients/Top.vue')
                }
            },
            {
                path: 'clients/:id',
                name: 'client',
                components: {
                    default: () => import('@/view/clients/Detail.vue'),
                    top: () => import('@/view/clients/DetailTop.vue')
                }
            },
            {
                path: 'team',
                name: 'team',
                components: {
                    default: () => import('@/view/team/Page.vue'),
                    top: () => import('@/view/team/Top.vue')
                }
            },
            {
                path: 'team/:id',
                name: 'team-member',
                component: () => import('@/view/team/Detail.vue')
            },
            {
                path: 'calendar',
                name: 'calendar',
                components: {
                    default: () => import('@/view/calendar/Page.vue'),
                    top: () => import('@/view/calendar/Top.vue')
                }
            },
            {
                path: 'reports',
                components: {
                    default: () => import('@/view/reports/Layout.vue'),
                    tabs: () => import('@/view/reports/Tabs.vue')
                },
                children: [
                    {
                        path: '',
                        name: 'reports',
                        component: () => import('@/view/reports/Overview.vue')
                    },
                    {
                        path: 'financial',
                        name: 'reports-financial',
                        component: () => import('@/view/reports/Financial.vue')
                    },
                    {
                        path: 'team',
                        name: 'reports-team',
                        component: () => import('@/view/reports/Team.vue')
                    },
                    {
                        path: 'pipeline',
                        name: 'reports-pipeline',
                        component: () => import('@/view/reports/Pipeline.vue')
                    }
                ]
            },
            {
                path: 'timesheets',
                name: 'timesheets',
                components: {
                    default: () => import('@/view/timesheets/Page.vue'),
                    top: () => import('@/view/timesheets/Top.vue')
                }
            },
            {
                path: 'timesheets/log',
                name: 'timesheet-log',
                components: {
                    default: () => import('@/view/timesheets/Page.vue'),
                    top: () => import('@/view/timesheets/Top.vue'),
                    overlay: () => import('@/view/timesheets/LogTime.vue')
                }
            },
            {
                path: 'invoices',
                name: 'invoices',
                components: {
                    default: () => import('@/view/invoices/Page.vue'),
                    top: () => import('@/view/invoices/Top.vue')
                }
            },
            {
                path: 'invoices/new',
                name: 'invoice-new',
                components: {
                    default: () => import('@/view/invoices/Page.vue'),
                    top: () => import('@/view/invoices/Top.vue'),
                    overlay: () => import('@/view/invoices/Editor.vue')
                }
            },
            {
                path: 'invoices/:id',
                name: 'invoice',
                components: {
                    default: () => import('@/view/invoices/Detail.vue'),
                    top: () => import('@/view/invoices/DetailTop.vue')
                }
            },
            {
                path: 'invoices/:id/edit',
                name: 'invoice-edit',
                components: {
                    default: () => import('@/view/invoices/Detail.vue'),
                    top: () => import('@/view/invoices/DetailTop.vue'),
                    overlay: () => import('@/view/invoices/Editor.vue')
                }
            },
            {
                path: 'deals',
                name: 'deals',
                components: {
                    default: () => import('@/view/deals/Page.vue'),
                    top: () => import('@/view/deals/Top.vue')
                }
            },
            {
                path: 'goals',
                name: 'goals',
                components: {
                    default: () => import('@/view/goals/Page.vue'),
                    top: () => import('@/view/goals/Top.vue')
                }
            },
            {
                path: 'inbox',
                name: 'inbox',
                components: {
                    default: () => import('@/view/inbox/Page.vue'),
                    top: () => import('@/view/inbox/Top.vue')
                }
            },
            {
                path: 'activity',
                name: 'activity',
                component: () => import('@/view/activity/Page.vue')
            },
            {
                path: 'billing',
                name: 'billing',
                component: () => import('@/view/billing/Page.vue')
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
        redirect: {name: 'dashboard'}
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});
