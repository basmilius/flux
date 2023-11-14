import { ref } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

export const routerIsLoading = ref(false);

export const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({
        top: 0
    }),
    routes: [
        {
            path: '/',
            component: () => import('@docs/pages/Docs.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('@docs/pages/Home.vue')
                },
                {
                    path: '/getting-started',
                    component: () => import('@docs/pages/GettingStarted.vue')
                },
                {
                    path: '/playground',
                    component: () => import('@docs/pages/Playground.vue')
                },
                {
                    path: '/content/typography',
                    component: () => import('@docs/pages/content/Typography.vue')
                },
                {
                    path: '/components/action',
                    component: () => import('@docs/pages/components/Action.vue')
                },
                {
                    path: '/components/action-bar',
                    component: () => import('@docs/pages/components/ActionBar.vue')
                },
                {
                    path: '/components/action-pane',
                    component: () => import('@docs/pages/components/ActionPane.vue')
                },
                {
                    path: '/components/avatar',
                    component: () => import('@docs/pages/components/Avatar.vue')
                },
                {
                    path: '/components/badge',
                    component: () => import('@docs/pages/components/Badge.vue')
                },
                {
                    path: '/components/button',
                    component: () => import('@docs/pages/components/Button.vue')
                },
                {
                    path: '/components/button-group',
                    component: () => import('@docs/pages/components/ButtonGroup.vue')
                },
                {
                    path: '/components/checkbox',
                    component: () => import('@docs/pages/components/Checkbox.vue')
                },
                {
                    path: '/components/chip',
                    component: () => import('@docs/pages/components/Chip.vue')
                },
                {
                    path: '/components/comment',
                    component: () => import('@docs/pages/components/Comment.vue')
                },
                {
                    path: '/components/data-table',
                    component: () => import('@docs/pages/components/DataTable.vue')
                },
                {
                    path: '/components/date-picker',
                    component: () => import('@docs/pages/components/DatePicker.vue')
                },
                {
                    path: '/components/divider',
                    component: () => import('@docs/pages/components/Divider.vue')
                },
                {
                    path: '/components/drop-zone',
                    component: () => import('@docs/pages/components/DropZone.vue')
                },
                {
                    path: '/components/expandable',
                    component: () => import('@docs/pages/components/Expandable.vue')
                },
                {
                    path: '/components/fader',
                    component: () => import('@docs/pages/components/Fader.vue')
                },
                {
                    path: '/components/feature-card',
                    component: () => import('@docs/pages/components/FeatureCard.vue')
                },
                {
                    path: '/components/filter',
                    component: () => import('@docs/pages/components/Filter.vue')
                },
                {
                    path: '/components/flyout',
                    component: () => import('@docs/pages/components/Flyout.vue')
                },
                {
                    path: '/components/focal-point-editor',
                    component: () => import('@docs/pages/components/FocalPointEditor.vue')
                },
                {
                    path: '/components/form',
                    component: () => import('@docs/pages/components/Form.vue')
                },
                {
                    path: '/components/form-date-picker',
                    component: () => import('@docs/pages/components/FormDatePicker.vue')
                },
                {
                    path: '/components/form-field',
                    component: () => import('@docs/pages/components/FormField.vue')
                },
                {
                    path: '/components/form-input',
                    component: () => import('@docs/pages/components/FormInput.vue')
                },
                {
                    path: '/components/form-range-slider',
                    component: () => import('@docs/pages/components/FormRangeSlider.vue')
                },
                {
                    path: '/components/form-select',
                    component: () => import('@docs/pages/components/FormSelect.vue')
                },
                {
                    path: '/components/form-slider',
                    component: () => import('@docs/pages/components/FormSlider.vue')
                },
                {
                    path: '/components/form-text-area',
                    component: () => import('@docs/pages/components/FormTextArea.vue')
                },
                {
                    path: '/components/form-time-zone-picker',
                    component: () => import('@docs/pages/components/FormTimeZonePicker.vue')
                },
                {
                    path: '/components/gallery',
                    component: () => import('@docs/pages/components/Gallery.vue')
                },
                {
                    path: '/components/icon',
                    component: () => import('@docs/pages/components/Icon.vue')
                },
                {
                    path: '/components/info',
                    component: () => import('@docs/pages/components/Info.vue')
                },
                {
                    path: '/components/link',
                    component: () => import('@docs/pages/components/Link.vue')
                },
                {
                    path: '/components/menu',
                    component: () => import('@docs/pages/components/Menu.vue')
                },
                {
                    path: '/components/notice',
                    component: () => import('@docs/pages/components/Notice.vue')
                },
                {
                    path: '/components/overlay',
                    component: () => import('@docs/pages/components/Overlay.vue')
                },
                {
                    path: '/components/pagination',
                    component: () => import('@docs/pages/components/Pagination.vue')
                },
                {
                    path: '/components/pane',
                    component: () => import('@docs/pages/components/Pane.vue')
                },
                {
                    path: '/components/persona',
                    component: () => import('@docs/pages/components/Persona.vue')
                },
                {
                    path: '/components/placeholder',
                    component: () => import('@docs/pages/components/Placeholder.vue')
                },
                {
                    path: '/components/quantity-selector',
                    component: () => import('@docs/pages/components/QuantitySelector.vue')
                },
                {
                    path: '/components/remove',
                    component: () => import('@docs/pages/components/Remove.vue')
                },
                {
                    path: '/components/root',
                    component: () => import('@docs/pages/components/Root.vue')
                },
                {
                    path: '/components/segmented-control',
                    component: () => import('@docs/pages/components/SegmentedControl.vue')
                },
                {
                    path: '/components/separator',
                    component: () => import('@docs/pages/components/Separator.vue')
                },
                {
                    path: '/components/slide-over',
                    component: () => import('@docs/pages/components/SlideOver.vue')
                },
                {
                    path: '/components/snackbar',
                    component: () => import('@docs/pages/components/Snackbar.vue')
                },
                {
                    path: '/components/spinner',
                    component: () => import('@docs/pages/components/Spinner.vue')
                },
                {
                    path: '/components/split-button',
                    component: () => import('@docs/pages/components/SplitButton.vue')
                },
                {
                    path: '/components/statistic',
                    component: () => import('@docs/pages/components/Statistic.vue')
                },
                {
                    path: '/components/table',
                    component: () => import('@docs/pages/components/Table.vue')
                },
                {
                    path: '/components/tabs',
                    component: () => import('@docs/pages/components/Tabs.vue')
                },
                {
                    path: '/components/timeline',
                    component: () => import('@docs/pages/components/Timeline.vue')
                },
                {
                    path: '/components/toggle',
                    component: () => import('@docs/pages/components/Toggle.vue')
                },
                {
                    path: '/components/toolbar',
                    component: () => import('@docs/pages/components/Toolbar.vue')
                },
                {
                    path: '/components/tooltip',
                    component: () => import('@docs/pages/components/Tooltip.vue')
                },
                {
                    path: '/components/window',
                    component: () => import('@docs/pages/components/Window.vue')
                },
                {
                    path: '/layout/aspect-ratio',
                    component: () => import('@docs/pages/layout/AspectRatio.vue')
                },
                {
                    path: '/layout/auto-grid',
                    component: () => import('@docs/pages/layout/AutoGrid.vue')
                },
                {
                    path: '/layout/container',
                    component: () => import('@docs/pages/layout/Container.vue')
                },
                {
                    path: '/layout/grid',
                    component: () => import('@docs/pages/layout/Grid.vue')
                },
                {
                    path: '/layout/predefined-grid',
                    component: () => import('@docs/pages/layout/PredefinedGrid.vue')
                },
                {
                    path: '/layout/spacer',
                    component: () => import('@docs/pages/layout/Spacer.vue')
                },
                {
                    path: '/layout/spacing',
                    component: () => import('@docs/pages/layout/Spacing.vue')
                },
                {
                    path: '/layout/stack',
                    component: () => import('@docs/pages/layout/Stack.vue')
                },
                {
                    path: '/visuals/animated-colors',
                    component: () => import('@docs/pages/visuals/AnimatedColors.vue')
                },
                {
                    path: '/visuals/gridlines',
                    component: () => import('@docs/pages/visuals/Gridlines.vue')
                },
                {
                    path: '/:pathMatch(.*)*',
                    component: () => import('@docs/pages/NotFound.vue')
                }
            ]
        },
        {
            path: '/dashboard',
            component: () => import('@docs/pages/Dashboard.vue')
        },
        {
            path: '/prose',
            component: () => import('@docs/pages/Prose.vue')
        }
    ]
});

router.afterEach(() => {
    routerIsLoading.value = false;
});

router.beforeEach((_, __, next) => {
    routerIsLoading.value = true;
    next();
});
