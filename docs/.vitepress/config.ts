import { composeLibrary, preset } from '@basmilius/vite-preset';
import { defineConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import examplePlugin from 'vitepress-plugin-example';
import renderPlugin from 'vitepress-plugin-render';
import componentNavigation from './component-navigation';

export const flux = composeLibrary({
    name: '@flux-ui/components',
    alias: '$flux'
});

export const fluxApplication = composeLibrary({
    name: '@flux-ui/application',
    alias: '$fluxApplication'
});

export const fluxDashboard = composeLibrary({
    name: '@flux-ui/dashboard',
    alias: '$fluxDashboard'
});

export const fluxStatistics = composeLibrary({
    name: '@flux-ui/statistics',
    alias: '$fluxStatistics'
});

export default defineConfig({
    title: 'Flux',
    titleTemplate: 'Flux — :title',
    description: 'Component library for Vue 3.',
    ignoreDeadLinks: true,
    cleanUrls: true,
    head: [
        ['link', {rel: 'stylesheet', href: 'https://font.bmcdn.nl/css2?family=inter-variable|jetbrains-mono'}],
    ],
    markdown: {
        config(md) {
            md.use(examplePlugin);
            md.use(renderPlugin);
            md.use(groupIconMdPlugin);
        }
    },
    vite: {
        build: {
            cssTarget: 'chrome120'
        },
        plugins: [
            groupIconVitePlugin() as any,
            preset({
                cssModules: {
                    classNames: 'camel',
                    prefix: 'f_'
                },
                fileNames: 'actual'
            }),
            flux(),
            fluxApplication(),
            fluxDashboard(),
            fluxStatistics()
        ],
        server: {
            port: 5174
        }
    },
    themeConfig: {
        logo: '/assets/logo.svg',

        search: {
            provider: 'local'
        },

        nav: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'Guide',
                activeMatch: '^/guide/',
                items: [
                    {text: 'Introduction', link: '/guide/introduction/what-is-flux'},
                    {text: 'Composables', link: '/guide/composables/useBreakpoints'},
                    {text: 'API', link: '/guide/api/useFluxStore'},
                    {text: 'Patterns', link: '/guide/patterns/'}
                ]
            },
            {
                text: 'Components',
                activeMatch: '^/components/',
                link: '/components/'
            },
            {
                text: 'Packages',
                activeMatch: '/(application|dashboard|internals|statistics)/',
                items: [
                    {text: 'Application', link: '/application/'},
                    {text: 'Dashboard', link: '/dashboard/'},
                    {text: 'Internals', link: '/internals/'},
                    {text: 'Statistics', link: '/statistics/'}
                ]
            }
        ],

        footer: {
            message: 'Released under the <a href="https://github.com/basmilius/flux/blob/main/LICENSE">MIT License</a>.',
            copyright: 'Copyright © 2023–present <a href="https://github.com/basmilius">Bas Milius</a>'
        },

        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {text: 'What is Flux', link: '/guide/introduction/what-is-flux'},
                        {
                            text: 'Installation',
                            collapsed: true,
                            link: '/guide/introduction/installation/manual',
                            items: [
                                {text: 'Installation', link: '/guide/introduction/installation/manual'},
                                {text: 'Vue Router', link: '/guide/introduction/installation/vue-router'},
                                {text: 'Nuxt', link: '/guide/introduction/installation/nuxt'}
                            ]
                        },
                        {text: 'Translations', link: '/guide/introduction/translations'},
                        {text: 'Colors', link: '/guide/introduction/colors'},
                        {text: 'Design tokens', link: '/guide/introduction/design-tokens'},
                        {text: 'Typography', link: '/guide/introduction/typography'},
                        {text: 'Dark mode', link: '/guide/introduction/dark-mode'},
                        {text: 'Font Awesome', link: '/guide/introduction/font-awesome'}
                    ]
                },
                {
                    text: 'Composables',
                    collapsed: false,
                    items: [
                        {text: 'useBreakpoints', link: '/guide/composables/useBreakpoints'},
                        {text: 'useDisabled', link: '/guide/composables/useDisabled'},
                        {text: 'useDisabledInjection', link: '/guide/composables/useDisabledInjection'},
                        {text: 'useExpandableGroupInjection', link: '/guide/composables/useExpandableGroupInjection'},
                        {text: 'useFilterInjection', link: '/guide/composables/useFilterInjection'},
                        {text: 'useFlyoutInjection', link: '/guide/composables/useFlyoutInjection'},
                        {text: 'useFormFieldInjection', link: '/guide/composables/useFormFieldInjection'},
                        {text: 'useTableInjection', link: '/guide/composables/useTableInjection'},
                        {text: 'useTooltipInjection', link: '/guide/composables/useTooltipInjection'}
                    ]
                },
                {
                    text: 'API',
                    collapsed: false,
                    items: [
                        {text: 'useFluxStore', link: '/guide/api/useFluxStore'},
                        {text: 'Helpers', link: '/guide/api/helpers'},
                        {text: 'Types', link: '/guide/api/types'}
                    ]
                },
                {
                    text: 'Patterns',
                    collapsed: false,
                    items: [
                        {text: 'Overview', link: '/guide/patterns/'},
                        {text: 'CRUD form', link: '/guide/patterns/crud-form'},
                        {text: 'Filterable data table', link: '/guide/patterns/filterable-data-table'},
                        {text: 'Stepper wizard', link: '/guide/patterns/stepper-wizard'},
                        {text: 'Programmatic dialogs', link: '/guide/patterns/programmatic-dialogs'}
                    ]
                }
            ],
            '/components/transitions/': [
                componentNavigation,
                {
                    text: 'Transitions',
                    collapsed: false,
                    items: [
                        {text: 'Breakthrough', link: '/components/transitions/breakthrough'},
                        {text: 'Fade', link: '/components/transitions/fade'},
                        {text: 'Overlay', link: '/components/transitions/overlay'},
                        {text: 'Route', link: '/components/transitions/route'},
                        {text: 'Slide over', link: '/components/transitions/slide-over'},
                        {text: 'Tooltip', link: '/components/transitions/tooltip'},
                        {text: 'Vertical window', link: '/components/transitions/vertical-window'},
                        {text: 'Window', link: '/components/transitions/window'}
                    ]
                }
            ],
            '/components/': [
                componentNavigation,
                {
                    text: 'Transitions',
                    collapsed: true,
                    items: [
                        {text: 'Breakthrough', link: '/components/transitions/breakthrough'},
                        {text: 'Fade', link: '/components/transitions/fade'},
                        {text: 'Overlay', link: '/components/transitions/overlay'},
                        {text: 'Route', link: '/components/transitions/route'},
                        {text: 'Slide over', link: '/components/transitions/slide-over'},
                        {text: 'Tooltip', link: '/components/transitions/tooltip'},
                        {text: 'Vertical window', link: '/components/transitions/vertical-window'},
                        {text: 'Window', link: '/components/transitions/window'}
                    ]
                }
            ],
            '/application/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {text: 'What is Flux Application?', link: '/application/'},
                        {text: 'Installation', link: '/application/introduction/installation'}
                    ]
                },
                {
                    text: 'Components',
                    collapsed: false,
                    items: [
                        {text: 'Application', link: '/application/components/application'},
                        {text: 'Content', link: '/application/components/content'},
                        {text: 'Hero', link: '/application/components/hero'},
                        {
                            text: 'Menu',
                            link: '/application/components/menu/',
                            collapsed: true,
                            items: [
                                {text: 'Account', link: '/application/components/menu/account'},
                                {text: 'Context', link: '/application/components/menu/context'},
                                {text: 'Context stack', link: '/application/components/menu/context-stack'},
                                {text: 'Promo', link: '/application/components/menu/promo'},
                                {text: 'Toggle', link: '/application/components/menu/toggle'}
                            ]
                        },
                        {text: 'Section', link: '/application/components/section'},
                        {text: 'Side', link: '/application/components/side'},
                        {text: 'Top', link: '/application/components/top'}
                    ]
                },
                {
                    text: 'Composables',
                    collapsed: false,
                    items: [
                        {text: 'useApplicationContextMenu', link: '/application/composables/useApplicationContextMenu'},
                        {text: 'useApplicationInjection', link: '/application/composables/useApplicationInjection'},
                        {text: 'useApplicationMenu', link: '/application/composables/useApplicationMenu'}
                    ]
                }
            ],
            '/dashboard/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {text: 'What is Flux Dashboard?', link: '/dashboard/'},
                        {text: 'Installation', link: '/dashboard/introduction/installation'}
                    ]
                },
                {
                    text: 'Components',
                    collapsed: false,
                    items: [
                        {text: 'Dashboard', link: '/dashboard/components/dashboard'},
                        {text: 'Content', link: '/dashboard/components/content'},
                        {text: 'Header', link: '/dashboard/components/header'},
                        {text: 'Menu', link: '/dashboard/components/menu'},
                        {text: 'Navigation', link: '/dashboard/components/navigation'},
                        {text: 'Side', link: '/dashboard/components/side'},
                        {text: 'Top bar', link: '/dashboard/components/top-bar'}
                    ]
                },
                {
                    text: 'Composables',
                    collapsed: false,
                    items: [
                        {text: 'useDashboardInjection', link: '/dashboard/composables/useDashboardInjection'}
                    ]
                }
            ],
            '/statistics/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {text: 'What is Flux Statistics?', link: '/statistics/'},
                        {text: 'Installation', link: '/statistics/introduction/installation'},
                        {text: 'Chart colors', link: '/statistics/introduction/colors'}
                    ]
                },
                {
                    text: 'Components',
                    collapsed: false,
                    items: [
                        {text: 'Change', link: '/statistics/components/change'},
                        {
                            text: 'Charts',
                            link: '/statistics/components/charts/',
                            collapsed: true,
                            items: [
                                {text: 'Area', link: '/statistics/components/charts/area'},
                                {text: 'Bar', link: '/statistics/components/charts/bar'},
                                {text: 'Donut', link: '/statistics/components/charts/donut'},
                                {text: 'Line', link: '/statistics/components/charts/line'},
                                {text: 'Pie', link: '/statistics/components/charts/pie'}
                            ]
                        },
                        {text: 'Chart pane', link: '/statistics/components/chart-pane'},
                        {
                            text: 'Details table',
                            link: '/statistics/components/details-table/',
                            collapsed: true,
                            items: [
                                {text: 'Row', link: '/statistics/components/details-table/row'}
                            ]
                        },
                        {text: 'Grid', link: '/statistics/components/grid'},
                        {text: 'KPI', link: '/statistics/components/kpi'},
                        {
                            text: 'Legend',
                            link: '/statistics/components/legend/',
                            collapsed: true,
                            items: [
                                {text: 'Item', link: '/statistics/components/legend/item'}
                            ]
                        },
                        {text: 'Meter', link: '/statistics/components/meter'},
                        {text: 'Metric', link: '/statistics/components/metric'}
                    ]
                }
            ],
            '/internals/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {text: 'Installation', link: '/internals/'}
                    ]
                },
                {
                    text: 'Composables',
                    collapsed: false,
                    items: [
                        {text: 'useCalendar', link: '/internals/composables/useCalendar'},
                        {text: 'useCalendarMonthSwitcher', link: '/internals/composables/useCalendarMonthSwitcher'},
                        {text: 'useCalendarYearSwitcher', link: '/internals/composables/useCalendarYearSwitcher'},
                        {text: 'useEventListener', link: '/internals/composables/useEventListener'},
                        {text: 'useFocusTrap', link: '/internals/composables/useFocusTrap'},
                        {text: 'useFocusTrapLock', link: '/internals/composables/useFocusTrapLock'},
                        {text: 'useFocusTrapReturn', link: '/internals/composables/useFocusTrapReturn'},
                        {text: 'useFocusTrapSubscription', link: '/internals/composables/useFocusTrapSubscription'},
                        {text: 'useFocusZone', link: '/internals/composables/useFocusZone'},
                        {text: 'useInView', link: '/internals/composables/useInView'},
                        {text: 'useRemembered', link: '/internals/composables/useRemembered'},
                        {text: 'useScrollPosition', link: '/internals/composables/useScrollPosition'}
                    ]
                },
                {
                    text: 'Directives',
                    collapsed: false,
                    items: [
                        {text: 'focusTrap', link: '/internals/directives/focusTrap'},
                        {text: 'heightTransition', link: '/internals/directives/heightTransition'}
                    ]
                },
                {
                    text: 'Utils',
                    collapsed: false,
                    items: [
                        {text: 'animationFrameDebounce', link: '/internals/utils/animationFrameDebounce'},
                        {text: 'flattenVNodeTree', link: '/internals/utils/flattenVNodeTree'},
                        {text: 'getBidirectionalFocusElement', link: '/internals/utils/getBidirectionalFocusElement'},
                        {text: 'getComponentName', link: '/internals/utils/getComponentName'},
                        {text: 'getComponentProps', link: '/internals/utils/getComponentProps'},
                        {text: 'getExposedRef', link: '/internals/utils/getExposedRef'},
                        {text: 'getFocusableElement', link: '/internals/utils/getFocusableElement'},
                        {text: 'getFocusableElements', link: '/internals/utils/getFocusableElements'},
                        {text: 'getKeyboardFocusableElements', link: '/internals/utils/getKeyboardFocusableElements'},
                        {text: 'unrefTemplateElement', link: '/internals/utils/unrefTemplateElement'},
                        {text: 'warn', link: '/internals/utils/warn'},
                        {text: 'wrapFocus', link: '/internals/utils/wrapFocus'},
                        {text: 'FOCUS_TRAP_LOCKS', link: '/internals/utils/focusTrap'}
                    ]
                },
                {
                    text: 'Data',
                    collapsed: false,
                    items: [
                        {text: 'Color palette', link: '/internals/data/color'}
                    ]
                }
            ],
            '/showcase/': [
                {
                    text: 'Showcase',
                    items: [
                        {text: 'Overview', link: '/showcase/'}
                    ]
                }
            ]
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/basmilius/flux'},
            {icon: 'npm', link: 'https://www.npmjs.com/package/@flux-ui/components'}
        ]
    }
});
