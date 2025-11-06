const navigation: SidebarItem = {
    text: 'Components',
    collapsed: false,
    items: [
        {text: 'Overview', link: '/guide/components/'},
        {text: 'Action', link: '/guide/components/action', image: '/assets/components/action.svg'},
        {text: 'Action bar', link: '/guide/components/action-bar'},
        {text: 'Action pane', link: '/guide/components/action-pane'},
        {
            text: 'Attention',
            link: '/guide/components/attention/',
            collapsed: true,
            items: [
                {text: 'Alert', link: '/guide/components/attention/alert', image: '/assets/components/attention-alert.svg'},
                {text: 'Confirm', link: '/guide/components/attention/confirm', image: '/assets/components/attention-confirm.svg'},
                {text: 'Notice', link: '/guide/components/attention/notice', image: '/assets/components/attention-notice.svg'},
                {text: 'Prompt', link: '/guide/components/attention/prompt', image: '/assets/components/attention-prompt.svg'},
                {text: 'Snackbar', link: '/guide/components/attention/snackbar', image: '/assets/components/attention-snackbar.svg'}
            ]
        },
        {text: 'Avatar', link: '/guide/components/avatar', image: '/assets/components/avatar.svg'},
        {text: 'Badge', link: '/guide/components/badge'},
        {text: 'Boxed icon', link: '/guide/components/boxed-icon', image: '/assets/components/boxed-icon.svg'},
        {
            text: 'Button',
            link: '/guide/components/button/',
            collapsed: true,
            items: [
                {text: 'Primary', link: '/guide/components/button/primary'},
                {text: 'Secondary', link: '/guide/components/button/secondary'},
                {text: 'Destructive', link: '/guide/components/button/destructive'},
                {text: 'Publish', link: '/guide/components/button/publish'},
                {text: 'Group', link: '/guide/components/button/group'},
                {text: 'Split', link: '/guide/components/button/split'}
            ]
        },
        {
            text: 'Calendar',
            link: '/guide/components/calendar/',
            collapsed: true,
            items: [
                {text: 'Event', link: '/guide/components/calendar/event'},
            ]
        },
        {text: 'Chip', link: '/guide/components/chip'},
        {
            text: 'Color',
            collapsed: true,
            items: [
                {text: 'Picker', link: '/guide/components/color/picker'},
                {text: 'Select', link: '/guide/components/color/select'},
            ]
        },
        {text: 'Comment', link: '/guide/components/comment', image: '/assets/components/comment.svg'},
        {text: 'Data table', link: '/guide/components/data-table'},
        {text: 'Date picker', link: '/guide/components/date-picker'},
        {text: 'Divider', link: '/guide/components/divider'},
        {text: 'Drop zone', link: '/guide/components/drop-zone'},
        {text: 'Dynamic view', link: '/guide/components/dynamic-view'},
        {
            text: 'Expandable',
            link: '/guide/components/expandable/',
            collapsed: true,
            items: [
                {text: 'Group', link: '/guide/components/expandable/group'},
            ]
        },
        {text: 'Fader', link: '/guide/components/fader'},
        {
            text: 'Filter',
            link: '/guide/components/filter/',
            image: null,
            collapsed: true,
            items: [
                {text: 'Date', link: '/guide/components/filter/date'},
                {text: 'Date range', link: '/guide/components/filter/date-range'},
                {text: 'Option', link: '/guide/components/filter/option'},
                {text: 'Options', link: '/guide/components/filter/options'},
                {text: 'Range', link: '/guide/components/filter/range'},
                {text: 'Async option', link: '/guide/components/filter/async-option'},
                {text: 'Async options', link: '/guide/components/filter/async-options'}
            ]
        },
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
            link: '/guide/components/form/',
            image: null,
            collapsed: true,
            items: [
                {text: 'Column', link: '/guide/components/form/column'},
                {text: 'Row', link: '/guide/components/form/row'},
                {text: 'Checkbox', link: '/guide/components/form/checkbox'},
                {text: 'Date', link: '/guide/components/form/date'},
                {text: 'Date time', link: '/guide/components/form/date-time'},
                {
                    text: 'Field',
                    link: '/guide/components/form/field/',
                    collapsed: true,
                    items: [
                        {text: 'Addition', link: '/guide/components/form/field/addition'}
                    ]
                },
                {
                    text: 'Input',
                    link: '/guide/components/form/input/',
                    collapsed: true,
                    items: [
                        {text: 'Group', link: '/guide/components/form/input/group'}
                    ]
                },
                {text: 'PIN input', link: '/guide/components/form/pin-input'},
                {text: 'Quantity selector', link: '/guide/components/form/quantity-selector'},
                {
                    text: 'Select',
                    link: '/guide/components/form/select/',
                    collapsed: true,
                    items: [
                        {text: 'Async', link: '/guide/components/form/select/async'}
                    ]
                },
                {
                    text: 'Slider',
                    link: '/guide/components/form/slider/',
                    collapsed: true,
                    items: [
                        {text: 'Ranged', link: '/guide/components/form/slider/ranged'}
                    ]
                },
                {text: 'Text area', link: '/guide/components/form/text-area'},
                {text: 'Time', link: '/guide/components/form/time'},
                {text: 'Time zone picker', link: '/guide/components/form/time-zone-picker'},
                {text: 'Toggle', link: '/guide/components/form/toggle'}
            ]
        },
        {
            text: 'Gallery',
            link: '/guide/components/gallery/',
            collapsed: true,
            items: [
                {text: 'Item', link: '/guide/components/gallery/item'},
            ]
        },
        {text: 'Icon', link: '/guide/components/icon', image: '/assets/components/icon.svg'},
        {text: 'Info', link: '/guide/components/info'},
        {
            text: 'Layout',
            link: '/guide/components/layout/',
            collapsed: true,
            items: [
                {text: 'Aspect ratio', link: '/guide/components/layout/aspect-ratio', image: '/assets/components/layout-aspect-ratio.svg'},
                {text: 'Container', link: '/guide/components/layout/container', image: '/assets/components/layout-container.svg'},
                {
                    text: 'Grid',
                    link: '/guide/components/layout/grid/',
                    image: '/assets/components/layout-grid.svg',
                    collapsed: true,
                    items: [
                        {text: 'Auto', link: '/guide/components/layout/grid/auto', image: '/assets/components/layout-auto-grid.svg'},
                        {text: 'Column', link: '/guide/components/layout/grid/column'},
                    ]
                },
                {text: 'Spacer', link: '/guide/components/layout/spacer', image: '/assets/components/layout-spacer.svg'},
                {text: 'Spacing', link: '/guide/components/layout/spacing', image: '/assets/components/layout-spacing.svg'},
                {
                    text: 'Stack',
                    link: '/guide/components/layout/stack/',
                    image: '/assets/components/layout-stack.svg',
                    collapsed: true,
                    items: [
                        {text: 'Badge', link: '/guide/components/layout/stack/badge'},
                        {text: 'Button', link: '/guide/components/layout/stack/button'},
                        {text: 'Info', link: '/guide/components/layout/stack/info'},
                        {text: 'Notice', link: '/guide/components/layout/stack/notice'},
                        {text: 'Tag', link: '/guide/components/layout/stack/tag'}
                    ]
                }
            ]
        },
        {text: 'Legend', link: '/guide/components/legend'},
        {text: 'Link', link: '/guide/components/link', image: '/assets/components/link.svg'},
        {
            text: 'Menu',
            link: '/guide/components/menu/',
            collapsed: true,
            image: null,
            items: [
                {text: 'Group', link: '/guide/components/menu/group'},
                {text: 'Item', link: '/guide/components/menu/item'},
                {text: 'Options', link: '/guide/components/menu/options'},
                {text: 'Sub header', link: '/guide/components/menu/sub-header'},
                {text: 'Title', link: '/guide/components/menu/title'}
            ]
        },
        {text: 'Overlay', link: '/guide/components/overlay'},
        {
            text: 'Pagination',
            link: '/guide/components/pagination/',
            collapsed: true,
            items: [
                {text: 'Bar', link: '/guide/components/pagination/bar'},
            ]
        },
        {
            text: 'Pane',
            link: '/guide/components/pane/',
            collapsed: true,
            items: [
                {text: 'Body', link: '/guide/components/pane/body'},
                {text: 'Deck', link: '/guide/components/pane/deck'},
                {text: 'Footer', link: '/guide/components/pane/footer'},
                {text: 'Group', link: '/guide/components/pane/group'},
                {text: 'Header', link: '/guide/components/pane/header'},
                {text: 'Illustration', link: '/guide/components/pane/illustration'},
                {text: 'Media', link: '/guide/components/pane/media'}
            ]
        },
        {text: 'Percentage bar', link: '/guide/components/percentage-bar'},
        {text: 'Persona', link: '/guide/components/persona'},
        {text: 'Placeholder', link: '/guide/components/placeholder'},
        {text: 'Progress bar', link: '/guide/components/progress-bar'},
        {text: 'Remove', link: '/guide/components/remove', image: '/assets/components/remove.svg'},
        {text: 'Root', link: '/guide/components/root'},
        {
            text: 'Segmented control',
            link: '/guide/components/segmented-control/',
            collapsed: true,
            items: [
                {text: 'View', link: '/guide/components/segmented-control/view'}
            ]
        },
        {text: 'Separator', link: '/guide/components/separator'},
        {text: 'Slide over', link: '/guide/components/slide-over'},
        {text: 'Spinner', link: '/guide/components/spinner'},
        {text: 'Statistic', link: '/guide/components/statistic'},
        {text: 'Stepper', link: '/guide/components/stepper', image: '/assets/components/stepper.svg'},
        {text: 'Tab bar', link: '/guide/components/tab-bar'},
        {text: 'Tabs', link: '/guide/components/tabs'},
        {
            text: 'Table',
            link: '/guide/components/table/',
            collapsed: true,
            items: [
                {text: 'Actions', link: '/guide/components/table/actions'},
                {text: 'Cell', link: '/guide/components/table/cell'},
                {text: 'Header', link: '/guide/components/table/header'},
                {text: 'Row', link: '/guide/components/table/row'}
            ]
        },
        {text: 'Tag', link: '/guide/components/tag'},
        {text: 'Ticks', link: '/guide/components/ticks'},
        {text: 'Timeline', link: '/guide/components/timeline'},
        {text: 'Toolbar', link: '/guide/components/toolbar'},
        {text: 'Tooltip', link: '/guide/components/tooltip'},
        {
            text: 'Visual',
            link: '/guide/components/visual/',
            collapsed: true,
            items: [
                {text: 'Animated colors', link: '/guide/components/visual/animated-colors', image: '/assets/components/visual-animated-colors.svg'},
                {text: 'Border shine', link: '/guide/components/visual/border-shine', image: '/assets/components/visual-border-shine.svg'},
                {text: 'Dot pattern', link: '/guide/components/visual/dot-pattern', image: '/assets/components/visual-dot-pattern.svg'},
                {text: 'Flickering grid', link: '/guide/components/visual/flickering-grid', image: '/assets/components/visual-flickering-grid.svg'},
                {text: 'Grid pattern', link: '/guide/components/visual/grid-pattern', image: '/assets/components/visual-grid-pattern.svg'}
            ]
        },
        {text: 'Window', link: '/guide/components/window'}
    ]
};

export default navigation;

export type SidebarItem = {
    readonly text?: string;
    readonly link?: string;
    readonly image?: string;
    readonly items?: SidebarItem[];
    readonly collapsed?: boolean;
    readonly base?: string;
    readonly docFooterText?: string;
    readonly rel?: string;
    readonly target?: string;
}
