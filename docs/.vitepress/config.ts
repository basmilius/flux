import { createHash } from 'node:crypto';
import { defineConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import className from 'css-class-generator';
import examplePlugin from 'vitepress-plugin-example';
import renderPlugin from 'vitepress-plugin-render';
import componentNavigation from './component-navigation';

export default defineConfig({
    title: 'Flux',
    titleTemplate: ':title — Flux',
    description: 'Component library for Vue 3.',
    ignoreDeadLinks: true,
    markdown: {
        config(md) {
            md.use(examplePlugin);
            md.use(renderPlugin);
            md.use(groupIconMdPlugin);
        }
    },
    vite: {
        plugins: [
            groupIconVitePlugin() as any
        ],
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
                    {text: 'Components', link: '/guide/components/'},
                    {text: 'Transitions', link: '/guide/transitions/breakthrough'}
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
                componentNavigation,
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
