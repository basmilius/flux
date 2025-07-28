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

export default defineConfig({
    title: 'Flux',
    titleTemplate: 'Flux — :title',
    description: 'Component library for Vue 3.',
    ignoreDeadLinks: true,
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
        define: {
            navigator: {
                language: 'en'
            }
        },
        plugins: [
            groupIconVitePlugin() as any,
            preset({
                cssModules: {
                    classNames: 'mangled'
                },
                fileNames: 'actual'
            }),
            flux()
        ]
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
                activeMatch: '/guide/',
                items: [
                    {text: 'Introduction', link: '/guide/introduction/what-is-flux'},
                    {text: 'Components', link: '/guide/components/'},
                    {text: 'Transitions', link: '/guide/transitions/breakthrough'}
                ]
            },
            {
                text: 'Dashboard',
                link: '/dashboard',
                activeMatch: '/dashboard/'
            },
            {
                text: 'Internals',
                link: '/internals',
                activeMatch: '/internals/'
            },
            {
                text: 'Showcase',
                link: '/showcase',
                activeMatch: '/showcase/'
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
                        {text: 'Font Awesome', link: '/guide/introduction/font-awesome'}
                    ]
                },
                componentNavigation,
                {
                    text: 'Transitions',
                    collapsed: false,
                    items: [
                        {text: 'Breakthrough', link: '/guide/transitions/breakthrough'},
                        {text: 'Fade', link: '/guide/transitions/fade'},
                        {text: 'Overlay', link: '/guide/transitions/overlay'},
                        {text: 'Route', link: '/guide/transitions/route'},
                        {text: 'Slide over', link: '/guide/transitions/slide-over'},
                        {text: 'Tooltip', link: '/guide/transitions/tooltip'},
                        {text: 'Vertical window', link: '/guide/transitions/vertical-window'},
                        {text: 'Window', link: '/guide/transitions/window'}
                    ]
                }
            ],
            '/dashboard/': [
                {
                    text: 'Dashboard',
                    items: [
                        {text: 'Installation', link: '/dashboard/'}
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
                        {text: 'useClickOutside', link: '/internals/composables/useClickOutside'},
                        {text: 'useComponentId', link: '/internals/composables/useComponentId'},
                        {text: 'useDebouncedRef', link: '/internals/composables/useDebouncedRef'},
                        {text: 'useEventListener', link: '/internals/composables/useEventListener'},
                        {text: 'useFocusTrap', link: '/internals/composables/useFocusTrap'},
                        {text: 'useFocusTrapLock', link: '/internals/composables/useFocusTrapLock'},
                        {text: 'useFocusTrapReturn', link: '/internals/composables/useFocusTrapReturn'},
                        {text: 'useFocusTrapSubscription', link: '/internals/composables/useFocusTrapSubscription'},
                        {text: 'useFocusZone', link: '/internals/composables/useFocusZone'},
                        {text: 'useInterval', link: '/internals/composables/useInterval'},
                        {text: 'useInView', link: '/internals/composables/useInView'},
                        {text: 'useMutationObserver', link: '/internals/composables/useMutationObserver'},
                        {text: 'useRemembered', link: '/internals/composables/useRemembered'}
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
                        {text: 'flattenVNodeTree', link: '/internals/utils/flattenVNodeTree'},
                        {text: 'getBidirectionalFocusElement', link: '/internals/utils/getBidirectionalFocusElement'},
                        {text: 'getComponentName', link: '/internals/utils/getComponentName'},
                        {text: 'getComponentProps', link: '/internals/utils/getComponentProps'},
                        {text: 'getExposedRef', link: '/internals/utils/getExposedRef'},
                        {text: 'getFocusableElement', link: '/internals/utils/getFocusableElement'},
                        {text: 'getFocusableElements', link: '/internals/utils/getFocusableElements'},
                        {text: 'getKeyboardFocusableElements', link: '/internals/utils/getKeyboardFocusableElements'},
                        {text: 'unrefTemplateElement', link: '/internals/utils/unrefTemplateElement'}
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
