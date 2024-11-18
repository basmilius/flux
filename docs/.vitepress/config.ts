import { createHash } from 'node:crypto';
import { defineConfig } from 'vitepress';
import className from 'css-class-generator';

export default defineConfig({
    title: 'Flux',
    titleTemplate: ':title — Flux',
    description: 'Component library for Vue 3.',
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler'
                }
            },
            modules: {
                generateScopedName(name: string): string {
                    if (name.startsWith('i__const_')) {
                        name = name.substring(9);
                        name = name.substring(0, name.length - 2);
                    }

                    const hash = createHash('sha1')
                        .update(name)
                        .digest('hex')
                        .substring(0, 5);

                    return className(parseInt(hash, 16));
                }
            }
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
                activeMatch: '/guide/',
                items: [
                    {text: 'Introduction', link: '/guide/introduction/what-is-flux'},
                    {text: 'Components', link: '/guide/components/'}
                ]
            },
            {
                text: 'Layouts',
                link: '/layouts',
                activeMatch: '/layouts/'
            },
            {
                text: 'Examples',
                link: '/examples',
                activeMatch: '/examples/'
            }
        ],

        footer: {
            message: 'Released under the <a href="https://github.com/basmilius/flux/blob/main/LICENSE">MIT License</a>.',
            copyright: 'Copyright © 2023-present <a href="https://github.com/basmilius">Bas Milius</a>'
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
                {
                    text: 'Components',
                    collapsed: false,
                    items: [
                        {text: 'Overview', link: '/guide/components/index'},
                        {text: 'Action', link: '/guide/components/action'},
                        {text: 'Action bar', link: '/guide/components/action-bar'},
                        {text: 'Action pane', link: '/guide/components/action-pane'},
                        {
                            text: 'Attention',
                            collapsed: true,
                            items: [

                                {text: 'Alert', link: '/guide/components/attention/alert'},
                                {text: 'Confirm', link: '/guide/components/attention/confirm'},
                                {text: 'Notice', link: '/guide/components/attention/notice'},
                                {text: 'Prompt', link: '/guide/components/attention/prompt'},
                                {text: 'Snackbar', link: '/guide/components/attention/snackbar'}
                            ]
                        },
                        {text: 'Avatar', link: '/guide/components/avatar'},
                        {text: 'Badge', link: '/guide/components/badge'},
                        {text: 'Boxed icon', link: '/guide/components/boxed-icon'},
                        {text: 'Button', link: '/guide/components/button'},
                        {text: 'Button group', link: '/guide/components/button-group'},
                        {text: 'Calendar', link: '/guide/components/calendar'},
                        {text: 'Chip', link: '/guide/components/chip'},
                        {text: 'Color picker', link: '/guide/components/color-picker'},
                        {text: 'Color select', link: '/guide/components/color-select'},
                        {text: 'Comment', link: '/guide/components/comment'},
                        {text: 'Data table', link: '/guide/components/data-table'},
                        {text: 'Divider', link: '/guide/components/divider'},
                        {text: 'Drop zone', link: '/guide/components/drop-zone'},
                        {text: 'Dynamic view', link: '/guide/components/dynamic-view'},
                        {text: 'Expandable', link: '/guide/components/expandable'},
                        {text: 'Expandable group', link: '/guide/components/expandable-group'},
                        {text: 'Fader', link: '/guide/components/fader'},
                        {text: 'Filter', link: '/guide/components/filter'},
                        {text: 'Flyout', link: '/guide/components/flyout'},
                        {
                            text: 'Focal point',
                            collapsed: true,
                            items: [
                                {text: 'Editor', link: '/guide/components/focal-point/editor'},
                                {text: 'Image', link: '/guide/components/focal-point/image'}
                            ]
                        },
                        {
                            text: 'Form',
                            collapsed: true,
                            items: [
                                {text: 'Form', link: '/guide/components/form/index'},
                                {text: 'Checkbox', link: '/guide/components/form/checkbox'},
                                {text: 'Toggle', link: '/guide/components/form/toggle'},
                                {text: 'Date / time', link: '/guide/components/form/date-time'},
                                {text: 'Field', link: '/guide/components/form/field'},
                                {text: 'Input', link: '/guide/components/form/input'},
                                {text: 'Pin input', link: '/guide/components/form/pin-input'},
                                {text: 'Quantity selector', link: '/guide/components/form/quantity-selector'},
                                {text: 'Range slider', link: '/guide/components/form/range-slider'},
                                {text: 'Select', link: '/guide/components/form/select'},
                                {text: 'Slider', link: '/guide/components/form/slider'},
                                {text: 'Text area', link: '/guide/components/form/text-area'},
                                {text: 'Time zone picker', link: '/guide/components/form/time-zone-picker'}
                            ]
                        },
                        {text: 'Gallery', link: '/guide/components/gallery'},
                        {text: 'Icon', link: '/guide/components/icon'},
                        {text: 'Info', link: '/guide/components/info'},
                        {
                            text: 'Layout',
                            collapsed: true,
                            items: [
                                {text: 'Aspect ratio', link: '/guide/components/layout/aspect-ratio'},
                                {text: 'Auto grid', link: '/guide/components/layout/auto-grid'},
                                {text: 'Container', link: '/guide/components/layout/container'},
                                {text: 'Grid', link: '/guide/components/layout/grid'},
                                {text: 'Spacer', link: '/guide/components/layout/spacer'},
                                {text: 'Spacing', link: '/guide/components/layout/spacing'},
                                {text: 'Stack', link: '/guide/components/layout/stack'}
                            ]
                        },
                        {text: 'Legend', link: '/guide/components/legend'},
                        {text: 'Link', link: '/guide/components/link'},
                        {
                            text: 'Menu',
                            collapsed: true,
                            items: [
                                {text: 'Container', link: '/guide/components/menu/container'},
                                {text: 'Group', link: '/guide/components/menu/group'},
                                {text: 'Item', link: '/guide/components/menu/item'},
                                {text: 'Options', link: '/guide/components/menu/options'},
                                {text: 'Sub header', link: '/guide/components/menu/sub-header'},
                                {text: 'Title', link: '/guide/components/menu/title'}
                            ]
                        },
                        {text: 'Overlay', link: '/guide/components/overlay'},
                        {text: 'Pagination', link: '/guide/components/pagination'},
                        {text: 'Pane', link: '/guide/components/pane'},
                        {text: 'Percentage bar', link: '/guide/components/percentage-bar'},
                        {text: 'Persona', link: '/guide/components/persona'},
                        {text: 'Placeholder', link: '/guide/components/placeholder'},
                        {text: 'Progress bar', link: '/guide/components/progress-bar'},
                        {text: 'Remove', link: '/guide/components/remove'},
                        {text: 'Root', link: '/guide/components/root'},
                        {text: 'Segmented control', link: '/guide/components/segmented-control'},
                        {text: 'Separator', link: '/guide/components/separator'},
                        {text: 'Slide over', link: '/guide/components/slide-over'},
                        {text: 'Spinner', link: '/guide/components/spinner'},
                        {text: 'Split button', link: '/guide/components/split-button'},
                        {text: 'Statistic', link: '/guide/components/statistic'},
                        {text: 'Stepper', link: '/guide/components/stepper'},
                        {text: 'Tabs', link: '/guide/components/tabs'},
                        {text: 'Table', link: '/guide/components/table'},
                        {text: 'Tag', link: '/guide/components/tag'},
                        {text: 'Ticks', link: '/guide/components/ticks'},
                        {text: 'Timeline', link: '/guide/components/timeline'},
                        {text: 'Toolbar', link: '/guide/components/toolbar'},
                        {text: 'Tooltip', link: '/guide/components/tooltip'},
                        {
                            text: 'Visual',
                            collapsed: true,
                            items: [
                                {text: 'Animated colors', link: '/guide/components/visual/animated-colors'},
                                {text: 'Border shine', link: '/guide/components/visual/border-shine'},
                                {text: 'Dot pattern', link: '/guide/components/visual/dot-pattern'},
                                {text: 'Flickering grid', link: '/guide/components/visual/flickering-grid'},
                                {text: 'Grid pattern', link: '/guide/components/visual/grid-pattern'}
                            ]
                        },
                        {text: 'Window', link: '/guide/components/window'}
                    ]
                },
                {
                    text: 'Transitions',
                    collapsed: false,
                    items: [
                        {text: 'Breakthrough', link: '/guide/transitions/breakthrough'},
                        {text: 'Fade', link: '/guide/transitions/breakthrough'},
                        {text: 'Overlay', link: '/guide/transitions/breakthrough'},
                        {text: 'Route', link: '/guide/transitions/breakthrough'},
                        {text: 'Slide over', link: '/guide/transitions/breakthrough'},
                        {text: 'Tooltip', link: '/guide/transitions/breakthrough'},
                        {text: 'Vertical window', link: '/guide/transitions/breakthrough'},
                        {text: 'Window', link: '/guide/transitions/breakthrough'}
                    ]
                }
            ],
            '/examples/': [
                {
                    text: 'Examples',
                    link: '/examples',
                    items: [
                        {text: 'Dashboard', link: '/examples/dashboard'},
                        {text: 'Form', link: '/examples/form'},
                        {text: 'Sign in', link: '/examples/sign-in'},
                        {text: 'Data table', link: '/examples/data-table'}
                    ]
                }
            ],
            '/layouts/': [
                {
                    text: 'Layouts',
                    link: '/layouts',
                    items: [
                        {text: 'Dashboard', link: '/layouts/dashboard'}
                    ]
                }
            ]
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/basmilius/flux'},
            {icon: 'npm', link: 'https://www.npmjs.com/package/@basmilius/flux'}
        ]
    }
});
