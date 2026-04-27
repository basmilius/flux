const navigation: SidebarItem = {
    text: 'Components',
    collapsed: false,
    items: [
        {text: 'Overview', link: '/components/'},
        {text: 'Action', link: '/components/action', image: '/assets/components/action.svg'},
        {text: 'Action bar', link: '/components/action-bar'},
        {text: 'Action pane', link: '/components/action-pane'},
        {text: 'Adaptive group', link: '/components/adaptive-group'},
        {text: 'Adaptive slot', link: '/components/adaptive-slot'},
        {
            text: 'Attention',
            link: '/components/attention/',
            collapsed: true,
            items: [
                {text: 'Alert', link: '/components/attention/alert', image: '/assets/components/attention-alert.svg'},
                {text: 'Confirm', link: '/components/attention/confirm', image: '/assets/components/attention-confirm.svg'},
                {text: 'Notice', link: '/components/attention/notice', image: '/assets/components/attention-notice.svg'},
                {text: 'Prompt', link: '/components/attention/prompt', image: '/assets/components/attention-prompt.svg'},
                {text: 'Snackbar', link: '/components/attention/snackbar', image: '/assets/components/attention-snackbar.svg'}
            ]
        },
        {text: 'Avatar', link: '/components/avatar', image: '/assets/components/avatar.svg'},
        {text: 'Badge', link: '/components/badge'},
        {text: 'Boxed icon', link: '/components/boxed-icon', image: '/assets/components/boxed-icon.svg'},
        {
            text: 'Button',
            link: '/components/button/',
            collapsed: true,
            items: [
                {text: 'Primary', link: '/components/button/primary'},
                {text: 'Secondary', link: '/components/button/secondary'},
                {text: 'Destructive', link: '/components/button/destructive'},
                {text: 'Group', link: '/components/button/group'},
                {text: 'Split', link: '/components/button/split'},
                {text: 'Primary Link', link: '/components/button/primary-link'},
                {text: 'Secondary Link', link: '/components/button/secondary-link'},
                {text: 'Publish', link: '/components/button/publish'}
            ]
        },
        {
            text: 'Calendar',
            link: '/components/calendar/',
            collapsed: true,
            items: [
                {text: 'Event', link: '/components/calendar/event'},
            ]
        },
        {text: 'Chip', link: '/components/chip'},
        {
            text: 'Color',
            collapsed: true,
            items: [
                {text: 'Picker', link: '/components/color/picker'},
                {text: 'Select', link: '/components/color/select'},
            ]
        },
        {text: 'Command palette', link: '/components/command-palette'},
        {text: 'Comment', link: '/components/comment', image: '/assets/components/comment.svg'},
        {text: 'Data table', link: '/components/data-table'},
        {text: 'Date picker', link: '/components/date-picker'},
        {text: 'Disabled', link: '/components/disabled'},
        {text: 'Divider', link: '/components/divider'},
        {text: 'Drop zone', link: '/components/drop-zone'},
        {text: 'Dynamic view', link: '/components/dynamic-view'},
        {
            text: 'Expandable',
            link: '/components/expandable/',
            collapsed: true,
            items: [
                {text: 'Group', link: '/components/expandable/group'},
            ]
        },
        {
            text: 'Fader',
            link: '/components/fader',
            collapsed: true,
            items: [
                {text: 'Item', link: '/components/fader-item'}
            ]
        },
        {
            text: 'Filter',
            link: '/components/filter/',
            collapsed: true,
            items: [
                {text: 'Bar', link: '/components/filter/bar'},
                {text: 'Date', link: '/components/filter/date'},
                {text: 'Date range', link: '/components/filter/date-range'},
                {text: 'Option', link: '/components/filter/option'},
                {text: 'Options', link: '/components/filter/options'},
                {text: 'Range', link: '/components/filter/range'},
                {text: 'Async option', link: '/components/filter/async-option'},
                {text: 'Async options', link: '/components/filter/async-options'}
            ]
        },
        {text: 'Flyout', link: '/components/flyout'},
        {
            text: 'Focal point',
            collapsed: true,
            items: [
                {text: 'Editor', link: '/components/focal-point/editor'},
                {text: 'Image', link: '/components/focal-point/image'}
            ]
        },
        {
            text: 'Form',
            link: '/components/form/',
            collapsed: true,
            items: [
                {text: 'Column', link: '/components/form/column'},
                {text: 'Row', link: '/components/form/row'},
                {text: 'Checkbox', link: '/components/form/checkbox'},
                {text: 'Date', link: '/components/form/date'},
                {text: 'Date range', link: '/components/form/date-range'},
                {text: 'Date time', link: '/components/form/date-time'},
                {
                    text: 'Field',
                    link: '/components/form/field/',
                    collapsed: true,
                    items: [
                        {text: 'Addition', link: '/components/form/field/addition'}
                    ]
                },
                {text: 'Grid', link: '/components/form/grid'},
                {
                    text: 'Input',
                    link: '/components/form/input/',
                    collapsed: true,
                    items: [
                        {text: 'Addition', link: '/components/form/input/addition'},
                        {text: 'Group', link: '/components/form/input/group'}
                    ]
                },
                {text: 'PIN input', link: '/components/form/pin-input'},
                {text: 'Section', link: '/components/form/section'},
                {text: 'Quantity selector', link: '/components/form/quantity-selector'},
                {
                    text: 'Select',
                    link: '/components/form/select/',
                    collapsed: true,
                    items: [
                        {text: 'Async', link: '/components/form/select/async'}
                    ]
                },
                {
                    text: 'Slider',
                    link: '/components/form/slider/',
                    collapsed: true,
                    items: [
                        {text: 'Ranged', link: '/components/form/slider/ranged'}
                    ]
                },
                {text: 'Text area', link: '/components/form/text-area'},
                {text: 'Time', link: '/components/form/time'},
                {text: 'Time zone picker', link: '/components/form/time-zone-picker'},
                {text: 'Toggle', link: '/components/form/toggle'},
                {text: 'Tree view select', link: '/components/form/tree-view-select'}
            ]
        },
        {
            text: 'Gallery',
            link: '/components/gallery/',
            collapsed: true,
            items: [
                {text: 'Item', link: '/components/gallery/item'},
            ]
        },
        {text: 'Icon', link: '/components/icon', image: '/assets/components/icon.svg'},
        {text: 'Info', link: '/components/info'},
        {
            text: 'Item',
            link: '/components/item/',
            collapsed: true,
            items: [
                {text: 'Actions', link: '/components/item/actions'},
                {text: 'Content', link: '/components/item/content'},
                {text: 'Media', link: '/components/item/media'},
                {text: 'Stack', link: '/components/item/stack'}
            ]
        },
        {
            text: 'Layout',
            link: '/components/layout/',
            collapsed: true,
            items: [
                {text: 'Aspect ratio', link: '/components/layout/aspect-ratio', image: '/assets/components/layout-aspect-ratio.svg'},
                {text: 'Column', link: '/components/layout/column'},
                {text: 'Container', link: '/components/layout/container', image: '/assets/components/layout-container.svg'},
                {
                    text: 'Grid',
                    link: '/components/layout/grid/',
                    image: '/assets/components/layout-grid.svg',
                    collapsed: true,
                    items: [
                        {text: 'Column', link: '/components/layout/grid/column'},
                    ]
                },
                {text: 'Row', link: '/components/layout/row'},
                {text: 'Spacer', link: '/components/layout/spacer', image: '/assets/components/layout-spacer.svg'},
                {text: 'Spacing', link: '/components/layout/spacing', image: '/assets/components/layout-spacing.svg'},
                {
                    text: 'Stack',
                    link: '/components/layout/stack/',
                    image: '/assets/components/layout-stack.svg',
                    collapsed: true,
                    items: [
                        {text: 'Action', link: '/components/layout/stack/action'},
                        {text: 'Badge', link: '/components/layout/stack/badge'},
                        {text: 'Button', link: '/components/layout/stack/button'},
                        {text: 'Info', link: '/components/layout/stack/info'},
                        {text: 'Notice', link: '/components/layout/stack/notice'},
                        {text: 'Tag', link: '/components/layout/stack/tag'}
                    ]
                }
            ]
        },
        {text: 'Legend', link: '/components/legend'},
        {text: 'Link', link: '/components/link', image: '/assets/components/link.svg'},
        {
            text: 'Menu',
            link: '/components/menu/',
            collapsed: true,
            items: [
                {text: 'Collapsible', link: '/components/menu/collapsible'},
                {text: 'Group', link: '/components/menu/group'},
                {text: 'Item', link: '/components/menu/item'},
                {text: 'Options', link: '/components/menu/options'},
                {text: 'Sub header', link: '/components/menu/sub-header'},
                {text: 'Title', link: '/components/menu/title'}
            ]
        },
        {text: 'Overflow bar', link: '/components/overflow-bar'},
        {text: 'Overlay', link: '/components/overlay'},
        {
            text: 'Pagination',
            link: '/components/pagination/',
            collapsed: true,
            items: [
                {text: 'Bar', link: '/components/pagination/bar'},
            ]
        },
        {
            text: 'Pane',
            link: '/components/pane/',
            collapsed: true,
            items: [
                {text: 'Body', link: '/components/pane/body'},
                {text: 'Clickable', link: '/components/pane/clickable'},
                {text: 'Footer', link: '/components/pane/footer'},
                {text: 'Group', link: '/components/pane/group'},
                {text: 'Header', link: '/components/pane/header'},
                {text: 'Illustration', link: '/components/pane/illustration'},
                {text: 'Layer pane', link: '/components/pane/layer-pane'},
                {text: 'Media', link: '/components/pane/media'}
            ]
        },
        {text: 'Percentage bar', link: '/components/percentage-bar'},
        {text: 'Persona', link: '/components/persona'},
        {text: 'Placeholder', link: '/components/placeholder'},
        {text: 'Pressable', link: '/components/pressable'},
        {text: 'Progress bar', link: '/components/progress-bar'},
        {text: 'Remove', link: '/components/remove', image: '/assets/components/remove.svg'},
        {text: 'Root', link: '/components/root'},
        {
            text: 'Segmented control',
            link: '/components/segmented-control/',
            collapsed: true,
            items: [
                {text: 'View', link: '/components/segmented-control/view'}
            ]
        },
        {text: 'Separator', link: '/components/separator'},
        {text: 'Slide over', link: '/components/slide-over'},
        {text: 'Spinner', link: '/components/spinner'},
        {text: 'Statistic', link: '/components/statistic'},
        {
            text: 'Stepper',
            link: '/components/stepper/',
            image: '/assets/components/stepper.svg',
            collapsed: true,
            items: [
                {text: 'Steps', link: '/components/stepper/steps'},
                {text: 'Step', link: '/components/stepper/step'}
            ]
        },
        {
            text: 'Tab bar',
            link: '/components/tab-bar/',
            collapsed: true,
            items: [
                {text: 'Item', link: '/components/tab-bar/item'},
            ]
        },
        {
            text: 'Tabs',
            link: '/components/tabs/',
            collapsed: true,
            items: [
                {text: 'Tab', link: '/components/tabs/tab'},
            ]
        },
        {
            text: 'Table',
            link: '/components/table/',
            collapsed: true,
            items: [
                {text: 'Actions', link: '/components/table/actions'},
                {text: 'Bar', link: '/components/table/bar'},
                {text: 'Cell', link: '/components/table/cell'},
                {text: 'Header', link: '/components/table/header'},
                {text: 'Row', link: '/components/table/row'}
            ]
        },
        {text: 'Tag', link: '/components/tag'},
        {text: 'Ticks', link: '/components/ticks'},
        {
            text: 'Timeline',
            link: '/components/timeline/',
            collapsed: true,
            items: [
                {text: 'Item', link: '/components/timeline/item'},
            ]
        },
        {
            text: 'Toolbar',
            link: '/components/toolbar/',
            collapsed: true,
            items: [
                {text: 'Group', link: '/components/toolbar/group'},
            ]
        },
        {text: 'Tooltip', link: '/components/tooltip'},
        {text: 'Tree view', link: '/components/tree-view'},
        {
            text: 'Visual',
            link: '/components/visual/',
            collapsed: true,
            items: [
                {text: 'Animated colors', link: '/components/visual/animated-colors', image: '/assets/components/visual-animated-colors.svg'},
                {text: 'Border shine', link: '/components/visual/border-shine', image: '/assets/components/visual-border-shine.svg'},
                {text: 'Dot pattern', link: '/components/visual/dot-pattern', image: '/assets/components/visual-dot-pattern.svg'},
                {text: 'Flickering grid', link: '/components/visual/flickering-grid', image: '/assets/components/visual-flickering-grid.svg'},
                {text: 'Grid pattern', link: '/components/visual/grid-pattern', image: '/assets/components/visual-grid-pattern.svg'}
            ]
        },
        {text: 'Window', link: '/components/window'}
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
