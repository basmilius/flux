const navigation: SidebarItem[] = [
    {text: 'Overview', link: '/components/'},
    {
        text: 'Buttons & actions',
        link: '/components/buttons-actions/',
        collapsed: false,
        items: [
            {text: 'Action', link: '/components/action', image: '/assets/components/action.svg'},
            {text: 'Action bar', link: '/components/action-bar'},
            {text: 'Action pane', link: '/components/action-pane'},
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
            {text: 'Chip', link: '/components/chip'},
            {
                text: 'Toolbar',
                link: '/components/toolbar/',
                collapsed: true,
                items: [
                    {text: 'Group', link: '/components/toolbar/group'}
                ]
            }
        ]
    },
    {
        text: 'Indicators',
        link: '/components/indicators/',
        collapsed: false,
        items: [
            {text: 'Badge', link: '/components/badge'},
            {text: 'Badge group', link: '/components/badge-group'},
            {text: 'Placeholder', link: '/components/placeholder'},
            {text: 'Progress bar', link: '/components/progress-bar'},
            {text: 'Skeleton', link: '/components/skeleton'},
            {text: 'Spinner', link: '/components/spinner'},
            {text: 'Tag', link: '/components/tag'}
        ]
    },
    {
        text: 'Forms & input',
        link: '/components/forms/',
        collapsed: false,
        items: [
            {
                text: 'Checkbox',
                link: '/components/form/checkbox/',
                collapsed: true,
                items: [
                    {text: 'Group', link: '/components/form/checkbox/group'},
                    {text: 'Tile', link: '/components/form/checkbox/tile'}
                ]
            },
            {
                text: 'Color',
                collapsed: true,
                items: [
                    {text: 'Picker', link: '/components/color/picker'},
                    {text: 'Select', link: '/components/color/select'}
                ]
            },
            {text: 'Column', link: '/components/form/column'},
            {text: 'Combobox', link: '/components/form/combobox'},
            {text: 'Date', link: '/components/form/date'},
            {text: 'Date picker', link: '/components/date-picker'},
            {text: 'Date range', link: '/components/form/date-range'},
            {text: 'Date time', link: '/components/form/date-time'},
            {text: 'Drop zone', link: '/components/drop-zone'},
            {
                text: 'Fader',
                link: '/components/form/fader/',
                collapsed: true,
                items: [
                    {text: 'Ranged', link: '/components/form/fader/ranged'}
                ]
            },
            {
                text: 'Field',
                link: '/components/form/field/',
                collapsed: true,
                items: [
                    {text: 'Addition', link: '/components/form/field/addition'}
                ]
            },
            {text: 'Form', link: '/components/form/'},
            {text: 'Grid', link: '/components/form/grid'},
            {text: 'Inline edit', link: '/components/inline-edit'},
            {
                text: 'Input',
                link: '/components/form/input/',
                collapsed: true,
                items: [
                    {text: 'Addition', link: '/components/form/input/addition'},
                    {text: 'Group', link: '/components/form/input/group'}
                ]
            },
            {text: 'Number input', link: '/components/form/number-input'},
            {text: 'PIN input', link: '/components/form/pin-input'},
            {text: 'Quantity selector', link: '/components/form/quantity-selector'},
            {
                text: 'Radio',
                link: '/components/form/radio/',
                collapsed: true,
                items: [
                    {text: 'Group', link: '/components/form/radio/group'},
                    {text: 'Tile', link: '/components/form/radio/tile'}
                ]
            },
            {text: 'Rating', link: '/components/form/rating'},
            {text: 'Row', link: '/components/form/row'},
            {text: 'Section', link: '/components/form/section'},
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
            {text: 'Step', link: '/components/form/step'},
            {text: 'Tags input', link: '/components/form/tags-input'},
            {text: 'Text area', link: '/components/form/text-area'},
            {text: 'Time', link: '/components/form/time'},
            {text: 'Time zone picker', link: '/components/form/time-zone-picker'},
            {text: 'Toggle', link: '/components/form/toggle'},
            {text: 'Tree view select', link: '/components/form/tree-view-select'}
        ]
    },
    {
        text: 'Navigation',
        link: '/components/navigation/',
        collapsed: false,
        items: [
            {
                text: 'Breadcrumb',
                link: '/components/breadcrumb/',
                collapsed: true,
                items: [
                    {text: 'Item', link: '/components/breadcrumb/item'},
                    {text: 'Flyout', link: '/components/breadcrumb/flyout'}
                ]
            },
            {text: 'Command palette', link: '/components/command-palette'},
            {text: 'Context menu', link: '/components/context-menu'},
            {
                text: 'Expandable',
                link: '/components/expandable/',
                collapsed: true,
                items: [
                    {text: 'Group', link: '/components/expandable/group'}
                ]
            },
            {
                text: 'Menu',
                link: '/components/menu/',
                collapsed: true,
                items: [
                    {text: 'Collapsible', link: '/components/menu/collapsible'},
                    {text: 'Flyout', link: '/components/menu/flyout'},
                    {text: 'Group', link: '/components/menu/group'},
                    {text: 'Item', link: '/components/menu/item'},
                    {text: 'Options', link: '/components/menu/options'},
                    {text: 'Pane', link: '/components/menu/pane'},
                    {text: 'Sub header', link: '/components/menu/sub-header'},
                    {text: 'Title', link: '/components/menu/title'}
                ]
            },
            {
                text: 'Pagination',
                link: '/components/pagination/',
                collapsed: true,
                items: [
                    {text: 'Bar', link: '/components/pagination/bar'}
                ]
            },
            {
                text: 'Segmented control',
                link: '/components/segmented-control/',
                collapsed: true,
                items: [
                    {text: 'Item', link: '/components/segmented-control/item'}
                ]
            },
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
                    {text: 'Item', link: '/components/tab-bar/item'}
                ]
            },
            {
                text: 'Tabs',
                link: '/components/tabs/',
                collapsed: true,
                items: [
                    {text: 'Tab', link: '/components/tabs/tab'}
                ]
            }
        ]
    },
    {
        text: 'Data display',
        link: '/components/data-display/',
        collapsed: false,
        items: [
            {
                text: 'Calendar',
                link: '/components/calendar/',
                collapsed: true,
                items: [
                    {text: 'Item', link: '/components/calendar/item'}
                ]
            },
            {text: 'Comment', link: '/components/comment', image: '/assets/components/comment.svg'},
            {text: 'Data table', link: '/components/data-table'},
            {
                text: 'Description list',
                link: '/components/description-list/',
                collapsed: true,
                items: [
                    {text: 'Item', link: '/components/description-list/item'}
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
            {
                text: 'Kanban',
                link: '/components/kanban/',
                collapsed: true,
                items: [
                    {text: 'Column', link: '/components/kanban/column'},
                    {text: 'Item', link: '/components/kanban/item'}
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
                    {text: 'Group', link: '/components/table/group'},
                    {text: 'Header', link: '/components/table/header'},
                    {text: 'Row', link: '/components/table/row'},
                    {text: 'Tree cell', link: '/components/table/tree-cell'}
                ]
            },
            {text: 'Ticks', link: '/components/ticks'},
            {
                text: 'Timeline',
                link: '/components/timeline/',
                collapsed: true,
                items: [
                    {text: 'Item', link: '/components/timeline/item'}
                ]
            },
            {text: 'Tree view', link: '/components/tree-view'}
        ]
    },
    {
        text: 'Media & people',
        link: '/components/media/',
        collapsed: false,
        items: [
            {text: 'Avatar', link: '/components/avatar', image: '/assets/components/avatar.svg'},
            {text: 'Avatar group', link: '/components/avatar-group'},
            {
                text: 'Focal point',
                collapsed: true,
                items: [
                    {text: 'Editor', link: '/components/focal-point/editor'},
                    {text: 'Image', link: '/components/focal-point/image'}
                ]
            },
            {
                text: 'Gallery',
                link: '/components/gallery/',
                collapsed: true,
                items: [
                    {text: 'Item', link: '/components/gallery/item'}
                ]
            },
            {text: 'Persona', link: '/components/persona'}
        ]
    },
    {
        text: 'Layout',
        link: '/components/layout/',
        collapsed: false,
        items: [
            {text: 'Adaptive group', link: '/components/adaptive-group'},
            {text: 'Adaptive slot', link: '/components/adaptive-slot'},
            {text: 'Aspect ratio', link: '/components/layout/aspect-ratio', image: '/assets/components/layout-aspect-ratio.svg'},
            {text: 'Container', link: '/components/layout/container', image: '/assets/components/layout-container.svg'},
            {text: 'Divider', link: '/components/divider'},
            {
                text: 'Fader',
                link: '/components/fader',
                collapsed: true,
                items: [
                    {text: 'Item', link: '/components/fader-item'}
                ]
            },
            {
                text: 'Flex',
                link: '/components/layout/flex/',
                collapsed: true,
                items: [
                    {text: 'Item', link: '/components/layout/flex/item'},
                    {
                        text: 'Stack',
                        collapsed: true,
                        items: [
                            {text: 'Action', link: '/components/layout/flex/action'},
                            {text: 'Badge', link: '/components/layout/flex/badge'},
                            {text: 'Button', link: '/components/layout/flex/button'},
                            {text: 'Info', link: '/components/layout/flex/info'},
                            {text: 'Notice', link: '/components/layout/flex/notice'},
                            {text: 'Tag', link: '/components/layout/flex/tag'}
                        ]
                    }
                ]
            },
            {
                text: 'Grid',
                link: '/components/layout/grid/',
                image: '/assets/components/layout-grid.svg',
                collapsed: true,
                items: [
                    {text: 'Column', link: '/components/layout/grid/column'}
                ]
            },
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
            {text: 'Overflow bar', link: '/components/overflow-bar'},
            {text: 'Separator', link: '/components/separator'},
            {text: 'Spacer', link: '/components/layout/spacer', image: '/assets/components/layout-spacer.svg'},
            {text: 'Spacing', link: '/components/layout/spacing', image: '/assets/components/layout-spacing.svg'},
            {
                text: 'Split view',
                link: '/components/layout/split-view/',
                collapsed: true,
                items: [
                    {text: 'Pane', link: '/components/layout/split-view/pane'}
                ]
            }
        ]
    },
    {
        text: 'Overlays & surfaces',
        link: '/components/surfaces/',
        collapsed: false,
        items: [
            {text: 'Flyout', link: '/components/flyout'},
            {text: 'Overlay', link: '/components/overlay'},
            {
                text: 'Pane',
                link: '/components/pane/',
                collapsed: true,
                items: [
                    {text: 'Body', link: '/components/pane/body'},
                    {text: 'Clickable', link: '/components/pane/clickable'},
                    {text: 'Clickable header', link: '/components/pane/clickable-header'},
                    {text: 'Footer', link: '/components/pane/footer'},
                    {text: 'Group', link: '/components/pane/group'},
                    {text: 'Header', link: '/components/pane/header'},
                    {text: 'Layer pane', link: '/components/pane/layer-pane'},
                    {text: 'Media', link: '/components/pane/media'}
                ]
            },
            {text: 'Slide over', link: '/components/slide-over'},
            {text: 'Window', link: '/components/window'}
        ]
    },
    {
        text: 'Feedback',
        link: '/components/feedback/',
        collapsed: false,
        items: [
            {text: 'Alert', link: '/components/attention/alert', image: '/assets/components/attention-alert.svg'},
            {text: 'Confirm', link: '/components/attention/confirm', image: '/assets/components/attention-confirm.svg'},
            {text: 'Info', link: '/components/info'},
            {text: 'Notice', link: '/components/attention/notice', image: '/assets/components/attention-notice.svg'},
            {text: 'Prompt', link: '/components/attention/prompt', image: '/assets/components/attention-prompt.svg'},
            {text: 'Snackbar', link: '/components/attention/snackbar', image: '/assets/components/attention-snackbar.svg'},
            {text: 'Tooltip', link: '/components/tooltip'},
            {text: 'Tour', link: '/components/tour'}
        ]
    },
    {
        text: 'Primitives',
        link: '/components/primitives/',
        collapsed: false,
        items: [
            {text: 'Boxed icon', link: '/components/boxed-icon', image: '/assets/components/boxed-icon.svg'},
            {text: 'Icon', link: '/components/icon', image: '/assets/components/icon.svg'},
            {text: 'Link', link: '/components/link', image: '/assets/components/link.svg'},
            {text: 'Pressable', link: '/components/pressable'},
            {text: 'Prose', link: '/components/prose'},
            {text: 'Root', link: '/components/root'},
            {text: 'Text', link: '/components/text'}
        ]
    },
    {
        text: 'Utilities',
        link: '/components/utilities/',
        collapsed: false,
        items: [
            {text: 'Disabled', link: '/components/disabled'},
            {text: 'Dynamic view', link: '/components/dynamic-view'}
        ]
    },
    {
        text: 'Transitions',
        link: '/components/transitions/',
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
];

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
