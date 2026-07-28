import { composeLibrary, preset } from '@basmilius/vite-preset';
import { defineFilterMacro } from '@flux-ui/components/vite';
import { defineConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import examplePlugin from 'vitepress-plugin-example';
import renderPlugin from 'vitepress-plugin-render';
import llmstxt from 'vitepress-plugin-llms';
import componentNavigation from './component-navigation';

// composeLibrary writes a missing path alias into docs/tsconfig.json using an absolute
// path by default, which is machine bound. Keep it relative to the docs directory.
const composeFluxLibrary = (name: string, alias: string) => composeLibrary({
    name,
    alias,
    tsAliasPathGenerator: () => `./node_modules/${name}/src/*`
});

export const flux = composeFluxLibrary('@flux-ui/components', '~flux/components');
export const fluxAi = composeFluxLibrary('@flux-ui/ai', '~flux/ai');
export const fluxApplication = composeFluxLibrary('@flux-ui/application', '~flux/application');
export const fluxStatistics = composeFluxLibrary('@flux-ui/statistics', '~flux/statistics');
export const fluxVisuals = composeFluxLibrary('@flux-ui/visuals', '~flux/visuals');
export const fluxFlow = composeFluxLibrary('@flux-ui/flow', '~flux/flow');

export default defineConfig({
    title: 'Flux',
    titleTemplate: ':title — Flux',
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

            // VitePress derives env.title inside md.renderer.render, which md.renderInline also calls.
            // Restore it so rendering an example description does not wipe the resolved page title.
            const renderInline = md.renderInline.bind(md);

            md.renderInline = (src, env) => {
                const title = env?.title;
                const html = renderInline(src, env);

                if (env) {
                    env.title = title;
                }

                return html;
            };
        }
    },
    vite: {
        build: {
            cssTarget: 'chrome120'
        },
        plugins: [
            groupIconVitePlugin() as any,
            defineFilterMacro(),
            preset({
                cssModules: {
                    classNames: 'camel',
                    prefix: 'f_'
                },
                fileNames: 'actual'
            }),
            flux(),
            fluxAi(),
            fluxApplication(),
            fluxStatistics(),
            fluxVisuals(),
            fluxFlow(),
            llmstxt({
                domain: 'https://flux-ui.dev',
                generateLLMsTxt: true,
                generateLLMsFullTxt: true,
                generateLLMFriendlyDocsForEachPage: true,
                injectLLMHint: true
            })
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
                    {text: 'API', link: '/guide/api/useFluxStore'}
                ]
            },
            {
                text: 'Components',
                activeMatch: '^/components/',
                link: '/components/'
            },
            {
                text: 'Packages',
                activeMatch: '/(ai|application|flow|internals|statistics|visuals)/',
                items: [
                    {text: 'AI', link: '/ai/'},
                    {text: 'Application', link: '/application/'},
                    {text: 'Flow', link: '/flow/'},
                    {text: 'Internals', link: '/internals/'},
                    {text: 'Statistics', link: '/statistics/'},
                    {text: 'Visuals', link: '/visuals/'}
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
                        {text: 'Font Awesome', link: '/guide/introduction/font-awesome'},
                        {text: 'Upgrading to v4', link: '/guide/introduction/upgrading-v4'}
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
                }
            ],
            '/components/': componentNavigation,
            '/flow/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {text: 'What is Flux Flow?', link: '/flow/'},
                        {text: 'Installation', link: '/flow/introduction/installation'},
                        {text: 'Translations', link: '/flow/introduction/translations'}
                    ]
                },
                {
                    text: 'Components',
                    collapsed: false,
                    items: [
                        {text: 'Flow', link: '/flow/components/flow'},
                        {text: 'Node', link: '/flow/components/node'},
                        {text: 'Chain', link: '/flow/components/chain'},
                        {text: 'Graph', link: '/flow/components/graph'},
                        {text: 'Connection', link: '/flow/components/connection'},
                        {text: 'Port', link: '/flow/components/port'},
                        {
                            text: 'Card',
                            link: '/flow/components/card',
                            collapsed: true,
                            items: [
                                {text: 'Action card', link: '/flow/components/action-card'},
                                {text: 'Condition card', link: '/flow/components/condition-card'},
                                {text: 'Trigger card', link: '/flow/components/trigger-card'}
                            ]
                        },
                        {text: 'Pill', link: '/flow/components/pill'},
                        {text: 'Step', link: '/flow/components/step'},
                        {text: 'Terminal', link: '/flow/components/terminal'},
                        {text: 'Junction', link: '/flow/components/junction'},
                        {text: 'Gate', link: '/flow/components/gate'},
                        {text: 'Group', link: '/flow/components/group'},
                        {text: 'Lane', link: '/flow/components/lane'},
                        {text: 'Note', link: '/flow/components/note'},
                        {text: 'Panel', link: '/flow/components/panel'},
                        {text: 'Controls', link: '/flow/components/controls'},
                        {text: 'Minimap', link: '/flow/components/minimap'}
                    ]
                },
                {
                    text: 'Composables',
                    collapsed: false,
                    items: [
                        {text: 'useFlowLayout', link: '/flow/composables/useFlowLayout'},
                        {text: 'useFlowTrunkLayout', link: '/flow/composables/useFlowTrunkLayout'},
                        {text: 'useFluxFlowInjection', link: '/flow/composables/useFluxFlowInjection'}
                    ]
                },
                {
                    text: 'Examples',
                    collapsed: false,
                    items: [
                        {text: 'Overview', link: '/flow/examples'}
                    ]
                }
            ],
            '/ai/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {text: 'What is Flux AI?', link: '/ai/'},
                        {text: 'Installation', link: '/ai/introduction/installation'},
                        {text: 'Configuration', link: '/ai/introduction/configuration'},
                        {text: 'Translations', link: '/ai/introduction/translations'}
                    ]
                },
                {
                    text: 'Components',
                    collapsed: false,
                    items: [
                        {text: 'Conversation', link: '/ai/components/conversation'},
                        {text: 'Message', link: '/ai/components/message'},
                        {text: 'Prompt input', link: '/ai/components/prompt-input'},
                        {text: 'Streaming text', link: '/ai/components/streaming-text'},
                        {text: 'Code block', link: '/ai/components/code-block'},
                        {text: 'Reasoning', link: '/ai/components/reasoning'},
                        {text: 'Tool call', link: '/ai/components/tool-call'},
                        {text: 'Citation', link: '/ai/components/citation'},
                        {text: 'Suggestions', link: '/ai/components/suggestions'},
                        {text: 'Model select', link: '/ai/components/model-select'},
                        {text: 'Usage', link: '/ai/components/usage'}
                    ]
                },
                {
                    text: 'Composables',
                    collapsed: false,
                    items: [
                        {text: 'useStreamingMarkdown', link: '/ai/composables/useStreamingMarkdown'}
                    ]
                }
            ],
            '/application/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {text: 'What is Flux Application?', link: '/application/'},
                        {text: 'Installation', link: '/application/introduction/installation'},
                        {text: 'Translations', link: '/application/introduction/translations'}
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
                                {text: 'Context switcher', link: '/application/components/menu/context-switcher'},
                                {text: 'Promo', link: '/application/components/menu/promo'},
                                {text: 'Toggle', link: '/application/components/menu/toggle'}
                            ]
                        },
                        {text: 'Page header', link: '/application/components/page-header'},
                        {text: 'Section', link: '/application/components/section'},
                        {text: 'Side', link: '/application/components/side'},
                        {text: 'Status page', link: '/application/components/status-page'},
                        {text: 'Top', link: '/application/components/top'}
                    ]
                },
                {
                    text: 'Composables',
                    collapsed: false,
                    items: [
                        {text: 'useApplicationContextMenu', link: '/application/composables/useApplicationContextMenu'},
                        {text: 'useApplicationContextRegistration', link: '/application/composables/useApplicationContextRegistration'},
                        {text: 'useApplicationInjection', link: '/application/composables/useApplicationInjection'},
                        {text: 'useApplicationMenu', link: '/application/composables/useApplicationMenu'}
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
                        {text: 'Chart colors', link: '/statistics/introduction/colors'},
                        {text: 'Chart types', link: '/statistics/introduction/types'}
                    ]
                },
                {
                    text: 'Components',
                    collapsed: false,
                    items: [
                        {text: 'Base', link: '/statistics/components/base'},
                        {text: 'Change', link: '/statistics/components/change'},
                        {
                            text: 'Charts',
                            link: '/statistics/components/charts/',
                            collapsed: true,
                            items: [
                                {text: 'Area', link: '/statistics/components/charts/area'},
                                {text: 'Bar', link: '/statistics/components/charts/bar'},
                                {text: 'Box plot', link: '/statistics/components/charts/box-plot'},
                                {text: 'Bubble', link: '/statistics/components/charts/bubble'},
                                {text: 'Candlestick', link: '/statistics/components/charts/candlestick'},
                                {text: 'Donut', link: '/statistics/components/charts/donut'},
                                {text: 'Heatmap', link: '/statistics/components/charts/heatmap'},
                                {text: 'Line', link: '/statistics/components/charts/line'},
                                {text: 'Mixed', link: '/statistics/components/charts/mixed'},
                                {text: 'Pie', link: '/statistics/components/charts/pie'},
                                {text: 'Polar area', link: '/statistics/components/charts/polar-area'},
                                {text: 'Radar', link: '/statistics/components/charts/radar'},
                                {text: 'Radial bar', link: '/statistics/components/charts/radial-bar'},
                                {text: 'Scatter', link: '/statistics/components/charts/scatter'},
                                {text: 'Treemap', link: '/statistics/components/charts/treemap'}
                            ]
                        },
                        {text: 'Chart pane', link: '/statistics/components/chart-pane'},
                        {text: 'Comparison', link: '/statistics/components/comparison'},
                        {
                            text: 'Details table',
                            link: '/statistics/components/details-table/',
                            collapsed: true,
                            items: [
                                {text: 'Row', link: '/statistics/components/details-table/row'}
                            ]
                        },
                        {text: 'Empty', link: '/statistics/components/empty'},
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
                        {text: 'Legend scope', link: '/statistics/components/legend-scope'},
                        {text: 'Meter', link: '/statistics/components/meter'},
                        {text: 'Metric', link: '/statistics/components/metric'},
                        {text: 'Percentage bar', link: '/statistics/components/percentage-bar'},
                        {text: 'Sparkline', link: '/statistics/components/sparkline'},
                        {
                            text: 'Tracker',
                            link: '/statistics/components/tracker/',
                            collapsed: true,
                            items: [
                                {text: 'Entry', link: '/statistics/components/tracker/entry'},
                                {text: 'Label', link: '/statistics/components/tracker/label'},
                                {text: 'Step', link: '/statistics/components/tracker/step'},
                                {text: 'Steps', link: '/statistics/components/tracker/steps'}
                            ]
                        },
                        {
                            text: 'Tracker card',
                            link: '/statistics/components/tracker-card/',
                            collapsed: true,
                            items: [
                                {text: 'Segment', link: '/statistics/components/tracker-card/segment'}
                            ]
                        }
                    ]
                },
                {
                    text: 'Composables',
                    collapsed: false,
                    items: [
                        {text: 'useChartBaseSetup', link: '/statistics/composables/useChartBaseSetup'},
                        {text: 'useChartHoverSync', link: '/statistics/composables/useChartHoverSync'},
                        {text: 'useChartLegend', link: '/statistics/composables/useChartLegend'},
                        {text: 'useChartSeriesSetup', link: '/statistics/composables/useChartSeriesSetup'},
                        {text: 'useChartSlicesSetup', link: '/statistics/composables/useChartSlicesSetup'},
                        {text: 'useECharts', link: '/statistics/composables/useECharts'},
                        {text: 'useLegendVariant', link: '/statistics/composables/useLegendVariant'},
                        {text: 'useTracker', link: '/statistics/composables/useTracker'}
                    ]
                }
            ],
            '/visuals/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {text: 'What is Flux Visuals?', link: '/visuals/'},
                        {text: 'Installation', link: '/visuals/introduction/installation'}
                    ]
                },
                {
                    text: 'Components',
                    collapsed: false,
                    items: [
                        {text: 'Animated colors', link: '/visuals/components/animated-colors'},
                        {text: 'Attention', link: '/visuals/components/attention'},
                        {text: 'Border beam', link: '/visuals/components/border-beam'},
                        {text: 'Border shine', link: '/visuals/components/border-shine'},
                        {text: 'Dot pattern', link: '/visuals/components/dot-pattern'},
                        {text: 'Flickering grid', link: '/visuals/components/flickering-grid'},
                        {text: 'Grid pattern', link: '/visuals/components/grid-pattern'},
                        {text: 'Highlighter', link: '/visuals/components/highlighter'},
                        {text: 'Highlighter group', link: '/visuals/components/highlighter-group'},
                        {text: 'Noise', link: '/visuals/components/noise'},
                        {text: 'Number flow', link: '/visuals/components/number-flow'},
                        {text: 'Pane illustration', link: '/visuals/components/pane-illustration'},
                        {text: 'Ping', link: '/visuals/components/ping'},
                        {text: 'Slot text', link: '/visuals/components/slot-text'},
                        {text: 'Text scramble', link: '/visuals/components/text-scramble'},
                        {text: 'Text shimmer', link: '/visuals/components/text-shimmer'}
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
                        {text: 'useCalendarTimeGrid', link: '/internals/composables/useCalendarTimeGrid'},
                        {text: 'useCalendarYearSwitcher', link: '/internals/composables/useCalendarYearSwitcher'},
                        {text: 'useEventListener', link: '/internals/composables/useEventListener'},
                        {text: 'useFocusTrap', link: '/internals/composables/useFocusTrap'},
                        {text: 'useFocusTrapLock', link: '/internals/composables/useFocusTrapLock'},
                        {text: 'useFocusTrapReturn', link: '/internals/composables/useFocusTrapReturn'},
                        {text: 'useFocusTrapSubscription', link: '/internals/composables/useFocusTrapSubscription'},
                        {text: 'useFocusZone', link: '/internals/composables/useFocusZone'},
                        {text: 'useInView', link: '/internals/composables/useInView'},
                        {text: 'useKeyboardGrab', link: '/internals/composables/useKeyboardGrab'},
                        {text: 'usePointerDrag', link: '/internals/composables/usePointerDrag'},
                        {text: 'useRemembered', link: '/internals/composables/useRemembered'},
                        {text: 'useScrollPosition', link: '/internals/composables/useScrollPosition'},
                        {text: 'useSpring', link: '/internals/composables/useSpring'},
                        {text: 'useVirtualList', link: '/internals/composables/useVirtualList'}
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
                        {text: 'isActiveElement', link: '/internals/utils/isActiveElement'},
                        {text: 'isSSR', link: '/internals/utils/isSSR'},
                        {text: 'prefersReducedMotion', link: '/internals/utils/prefersReducedMotion'},
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
