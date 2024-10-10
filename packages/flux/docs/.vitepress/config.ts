import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
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
        },
        resolve: {
            alias: {
                '@basmilius/flux': resolve(__dirname, '../../src/index-nostyle.ts'),
                '@': resolve(__dirname, '../../src')
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
                    {text: 'Introduction', link: '/guide/introduction/what-is-flux.html'},
                    {text: 'Components', link: '/guide/components/index.html'}
                ]
            },
            {
                text: 'Layouts',
                link: '/layouts/index.html',
                activeMatch: '/layouts/'
            },
            {
                text: 'Examples',
                link: '/examples/index.html',
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
                        {text: 'What is Flux', link: '/guide/introduction/what-is-flux.html'},
                        {text: 'Installation', link: '/guide/introduction/installation.html'},
                        {text: 'Translations', link: '/guide/introduction/translations.html'},
                        {text: 'Colors', link: '/guide/introduction/colors.html'},
                        {text: 'Font Awesome', link: '/guide/introduction/font-awesome.html'}
                    ]
                },
                {
                    text: 'Components',
                    collapsed: false,
                    items: [
                        {text: 'Overview', link: '/guide/components/index.html'},
                        {text: 'Action', link: '/guide/components/action.html'},
                        {text: 'Action bar', link: '/guide/components/action-bar.html'},
                        {text: 'Action pane', link: '/guide/components/action-pane.html'},
                        {
                            text: 'Attention',
                            collapsed: true,
                            items: [

                                {text: 'Alert', link: '/guide/components/attention/alert.html'},
                                {text: 'Confirm', link: '/guide/components/attention/confirm.html'},
                                {text: 'Notice', link: '/guide/components/attention/notice.html'},
                                {text: 'Prompt', link: '/guide/components/attention/prompt.html'},
                                {text: 'Snackbar', link: '/guide/components/attention/snackbar.html'}
                            ]
                        },
                        {text: 'Avatar', link: '/guide/components/avatar.html'},
                        {text: 'Badge', link: '/guide/components/badge.html'},
                        {text: 'Button', link: '/guide/components/button.html'},
                        {text: 'Button group', link: '/guide/components/button-group.html'},
                        {text: 'Calendar', link: '/guide/components/calendar.html'},
                        {text: 'Chip', link: '/guide/components/chip.html'},
                        {text: 'Color picker', link: '/guide/components/color-picker.html'},
                        {text: 'Color select', link: '/guide/components/color-select.html'},
                        {text: 'Comment', link: '/guide/components/comment.html'},
                        {text: 'Data table', link: '/guide/components/data-table.html'},
                        {text: 'Divider', link: '/guide/components/divider.html'},
                        {text: 'Drop zone', link: '/guide/components/drop-zone.html'},
                        {text: 'Dynamic view', link: '/guide/components/dynamic-view.html'},
                        {text: 'Expandable', link: '/guide/components/expandable.html'},
                        {text: 'Fader', link: '/guide/components/fader.html'},
                        {text: 'Filter', link: '/guide/components/filter.html'},
                        {text: 'Flyout', link: '/guide/components/flyout.html'},
                        {
                            text: 'Focal point',
                            collapsed: true,
                            items: [
                                {text: 'Editor', link: '/guide/components/focal-point/editor.html'},
                                {text: 'Image', link: '/guide/components/focal-point/image.html'}
                            ]
                        },
                        {
                            text: 'Form',
                            collapsed: true,
                            items: [
                                {text: 'Form', link: '/guide/components/form/index.html'},
                                {text: 'Checkbox', link: '/guide/components/form/checkbox.html'},
                                {text: 'Toggle', link: '/guide/components/form/toggle.html'},
                                {text: 'Date / time', link: '/guide/components/form/date-time.html'},
                                {text: 'Field', link: '/guide/components/form/field.html'},
                                {text: 'Input', link: '/guide/components/form/input.html'},
                                {text: 'Pin input', link: '/guide/components/form/pin-input.html'},
                                {text: 'Quantity selector', link: '/guide/components/form/quantity-selector.html'},
                                {text: 'Range slider', link: '/guide/components/form/range-slider.html'},
                                {text: 'Select', link: '/guide/components/form/select.html'},
                                {text: 'Slider', link: '/guide/components/form/slider.html'},
                                {text: 'Text area', link: '/guide/components/form/text-area.html'},
                                {text: 'Time zone picker', link: '/guide/components/form/time-zone-picker.html'}
                            ]
                        },
                        {text: 'Gallery', link: '/guide/components/gallery.html'},
                        {text: 'Icon', link: '/guide/components/icon.html'},
                        {text: 'Info', link: '/guide/components/info.html'},
                        {
                            text: 'Layout',
                            collapsed: true,
                            items: [
                                {text: 'Aspect ratio', link: '/guide/components/layout/aspect-ratio.html'},
                                {text: 'Auto grid', link: '/guide/components/layout/auto-grid.html'},
                                {text: 'Container', link: '/guide/components/layout/container.html'},
                                {text: 'Grid', link: '/guide/components/layout/grid.html'},
                                {text: 'Spacer', link: '/guide/components/layout/spacer.html'},
                                {text: 'Spacing', link: '/guide/components/layout/spacing.html'},
                                {text: 'Stack', link: '/guide/components/layout/stack.html'}
                            ]
                        },
                        {text: 'Legend', link: '/guide/components/legend.html'},
                        {text: 'Link', link: '/guide/components/link.html'},
                        {text: 'Menu', link: '/guide/components/menu.html'},
                        {text: 'Overlay', link: '/guide/components/overlay.html'},
                        {text: 'Pagination', link: '/guide/components/pagination.html'},
                        {text: 'Pane', link: '/guide/components/pane.html'},
                        {text: 'Percentage bar', link: '/guide/components/percentage-bar.html'},
                        {text: 'Persona', link: '/guide/components/persona.html'},
                        {text: 'Placeholder', link: '/guide/components/placeholder.html'},
                        {text: 'Progress bar', link: '/guide/components/progress-bar.html'},
                        {text: 'Remove', link: '/guide/components/remove.html'},
                        {text: 'Root', link: '/guide/components/root.html'},
                        {text: 'Segmented control', link: '/guide/components/segmented-control.html'},
                        {text: 'Separator', link: '/guide/components/separator.html'},
                        {text: 'Slide over', link: '/guide/components/slide-over.html'},
                        {text: 'Spinner', link: '/guide/components/spinner.html'},
                        {text: 'Split button', link: '/guide/components/split-button.html'},
                        {text: 'Statistic', link: '/guide/components/statistic.html'},
                        {text: 'Stepper', link: '/guide/components/stepper.html'},
                        {text: 'Tabs', link: '/guide/components/tabs.html'},
                        {text: 'Table', link: '/guide/components/table.html'},
                        {text: 'Tag', link: '/guide/components/tag.html'},
                        {text: 'Ticks', link: '/guide/components/ticks.html'},
                        {text: 'Timeline', link: '/guide/components/timeline.html'},
                        {text: 'Toolbar', link: '/guide/components/toolbar.html'},
                        {text: 'Tooltip', link: '/guide/components/tooltip.html'},
                        {
                            text: 'Visual',
                            collapsed: true,
                            items: [
                                {text: 'Animated colors', link: '/guide/components/visual/animated-colors.html'},
                                {text: 'Border shine', link: '/guide/components/visual/border-shine.html'},
                                {text: 'Dot pattern', link: '/guide/components/visual/dot-pattern.html'},
                                {text: 'Flickering grid', link: '/guide/components/visual/flickering-grid.html'},
                                {text: 'Grid pattern', link: '/guide/components/visual/grid-pattern.html'}
                            ]
                        },
                        {text: 'Window', link: '/guide/components/window.html'}
                    ]
                },
                {
                    text: 'Transitions',
                    collapsed: false,
                    items: [
                        {text: 'Breakthrough', link: '/guide/transitions/breakthrough.html'},
                        {text: 'Fade', link: '/guide/transitions/breakthrough.html'},
                        {text: 'Overlay', link: '/guide/transitions/breakthrough.html'},
                        {text: 'Route', link: '/guide/transitions/breakthrough.html'},
                        {text: 'Slide over', link: '/guide/transitions/breakthrough.html'},
                        {text: 'Tooltip', link: '/guide/transitions/breakthrough.html'},
                        {text: 'Vertical window', link: '/guide/transitions/breakthrough.html'},
                        {text: 'Window', link: '/guide/transitions/breakthrough.html'}
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
