import {type CSSProperties, type ComponentProps, type ComponentRef, useRef, useState} from 'react';
import {
    FluxAction,
    FluxActionBar,
    FluxActionPane,
    FluxActionStack,
    FluxAvatar,
    FluxAvatarGroup,
    FluxBadge,
    FluxBadgeStack,
    FluxBoxedIcon,
    FluxBreadcrumb,
    FluxBreadcrumbFlyout,
    FluxBreadcrumbItem,
    FluxButtonGroup,
    FluxButtonStack,
    FluxCalendar,
    FluxCalendarItem,
    FluxChip,
    FluxClickablePane,
    FluxClickablePaneHeader,
    FluxColorPicker,
    FluxColorSelect,
    FluxCommandPalette,
    FluxComment,
    FluxContextMenu,
    FluxDataTable,
    FluxDatePicker,
    FluxDescriptionItem,
    FluxDescriptionList,
    FluxDestructiveButton,
    FluxDisabled,
    FluxDivider,
    FluxDropZone,
    FluxExpandable,
    FluxExpandableGroup,
    FluxFilterBar,
    FluxFilterDate,
    FluxFilterOption,
    FluxFilterOptions,
    FluxFilterRange,
    FluxFlex,
    FluxFlyout,
    FluxForm,
    FluxFormCheckbox,
    FluxFormCheckboxGroup,
    FluxFormCheckboxTile,
    FluxFormColumn,
    FluxFormCombobox,
    FluxFormDateInput,
    FluxFormFader,
    FluxFormField,
    FluxFormInput,
    FluxFormInputAddition,
    FluxFormInputGroup,
    FluxFormNumberInput,
    FluxFormPinInput,
    FluxFormRadio,
    FluxFormRadioGroup,
    FluxFormRadioTile,
    FluxFormRangeSlider,
    FluxFormRating,
    FluxFormSelect,
    FluxFormSlider,
    FluxFormTagsInput,
    FluxFormTextArea,
    FluxFormTreeViewSelect,
    FluxGallery,
    FluxIcon,
    FluxInfo,
    FluxInfoStack,
    FluxInlineEdit,
    FluxItem,
    FluxItemActions,
    FluxItemContent,
    FluxItemMedia,
    FluxItemStack,
    FluxKanban,
    FluxKanbanColumn,
    FluxKanbanItem,
    FluxLayerPane,
    FluxLink,
    FluxMasonry,
    FluxMenu,
    FluxMenuCollapsible,
    FluxMenuFlyout,
    FluxMenuGroup,
    FluxMenuItem,
    FluxMenuOptions,
    FluxMenuPane,
    FluxMenuSubHeader,
    FluxMenuTitle,
    FluxNotice,
    FluxNoticeStack,
    FluxOverlay,
    FluxPagination,
    FluxPaginationBar,
    FluxPane,
    FluxPaneBody,
    FluxPaneFooter,
    FluxPaneGroup,
    FluxPaneHeader,
    FluxPaneMedia,
    FluxPersona,
    FluxPlaceholder,
    FluxPrimaryButton,
    FluxProgressBar,
    FluxProse,
    FluxQuantitySelector,
    FluxSecondaryButton,
    FluxSegmentedControl,
    FluxSegmentedControlItem,
    FluxSeparator,
    FluxSheet,
    FluxSkeleton,
    FluxSlideOver,
    FluxSnackbar,
    FluxSpacer,
    FluxSpinner,
    FluxSplitButton,
    FluxStepper,
    FluxStepperStep,
    FluxTab,
    FluxTabBar,
    FluxTabBarItem,
    FluxTable,
    FluxTableActions,
    FluxTableBar,
    FluxTableCell,
    FluxTableGroup,
    FluxTableHeader,
    FluxTableRow,
    FluxTabs,
    FluxTag,
    FluxTagStack,
    FluxText,
    FluxTicks,
    FluxTimeline,
    FluxTimelineItem,
    FluxToggle,
    FluxToolbar,
    FluxToolbarGroup,
    FluxTooltip,
    FluxTreeView,
    showAlert,
    showConfirm,
    showPrompt,
    showSnackbar,
    type FluxColor,
    type FluxCommandSource,
    type FluxFilterState,
    type FluxFormSelectOption,
    type FluxIconName,
    type FluxTreeViewOption
} from '@flux-ui/react';
import {DateTime} from 'luxon';
import ApplicationDemo from './playground/ApplicationDemo';
import Ranges from './playground/Ranges';
import PaletteSwitcher from './playground/PaletteSwitcher';
import Patterns from './playground/Patterns';
import InvoiceApproval from './playground/real-world/InvoiceApproval';
import OrderDetails from './playground/real-world/OrderDetails';
import ServiceDesk from './playground/real-world/ServiceDesk';
import VisitPlanner from './playground/real-world/VisitPlanner';
import {clsx} from 'clsx';
import $style from './playground-0.module.scss';
function parseStyle(value: CSSProperties | string | undefined): CSSProperties {
    if (typeof value !== 'string') return value ?? {};
    return Object.fromEntries(
        value
            .split(';')
            .filter((part) => part.includes(':'))
            .map((part) => {
                const colon = part.indexOf(':');
                const name = part.slice(0, colon).trim();
                return [
                    name.startsWith('--')
                        ? name
                        : name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
                    part.slice(colon + 1).trim()
                ];
            })
    );
}
export default function Example() {
    type OpenedSheet = 'fitted' | 'scrolling' | 'snap' | 'static' | null;
    type SheetPosition = 'bottom' | 'left' | 'right' | 'top';
    type Deployment = {
        readonly id: number;
        readonly service: string;
        readonly environment: string;
        readonly status: string;
        readonly color?: FluxColor;
        readonly deployed: string;
        readonly owner: string;
        readonly duration: string;
        readonly cost: number;
    };
    type Invoice = {
        readonly id: number;
        readonly number: string;
        readonly customer: string;
        readonly status: string;
        readonly amount: number;
    };
    const colors: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];
    const shadows = ['px', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const sheetPositions: SheetPosition[] = ['bottom', 'left', 'right', 'top'];
    const shareTargets: {
        icon: FluxIconName;
        label: string;
    }[] = [
        {icon: 'copy', label: 'Copy link'},
        {icon: 'envelope', label: 'Send as email'},
        {icon: 'message', label: 'Share in chat'}
    ];
    const notices: {
        color: FluxColor;
        icon: FluxIconName;
        title: string;
        message: string;
    }[] = [
        {
            color: 'gray',
            icon: 'circle-info',
            title: 'Neutral',
            message: 'A neutral message without any urgency attached to it.'
        },
        {
            color: 'primary',
            icon: 'sparkles',
            title: 'Primary',
            message: 'The brand intent, used for anything the product wants to promote.'
        },
        {
            color: 'danger',
            icon: 'circle-exclamation',
            title: 'Danger',
            message: 'Something failed and needs attention before it can continue.'
        },
        {
            color: 'info',
            icon: 'circle-info',
            title: 'Info',
            message: 'Background information that helps but never blocks.'
        },
        {
            color: 'success',
            icon: 'circle-check',
            title: 'Success',
            message: 'The operation finished and everything is in order.'
        },
        {
            color: 'warning',
            icon: 'hourglass-clock',
            title: 'Warning',
            message: 'This will keep working for now, but it will not forever.'
        }
    ];
    const menuOptions = ['First option', 'Second option', 'Third option'];
    const menuCommands: {
        readonly icon: FluxIconName;
        readonly label: string;
    }[] = [
        {icon: 'file-plus', label: 'New file'},
        {icon: 'folder', label: 'Open folder'},
        {icon: 'clone', label: 'Duplicate'},
        {icon: 'pen', label: 'Rename'},
        {icon: 'users', label: 'Invite members'},
        {icon: 'gear', label: 'Settings'}
    ];
    const countries: FluxFormSelectOption[] = [
        {label: 'Belgium', value: 'be'},
        {label: 'Germany', value: 'de'},
        {label: 'Netherlands', value: 'nl'},
        {label: 'Sweden', value: 'se'},
        {label: 'United Kingdom', value: 'uk'}
    ];
    const cities: FluxFormSelectOption[] = [
        {label: 'Amsterdam', value: 'ams'},
        {label: 'Berlin', value: 'ber'},
        {label: 'Ghent', value: 'gnt'},
        {label: 'Stockholm', value: 'sto'}
    ];
    const teams: FluxFormSelectOption[] = [
        {icon: 'palette', label: 'Design', value: 'design'},
        {icon: 'code-branch', label: 'Engineering', value: 'engineering'},
        {icon: 'message', label: 'Support', value: 'support'}
    ];
    const people = [
        {
            name: 'Bas Milius',
            role: 'Engineer',
            avatar: 'https://avatars.githubusercontent.com/u/978257?v=4'
        },
        {name: 'Jane Doe', role: 'Designer', avatar: null},
        {name: 'John Doe', role: 'Product manager', avatar: null}
    ];
    const treeOptions: FluxTreeViewOption[] = [
        {
            id: 1,
            label: 'Electronics',
            children: [
                {
                    id: 2,
                    label: 'Computers',
                    children: [
                        {id: 3, label: 'Laptops'},
                        {id: 4, label: 'Desktops'}
                    ]
                },
                {id: 5, label: 'Phones'}
            ]
        },
        {
            id: 6,
            label: 'Clothing',
            children: [
                {id: 7, label: 'Men'},
                {id: 8, label: 'Women'}
            ]
        }
    ];
    const deployments: Deployment[] = [
        {
            id: 1,
            service: 'api-gateway',
            environment: 'production',
            status: 'Live',
            color: 'success',
            deployed: '12 Mar, 09:14',
            owner: 'Ada Lovelace',
            duration: '2m 41s',
            cost: 128
        },
        {
            id: 2,
            service: 'billing-worker',
            environment: 'production',
            status: 'Degraded',
            color: 'warning',
            deployed: '12 Mar, 08:52',
            owner: 'Alan Turing',
            duration: '4m 03s',
            cost: 96
        },
        {
            id: 3,
            service: 'web-frontend',
            environment: 'production',
            status: 'Live',
            deployed: '12 Mar, 08:40',
            owner: 'Grace Hopper',
            duration: '1m 55s',
            cost: 212
        },
        {
            id: 4,
            service: 'search-index',
            environment: 'staging',
            status: 'Failed',
            color: 'danger',
            deployed: '12 Mar, 08:12',
            owner: 'Katherine Blake',
            duration: '0m 38s',
            cost: 34
        },
        {
            id: 5,
            service: 'image-resizer',
            environment: 'staging',
            status: 'Building',
            color: 'info',
            deployed: '12 Mar, 07:59',
            owner: 'Ada Lovelace',
            duration: '3m 12s',
            cost: 47
        },
        {
            id: 6,
            service: 'mail-relay',
            environment: 'production',
            status: 'Live',
            color: 'success',
            deployed: '11 Mar, 22:31',
            owner: 'Alan Turing',
            duration: '1m 09s',
            cost: 18
        },
        {
            id: 7,
            service: 'auth-service',
            environment: 'production',
            status: 'Queued',
            color: 'primary',
            deployed: '11 Mar, 21:44',
            owner: 'Grace Hopper',
            duration: '0m 00s',
            cost: 0
        },
        {
            id: 8,
            service: 'report-runner',
            environment: 'sandbox',
            status: 'Live',
            deployed: '11 Mar, 20:05',
            owner: 'Katherine Blake',
            duration: '6m 27s',
            cost: 73
        },
        {
            id: 9,
            service: 'event-bus',
            environment: 'production',
            status: 'Live',
            deployed: '11 Mar, 19:18',
            owner: 'Ada Lovelace',
            duration: '2m 02s',
            cost: 154
        },
        {
            id: 10,
            service: 'cdn-purge',
            environment: 'production',
            status: 'Live',
            deployed: '11 Mar, 18:47',
            owner: 'Milan Rooij',
            duration: '0m 44s',
            cost: 12
        }
    ];
    const sheetActivity = Array.from({length: 24}, (_, index) => {
        const deployment = deployments[index % deployments.length];
        return {
            id: index,
            color: deployment.color,
            service: deployment.service,
            status: deployment.status,
            when: `${28 - index} Feb, ${String(9 + (index % 9)).padStart(2, '0')}:${String((index * 7) % 60).padStart(2, '0')}`
        };
    });
    const invoices: Invoice[] = [
        {
            id: 1,
            number: 'INV-2024-001',
            customer: 'Northwind Studio',
            status: 'Paid',
            amount: 1240
        },
        {
            id: 2,
            number: 'INV-2024-002',
            customer: 'Harbour Collective',
            status: 'Open',
            amount: 3180
        },
        {
            id: 3,
            number: 'INV-2024-003',
            customer: 'Meridian Labs',
            status: 'Overdue',
            amount: 940
        },
        {id: 4, number: 'INV-2024-004', customer: 'Alder & Finch', status: 'Paid', amount: 2260},
        {id: 5, number: 'INV-2024-005', customer: 'Sable Works', status: 'Draft', amount: 610}
    ];
    const teamGroups: {
        name: string;
        icon: FluxIconName;
        members: {
            name: string;
            role: string;
            access: string;
        }[];
    }[] = [
        {
            name: 'Engineering',
            icon: 'code-branch',
            members: [
                {name: 'Ada Lovelace', role: 'Lead engineer', access: 'Owner'},
                {name: 'Alan Turing', role: 'Engineer', access: 'Member'},
                {name: 'Milan Rooij', role: 'Engineer', access: 'Member'}
            ]
        },
        {
            name: 'Design',
            icon: 'palette',
            members: [
                {name: 'Grace Hopper', role: 'Product designer', access: 'Owner'},
                {name: 'Ines Faber', role: 'Designer', access: 'Member'}
            ]
        },
        {
            name: 'Support',
            icon: 'message',
            members: [{name: 'Katherine Blake', role: 'Support lead', access: 'Member'}]
        }
    ];
    const kanbanColumns: {
        id: string;
        icon: FluxIconName;
        label: string;
    }[] = [
        {id: 'todo', icon: 'list', label: 'To do'},
        {id: 'doing', icon: 'bolt', label: 'In progress'},
        {id: 'done', icon: 'circle-check', label: 'Done'}
    ];
    const kanbanCards: {
        id: number;
        columnId: string;
        title: string;
        color: FluxColor;
        label: string;
    }[] = [
        {
            id: 1,
            columnId: 'todo',
            title: 'Audit the palette scales',
            color: 'danger',
            label: 'High'
        },
        {
            id: 2,
            columnId: 'todo',
            title: 'Write the token reference',
            color: 'warning',
            label: 'Medium'
        },
        {id: 3, columnId: 'todo', title: 'Check the focus ring', color: 'gray', label: 'Low'},
        {
            id: 4,
            columnId: 'doing',
            title: 'Rework the table header border',
            color: 'danger',
            label: 'High'
        },
        {
            id: 5,
            columnId: 'doing',
            title: 'Soften the button inner line',
            color: 'info',
            label: 'In review'
        },
        {
            id: 6,
            columnId: 'done',
            title: 'Split the token files',
            color: 'success',
            label: 'Done'
        },
        {
            id: 7,
            columnId: 'done',
            title: 'Add the elevation mixin',
            color: 'success',
            label: 'Done'
        }
    ];
    const galleryItems = [
        '/assets/demo/image-1.jpg',
        '/assets/demo/image-2.jpg',
        '/assets/demo/image-3.jpg',
        '/assets/demo/image-4.jpg',
        '/assets/demo/image-5.jpg'
    ];
    const anchorDate = DateTime.now().startOf('month').plus({days: 9});
    const commentTime = DateTime.now().minus({minutes: 12});
    const events = [
        {id: 1, date: anchorDate, label: 'Stand-up'},
        {id: 2, date: anchorDate, label: 'Token review'},
        {id: 3, date: anchorDate.plus({days: 1}), label: 'Pair programming'},
        {id: 4, date: anchorDate.plus({days: 2}), label: 'Design critique'},
        {id: 5, date: anchorDate.plus({days: 4}), label: 'Demo'},
        {id: 6, date: anchorDate.plus({days: 4}), label: 'Retrospective'},
        {id: 7, date: anchorDate.plus({days: 7}), label: 'Release'}
    ];
    const commandSources: FluxCommandSource[] = [
        {
            key: 'navigation',
            label: '',
            items: [
                {
                    id: 'dashboard',
                    label: 'Dashboard',
                    icon: 'grid-2',
                    onActivate: () => onCommand('Dashboard')
                },
                {
                    id: 'invoices',
                    label: 'Invoices',
                    icon: 'file-lines',
                    onActivate: () => onCommand('Invoices')
                },
                {
                    id: 'members',
                    label: 'Members',
                    icon: 'users',
                    onActivate: () => onCommand('Members')
                }
            ]
        },
        {
            key: 'actions',
            label: 'Actions',
            tab: true,
            items: [
                {
                    id: 'theme',
                    label: 'Toggle dark mode',
                    icon: 'moon',
                    command: '⌘D',
                    onActivate: () => onCommand('Toggle dark mode')
                },
                {
                    id: 'logout',
                    label: 'Log out',
                    icon: 'arrow-right-from-bracket',
                    onActivate: () => onCommand('Log out')
                }
            ]
        }
    ];
    const [step, setStep] = useState<Exclude<ComponentProps<typeof FluxStepper>['value'], undefined>>(0);
    const [tab, setTab] = useState<Exclude<ComponentProps<typeof FluxTabs>['value'], undefined>>(0);
    const [pillTab, setPillTab] = useState<Exclude<ComponentProps<typeof FluxTabs>['value'], undefined>>(0);
    const [wellTab, setWellTab] = useState<Exclude<ComponentProps<typeof FluxTabs>['value'], undefined>>(0);
    const [toggle, setToggle] =
        useState<Exclude<ComponentProps<typeof FluxToggle>['checked'], undefined>>(true);
    const [toggleIcon, setToggleIcon] =
        useState<Exclude<ComponentProps<typeof FluxToggle>['checked'], undefined>>(false);
    const [view, setView] =
        useState<Exclude<ComponentProps<typeof FluxSegmentedControl>['value'], undefined>>('grid');
    const [inlineValue, setInlineValue] =
        useState<Exclude<ComponentProps<typeof FluxInlineEdit>['value'], undefined>>('Project Apollo');
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const [openedSheet, setOpenedSheet] = useState<OpenedSheet>(null);
    const [sheetPosition, setSheetPosition] = useState<SheetPosition>('bottom');
    const [menuFilter, setMenuFilter] =
        useState<Exclude<ComponentProps<typeof FluxFormInput>['value'], undefined>>('');
    const [menuOption, setMenuOption] = useState('Second option');
    const [menuView, setMenuView] =
        useState<Exclude<ComponentProps<typeof FluxMenuOptions>['value'], undefined>>('grid');
    const [search, setSearch] =
        useState<Exclude<ComponentProps<typeof FluxFilterBar>['search'], undefined>>('');
    const [sort, setSort] = useState<'ascending' | 'descending' | null>('ascending');
    const [selectedDeployment, setSelectedDeployment] = useState(3);
    const [selectedInvoices, setSelectedInvoices] = useState<
        Exclude<ComponentProps<typeof FluxDataTable>['selected'], undefined>
    >([2]);
    const [invoicePage, setInvoicePage] = useState(1);
    const commandPalette = useRef<ComponentRef<typeof FluxCommandPalette> | null>(null);
    const [startDate, setStartDate] = useState<
        Exclude<ComponentProps<typeof FluxFormDateInput>['value'], undefined>
    >(DateTime.now());
    const [pickedDate, setPickedDate] = useState<
        Exclude<ComponentProps<typeof FluxDatePicker>['value'], undefined>
    >(DateTime.now());
    const [form, setForm] = useState({
        addons: ['backups'] as string[],
        budget: 1250 as number | null,
        category: 3 as number | null,
        city: 'ams' as string | number | null,
        country: 'nl' as string | number | null,
        device: 'laptop',
        email: 'ada@example.com',
        indeterminate: null as boolean | null,
        name: 'Ada Lovelace',
        notes: 'A short note that stays well under the counter limit.',
        notifications: ['email'] as string[],
        pin: '1234',
        plan: 'team',
        quantity: 3,
        rating: 3.5 as number | null,
        search: '',
        tags: ['design', 'tokens'] as string[],
        teams: ['design'] as (string | number | null)[],
        website: 'flux-ui.dev'
    });
    const [filterState, setFilterState] = useState<
        Exclude<ComponentProps<typeof FluxFilterBar>['value'], undefined>
    >({
        amount: null,
        issued: null,
        owner: null,
        status: null
    });
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        Design: true,
        Engineering: true,
        Support: false
    });
    const filteredMenuCommands = (() =>
        menuCommands.filter((command) =>
            command.label.toLowerCase().includes(String(menuFilter).toLowerCase())
        ))();
    const failedCount = (() => deployments.filter((deployment) => deployment.status === 'Failed').length)();
    const totalCost = (() => deployments.reduce((total, deployment) => total + deployment.cost, 0))();
    const totalDuration = (() => {
        const seconds = deployments.reduce((total, deployment) => {
            const [minutes, remainder] = deployment.duration.split(' ');
            return total + Number.parseInt(minutes, 10) * 60 + Number.parseInt(remainder, 10);
        }, 0);
        return `${Math.floor(seconds / 60)}m ${`${seconds % 60}`.padStart(2, '0')}s`;
    })();
    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            style: 'currency'
        }).format(value);
    }
    function invoiceColor(invoice: Invoice): FluxColor | undefined {
        switch (invoice.status) {
            case 'Paid':
                return 'success';
            case 'Overdue':
                return 'danger';
            case 'Open':
                return 'info';
            default:
                return undefined;
        }
    }
    function onCommand(label: string): void {
        showSnackbar({
            icon: 'circle-check',
            message: `Activated: ${label}`
        });
    }
    function openSheet(position: SheetPosition): void {
        setSheetPosition(position);
        setOpenedSheet('snap');
    }
    function onSnackbar(): void {
        showSnackbar({
            icon: 'circle-check',
            message: 'Your changes have been saved.'
        });
    }
    async function onAlert(): Promise<void> {
        await showAlert({
            icon: 'circle-info',
            title: 'Heads up',
            message: 'The color tokens were regenerated for both themes.'
        });
    }
    async function onConfirm(): Promise<void> {
        const result = await showConfirm({
            icon: 'circle-exclamation',
            title: 'Delete item',
            message: 'Are you sure you want to delete this item?'
        });
        showSnackbar({
            icon: result ? 'circle-check' : 'xmark',
            message: result ? 'Item deleted.' : 'Cancelled.'
        });
    }
    async function onPrompt(): Promise<void> {
        const result = await showPrompt({
            icon: 'pen',
            title: 'Rename project',
            message: 'Pick a new name for this project.',
            fieldLabel: 'Project name',
            fieldPlaceholder: 'Project Apollo'
        });
        showSnackbar({
            icon: result ? 'circle-check' : 'xmark',
            message: result ? `Renamed to ${result}.` : 'Cancelled.'
        });
    }
    const [exampleValue0, setExampleValue0] = useState(0);
    const [exampleValue1, setExampleValue1] = useState(13);
    const [exampleValue2, setExampleValue2] = useState(10);
    return (
        <>
            
                <FluxProse className={clsx($style.componentsPlayground)} container as={'article'}>
                    <h1>{'Flux playground'}</h1>
                    <p>
                        {'This whole page is a single '}
                        <code>{'FluxProse'}</code>
                        {
                            ' container. The headings, paragraphs, lists and tables sit at a readable measure and flow in the prose rhythm, while Flux components are dropped straight in between them. No wrappers, no resets: prose only styles its own HTML elements, so every component keeps its own look and still lines up in the vertical rhythm.'
                        }
                    </p>
                    <p>
                        {
                            'Use it to eyeball how the pieces look together and how the light element defaults and the rich prose styling coexist on one page. It is also the sheet used to review the color tokens, so most components appear in every intent and in every state that changes their surface, border or text color. Switch the site between light and dark and scroll through once.'
                        }
                    </p>
                    <h2>{'Palette'}</h2>
                    <p>
                        {
                            'The palette is a control surface rather than a lookup table: the semantic and intent tokens refer to '
                        }
                        <code>{'--palette-*'}</code>
                        {
                            ' instead of holding a color of their own. The button in the bottom right corner opens the switcher and stays there while the page scrolls, so a scale can be swapped next to whatever component is on screen. '
                        }
                        <kbd>{'Shift'}</kbd>
                        <kbd>{'G'}</kbd>
                        {' and '}
                        <kbd>{'Shift'}</kbd>
                        <kbd>{'P'}</kbd>
                        {
                            ' cycle the neutral and the primary scale without opening it at all. The two combine, so a brand can be checked as it would actually ship.'
                        }
                    </p>
                    <h2>{'Buttons and actions'}</h2>
                    <p>
                        {
                            'Buttons come in a few variants and can be grouped in a stack, or combined with a menu in a split button.'
                        }
                    </p>
                    <FluxButtonStack>
                        <FluxPrimaryButton iconLeading={'circle-check'} label={'Save'}></FluxPrimaryButton>
                        <FluxSecondaryButton iconLeading={'copy'} label={'Duplicate'}></FluxSecondaryButton>
                        <FluxDestructiveButton iconLeading={'xmark'} label={'Delete'}></FluxDestructiveButton>
                        <FluxSplitButton
                            button={() => (
                                <>
                                    <FluxSecondaryButton label={'Download'}></FluxSecondaryButton>
                                </>
                            )}
                            flyout={() => (
                                <>
                                    <FluxMenu>
                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                iconLeading={'rectangle-sd'}
                                                label={'Download in SD'}
                                            ></FluxMenuItem>
                                            <FluxMenuItem
                                                iconLeading={'rectangle-hd'}
                                                label={'Download in HD'}
                                            ></FluxMenuItem>
                                        </FluxMenuGroup>
                                        <FluxSeparator></FluxSeparator>
                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                iconLeading={'rectangle-4k'}
                                                label={'Download in 4K'}
                                            ></FluxMenuItem>
                                        </FluxMenuGroup>
                                    </FluxMenu>
                                </>
                            )}
                        ></FluxSplitButton>
                    </FluxButtonStack>
                    <p>
                        {
                            'The secondary and destructive buttons carry an inner line on top of their surface. It is easiest to judge at the two largest sizes, so they sit next to each other here.'
                        }
                    </p>
                    <FluxButtonStack>
                        <FluxSecondaryButton
                            iconLeading={'floppy-disk'}
                            label={'Save draft'}
                            size={'large'}
                        ></FluxSecondaryButton>
                        <FluxDestructiveButton
                            iconLeading={'trash'}
                            label={'Delete project'}
                            size={'large'}
                        ></FluxDestructiveButton>
                    </FluxButtonStack>
                    <FluxButtonStack>
                        <FluxSecondaryButton
                            iconLeading={'floppy-disk'}
                            label={'Save draft'}
                            size={'xl'}
                        ></FluxSecondaryButton>
                        <FluxDestructiveButton
                            iconLeading={'trash'}
                            label={'Delete project'}
                            size={'xl'}
                        ></FluxDestructiveButton>
                    </FluxButtonStack>
                    <p>
                        {
                            'Every variant in the four states that change how it is painted: resting, active, loading and disabled.'
                        }
                    </p>
                    <FluxButtonStack>
                        <FluxPrimaryButton label={'Primary'}></FluxPrimaryButton>
                        <FluxPrimaryButton isActive label={'Active'}></FluxPrimaryButton>
                        <FluxPrimaryButton isLoading label={'Loading'}></FluxPrimaryButton>
                        <FluxPrimaryButton disabled label={'Disabled'}></FluxPrimaryButton>
                    </FluxButtonStack>
                    <FluxButtonStack>
                        <FluxSecondaryButton label={'Secondary'}></FluxSecondaryButton>
                        <FluxSecondaryButton isActive label={'Active'}></FluxSecondaryButton>
                        <FluxSecondaryButton isLoading label={'Loading'}></FluxSecondaryButton>
                        <FluxSecondaryButton disabled label={'Disabled'}></FluxSecondaryButton>
                    </FluxButtonStack>
                    <FluxButtonStack>
                        <FluxDestructiveButton label={'Destructive'}></FluxDestructiveButton>
                        <FluxDestructiveButton isActive label={'Active'}></FluxDestructiveButton>
                        <FluxDestructiveButton isLoading label={'Loading'}></FluxDestructiveButton>
                        <FluxDestructiveButton disabled label={'Disabled'}></FluxDestructiveButton>
                    </FluxButtonStack>
                    <p>{'Buttons also come as a connected group and as bare icon actions in a stack.'}</p>
                    <FluxFlex gap={18} align={'center'} wrap={'wrap'}>
                        <FluxButtonGroup>
                            <FluxSecondaryButton iconLeading={'align-left'} isActive></FluxSecondaryButton>
                            <FluxSecondaryButton iconLeading={'align-center'}></FluxSecondaryButton>
                            <FluxSecondaryButton iconLeading={'align-right'}></FluxSecondaryButton>
                            <FluxSecondaryButton iconLeading={'align-justify'}></FluxSecondaryButton>
                        </FluxButtonGroup>
                        <FluxActionStack>
                            <FluxAction icon={'pen'}></FluxAction>
                            <FluxAction icon={'copy'}></FluxAction>
                            <FluxAction isActive icon={'eye'}></FluxAction>
                            <FluxAction disabled icon={'lock'}></FluxAction>
                            <FluxAction icon={'trash'} isDestructive></FluxAction>
                        </FluxActionStack>
                    </FluxFlex>
                    <FluxFlex gap={18} align={'center'} wrap={'wrap'}>
                        <FluxLink href={'#'} label={'A plain link'} type={'link'}></FluxLink>
                        <FluxLink
                            href={'#'}
                            iconLeading={'arrow-up-right-from-square'}
                            isPrimary
                            label={'A primary link'}
                            type={'link'}
                        ></FluxLink>
                        <FluxLink disabled label={'A disabled link'} type={'link'}></FluxLink>
                    </FluxFlex>
                    <h2>{'Status and feedback'}</h2>
                    <p>
                        {
                            'Badges, tags and notices carry status, while snackbars and dialogs are triggered programmatically.'
                        }
                    </p>
                    <FluxBadgeStack>
                        <FluxBadge label={'Help wanted'}></FluxBadge>
                        <FluxBadge color={'success'} icon={'circle-check'} label={'Completed'}></FluxBadge>
                        <FluxBadge color={'danger'} dot label={'Attention'}></FluxBadge>
                        <FluxBadge color={'primary'} colored label={'Featured'}></FluxBadge>
                    </FluxBadgeStack>
                    <p>
                        {
                            'The same badge in all six intents, first with a tinted dot on a neutral surface and then fully colored.'
                        }
                    </p>
                    <FluxBadgeStack>
                        {colors.map((color) => (
                            <FluxBadge key={color} color={color} dot label={color}></FluxBadge>
                        ))}
                    </FluxBadgeStack>
                    <FluxBadgeStack>
                        {colors.map((color) => (
                            <FluxBadge
                                key={color}
                                color={color}
                                colored
                                icon={'circle-check'}
                                label={color}
                            ></FluxBadge>
                        ))}
                    </FluxBadgeStack>
                    <FluxTagStack>
                        <FluxTag label={'Design'}></FluxTag>
                        <FluxTag color={'success'} icon={'circle-check'} label={'Shipped'}></FluxTag>
                        <FluxTag isDeletable label={'Draft'}></FluxTag>
                    </FluxTagStack>
                    <FluxTagStack>
                        {colors.map((color) => (
                            <FluxTag key={color} color={color} isDeletable label={color}></FluxTag>
                        ))}
                    </FluxTagStack>
                    <FluxBadgeStack>
                        <FluxChip iconLeading={'sparkles'} label={'Chip'}></FluxChip>
                        <FluxChip
                            iconLeading={'check'}
                            isSelectable
                            isSelected
                            label={'Selected chip'}
                        ></FluxChip>
                        <FluxChip
                            iconLeading={'circle-dot'}
                            isSelectable
                            label={'Selectable chip'}
                        ></FluxChip>
                    </FluxBadgeStack>
                    <FluxNotice color={'warning'} icon={'circle-exclamation'}>
                        <p>
                            {'Heads up: mark an element with '}
                            <code>{'data-prose-full'}</code>
                            {' and it spans the whole container. Inside a notice, inline '}
                            <code>{'code'}</code>
                            {" keeps the notice's own styling rather than the prose chip."}
                        </p>
                    </FluxNotice>
                    <p>
                        {
                            'Notices repeat the intent contract at full width, which makes the tinted surface, the border and the icon color easy to compare.'
                        }
                    </p>
                    <FluxNoticeStack>
                        {notices.map((notice) => (
                            <FluxNotice
                                key={notice.color}
                                color={notice.color}
                                icon={notice.icon}
                                isCloseable
                                message={notice.message}
                                title={notice.title}
                            ></FluxNotice>
                        ))}
                    </FluxNoticeStack>
                    <p>{'Inline information messages use the same intents at a smaller size.'}</p>
                    <FluxPane>
                        <FluxPaneBody>
                            <FluxInfoStack>
                                {notices.map((notice) => (
                                    <FluxInfo key={notice.color} color={notice.color} icon={notice.icon}>
                                        {notice.message}
                                    </FluxInfo>
                                ))}
                            </FluxInfoStack>
                        </FluxPaneBody>
                    </FluxPane>
                    <p>{'Spinners and progress bars pick up the intent color on a neutral track.'}</p>
                    <FluxFlex gap={18} align={'center'} wrap={'wrap'}>
                        {colors.map((color) => (
                            <FluxSpinner key={color} color={color} size={27}></FluxSpinner>
                        ))}
                    </FluxFlex>
                    <FluxFlex gap={12} direction={'vertical'}>
                        {colors.map((color, index) => (
                            <FluxProgressBar
                                key={color}
                                color={color}
                                status={color}
                                value={(index + 1) / 7}
                            ></FluxProgressBar>
                        ))}
                        <FluxProgressBar isIndeterminate status={'Indeterminate'}></FluxProgressBar>
                    </FluxFlex>
                    <p>
                        {
                            'A snackbar is a raised surface with its own shadow. These are rendered in place instead of through the provider, so all six intents can be seen at once.'
                        }
                    </p>
                    <FluxFlex gap={12} direction={'vertical'}>
                        {notices.map((notice) => (
                            <FluxSnackbar
                                key={notice.color}
                                color={notice.color}
                                icon={notice.icon}
                                isRendered
                                message={notice.message}
                                title={notice.title}
                            ></FluxSnackbar>
                        ))}
                    </FluxFlex>
                    <FluxButtonStack>
                        <FluxSecondaryButton
                            iconLeading={'circle-arrow-up'}
                            label={'Snackbar'}
                            onClick={onSnackbar}
                        ></FluxSecondaryButton>
                        <FluxSecondaryButton
                            iconLeading={'circle-info'}
                            label={'Alert'}
                            onClick={onAlert}
                        ></FluxSecondaryButton>
                        <FluxSecondaryButton
                            iconLeading={'circle-exclamation'}
                            label={'Confirm'}
                            onClick={onConfirm}
                        ></FluxSecondaryButton>
                        <FluxSecondaryButton
                            iconLeading={'pen'}
                            label={'Prompt'}
                            onClick={onPrompt}
                        ></FluxSecondaryButton>
                    </FluxButtonStack>
                    <FluxButtonStack>
                        <FluxTooltip content={'A tooltip above the button'}>
                            <FluxSecondaryButton
                                iconLeading={'circle-question'}
                                label={'Tooltip, vertical'}
                            ></FluxSecondaryButton>
                        </FluxTooltip>
                        <FluxTooltip content={'A tooltip beside the button'} direction={'horizontal'}>
                            <FluxSecondaryButton
                                iconLeading={'circle-question'}
                                label={'Tooltip, horizontal'}
                            ></FluxSecondaryButton>
                        </FluxTooltip>
                    </FluxButtonStack>
                    <h2>{'Forms'}</h2>
                    <p>
                        {
                            'Form controls share one input surface, so a change to the well, the border or the focus ring shows up on every field at once. The panes below split them by kind: what is typed, what is picked, what is counted, and the states each of them can end up in.'
                        }
                    </p>
                    <FluxMasonry columns={{xs: 1, sm: 2, xl: 4}} data-prose-full gap={24}>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'pen'}
                                subtitle={'Everything that is typed'}
                                title={'Text fields'}
                            ></FluxPaneHeader>
                            <FluxForm>
                                <FluxPaneBody>
                                    <FluxFormColumn>
                                        <FluxFormField label={'Full name'}>
                                            <FluxFormInput
                                                value={form.name}
                                                onValueChange={(next) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        ['name']: String(next ?? '')
                                                    }))
                                                }
                                                autoComplete={'name'}
                                                placeholder={'Ada Lovelace'}
                                            ></FluxFormInput>
                                        </FluxFormField>
                                        <FluxFormField label={'Email'}>
                                            <FluxFormInput
                                                value={form.email}
                                                onValueChange={(next) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        ['email']: String(next ?? '')
                                                    }))
                                                }
                                                autoComplete={'email'}
                                                iconLeading={'envelope'}
                                                placeholder={'email@example.com'}
                                                type={'email'}
                                            ></FluxFormInput>
                                        </FluxFormField>
                                        <FluxFormField label={'Search'}>
                                            <FluxFormInput
                                                value={form.search}
                                                onValueChange={(next) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        ['search']: String(next ?? '')
                                                    }))
                                                }
                                                iconLeading={'magnifying-glass'}
                                                placeholder={'Search anything...'}
                                                type={'search'}
                                            ></FluxFormInput>
                                        </FluxFormField>
                                        <FluxFormField label={'Notes'}>
                                            <FluxFormTextArea
                                                value={form.notes}
                                                onValueChange={(next) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        ['notes']: next
                                                    }))
                                                }
                                                placeholder={'Anything worth writing down...'}
                                                rows={3}
                                            ></FluxFormTextArea>
                                        </FluxFormField>
                                    </FluxFormColumn>
                                </FluxPaneBody>
                            </FluxForm>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'list'}
                                subtitle={'Everything that opens a flyout'}
                                title={'Pickers'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFormColumn>
                                    <FluxFormField label={'Country'}>
                                        <FluxFormSelect
                                            value={form.country}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['country']: Array.isArray(next)
                                                        ? (next[0] ?? null)
                                                        : next
                                                }))
                                            }
                                            isSearchable
                                            options={countries}
                                            placeholder={'Select a country...'}
                                        ></FluxFormSelect>
                                    </FluxFormField>
                                    <FluxFormField label={'Teams'}>
                                        <FluxFormSelect
                                            value={form.teams}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['teams']: Array.isArray(next)
                                                        ? next
                                                        : next === null
                                                          ? []
                                                          : [next]
                                                }))
                                            }
                                            isMultiple
                                            options={teams}
                                            placeholder={'Select one or more teams...'}
                                        ></FluxFormSelect>
                                    </FluxFormField>
                                    <FluxFormField label={'City'}>
                                        <FluxFormCombobox
                                            value={form.city}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['city']: Array.isArray(next) ? (next[0] ?? null) : next
                                                }))
                                            }
                                            isCreatable
                                            options={cities}
                                            placeholder={'Pick or create a city...'}
                                        ></FluxFormCombobox>
                                    </FluxFormField>
                                    <FluxFormField label={'Category'}>
                                        <FluxFormTreeViewSelect
                                            value={form.category}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['category']: typeof next === 'number' ? next : null
                                                }))
                                            }
                                            levelColors={['primary', 'info', 'success']}
                                            options={treeOptions}
                                            placeholder={'Select a category...'}
                                        ></FluxFormTreeViewSelect>
                                    </FluxFormField>
                                </FluxFormColumn>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'hashtag'}
                                subtitle={'Numbers, dates, codes and labels'}
                                title={'Structured input'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFormColumn>
                                    <FluxFormField label={'Budget'}>
                                        <FluxFormNumberInput
                                            value={form.budget}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['budget']: next
                                                }))
                                            }
                                            min={0}
                                            step={50}
                                        ></FluxFormNumberInput>
                                    </FluxFormField>
                                    <FluxFormField label={'Start date'}>
                                        <FluxFormDateInput
                                            value={startDate}
                                            onValueChange={setStartDate}
                                        ></FluxFormDateInput>
                                    </FluxFormField>
                                    <FluxFormField label={'Verification code'}>
                                        <FluxFormPinInput
                                            value={form.pin}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['pin']: next
                                                }))
                                            }
                                            maxLength={6}
                                        ></FluxFormPinInput>
                                    </FluxFormField>
                                    <FluxFormField label={'Labels'}>
                                        <FluxFormTagsInput
                                            value={form.tags}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['tags']: next
                                                }))
                                            }
                                            placeholder={'Add a label...'}
                                            tagColor={'primary'}
                                        ></FluxFormTagsInput>
                                    </FluxFormField>
                                    <FluxFormField label={'Quantity'}>
                                        <FluxQuantitySelector
                                            value={form.quantity}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['quantity']: next
                                                }))
                                            }
                                            max={10}
                                            min={1}
                                        ></FluxQuantitySelector>
                                    </FluxFormField>
                                </FluxFormColumn>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'grip'}
                                subtitle={'Additions attached to a field'}
                                title={'Input groups'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFormColumn>
                                    <FluxFormField label={'Website'}>
                                        <FluxFormInputGroup>
                                            <FluxFormInputAddition label={'https://'}></FluxFormInputAddition>
                                            <FluxFormInput
                                                value={form.website}
                                                onValueChange={(next) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        ['website']: String(next ?? '')
                                                    }))
                                                }
                                                placeholder={'example.com'}
                                            ></FluxFormInput>
                                        </FluxFormInputGroup>
                                    </FluxFormField>
                                    <FluxFormField label={'Amount'}>
                                        <FluxFormInputGroup>
                                            <FluxFormInputAddition icon={'coin'}></FluxFormInputAddition>
                                            <FluxFormNumberInput
                                                value={form.budget}
                                                onValueChange={(next) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        ['budget']: next
                                                    }))
                                                }
                                                min={0}
                                            ></FluxFormNumberInput>
                                            <FluxFormInputAddition label={'EUR'}></FluxFormInputAddition>
                                        </FluxFormInputGroup>
                                    </FluxFormField>
                                    <FluxFormField label={'Secondary group'}>
                                        <FluxFormInputGroup isSecondary>
                                            <FluxFormInputAddition
                                                icon={'magnifying-glass'}
                                            ></FluxFormInputAddition>
                                            <FluxFormInput
                                                value={form.search}
                                                onValueChange={(next) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        ['search']: String(next ?? '')
                                                    }))
                                                }
                                                placeholder={'Search...'}
                                            ></FluxFormInput>
                                        </FluxFormInputGroup>
                                    </FluxFormField>
                                    <FluxFormField label={'Condensed group'}>
                                        <FluxFormInputGroup isCondensed>
                                            <FluxFormInputAddition icon={'envelope'}></FluxFormInputAddition>
                                            <FluxFormInput
                                                value={form.email}
                                                onValueChange={(next) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        ['email']: String(next ?? '')
                                                    }))
                                                }
                                                placeholder={'email@example.com'}
                                            ></FluxFormInput>
                                        </FluxFormInputGroup>
                                    </FluxFormField>
                                </FluxFormColumn>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'circle-exclamation'}
                                subtitle={'Error, hint, disabled, readonly and loading'}
                                title={'Field states'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFormColumn>
                                    <FluxFormField
                                        error={'This email address is already in use.'}
                                        label={'Invalid'}
                                    >
                                        <FluxFormInput
                                            error={'This email address is already in use.'}
                                            value={'ada@example.com'}
                                        ></FluxFormInput>
                                    </FluxFormField>
                                    <FluxFormField
                                        hint={'We only use this to send the receipt.'}
                                        isOptional
                                        label={'With a hint'}
                                    >
                                        <FluxFormInput placeholder={'Optional'}></FluxFormInput>
                                    </FluxFormField>
                                    <FluxFormField
                                        currentLength={form.notes.length}
                                        label={'With a counter'}
                                        maxLength={120}
                                    >
                                        <FluxFormTextArea
                                            value={form.notes}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['notes']: next
                                                }))
                                            }
                                            maxLength={120}
                                            rows={2}
                                        ></FluxFormTextArea>
                                    </FluxFormField>
                                    <FluxFormField label={'Disabled'}>
                                        <FluxFormInput disabled value={'Cannot be changed'}></FluxFormInput>
                                    </FluxFormField>
                                    <FluxFormField label={'Readonly'}>
                                        <FluxFormInput
                                            isReadonly
                                            value={'Reads as plain text'}
                                        ></FluxFormInput>
                                    </FluxFormField>
                                    <FluxFormField label={'Loading'}>
                                        <FluxFormInput
                                            isLoading
                                            value={'Checking availability...'}
                                        ></FluxFormInput>
                                    </FluxFormField>
                                    <FluxFormField label={'Secondary'}>
                                        <FluxFormInput
                                            isSecondary
                                            placeholder={'On a secondary surface'}
                                        ></FluxFormInput>
                                    </FluxFormField>
                                    <FluxFormField label={'Condensed'}>
                                        <FluxFormInput
                                            isCondensed
                                            placeholder={'A smaller field'}
                                        ></FluxFormInput>
                                    </FluxFormField>
                                    <FluxFormField label={'Invalid select'}>
                                        <FluxFormSelect
                                            value={form.country}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['country']: Array.isArray(next)
                                                        ? (next[0] ?? null)
                                                        : next
                                                }))
                                            }
                                            error={'Pick a country.'}
                                            options={countries}
                                            placeholder={'Select a country...'}
                                        ></FluxFormSelect>
                                    </FluxFormField>
                                    <FluxDisabled disabled>
                                        <FluxFormField label={'Inside FluxDisabled'}>
                                            <FluxFormInput
                                                placeholder={'Everything below is disabled'}
                                            ></FluxFormInput>
                                        </FluxFormField>
                                    </FluxDisabled>
                                </FluxFormColumn>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'circle-dot'}
                                subtitle={'Radios, checkboxes and toggles'}
                                title={'Choices'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFormColumn>
                                    <FluxFormField as={'group'} label={'Plan'}>
                                        <FluxFormRadioGroup
                                            value={form.plan}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['plan']: String(next ?? '')
                                                }))
                                            }
                                        >
                                            <FluxFormRadio
                                                label={'Starter'}
                                                subLabel={'For a single project'}
                                                value={'starter'}
                                            ></FluxFormRadio>
                                            <FluxFormRadio
                                                label={'Team'}
                                                subLabel={'Up to ten seats'}
                                                value={'team'}
                                            ></FluxFormRadio>
                                            <FluxFormRadio
                                                disabled
                                                label={'Enterprise'}
                                                subLabel={'Contact sales'}
                                                value={'enterprise'}
                                            ></FluxFormRadio>
                                        </FluxFormRadioGroup>
                                    </FluxFormField>
                                    <FluxFormField as={'group'} label={'Connected radios'}>
                                        <FluxFormRadioGroup
                                            value={form.plan}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['plan']: String(next ?? '')
                                                }))
                                            }
                                            isConnected
                                            isInline
                                        >
                                            <FluxFormRadio
                                                label={'Starter'}
                                                value={'starter'}
                                            ></FluxFormRadio>
                                            <FluxFormRadio label={'Team'} value={'team'}></FluxFormRadio>
                                            <FluxFormRadio
                                                label={'Enterprise'}
                                                value={'enterprise'}
                                            ></FluxFormRadio>
                                        </FluxFormRadioGroup>
                                    </FluxFormField>
                                    <FluxFormField as={'group'} label={'Radio tiles'}>
                                        <FluxFormRadioGroup
                                            value={form.device}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['device']: String(next ?? '')
                                                }))
                                            }
                                        >
                                            <FluxFormRadioTile
                                                icon={'laptop'}
                                                label={'Laptop'}
                                                subLabel={'Sync on the go'}
                                                value={'laptop'}
                                            ></FluxFormRadioTile>
                                            <FluxFormRadioTile
                                                icon={'desktop'}
                                                label={'Desktop'}
                                                subLabel={'Stays at the office'}
                                                value={'desktop'}
                                            ></FluxFormRadioTile>
                                        </FluxFormRadioGroup>
                                    </FluxFormField>
                                    <FluxFormField as={'group'} label={'Notifications'}>
                                        <FluxFormCheckboxGroup
                                            value={form.notifications}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['notifications']: next.map(String)
                                                }))
                                            }
                                        >
                                            <FluxFormCheckbox
                                                label={'Email'}
                                                value={'email'}
                                            ></FluxFormCheckbox>
                                            <FluxFormCheckbox
                                                label={'Push'}
                                                value={'push'}
                                            ></FluxFormCheckbox>
                                            <FluxFormCheckbox
                                                disabled
                                                label={'SMS'}
                                                value={'sms'}
                                            ></FluxFormCheckbox>
                                        </FluxFormCheckboxGroup>
                                    </FluxFormField>
                                    <FluxFormField as={'group'} label={'Checkbox tiles'}>
                                        <FluxFormCheckboxGroup
                                            value={form.addons}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['addons']: next.map(String)
                                                }))
                                            }
                                        >
                                            <FluxFormCheckboxTile
                                                icon={'database'}
                                                label={'Backups'}
                                                subLabel={'Every night'}
                                                value={'backups'}
                                            ></FluxFormCheckboxTile>
                                            <FluxFormCheckboxTile
                                                icon={'gauge'}
                                                label={'Monitoring'}
                                                subLabel={'With alerting'}
                                                value={'monitoring'}
                                            ></FluxFormCheckboxTile>
                                        </FluxFormCheckboxGroup>
                                    </FluxFormField>
                                    <FluxFormField label={'Indeterminate checkbox'}>
                                        <FluxFormCheckbox
                                            checked={form.indeterminate}
                                            onCheckedChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['indeterminate']: next
                                                }))
                                            }
                                            label={'Some of the items are selected.'}
                                        ></FluxFormCheckbox>
                                    </FluxFormField>
                                    <FluxFormField label={'Toggles'}>
                                        <FluxFlex gap={18}>
                                            <FluxToggle
                                                checked={toggle}
                                                onCheckedChange={setToggle}
                                            ></FluxToggle>
                                            <FluxToggle
                                                checked={toggleIcon}
                                                onCheckedChange={setToggleIcon}
                                                iconOff={'xmark'}
                                                iconOn={'check'}
                                            ></FluxToggle>
                                            <FluxToggle disabled checked={true}></FluxToggle>
                                            <FluxToggle disabled checked={false}></FluxToggle>
                                        </FluxFlex>
                                    </FluxFormField>
                                    <FluxFormField label={'Rating'}>
                                        <FluxFormRating
                                            value={form.rating}
                                            onValueChange={(next) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    ['rating']: next
                                                }))
                                            }
                                            allowHalf
                                            clearable
                                        ></FluxFormRating>
                                    </FluxFormField>
                                </FluxFormColumn>
                            </FluxPaneBody>
                        </FluxPane>
                        <Ranges />
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'calendar'}
                                subtitle={'A month at a glance'}
                                title={'Date picker'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxDatePicker
                                    value={pickedDate}
                                    onValueChange={setPickedDate}
                                ></FluxDatePicker>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxMasonry>
                    <h2>{'A masonry of panes'}</h2>
                    <p>
                        {'The masonry below is marked '}
                        <code>{'data-prose-full'}</code>
                        {
                            ', so it breaks out of the reading measure to span the whole container, while the text keeps its width. Where a grid would leave a gap under every pane that is shorter than its row, the masonry pulls the next pane straight up into it. The price is the reading order: a masonry fills one column top to bottom before it starts the next, so it only suits cards that can be read in any order.'
                        }
                    </p>
                    <FluxMasonry columns={{xs: 1, sm: 2, xl: 4}} data-prose-full gap={24}>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'pen'}
                                subtitle={'Fields, toggles and choices'}
                                title={'Form'}
                            ></FluxPaneHeader>
                            <FluxForm>
                                <FluxPaneBody>
                                    <FluxFormColumn>
                                        <FluxFormField label={'Email'}>
                                            <FluxFormInput
                                                autoComplete={'email'}
                                                placeholder={'email@example.com'}
                                                type={'email'}
                                            ></FluxFormInput>
                                        </FluxFormField>
                                        <FluxFormField label={'Newsletter'}>
                                            <FluxFormCheckbox
                                                checked
                                                label={'Send me weekly updates.'}
                                            ></FluxFormCheckbox>
                                        </FluxFormField>
                                        <FluxFormField label={'Toggles'}>
                                            <FluxFlex gap={18}>
                                                <FluxToggle
                                                    checked={toggle}
                                                    onCheckedChange={setToggle}
                                                ></FluxToggle>
                                                <FluxToggle
                                                    checked={toggleIcon}
                                                    onCheckedChange={setToggleIcon}
                                                    iconOff={'xmark'}
                                                    iconOn={'check'}
                                                ></FluxToggle>
                                            </FluxFlex>
                                        </FluxFormField>
                                    </FluxFormColumn>
                                </FluxPaneBody>
                            </FluxForm>
                        </FluxPane>
                        <FluxPane>
                            <FluxTabs value={exampleValue0} onValueChange={setExampleValue0}>
                                <FluxTab label={'Steps'}>
                                    <FluxPaneBody>
                                        <FluxStepper value={step} onValueChange={setStep}>
                                            <FluxStepperStep>{'Cart'}</FluxStepperStep>
                                            <FluxStepperStep>{'Shipping'}</FluxStepperStep>
                                            <FluxStepperStep>{'Payment'}</FluxStepperStep>
                                        </FluxStepper>
                                    </FluxPaneBody>
                                </FluxTab>
                                <FluxTab label={'View'}>
                                    <FluxPaneBody>
                                        <FluxSegmentedControl value={view} onValueChange={setView}>
                                            <FluxSegmentedControlItem
                                                icon={'grid-2'}
                                                label={'Grid'}
                                                value={'grid'}
                                            ></FluxSegmentedControlItem>
                                            <FluxSegmentedControlItem
                                                icon={'list'}
                                                label={'List'}
                                                value={'list'}
                                            ></FluxSegmentedControlItem>
                                            <FluxSegmentedControlItem
                                                icon={'rectangle-history'}
                                                label={'Stack'}
                                                value={'stack'}
                                            ></FluxSegmentedControlItem>
                                        </FluxSegmentedControl>
                                    </FluxPaneBody>
                                </FluxTab>
                            </FluxTabs>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'user'}
                                subtitle={'People and avatars'}
                                title={'Persona'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFlex gap={15} direction={'vertical'}>
                                    <FluxPersona
                                        avatarSize={36}
                                        avatarSrc={'https://avatars.githubusercontent.com/u/978257?v=4'}
                                        name={'Bas Milius'}
                                        title={'Flux engineer'}
                                    ></FluxPersona>
                                    <FluxAvatarGroup max={4}>
                                        <FluxAvatar src={'https://i.pravatar.cc/64?img=1'}></FluxAvatar>
                                        <FluxAvatar src={'https://i.pravatar.cc/64?img=2'}></FluxAvatar>
                                        <FluxAvatar src={'https://i.pravatar.cc/64?img=3'}></FluxAvatar>
                                        <FluxAvatar fallbackInitials={'BM'}></FluxAvatar>
                                        <FluxAvatar fallbackInitials={'JD'}></FluxAvatar>
                                    </FluxAvatarGroup>
                                    <FluxBadgeStack>
                                        <FluxChip iconLeading={'sparkles'} label={'New user'}></FluxChip>
                                        <FluxChip iconLeading={'location-dot'} label={'Groenlo'}></FluxChip>
                                    </FluxBadgeStack>
                                </FluxFlex>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'cubes'}
                                subtitle={'A sequence of events'}
                                title={'Timeline'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxTimeline>
                                    <FluxTimelineItem
                                        icon={'cubes'}
                                        title={'Project created'}
                                        when={'13 March, 1 PM'}
                                    >
                                        {' A new project was created and the first components were added. '}
                                    </FluxTimelineItem>
                                    <FluxTimelineItem
                                        photo={'https://avatars.githubusercontent.com/u/978257?v=4'}
                                        title={'Bas Milius commented'}
                                        when={'13 March, 1:30 PM'}
                                    >
                                        {' Looks great, let us ship it. '}
                                    </FluxTimelineItem>
                                </FluxTimeline>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'file-lines'}
                                subtitle={'Key and value pairs'}
                                title={'Details'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxDescriptionList title={'Invoice detail'}>
                                    <FluxDescriptionItem icon={'file-lines'} label={'Invoice number'}>
                                        {' 9087XY4521 '}
                                    </FluxDescriptionItem>
                                    <FluxDescriptionItem icon={'circle-check'} label={'Status'}>
                                        <FluxBadge color={'success'} label={'Paid'}></FluxBadge>
                                    </FluxDescriptionItem>
                                    <FluxDescriptionItem icon={'arrow-up-right-from-square'} label={'Portal'}>
                                        <FluxLink
                                            href={'#'}
                                            label={'View in portal'}
                                            type={'link'}
                                        ></FluxLink>
                                    </FluxDescriptionItem>
                                </FluxDescriptionList>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'folder'}
                                subtitle={'Nested, expandable options'}
                                title={'Tree view'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxTreeView
                                    levelColors={['primary', 'info', 'success']}
                                    options={treeOptions}
                                ></FluxTreeView>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'pen'}
                                subtitle={'Progress and inline editing'}
                                title={'Controls'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFlex gap={18} direction={'vertical'}>
                                    <FluxFormField label={'Downloading'}>
                                        <FluxProgressBar
                                            status={'Flux UI - components'}
                                            value={0.75}
                                        ></FluxProgressBar>
                                    </FluxFormField>
                                    <FluxFormField label={'Project name'}>
                                        <FluxInlineEdit
                                            value={inlineValue}
                                            onValueChange={setInlineValue}
                                            placeholder={'Click to edit'}
                                        ></FluxInlineEdit>
                                    </FluxFormField>
                                </FluxFlex>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxItemStack>
                                {people.map((person) => (
                                    <FluxItem key={person.name}>
                                        <FluxItemMedia isCenter size={40}>
                                            <FluxAvatar
                                                alt={person.name}
                                                fallbackIcon={person.avatar ? undefined : 'user'}
                                                size={40}
                                                src={person.avatar ?? undefined}
                                            ></FluxAvatar>
                                        </FluxItemMedia>
                                        <FluxItemContent isCenter>
                                            <strong>{person.name}</strong>
                                            <FluxText color={'muted'} size={'small'}>
                                                {person.role}
                                            </FluxText>
                                        </FluxItemContent>
                                        <FluxItemActions isCenter>
                                            <FluxAction icon={'ellipsis-h'}></FluxAction>
                                        </FluxItemActions>
                                    </FluxItem>
                                ))}
                            </FluxItemStack>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'list'}
                                subtitle={'Paging through results'}
                                title={'Pagination'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxPagination
                                    arrows
                                    perPage={10}
                                    total={200}
                                    page={exampleValue1}
                                    onNavigate={setExampleValue1}
                                ></FluxPagination>
                            </FluxPaneBody>
                            <FluxPaneFooter>
                                <FluxSecondaryButton label={'Export'}></FluxSecondaryButton>
                                <FluxSpacer></FluxSpacer>
                                <FluxPrimaryButton label={'Save'}></FluxPrimaryButton>
                            </FluxPaneFooter>
                        </FluxPane>
                        <FluxClickablePane type={'button'}>
                            <FluxPaneHeader
                                icon={'rocket'}
                                subtitle={'The whole pane reacts to the pointer'}
                                title={'Clickable pane'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                {
                                    'A clickable pane keeps the pane surface but adds the hover and active states of a button to it.'
                                }
                            </FluxPaneBody>
                        </FluxClickablePane>
                        <FluxPane>
                            <FluxPaneMedia
                                aspectRatio={16 / 9}
                                imageAlt={''}
                                imageUrl={'/assets/demo/image-2.jpg'}
                            ></FluxPaneMedia>
                            <FluxClickablePaneHeader
                                href={'#'}
                                icon={'image'}
                                subtitle={'Media above a clickable header'}
                                title={'Pane media'}
                                type={'link'}
                            ></FluxClickablePaneHeader>
                            <FluxPaneBody>
                                {
                                    'Media sits flush against the top of the pane and picks up its corner radius.'
                                }
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxActionPane
                            buttons={
                                <>
                                    <FluxSecondaryButton label={'Cancel'}></FluxSecondaryButton>
                                    <FluxPrimaryButton label={'Confirm'}></FluxPrimaryButton>
                                </>
                            }
                        >
                            <FluxPaneHeader
                                icon={'floppy-disk'}
                                subtitle={'Buttons pinned to the bottom'}
                                title={'Action pane'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                {
                                    'An action pane keeps its buttons on their own band, separated from the content above them.'
                                }
                            </FluxPaneBody>
                        </FluxActionPane>
                    </FluxMasonry>
                    <h2>{'Tables'}</h2>
                    <p>
                        {
                            'The table below carries everything at once: a sticky header, a sticky footer, a pinned column on both edges, colored rows, a selected row and hover feedback. The border under the header and the seam above the footer are the lines to watch.'
                        }
                    </p>
                    <FluxPane data-prose-full>
                        <FluxPaneHeader
                            icon={'server'}
                            subtitle={'Scroll sideways and down'}
                            title={'Deployments'}
                        ></FluxPaneHeader>
                        <FluxTable
                            isHoverable
                            isSticky
                            style={{maxHeight: '402px'}}
                            header={
                                <>
                                    <FluxTableRow>
                                        <FluxTableHeader
                                            isSortable
                                            minWidth={210}
                                            pinned
                                            sort={sort ?? undefined}
                                            onSort={($event) => {
                                                setSort($event);
                                            }}
                                        >
                                            {' Service '}
                                        </FluxTableHeader>
                                        <FluxTableHeader minWidth={150}>{'Environment'}</FluxTableHeader>
                                        <FluxTableHeader minWidth={165}>{'Status'}</FluxTableHeader>
                                        <FluxTableHeader data-type={'date'} isSortable minWidth={165}>
                                            {' Deployed '}
                                        </FluxTableHeader>
                                        <FluxTableHeader minWidth={165}>{'Owner'}</FluxTableHeader>
                                        <FluxTableHeader
                                            align={'end'}
                                            data-type={'numeric'}
                                            isNumeric
                                            minWidth={135}
                                        >
                                            {' Duration '}
                                        </FluxTableHeader>
                                        <FluxTableHeader
                                            align={'end'}
                                            isNumeric
                                            minWidth={135}
                                            pinned={'end'}
                                        >
                                            {' Cost '}
                                        </FluxTableHeader>
                                    </FluxTableRow>
                                </>
                            }
                            footer={
                                <>
                                    <FluxTableRow>
                                        <FluxTableCell>
                                            <strong>{'Total'}</strong>
                                        </FluxTableCell>
                                        <FluxTableCell>
                                            {deployments.length}
                                            {' deployments'}
                                        </FluxTableCell>
                                        <FluxTableCell>
                                            {failedCount}
                                            {' failed'}
                                        </FluxTableCell>
                                        <FluxTableCell>{'Last 24 hours'}</FluxTableCell>
                                        <FluxTableCell>{'5 owners'}</FluxTableCell>
                                        <FluxTableCell>{totalDuration}</FluxTableCell>
                                        <FluxTableCell>
                                            <strong>{formatCurrency(totalCost)}</strong>
                                        </FluxTableCell>
                                    </FluxTableRow>
                                </>
                            }
                        >
                            {deployments.map((deployment) => (
                                <FluxTableRow
                                    key={deployment.id}
                                    color={deployment.color}
                                    isClickable
                                    isSelected={deployment.id === selectedDeployment}
                                >
                                    <FluxTableCell>
                                        <strong>{deployment.service}</strong>
                                    </FluxTableCell>
                                    <FluxTableCell>{deployment.environment}</FluxTableCell>
                                    <FluxTableCell>
                                        <FluxBadge
                                            color={deployment.color ?? 'gray'}
                                            dot
                                            label={deployment.status}
                                        ></FluxBadge>
                                    </FluxTableCell>
                                    <FluxTableCell>{deployment.deployed}</FluxTableCell>
                                    <FluxTableCell>{deployment.owner}</FluxTableCell>
                                    <FluxTableCell>{deployment.duration}</FluxTableCell>
                                    <FluxTableCell>{formatCurrency(deployment.cost)}</FluxTableCell>
                                </FluxTableRow>
                            ))}
                        </FluxTable>
                    </FluxPane>
                    <p>
                        {
                            'Rows can also be grouped. The group header is its own band above the rows, and a table bar can sit above the column headers.'
                        }
                    </p>
                    <FluxPane data-prose-full>
                        <FluxTable
                            isHoverable
                            header={
                                <>
                                    <FluxTableBar>
                                        <FluxFlex gap={9} align={'center'}>
                                            <FluxIcon name={'circle-info'}></FluxIcon>
                                            <span>{'The bar sticks to the header while scrolling.'}</span>
                                            <FluxSpacer></FluxSpacer>
                                            <FluxTableActions>
                                                <FluxAction icon={'filter'}></FluxAction>
                                                <FluxAction icon={'arrow-down-to-line'}></FluxAction>
                                            </FluxTableActions>
                                        </FluxFlex>
                                    </FluxTableBar>
                                    <FluxTableRow>
                                        <FluxTableHeader minWidth={240}>{'Name'}</FluxTableHeader>
                                        <FluxTableHeader minWidth={180}>{'Role'}</FluxTableHeader>
                                        <FluxTableHeader isShrinking>{'Access'}</FluxTableHeader>
                                    </FluxTableRow>
                                </>
                            }
                        >
                            {teamGroups.map((group) => (
                                <FluxTableGroup
                                    key={group.name}
                                    isExpanded={expandedGroups[group.name]}
                                    onExpandedChange={(next) =>
                                        setExpandedGroups((current) => ({
                                            ...current,
                                            [group.name]: next
                                        }))
                                    }
                                    icon={group.icon}
                                    isExpandable
                                    label={group.name}
                                    after={
                                        <>
                                            <FluxBadge label={`${group.members.length}`}></FluxBadge>
                                        </>
                                    }
                                >
                                    {group.members.map((member) => (
                                        <FluxTableRow key={member.name}>
                                            <FluxTableCell>{member.name}</FluxTableCell>
                                            <FluxTableCell>{member.role}</FluxTableCell>
                                            <FluxTableCell>
                                                <FluxBadge
                                                    color={member.access === 'Owner' ? 'primary' : 'gray'}
                                                    label={member.access}
                                                ></FluxBadge>
                                            </FluxTableCell>
                                        </FluxTableRow>
                                    ))}
                                </FluxTableGroup>
                            ))}
                        </FluxTable>
                    </FluxPane>
                    <p>
                        {
                            'The data table wires the same parts to a data set: selection, colored rows, a pagination bar and an empty state.'
                        }
                    </p>
                    <FluxPane data-prose-full>
                        <FluxDataTable
                            selected={selectedInvoices}
                            onSelectedChange={setSelectedInvoices}
                            isHoverable
                            items={invoices}
                            limits={[5, 10, 25]}
                            page={invoicePage}
                            perPage={5}
                            rowColor={invoiceColor}
                            selectionMode={'multiple'}
                            total={invoices.length}
                            uniqueKey={'id'}
                            onNavigate={($event) => {
                                setInvoicePage($event);
                            }}
                            columns={[
                                {
                                    key: 'number',
                                    header: <>{'Number'}</>,
                                    minWidth: 150,
                                    render: (row, rowIndex) => {
                                        const slotProps = {item: row, index: rowIndex};
                                        const {item} = slotProps;
                                        return (
                                            <>
                                                <strong>{item.number}</strong>
                                            </>
                                        );
                                    }
                                },
                                {
                                    key: 'customer',
                                    header: <>{'Customer'}</>,
                                    minWidth: 210,
                                    render: (row, rowIndex) => {
                                        const slotProps = {item: row, index: rowIndex};
                                        const {item} = slotProps;
                                        return <>{item.customer}</>;
                                    }
                                },
                                {
                                    key: 'status',
                                    header: <>{'Status'}</>,
                                    minWidth: 150,
                                    render: (row, rowIndex) => {
                                        const slotProps = {item: row, index: rowIndex};
                                        const {item} = slotProps;
                                        return (
                                            <>
                                                <FluxBadge
                                                    color={invoiceColor(item) ?? 'gray'}
                                                    label={item.status}
                                                ></FluxBadge>
                                            </>
                                        );
                                    }
                                },
                                {
                                    key: 'amount',
                                    header: <>{' Amount '}</>,
                                    align: 'end',
                                    isNumeric: true,
                                    minWidth: 135,
                                    render: (row, rowIndex) => {
                                        const slotProps = {item: row, index: rowIndex};
                                        const {item} = slotProps;
                                        return <>{formatCurrency(item.amount)}</>;
                                    }
                                }
                            ]}
                        ></FluxDataTable>
                    </FluxPane>
                    <h2>{'Tab bars and segmented controls'}</h2>
                    <p>
                        {
                            'A tab bar inside a pane sits on a recessed track, so the active tab reads as a raised chip on top of it. The pill variant drops the track and keeps only the chip.'
                        }
                    </p>
                    <div className={clsx($style.cardGrid)} data-prose-full>
                        <FluxPane>
                            <FluxTabs value={tab} onValueChange={setTab}>
                                <FluxTab icon={'gauge'} label={'Overview'}>
                                    <FluxPaneBody>{'The default tab bar in a pane.'}</FluxPaneBody>
                                </FluxTab>
                                <FluxTab icon={'chart-line'} label={'Activity'}>
                                    <FluxPaneBody>{'Recent activity for this project.'}</FluxPaneBody>
                                </FluxTab>
                                <FluxTab icon={'gear'} label={'Settings'}>
                                    <FluxPaneBody>{'Everything that can be configured.'}</FluxPaneBody>
                                </FluxTab>
                            </FluxTabs>
                        </FluxPane>
                        <FluxPane>
                            <FluxTabs value={pillTab} onValueChange={setPillTab} isPills>
                                <FluxTab label={'Day'}>
                                    <FluxPaneBody>{'The pill variant of the same tab bar.'}</FluxPaneBody>
                                </FluxTab>
                                <FluxTab label={'Week'}>
                                    <FluxPaneBody>{'One week of data.'}</FluxPaneBody>
                                </FluxTab>
                                <FluxTab label={'Month'}>
                                    <FluxPaneBody>{'One month of data.'}</FluxPaneBody>
                                </FluxTab>
                            </FluxTabs>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'bars'}
                                subtitle={'Standalone, outside a pane body'}
                                title={'Tab bar'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFlex gap={18} direction={'vertical'}>
                                    <FluxTabBar>
                                        <FluxTabBarItem
                                            icon={'house'}
                                            isActive
                                            label={'Home'}
                                        ></FluxTabBarItem>
                                        <FluxTabBarItem icon={'folder'} label={'Files'}></FluxTabBarItem>
                                        <FluxTabBarItem
                                            disabled
                                            icon={'lock'}
                                            label={'Locked'}
                                        ></FluxTabBarItem>
                                    </FluxTabBar>
                                    <FluxTabBar isPills>
                                        <FluxTabBarItem isActive label={'All'}></FluxTabBarItem>
                                        <FluxTabBarItem label={'Open'}></FluxTabBarItem>
                                        <FluxTabBarItem label={'Closed'}></FluxTabBarItem>
                                    </FluxTabBar>
                                    <FluxSegmentedControl value={view} onValueChange={setView}>
                                        <FluxSegmentedControlItem
                                            icon={'grid-2'}
                                            label={'Grid'}
                                            value={'grid'}
                                        ></FluxSegmentedControlItem>
                                        <FluxSegmentedControlItem
                                            icon={'list'}
                                            label={'List'}
                                            value={'list'}
                                        ></FluxSegmentedControlItem>
                                        <FluxSegmentedControlItem
                                            disabled
                                            icon={'rectangle-history'}
                                            label={'Stack'}
                                            value={'stack'}
                                        ></FluxSegmentedControlItem>
                                    </FluxSegmentedControl>
                                </FluxFlex>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane variant={'well'}>
                            <FluxTabs value={wellTab} onValueChange={setWellTab}>
                                <FluxTab icon={'sun'} label={'Light'}>
                                    <FluxPaneBody>
                                        {
                                            'The same tab bar on a well pane, where its own recessed track has to stay readable against an already recessed surface.'
                                        }
                                    </FluxPaneBody>
                                </FluxTab>
                                <FluxTab icon={'moon'} label={'Dark'}>
                                    <FluxPaneBody>
                                        {'Switch the site theme and compare the two tracks again.'}
                                    </FluxPaneBody>
                                </FluxTab>
                                <FluxTab icon={'palette'} label={'Auto'}>
                                    <FluxPaneBody>{'Follows the operating system.'}</FluxPaneBody>
                                </FluxTab>
                            </FluxTabs>
                        </FluxPane>
                    </div>
                    <h2>{'Menus and floating surfaces'}</h2>
                    <p>
                        {
                            "A menu is normally painted on a raised surface inside a flyout. Putting one straight in a pane shows the same thing without having to hold it open, so the item hover, the selected marker and the destructive item can all be read at once. The filter menu carries its search field in a menu pane, which is the one place the arrow keys drive the control instead of the menu's own roving focus."
                        }
                    </p>
                    <FluxMasonry columns={{xs: 1, sm: 2, xl: 4}} data-prose-full gap={24}>
                        <FluxPane>
                            <FluxMenu>
                                <FluxMenuTitle title={'Workspace'}></FluxMenuTitle>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        command={'⌘N'}
                                        iconLeading={'file-plus'}
                                        label={'New file'}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        command={'⌘O'}
                                        iconLeading={'folder'}
                                        label={'Open...'}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        iconLeading={'clone'}
                                        isActive
                                        label={'Active item'}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        disabled
                                        iconLeading={'lock'}
                                        label={'Disabled item'}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        iconLeading={'rotate'}
                                        isLoading
                                        label={'Loading item'}
                                    ></FluxMenuItem>
                                </FluxMenuGroup>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuSubHeader
                                    iconLeading={'grid-2'}
                                    label={'Layout'}
                                ></FluxMenuSubHeader>
                                <FluxMenuOptions value={menuView} onValueChange={setMenuView} mode={'select'}>
                                    <FluxMenuItem
                                        key={'list'}
                                        iconLeading={'list'}
                                        label={'List'}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        key={'grid'}
                                        iconLeading={'grid-2'}
                                        label={'Grid'}
                                    ></FluxMenuItem>
                                </FluxMenuOptions>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuGroup>
                                    <FluxMenuFlyout icon={'arrow-up-from-square'} label={'Export as'}>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem label={'PDF'}></FluxMenuItem>
                                                <FluxMenuItem label={'PNG'}></FluxMenuItem>
                                                <FluxMenuItem label={'SVG'}></FluxMenuItem>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                    <FluxMenuFlyout icon={'sun'} label={'Brightness'}>
                                        <FluxMenu>
                                            <FluxMenuPane>
                                                <FluxFormSlider
                                                    defaultValue={60}
                                                    aria-label={'Brightness'}
                                                    isTicksVisible
                                                ></FluxFormSlider>
                                            </FluxMenuPane>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                    <FluxMenuCollapsible iconLeading={'users'} label={'Members'}>
                                        <FluxMenuItem
                                            iconLeading={'user'}
                                            isIndented
                                            label={'Ada Lovelace'}
                                        ></FluxMenuItem>
                                        <FluxMenuItem
                                            iconLeading={'user'}
                                            isIndented
                                            label={'Grace Hopper'}
                                        ></FluxMenuItem>
                                    </FluxMenuCollapsible>
                                </FluxMenuGroup>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        iconLeading={'trash'}
                                        isDestructive
                                        label={'Delete workspace'}
                                    ></FluxMenuItem>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxPane>
                        <FluxPane>
                            <FluxMenu>
                                <FluxMenuTitle title={'Selectable items'}></FluxMenuTitle>
                                <FluxMenuGroup>
                                    {menuOptions.map((option) => (
                                        <FluxMenuItem
                                            key={option}
                                            isSelectable
                                            isSelected={menuOption === option}
                                            label={option}
                                            onClick={() => {
                                                setMenuOption(option);
                                            }}
                                        ></FluxMenuItem>
                                    ))}
                                </FluxMenuGroup>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuGroup isHorizontal>
                                    <FluxMenuItem iconLeading={'scissors'}></FluxMenuItem>
                                    <FluxMenuItem iconLeading={'copy'}></FluxMenuItem>
                                    <FluxMenuItem iconLeading={'paste'}></FluxMenuItem>
                                    <FluxMenuItem iconLeading={'trash'}></FluxMenuItem>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxPane>
                        <FluxPane>
                            <FluxMenu>
                                <FluxMenuTitle title={'Filter'}></FluxMenuTitle>
                                <FluxMenuPane>
                                    <FluxFormInput
                                        value={menuFilter}
                                        onValueChange={(next) => setMenuFilter(next ?? '')}
                                        aria-label={'Filter commands'}
                                        iconLeading={'magnifying-glass'}
                                        placeholder={'Filter commands...'}
                                        type={'search'}
                                    ></FluxFormInput>
                                </FluxMenuPane>
                                <FluxMenuGroup>
                                    {filteredMenuCommands.map((command) => (
                                        <FluxMenuItem
                                            key={command.label}
                                            iconLeading={command.icon}
                                            label={command.label}
                                        ></FluxMenuItem>
                                    ))}
                                    {filteredMenuCommands.length === 0 ? (
                                        <FluxMenuSubHeader label={'No matches'}></FluxMenuSubHeader>
                                    ) : null}
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxPane>
                        <FluxContextMenu
                            menu={({close}) => (
                                <>
                                    <FluxMenu>
                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                iconLeading={'arrow-up-right-from-square'}
                                                label={'Open'}
                                                type={'button'}
                                                onClick={close}
                                            ></FluxMenuItem>
                                            <FluxMenuFlyout icon={'image'} label={'Open With'}>
                                                <FluxMenu>
                                                    <FluxMenuGroup>
                                                        <FluxMenuItem
                                                            iconLeading={'eye'}
                                                            label={'Preview'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                        <FluxMenuItem
                                                            iconLeading={'image'}
                                                            label={'Photos'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                    </FluxMenuGroup>
                                                    <FluxSeparator></FluxSeparator>
                                                    <FluxMenuGroup>
                                                        <FluxMenuItem
                                                            label={'App Store…'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                    </FluxMenuGroup>
                                                </FluxMenu>
                                            </FluxMenuFlyout>
                                            <FluxMenuItem
                                                iconLeading={'trash'}
                                                isDestructive
                                                label={'Move to Trash'}
                                                type={'button'}
                                                onClick={close}
                                            ></FluxMenuItem>
                                        </FluxMenuGroup>
                                        <FluxSeparator></FluxSeparator>
                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                iconLeading={'circle-info'}
                                                label={'Get Info'}
                                                type={'button'}
                                                onClick={close}
                                            ></FluxMenuItem>
                                            <FluxMenuItem
                                                iconLeading={'pen'}
                                                label={'Rename'}
                                                type={'button'}
                                                onClick={close}
                                            ></FluxMenuItem>
                                            <FluxMenuItem
                                                iconLeading={'clone'}
                                                label={'Duplicate'}
                                                type={'button'}
                                                onClick={close}
                                            ></FluxMenuItem>
                                            <FluxMenuItem
                                                iconLeading={'eye'}
                                                label={'Quick Look'}
                                                type={'button'}
                                                onClick={close}
                                            ></FluxMenuItem>
                                        </FluxMenuGroup>
                                        <FluxSeparator></FluxSeparator>
                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                iconLeading={'copy'}
                                                label={'Copy'}
                                                type={'button'}
                                                onClick={close}
                                            ></FluxMenuItem>
                                            <FluxMenuFlyout icon={'arrow-up-from-square'} label={'Share'}>
                                                <FluxMenu>
                                                    <FluxMenuGroup>
                                                        <FluxMenuItem
                                                            iconLeading={'paper-plane'}
                                                            label={'Mail'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                        <FluxMenuItem
                                                            iconLeading={'copy'}
                                                            label={'Copy Link'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                    </FluxMenuGroup>
                                                </FluxMenu>
                                            </FluxMenuFlyout>
                                            <FluxMenuFlyout icon={'bolt'} label={'Quick Actions'}>
                                                <FluxMenu>
                                                    <FluxMenuGroup>
                                                        <FluxMenuItem
                                                            iconLeading={'rotate-left'}
                                                            label={'Rotate Left'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                        <FluxMenuItem
                                                            iconLeading={'pen'}
                                                            label={'Markup'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                        <FluxMenuItem
                                                            iconLeading={'image'}
                                                            label={'Convert Image'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                    </FluxMenuGroup>
                                                </FluxMenu>
                                            </FluxMenuFlyout>
                                        </FluxMenuGroup>
                                        <FluxSeparator></FluxSeparator>
                                        <FluxMenuGroup>
                                            <FluxMenuFlyout icon={'palette'} label={'Tags'}>
                                                <FluxMenu>
                                                    <FluxMenuGroup>
                                                        <FluxMenuItem
                                                            iconLeading={'circle'}
                                                            label={'Red'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                        <FluxMenuItem
                                                            iconLeading={'circle'}
                                                            label={'Orange'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                        <FluxMenuItem
                                                            iconLeading={'circle'}
                                                            label={'Green'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                    </FluxMenuGroup>
                                                </FluxMenu>
                                            </FluxMenuFlyout>
                                            <FluxMenuFlyout icon={'gear'} label={'Services'}>
                                                <FluxMenu>
                                                    <FluxMenuGroup>
                                                        <FluxMenuItem
                                                            label={'Show in Enclosing Folder'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                        <FluxMenuItem
                                                            label={'New Terminal at Folder'}
                                                            type={'button'}
                                                            onClick={close}
                                                        ></FluxMenuItem>
                                                    </FluxMenuGroup>
                                                </FluxMenu>
                                            </FluxMenuFlyout>
                                        </FluxMenuGroup>
                                    </FluxMenu>
                                </>
                            )}
                        >
                            <FluxPane>
                                <FluxPaneHeader
                                    icon={'grip'}
                                    subtitle={'Right click anywhere in this pane'}
                                    title={'Context menu'}
                                ></FluxPaneHeader>
                                <FluxPaneBody>
                                    {
                                        'The menu opens at the cursor on its own raised surface, which is where the hover state has to hold up against the shadow behind it. Submenus draw their prediction cone, so the safe triangle and the pointer are visible while you move.'
                                    }
                                </FluxPaneBody>
                            </FluxPane>
                        </FluxContextMenu>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'angles-up-down'}
                                subtitle={'Open them to see the raised surface'}
                                title={'Flyouts'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFlex gap={18} direction={'vertical'}>
                                    <FluxFlyout
                                        opener={({toggle}) => (
                                            <>
                                                <FluxSecondaryButton
                                                    iconTrailing={'angle-down'}
                                                    label={'Open a flyout'}
                                                    onClick={() => {
                                                        toggle();
                                                    }}
                                                ></FluxSecondaryButton>
                                            </>
                                        )}
                                        children={() => (
                                            <>
                                                <FluxPaneBody>
                                                    {'A flyout renders its own pane above the page.'}
                                                </FluxPaneBody>
                                            </>
                                        )}
                                    ></FluxFlyout>
                                    <FluxFormSelect
                                        value={form.country}
                                        onValueChange={(next) =>
                                            setForm((current) => ({
                                                ...current,
                                                ['country']: Array.isArray(next) ? (next[0] ?? null) : next
                                            }))
                                        }
                                        isSearchable
                                        options={countries}
                                        placeholder={'A select with a flyout...'}
                                    ></FluxFormSelect>
                                    <FluxFormSelect
                                        value={form.teams}
                                        onValueChange={(next) =>
                                            setForm((current) => ({
                                                ...current,
                                                ['teams']: Array.isArray(next)
                                                    ? next
                                                    : next === null
                                                      ? []
                                                      : [next]
                                            }))
                                        }
                                        isMultiple
                                        options={teams}
                                        placeholder={'A multiple select...'}
                                    ></FluxFormSelect>
                                    <FluxBreadcrumb>
                                        <FluxBreadcrumbItem
                                            href={'#'}
                                            icon={'house'}
                                            label={'Home'}
                                        ></FluxBreadcrumbItem>
                                        <FluxBreadcrumbFlyout label={'Components'}>
                                            <FluxMenu>
                                                <FluxMenuGroup>
                                                    <FluxMenuItem label={'Buttons'}></FluxMenuItem>
                                                    <FluxMenuItem label={'Tables'}></FluxMenuItem>
                                                    <FluxMenuItem label={'Menus'}></FluxMenuItem>
                                                </FluxMenuGroup>
                                            </FluxMenu>
                                        </FluxBreadcrumbFlyout>
                                        <FluxBreadcrumbItem label={'Playground'}></FluxBreadcrumbItem>
                                    </FluxBreadcrumb>
                                </FluxFlex>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxMasonry>
                    <h2>{'Elevation and shadows'}</h2>
                    <p>
                        {
                            'Elevation is a level rather than a set of declarations. Sunken is a recessed area inside a surface, surface is a card on the page, and raised is anything floating above it. In light the shadow does the work, in dark the surface lightness does.'
                        }
                    </p>
                    <div className={clsx($style.cardGrid)} data-prose-full>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'box'}
                                subtitle={'The default pane'}
                                title={'Surface'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                {
                                    'A card sitting on the page background, with a border, a light edge and a small shadow.'
                                }
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane variant={'flat'}>
                            <FluxPaneHeader
                                icon={'box'}
                                subtitle={'Border only, no shadow'}
                                title={'Flat'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                {
                                    'The flat variant keeps the border but drops the shadow, which is what nested panes use.'
                                }
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane variant={'well'}>
                            <FluxPaneHeader
                                icon={'box'}
                                subtitle={'Recessed into the page'}
                                title={'Well'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                {
                                    'The well variant reads as a hole in the page rather than a card on top of it.'
                                }
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPaneGroup>
                            <FluxPane>
                                <FluxPaneHeader
                                    icon={'box'}
                                    subtitle={'Panes stacked in a group'}
                                    title={'Pane group'}
                                ></FluxPaneHeader>
                                <FluxPaneBody>
                                    {
                                        'A pane group joins panes into one block, so only the outer edge keeps a border and the seams between them stay hairlines.'
                                    }
                                </FluxPaneBody>
                            </FluxPane>
                            <FluxPane>
                                <FluxPaneBody>{'The second pane in the same group.'}</FluxPaneBody>
                            </FluxPane>
                        </FluxPaneGroup>
                    </div>
                    <p>
                        {
                            'Layer panes wrap a pane in a colored band, which is the widest colored surface in the library and the fastest way to spot a tint that drifted.'
                        }
                    </p>
                    <div className={clsx($style.gridIntents)} data-prose-full>
                        {notices.map((notice) => (
                            <FluxLayerPane key={notice.color} color={notice.color}>
                                <FluxPaneHeader icon={notice.icon} title={notice.title}></FluxPaneHeader>
                                <FluxPane>
                                    <FluxPaneBody>{notice.message}</FluxPaneBody>
                                </FluxPane>
                            </FluxLayerPane>
                        ))}
                    </div>
                    <p>
                        {
                            'The raw shadow scale, painted on a raised surface. Every step shares one geometry across both themes and differs only in color.'
                        }
                    </p>
                    <div className={clsx($style.shadows)} data-prose-full>
                        {shadows.map((shadow) => (
                            <div
                                key={shadow}
                                className={clsx($style.shadow)}
                                style={parseStyle({boxShadow: `var(--shadow-${shadow})`})}
                            >
                                {shadow}
                            </div>
                        ))}
                    </div>
                    <p>
                        {'Overlays, slide overs and sheets put the same raised surface above a dimmed page.'}
                    </p>
                    <FluxButtonStack>
                        <FluxSecondaryButton
                            iconLeading={'expand'}
                            label={'Open overlay'}
                            onClick={() => {
                                setIsOverlayOpen(true);
                            }}
                        ></FluxSecondaryButton>
                        <FluxSecondaryButton
                            iconLeading={'sidebar-flip'}
                            label={'Open slide over'}
                            onClick={() => {
                                setIsSlideOverOpen(true);
                            }}
                        ></FluxSecondaryButton>
                    </FluxButtonStack>
                    <FluxOverlay size={'medium'} open={isOverlayOpen}>
                        {isOverlayOpen ? (
                            <FluxPane>
                                <FluxPaneHeader
                                    icon={'expand'}
                                    subtitle={'A pane on a raised surface'}
                                    title={'Overlay'}
                                ></FluxPaneHeader>
                                <FluxPaneBody>
                                    <p>
                                        {
                                            'An overlay dims the page and lifts a pane above it. The shadow and the dim layer are both theme aware, so this is the place to check that the pane still separates from the backdrop in dark mode.'
                                        }
                                    </p>
                                </FluxPaneBody>
                                <FluxPaneFooter>
                                    <FluxSpacer></FluxSpacer>
                                    <FluxSecondaryButton
                                        label={'Close'}
                                        onClick={() => {
                                            setIsOverlayOpen(false);
                                        }}
                                    ></FluxSecondaryButton>
                                </FluxPaneFooter>
                            </FluxPane>
                        ) : null}
                    </FluxOverlay>
                    <FluxSlideOver open={isSlideOverOpen}>
                        {isSlideOverOpen ? (
                            <FluxPane>
                                <FluxPaneHeader
                                    icon={'sidebar-flip'}
                                    subtitle={'Anchored to the edge'}
                                    title={'Slide over'}
                                ></FluxPaneHeader>
                                <FluxPaneBody>
                                    <p>
                                        {
                                            'A slide over uses the same surface, anchored to the edge of the viewport instead of centered.'
                                        }
                                    </p>
                                </FluxPaneBody>
                                <FluxPaneFooter>
                                    <FluxSpacer></FluxSpacer>
                                    <FluxSecondaryButton
                                        label={'Close'}
                                        onClick={() => {
                                            setIsSlideOverOpen(false);
                                        }}
                                    ></FluxSecondaryButton>
                                </FluxPaneFooter>
                            </FluxPane>
                        ) : null}
                    </FluxSlideOver>
                    <p>
                        {
                            'A sheet is the same surface with a gesture attached: it hangs off one edge, follows the pointer on a spring, and rests at the sizes it is given. The four buttons below open it from each edge, so the corner radii, the safe area padding and the grabber can be checked on every side. Drag it, flick it away, or use the wheel and the arrow keys to move between its two snap points.'
                        }
                    </p>
                    <FluxButtonStack>
                        {sheetPositions.map((position) => (
                            <FluxSecondaryButton
                                key={position}
                                iconLeading={
                                    position === 'bottom'
                                        ? 'arrow-up'
                                        : position === 'top'
                                          ? 'arrow-down'
                                          : position === 'left'
                                            ? 'arrow-right'
                                            : 'arrow-left'
                                }
                                label={`Sheet from the ${position}`}
                                onClick={() => {
                                    openSheet(position);
                                }}
                            ></FluxSecondaryButton>
                        ))}
                    </FluxButtonStack>
                    <FluxSheet
                        isCloseable
                        position={sheetPosition}
                        snapPoints={[0.45, 0.9]}
                        onClose={() => {
                            setOpenedSheet(null);
                        }}
                        open={openedSheet === 'snap'}
                    >
                        {openedSheet === 'snap' ? (
                            <FluxPane>
                                <FluxPaneHeader
                                    icon={'grip'}
                                    subtitle={`Anchored to the ${sheetPosition}, resting at 45% and 90%`}
                                    title={'Sheet'}
                                ></FluxPaneHeader>
                                <FluxPaneBody>
                                    <p>
                                        {
                                            'The shade behind this sheet is tied to its position: pull it past its smallest snap point and the page shows through, let go and both spring back together. Past the largest snap point the surface stretches against a resistance instead of tearing loose from the edge.'
                                        }
                                    </p>
                                </FluxPaneBody>
                                <FluxPaneFooter>
                                    <FluxSpacer></FluxSpacer>
                                    <FluxSecondaryButton
                                        label={'Close'}
                                        onClick={() => {
                                            setOpenedSheet(null);
                                        }}
                                    ></FluxSecondaryButton>
                                </FluxPaneFooter>
                            </FluxPane>
                        ) : null}
                    </FluxSheet>
                    <p>
                        {
                            'Without snap points the sheet fits its own content, and a scrolling body hands the gesture back and forth: the list scrolls until it runs out, and from there the same drag moves the sheet.'
                        }
                    </p>
                    <FluxButtonStack>
                        <FluxSecondaryButton
                            iconLeading={'rectangle-history'}
                            label={'Fitted sheet'}
                            onClick={() => {
                                setOpenedSheet('fitted');
                            }}
                        ></FluxSecondaryButton>
                        <FluxSecondaryButton
                            iconLeading={'list-ul'}
                            label={'Scrolling sheet'}
                            onClick={() => {
                                setOpenedSheet('scrolling');
                            }}
                        ></FluxSecondaryButton>
                        <FluxSecondaryButton
                            iconLeading={'lock'}
                            label={'Sheet without a grabber'}
                            onClick={() => {
                                setOpenedSheet('static');
                            }}
                        ></FluxSecondaryButton>
                    </FluxButtonStack>
                    <FluxSheet
                        isCloseable
                        onClose={() => {
                            setOpenedSheet(null);
                        }}
                        open={openedSheet === 'fitted'}
                    >
                        {openedSheet === 'fitted' ? (
                            <FluxPane>
                                <FluxPaneHeader
                                    icon={'rectangle-history'}
                                    subtitle={'Sized to its content'}
                                    title={'Fitted sheet'}
                                ></FluxPaneHeader>
                                <FluxItemStack>
                                    {shareTargets.map((target) => (
                                        <FluxItem key={target.label}>
                                            <FluxItemMedia isCenter>
                                                <FluxIcon name={target.icon}></FluxIcon>
                                            </FluxItemMedia>
                                            <FluxItemContent isCenter>
                                                <strong>{target.label}</strong>
                                            </FluxItemContent>
                                        </FluxItem>
                                    ))}
                                </FluxItemStack>
                                <FluxPaneFooter>
                                    <FluxSpacer></FluxSpacer>
                                    <FluxSecondaryButton
                                        label={'Cancel'}
                                        onClick={() => {
                                            setOpenedSheet(null);
                                        }}
                                    ></FluxSecondaryButton>
                                </FluxPaneFooter>
                            </FluxPane>
                        ) : null}
                    </FluxSheet>
                    <FluxSheet
                        isCloseable
                        snapPoints={[0.5, 0.95]}
                        onClose={() => {
                            setOpenedSheet(null);
                        }}
                        open={openedSheet === 'scrolling'}
                    >
                        {openedSheet === 'scrolling' ? (
                            <FluxPane>
                                <FluxPaneHeader
                                    icon={'list-ul'}
                                    subtitle={'Drag the list, not just the grabber'}
                                    title={'Scrolling sheet'}
                                ></FluxPaneHeader>
                                <FluxItemStack>
                                    {sheetActivity.map((entry) => (
                                        <FluxItem key={entry.id}>
                                            <FluxItemContent>
                                                <strong>{entry.service}</strong>
                                                <FluxText color={'muted'} size={'small'}>
                                                    {entry.when}
                                                </FluxText>
                                            </FluxItemContent>
                                            <FluxItemActions isCenter>
                                                <FluxBadge
                                                    color={entry.color ?? 'gray'}
                                                    dot
                                                    label={entry.status}
                                                ></FluxBadge>
                                            </FluxItemActions>
                                        </FluxItem>
                                    ))}
                                </FluxItemStack>
                            </FluxPane>
                        ) : null}
                    </FluxSheet>
                    <FluxSheet
                        isDraggable={false}
                        onClose={() => {
                            setOpenedSheet(null);
                        }}
                        open={openedSheet === 'static'}
                    >
                        {openedSheet === 'static' ? (
                            <FluxPane>
                                <FluxPaneHeader
                                    icon={'lock'}
                                    subtitle={'No grabber, no gesture'}
                                    title={'Sheet without a grabber'}
                                ></FluxPaneHeader>
                                <FluxPaneBody>
                                    <p>
                                        {'With '}
                                        <code>{'is-draggable'}</code>
                                        {
                                            ' off the sheet keeps its position but loses the grabber, the drag and the wheel. It also drops '
                                        }
                                        <code>{'is-closeable'}</code>
                                        {
                                            ' here, so neither the escape key nor a click beside it dismisses this one: only the button below does.'
                                        }
                                    </p>
                                </FluxPaneBody>
                                <FluxPaneFooter>
                                    <FluxSpacer></FluxSpacer>
                                    <FluxPrimaryButton
                                        label={'Understood'}
                                        onClick={() => {
                                            setOpenedSheet(null);
                                        }}
                                    ></FluxPrimaryButton>
                                </FluxPaneFooter>
                            </FluxPane>
                        ) : null}
                    </FluxSheet>
                    <h2>{'Navigation and disclosure'}</h2>
                    <p>
                        {
                            'Breadcrumbs and expandables help the reader move around and reveal detail on demand.'
                        }
                    </p>
                    <FluxBreadcrumb>
                        <FluxBreadcrumbItem href={'#'} label={'Home'}></FluxBreadcrumbItem>
                        <FluxBreadcrumbItem href={'#'} label={'Components'}></FluxBreadcrumbItem>
                        <FluxBreadcrumbItem label={'Playground'}></FluxBreadcrumbItem>
                    </FluxBreadcrumb>
                    <FluxPane>
                        <FluxExpandable icon={'circle-ellipsis'} label={'More options...'}>
                            {
                                ' Everything inside an expandable stays hidden until the reader opens it, which keeps a long page scannable. '
                            }
                        </FluxExpandable>
                    </FluxPane>
                    <p>
                        {
                            'An expandable group keeps one item open at a time and draws a divider between them.'
                        }
                    </p>
                    <FluxPane>
                        <FluxExpandableGroup>
                            <FluxExpandable icon={'circle-info'} label={'What is a design token?'}>
                                {
                                    ' A named value that stands in for a raw color, size or duration, so the same decision can be changed in one place. '
                                }
                            </FluxExpandable>
                            <FluxExpandable icon={'palette'} label={'Why two themes?'}>
                                {
                                    ' Light and dark signal elevation differently. Light keeps every level the same color and lets the shadow do the work, dark cannot. '
                                }
                            </FluxExpandable>
                            <FluxExpandable icon={'circle-question'} label={'Where do intents come from?'}>
                                {
                                    ' Every component with a color prop resolves it to the same set of intent tokens, which is why they can all be compared side by side. '
                                }
                            </FluxExpandable>
                        </FluxExpandableGroup>
                    </FluxPane>
                    <p>{'A toolbar sits between the pane header and the pane body on its own band.'}</p>
                    <FluxPane>
                        <FluxPaneHeader icon={'file-lines'} title={'Document'}></FluxPaneHeader>
                        <FluxToolbar aria-label={'Text formatting'}>
                            <FluxToolbarGroup>
                                <FluxAction aria-label={'Bold'} icon={'bold'} isActive></FluxAction>
                                <FluxAction aria-label={'Italic'} icon={'italic'}></FluxAction>
                                <FluxAction aria-label={'Underline'} icon={'underline'}></FluxAction>
                            </FluxToolbarGroup>
                            <FluxSeparator direction={'vertical'}></FluxSeparator>
                            <FluxToolbarGroup>
                                <FluxAction aria-label={'Bulleted list'} icon={'list-ul'}></FluxAction>
                                <FluxAction aria-label={'Numbered list'} icon={'list-ol'}></FluxAction>
                            </FluxToolbarGroup>
                            <FluxSeparator direction={'vertical'}></FluxSeparator>
                            <FluxToolbarGroup>
                                <FluxAction aria-label={'Undo'} disabled icon={'rotate-left'}></FluxAction>
                                <FluxAction aria-label={'Redo'} icon={'rotate'}></FluxAction>
                            </FluxToolbarGroup>
                        </FluxToolbar>
                        <FluxPaneBody>
                            {
                                'The toolbar band, the header above it and the body below it are three different surfaces stacked on each other.'
                            }
                        </FluxPaneBody>
                    </FluxPane>
                    <p>
                        {
                            'An action bar combines a primary action, a search field and a filter flyout in one row.'
                        }
                    </p>
                    <FluxActionBar
                        primary={
                            <>
                                <FluxPrimaryButton
                                    iconLeading={'circle-plus'}
                                    label={'New invoice'}
                                ></FluxPrimaryButton>
                            </>
                        }
                        search={
                            <>
                                <FluxFormInput
                                    value={search}
                                    onValueChange={(next) => setSearch(String(next ?? ''))}
                                    iconLeading={'magnifying-glass'}
                                    placeholder={'Search invoices...'}
                                    type={'search'}
                                ></FluxFormInput>
                            </>
                        }
                        filterOpener={({open}) => (
                            <>
                                <FluxSecondaryButton
                                    iconLeading={'filter'}
                                    label={'Filter'}
                                    onClick={() => {
                                        open();
                                    }}
                                ></FluxSecondaryButton>
                            </>
                        )}
                        filter={() => (
                            <>
                                <FluxPaneBody>
                                    {'Filter contents live here, on the flyout surface.'}
                                </FluxPaneBody>
                            </>
                        )}
                        actionsEnd={
                            <>
                                <FluxSecondaryButton
                                    iconLeading={'arrow-down-to-line'}
                                    label={'Export'}
                                ></FluxSecondaryButton>
                            </>
                        }
                    ></FluxActionBar>
                    <p>
                        {'A filter bar keeps its state in a single object and renders one flyout per filter.'}
                    </p>
                    <FluxFilterBar
                        value={filterState}
                        onValueChange={setFilterState}
                        search={search}
                        onSearchChange={setSearch}
                        isSearchable
                        searchPlaceholder={'Search invoices...'}
                    >
                        <FluxFilterOption
                            icon={'circle-check'}
                            label={'Status'}
                            name={'status'}
                            options={[
                                {label: 'Paid', value: 'paid'},
                                {label: 'Open', value: 'open'},
                                {label: 'Overdue', value: 'overdue'}
                            ]}
                        ></FluxFilterOption>
                        <FluxFilterOptions
                            icon={'users'}
                            label={'Owner'}
                            name={'owner'}
                            options={[
                                {label: 'Ada Lovelace', value: 'ada'},
                                {label: 'Grace Hopper', value: 'grace'},
                                {label: 'Alan Turing', value: 'alan'}
                            ]}
                        ></FluxFilterOptions>
                        <FluxFilterRange
                            icon={'coin'}
                            label={'Amount'}
                            max={10000}
                            min={0}
                            name={'amount'}
                            step={100}
                        ></FluxFilterRange>
                        <FluxFilterDate icon={'calendar'} label={'Issued'} name={'issued'}></FluxFilterDate>
                    </FluxFilterBar>
                    <p>
                        {'A pagination bar closes off a list with a page size selector and a page navigator.'}
                    </p>
                    <FluxPane>
                        <FluxPaneBody>
                            <FluxPaginationBar
                                limits={[10, 25, 50]}
                                page={invoicePage}
                                total={240}
                                onNavigate={($event) => {
                                    setInvoicePage($event);
                                }}
                                perPage={exampleValue2}
                                onLimitChange={setExampleValue2}
                            ></FluxPaginationBar>
                        </FluxPaneBody>
                    </FluxPane>
                    <h2>{'Data and collections'}</h2>
                    <p>
                        {
                            'A kanban board stacks cards on a recessed column, which is a second place where the sunken surface has to hold up.'
                        }
                    </p>
                    <FluxKanban data-prose-full>
                        {kanbanColumns.map((column) => (
                            <FluxKanbanColumn
                                key={column.id}
                                columnId={column.id}
                                count={kanbanCards.filter((card) => card.columnId === column.id).length}
                                icon={column.icon}
                                label={column.label}
                            >
                                {kanbanCards
                                    .filter((card) => card.columnId === column.id)
                                    .map((card) => (
                                        <FluxKanbanItem key={card.id} columnId={column.id} itemId={card.id}>
                                            <FluxPane variant={'flat'}>
                                                <FluxPaneBody>
                                                    <FluxFlex gap={9} direction={'vertical'}>
                                                        <strong>{card.title}</strong>
                                                        <FluxBadgeStack>
                                                            <FluxBadge
                                                                color={card.color}
                                                                dot
                                                                label={card.label}
                                                            ></FluxBadge>
                                                        </FluxBadgeStack>
                                                    </FluxFlex>
                                                </FluxPaneBody>
                                            </FluxPane>
                                        </FluxKanbanItem>
                                    ))}
                            </FluxKanbanColumn>
                        ))}
                    </FluxKanban>
                    <p>
                        {
                            'The calendar draws a grid of day cells with today highlighted, plus items that carry their own color.'
                        }
                    </p>
                    <div data-prose-full>
                        <FluxCalendar initialDate={anchorDate}>
                            {events.map((event) => (
                                <FluxCalendarItem key={event.id} date={event.date} id={event.id}>
                                    {event.label}
                                </FluxCalendarItem>
                            ))}
                        </FluxCalendar>
                    </div>
                    <p>
                        {
                            'Galleries, comments, drop zones and placeholders round out the collection components.'
                        }
                    </p>
                    <FluxMasonry columns={{xs: 1, sm: 2, xl: 4}} data-prose-full gap={24}>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'image'}
                                subtitle={'Thumbnails on a recessed track'}
                                title={'Gallery'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxGallery items={galleryItems}></FluxGallery>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'message'}
                                subtitle={'Sent and received bubbles'}
                                title={'Comments'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFlex gap={15} direction={'vertical'}>
                                    <FluxComment
                                        avatarFallback={'neutral'}
                                        avatarFallbackIcon={'robot'}
                                        isReceived
                                        postedBy={'Assistant'}
                                        postedOn={commentTime}
                                    >
                                        {' The color tokens have been regenerated for both themes. '}
                                    </FluxComment>
                                    <FluxComment
                                        avatarFallbackInitials={'AL'}
                                        postedBy={'Ada Lovelace'}
                                        postedOn={commentTime}
                                    >
                                        {' Looks good. The header border still reads a little weak to me. '}
                                    </FluxComment>
                                    <FluxComment
                                        avatarFallback={'neutral'}
                                        avatarFallbackIcon={'robot'}
                                        isReceived
                                        isTyping
                                        postedBy={'Assistant'}
                                    ></FluxComment>
                                </FluxFlex>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'upload'}
                                subtitle={'Dashed border and an empty state'}
                                title={'Drop zone'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxDropZone>
                                    {() => (
                                        <>
                                            <FluxPlaceholder
                                                icon={'square-dashed'}
                                                message={'Drop your files here to upload them...'}
                                                style={{width: '100%'}}
                                            >
                                                <FluxSecondaryButton
                                                    iconLeading={'upload'}
                                                    label={'Upload'}
                                                ></FluxSecondaryButton>
                                            </FluxPlaceholder>
                                        </>
                                    )}
                                </FluxDropZone>
                            </FluxPaneBody>
                        </FluxPane>
                        <FluxPane>
                            <FluxPaneHeader
                                icon={'files'}
                                subtitle={'Three variants of the same empty state'}
                                title={'Placeholder'}
                            ></FluxPaneHeader>
                            <FluxPaneBody>
                                <FluxFlex gap={18} direction={'vertical'}>
                                    <FluxPlaceholder
                                        icon={'files'}
                                        message={'Add your first invoice to get started.'}
                                        title={'No invoices'}
                                        variant={'extended'}
                                    >
                                        <FluxSecondaryButton label={'Add invoice'}></FluxSecondaryButton>
                                    </FluxPlaceholder>
                                    <FluxSeparator></FluxSeparator>
                                    <FluxPlaceholder
                                        icon={'box-archive'}
                                        message={'Nothing has been archived yet.'}
                                        variant={'simple'}
                                    ></FluxPlaceholder>
                                    <FluxSeparator></FluxSeparator>
                                    <FluxPlaceholder
                                        icon={'magnifying-glass'}
                                        message={'No results.'}
                                        variant={'small'}
                                    ></FluxPlaceholder>
                                </FluxFlex>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxMasonry>
                    <p>
                        {'The command palette lives on the same raised surface as a menu. Press '}
                        <kbd>{'Cmd'}</kbd>
                        {' + '}
                        <kbd>{'K'}</kbd>
                        {' or use the button.'}
                    </p>
                    <FluxButtonStack>
                        <FluxSecondaryButton
                            iconLeading={'magnifying-glass'}
                            label={'Open command palette'}
                            onClick={() => {
                                commandPalette.current?.open();
                            }}
                        ></FluxSecondaryButton>
                    </FluxButtonStack>
                    <FluxCommandPalette
                        ref={commandPalette}
                        hasKeyboardShortcut
                        placeholder={'Type a command or search...'}
                        sources={commandSources}
                    ></FluxCommandPalette>
                    <h2>{'Primitives'}</h2>
                    <p>{'The smallest building blocks: boxed icons, dividers and loading skeletons.'}</p>
                    <FluxFlex gap={15}>
                        <FluxBoxedIcon name={'circle-check'}></FluxBoxedIcon>
                        <FluxBoxedIcon name={'lock'}></FluxBoxedIcon>
                        <FluxBoxedIcon name={'rocket'}></FluxBoxedIcon>
                        <FluxBoxedIcon name={'bolt'}></FluxBoxedIcon>
                    </FluxFlex>
                    <p>{'The boxed icon takes an intent, and so does the icon itself.'}</p>
                    <FluxFlex gap={15} wrap={'wrap'}>
                        {colors.map((color) => (
                            <FluxBoxedIcon key={color} color={color} name={'bolt'}></FluxBoxedIcon>
                        ))}
                    </FluxFlex>
                    <FluxFlex gap={15} wrap={'wrap'}>
                        {colors.map((color) => (
                            <FluxBoxedIcon key={color} color={color} name={'heart'} rounded></FluxBoxedIcon>
                        ))}
                    </FluxFlex>
                    <FluxFlex gap={18} align={'center'} wrap={'wrap'}>
                        {colors.map((color) => (
                            <FluxIcon key={color} color={color} name={'star'} size={24}></FluxIcon>
                        ))}
                    </FluxFlex>
                    <p>
                        {
                            'Avatars fall back to initials or an icon, and can carry a status dot in any intent.'
                        }
                    </p>
                    <FluxFlex gap={15} align={'center'} wrap={'wrap'}>
                        <FluxAvatar
                            size={36}
                            src={'https://avatars.githubusercontent.com/u/978257?v=4'}
                        ></FluxAvatar>
                        <FluxAvatar fallbackInitials={'AL'} size={36}></FluxAvatar>
                        <FluxAvatar fallback={'neutral'} fallbackIcon={'user'} size={36}></FluxAvatar>
                        <FluxAvatar isLoading size={36}></FluxAvatar>
                        {colors.map((color) => (
                            <FluxAvatar
                                key={color}
                                fallbackInitials={'BM'}
                                size={36}
                                status={color}
                                statusIcon={'check'}
                            ></FluxAvatar>
                        ))}
                    </FluxFlex>
                    <p>{'Dividers and separators split content, with or without something in the middle.'}</p>
                    <FluxPane>
                        <FluxPaneBody>
                            <FluxDivider>{'Centered'}</FluxDivider>
                            <FluxDivider contentPlacement={'start'}>
                                <FluxIcon name={'bolt'}></FluxIcon>
                            </FluxDivider>
                            <FluxDivider contentPlacement={'end'}>
                                <FluxSecondaryButton iconLeading={'plus'} label={'Add'}></FluxSecondaryButton>
                            </FluxDivider>
                            <FluxSeparator></FluxSeparator>
                        </FluxPaneBody>
                    </FluxPane>
                    <p>{'Skeletons stand in for content that has not arrived yet.'}</p>
                    <FluxFlex gap={15} style={{width: '100%'}}>
                        <FluxSkeleton height={48} width={48} variant={'circle'}></FluxSkeleton>
                        <FluxFlex gap={6} direction={'vertical'} style={{flex: '1'}}>
                            <FluxSkeleton width={'55%'}></FluxSkeleton>
                            <FluxSkeleton></FluxSkeleton>
                            <FluxSkeleton width={'80%'}></FluxSkeleton>
                        </FluxFlex>
                    </FluxFlex>
                    <FluxFlex gap={15} wrap={'wrap'}>
                        <FluxSkeleton height={60} variant={'rectangle'} width={120}></FluxSkeleton>
                        <FluxSkeleton height={60} variant={'rounded'} width={120}></FluxSkeleton>
                        <FluxSkeleton height={60} variant={'circle'} width={60}></FluxSkeleton>
                    </FluxFlex>
                    <p>{'A pane can show its own loader on top of whatever it holds.'}</p>
                    <FluxPane isLoading>
                        <FluxPaneHeader
                            icon={'hourglass-clock'}
                            subtitle={'The loader covers the pane'}
                            title={'Loading'}
                        ></FluxPaneHeader>
                        <FluxPaneBody>
                            {
                                'This text sits behind the loading layer, which is a translucent copy of the pane surface.'
                            }
                        </FluxPaneBody>
                    </FluxPane>
                    <h2>{'Application shell'}</h2>
                    <p>
                        {'The shell from '}
                        <code>{'@flux-ui/react'}</code>
                        {
                            ', embedded in a 600px frame rather than the viewport it normally fills. The rail sits on '
                        }
                        <code>{'--surface-canvas'}</code>
                        {
                            ' and the top bar on the page, so this is where the two page level neutrals have to hold apart. Use the toggle in the top bar to switch the rail between collapsed and expanded.'
                        }
                    </p>
                    <ApplicationDemo></ApplicationDemo>
                    <Patterns></Patterns>
                    <h2>{'Typography'}</h2>
                    <p>
                        {
                            'Back in the prose flow, the text scale, lists, quotes, code and tables all come from '
                        }
                        <code>{'FluxProse'}</code>
                        {'.'}
                    </p>
                    <p>{'Text itself has a scale and a set of colors of its own.'}</p>
                    <FluxFlex gap={6} direction={'vertical'}>
                        <FluxText size={'display'}>{'Display text'}</FluxText>
                        <FluxText size={'large'}>{'Large text'}</FluxText>
                        <FluxText>{'Medium text'}</FluxText>
                        <FluxText size={'small'}>{'Small text'}</FluxText>
                        <FluxText color={'prominent'}>{'Prominent'}</FluxText>
                        <FluxText color={'muted'}>{'Muted'}</FluxText>
                        {colors.map((color) => (
                            <FluxText key={color} color={color}>
                                {color}
                            </FluxText>
                        ))}
                    </FluxFlex>
                    <blockquote>
                        {
                            'Typography exists to honor content. Its purpose is to serve the reader, not to draw attention to itself.'
                        }
                    </blockquote>
                    <h3>{'Working with lists'}</h3>
                    <ul>
                        <li>
                            {'Keep the measure between 45 and 75 characters. '}
                            <ul>
                                <li>{'Narrower for captions.'}</li>
                                <li>{'Wider for long form reading.'}</li>
                            </ul>
                        </li>
                        <li>{'Set a generous line height for body copy.'}</li>
                    </ul>
                    <pre>
                        <code>
                            {"import { FluxProse } from '@flux-ui/react';\n\nconst article = FluxProse;"}
                        </code>
                    </pre>
                    <p>{'A table can break out to a wider track when the data needs the room:'}</p>
                    <table data-prose-wide>
                        <thead>
                            <tr>
                                <th>{'Element'}</th>
                                <th>{'Size'}</th>
                                <th>{'Line height'}</th>
                                <th>{'Role'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{'Heading 1'}</td>
                                <td>{'27px'}</td>
                                <td>{'42px'}</td>
                                <td>{'Page title'}</td>
                            </tr>
                            <tr>
                                <td>{'Heading 2'}</td>
                                <td>{'21px'}</td>
                                <td>{'33px'}</td>
                                <td>{'Section heading'}</td>
                            </tr>
                            <tr>
                                <td>{'Body'}</td>
                                <td>{'15px'}</td>
                                <td>{'24px'}</td>
                                <td>{'Paragraphs and lists'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>{'And imagery breaks out just the same, giving the eye a place to rest.'}</p>
                    <img
                        alt={''}
                        data-prose-wide
                        src={
                            'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                        }
                    ></img>
                    <h2>{'Service desk: quick actions'}</h2>
                    <p>
                        {
                            'A speed dial gives a dispatcher a short list of things to create. Open the dial to add a request, incident or site visit to the queue.'
                        }
                    </p>
                    <ServiceDesk data-prose-wide></ServiceDesk>
                    <h2>{'Order details: description lists'}</h2>
                    <p>
                        {
                            'One order combines a horizontal summary, aligned record fields and a stacked delivery address. Mark it as dispatched to update the status.'
                        }
                    </p>
                    <OrderDetails data-prose-wide></OrderDetails>
                    <h2>{'Invoice approval: context and history'}</h2>
                    <p>
                        {
                            'A progress ring tracks the approval checklist. Hover over the supplier for contact details, expand the delivery note, then confirm approval to add an entry to the activity feed.'
                        }
                    </p>
                    <InvoiceApproval data-prose-wide></InvoiceApproval>
                    <h2>{'Site visit: planning and attendees'}</h2>
                    <p>
                        {
                            'A numbered form brings together a date range, a start time, a time zone and a repeatable attendee list. Add, remove or reorder attendees, then save the visit to see a summary.'
                        }
                    </p>
                    <VisitPlanner data-prose-wide></VisitPlanner>
                </FluxProse>
                <PaletteSwitcher></PaletteSwitcher>
            
        </>
    );
}
