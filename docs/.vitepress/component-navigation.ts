const navigation: SidebarItem = {
    text: 'Components',
    collapsed: false,
    items: [
        {text: 'Overview', link: '/guide/components/'},
        {text: 'Action', link: '/guide/components/action'},
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
        {text: 'Boxed icon', link: '/guide/components/boxed-icon'},
        {text: 'Button', link: '/guide/components/button'},
        {text: 'Button group', link: '/guide/components/button-group'},
        {text: 'Calendar', link: '/guide/components/calendar'},
        {text: 'Calendar event', link: '/guide/components/calendar-event'},
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
            link: '/guide/components/focal-point/editor',
            collapsed: true,
            items: [
                {text: 'Editor', link: '/guide/components/focal-point/editor'},
                {text: 'Image', link: '/guide/components/focal-point/image'}
            ]
        },
        {
            text: 'Form',
            link: '/guide/components/form/',
            collapsed: true,
            items: [
                {text: 'Checkbox', link: '/guide/components/form/checkbox'},
                {text: 'Toggle', link: '/guide/components/form/toggle'},
                {text: 'Date time', link: '/guide/components/form/date-time'},
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
            link: '/guide/components/layout/',
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
        {text: 'Pagination', link: '/guide/components/pagination'},
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
