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
            component: () => import('./pages/Docs.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('./pages/Home.vue')
                },
                {
                    path: '/getting-started',
                    component: () => import('./pages/GettingStarted.vue')
                },
                {
                    path: '/playground',
                    component: () => import('./pages/Playground.vue')
                },
                {
                    path: '/content/typography',
                    component: () => import('./pages/content/Typography.vue')
                },
                {
                    path: '/components/action',
                    component: () => import('./pages/components/Action.vue')
                },
                {
                    path: '/components/action-bar',
                    component: () => import('./pages/components/ActionBar.vue')
                },
                {
                    path: '/components/avatar',
                    component: () => import('./pages/components/Avatar.vue')
                },
                {
                    path: '/components/badge',
                    component: () => import('./pages/components/Badge.vue')
                },
                {
                    path: '/components/button',
                    component: () => import('./pages/components/Button.vue')
                },
                {
                    path: '/components/button-group',
                    component: () => import('./pages/components/ButtonGroup.vue')
                },
                {
                    path: '/components/chip',
                    component: () => import('./pages/components/Chip.vue')
                },
                {
                    path: '/components/comment',
                    component: () => import('./pages/components/Comment.vue')
                },
                {
                    path: '/components/data-table',
                    component: () => import('./pages/components/DataTable.vue')
                },
                {
                    path: '/components/date-picker',
                    component: () => import('./pages/components/DatePicker.vue')
                },
                {
                    path: '/components/divider',
                    component: () => import('./pages/components/Divider.vue')
                },
                {
                    path: '/components/drop-zone',
                    component: () => import('./pages/components/DropZone.vue')
                },
                {
                    path: '/components/expandable',
                    component: () => import('./pages/components/Expandable.vue')
                },
                {
                    path: '/components/fader',
                    component: () => import('./pages/components/Fader.vue')
                },
                {
                    path: '/components/feature-card',
                    component: () => import('./pages/components/FeatureCard.vue')
                },
                {
                    path: '/components/filter',
                    component: () => import('./pages/components/Filter.vue')
                },
                {
                    path: '/components/flyout',
                    component: () => import('./pages/components/Flyout.vue')
                },
                {
                    path: '/components/focal-point-editor',
                    component: () => import('./pages/components/FocalPointEditor.vue')
                },
                {
                    path: '/components/form',
                    component: () => import('./pages/components/Form.vue')
                },
                {
                    path: '/components/form-date-picker',
                    component: () => import('./pages/components/FormDatePicker.vue')
                },
                {
                    path: '/components/form-field',
                    component: () => import('./pages/components/FormField.vue')
                },
                {
                    path: '/components/form-input',
                    component: () => import('./pages/components/FormInput.vue')
                },
                {
                    path: '/components/form-select',
                    component: () => import('./pages/components/FormSelect.vue')
                },
                {
                    path: '/components/form-text-area',
                    component: () => import('./pages/components/FormTextArea.vue')
                },
                {
                    path: '/components/gallery',
                    component: () => import('./pages/components/Gallery.vue')
                },
                {
                    path: '/components/icon',
                    component: () => import('./pages/components/Icon.vue')
                },
                {
                    path: '/components/info',
                    component: () => import('./pages/components/Info.vue')
                },
                {
                    path: '/components/link',
                    component: () => import('./pages/components/Link.vue')
                },
                {
                    path: '/components/menu',
                    component: () => import('./pages/components/Menu.vue')
                },
                {
                    path: '/components/notice',
                    component: () => import('./pages/components/Notice.vue')
                },
                {
                    path: '/components/overlay',
                    component: () => import('./pages/components/Overlay.vue')
                },
                {
                    path: '/components/pagination',
                    component: () => import('./pages/components/Pagination.vue')
                },
                {
                    path: '/components/pane',
                    component: () => import('./pages/components/Pane.vue')
                },
                {
                    path: '/components/persona',
                    component: () => import('./pages/components/Persona.vue')
                },
                {
                    path: '/components/placeholder',
                    component: () => import('./pages/components/Placeholder.vue')
                },
                {
                    path: '/components/quantity-selector',
                    component: () => import('./pages/components/QuantitySelector.vue')
                },
                {
                    path: '/components/remove',
                    component: () => import('./pages/components/Remove.vue')
                },
                {
                    path: '/components/root',
                    component: () => import('./pages/components/Root.vue')
                },
                {
                    path: '/components/segmented-control',
                    component: () => import('./pages/components/SegmentedControl.vue')
                },
                {
                    path: '/components/separator',
                    component: () => import('./pages/components/Separator.vue')
                },
                {
                    path: '/components/slide-over',
                    component: () => import('./pages/components/SlideOver.vue')
                },
                {
                    path: '/components/snackbar',
                    component: () => import('./pages/components/Snackbar.vue')
                },
                {
                    path: '/components/spinner',
                    component: () => import('./pages/components/Spinner.vue')
                },
                {
                    path: '/components/split-button',
                    component: () => import('./pages/components/SplitButton.vue')
                },
                {
                    path: '/components/statistic',
                    component: () => import('./pages/components/Statistic.vue')
                },
                {
                    path: '/components/table',
                    component: () => import('./pages/components/Table.vue')
                },
                {
                    path: '/components/tabs',
                    component: () => import('./pages/components/Tabs.vue')
                },
                {
                    path: '/components/timeline',
                    component: () => import('./pages/components/Timeline.vue')
                },
                {
                    path: '/components/toggle',
                    component: () => import('./pages/components/Toggle.vue')
                },
                {
                    path: '/components/toolbar',
                    component: () => import('./pages/components/Toolbar.vue')
                },
                {
                    path: '/components/tooltip',
                    component: () => import('./pages/components/Tooltip.vue')
                },
                {
                    path: '/components/window',
                    component: () => import('./pages/components/Window.vue')
                },
                {
                    path: '/layout/aspect-ratio',
                    component: () => import('./pages/layout/AspectRatio.vue')
                },
                {
                    path: '/layout/auto-grid',
                    component: () => import('./pages/layout/AutoGrid.vue')
                },
                {
                    path: '/layout/container',
                    component: () => import('./pages/layout/Container.vue')
                },
                {
                    path: '/layout/grid',
                    component: () => import('./pages/layout/Grid.vue')
                },
                {
                    path: '/layout/predefined-grid',
                    component: () => import('./pages/layout/PredefinedGrid.vue')
                },
                {
                    path: '/layout/spacer',
                    component: () => import('./pages/layout/Spacer.vue')
                },
                {
                    path: '/layout/stack',
                    component: () => import('./pages/layout/Stack.vue')
                },
                {
                    path: '/visuals/animated-colors',
                    component: () => import('./pages/visuals/AnimatedColors.vue')
                },
                {
                    path: '/visuals/gridlines',
                    component: () => import('./pages/visuals/Gridlines.vue')
                },
                {
                    path: '/:pathMatch(.*)*',
                    component: () => import('./pages/NotFound.vue')
                }
            ]
        },
        {
            path: '/dashboard',
            component: () => import('./pages/Dashboard.vue')
        }
    ]
});

router.afterEach(() => {
    routerIsLoading.value = false;
});

router.beforeEach((from, to, next) => {
    routerIsLoading.value = true;
    next();
});
