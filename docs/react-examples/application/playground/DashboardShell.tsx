import { Fragment, type ComponentProps, useState } from 'react';
import {
    FluxAction,
    FluxAdaptiveSlot,
    FluxApplication,
    FluxApplicationContent,
    FluxApplicationHero,
    FluxApplicationMenu,
    FluxApplicationMenuAccount,
    FluxApplicationMenuPromo,
    FluxApplicationPageHeader,
    FluxApplicationSection,
    FluxApplicationSide,
    FluxApplicationTop,
    FluxAvatar,
    FluxBadge,
    FluxButtonStack,
    FluxDivider,
    FluxFlex,
    FluxFlyout,
    FluxFormInput,
    FluxItem,
    FluxItemActions,
    FluxItemContent,
    FluxItemStack,
    FluxMenu,
    FluxMenuGroup,
    FluxMenuItem,
    FluxMenuSubHeader,
    FluxNotice,
    FluxPane,
    FluxPaneBody,
    FluxPaneHeader,
    FluxPlaceholder,
    FluxPrimaryButton,
    FluxSecondaryButton,
    FluxSecondaryLinkButton,
    FluxSeparator,
    FluxSpacer,
    FluxTabBarItem,
    FluxTable,
    FluxTableActions,
    FluxTableBar,
    FluxTableCell,
    FluxTableHeader,
    FluxTableRow,
    FluxTimeline,
    FluxTimelineItem,
    FluxTooltip,
    type FluxColor,
    type FluxIconName
} from '@flux-ui/react';
import { useEffect } from 'react';
import { clsx } from 'clsx';
import $style from './DashboardShell-0.module.scss';
export default function Example() {
    type Page = {
        readonly icon: FluxIconName;
        readonly id: string;
        readonly label: string;
        readonly tabs: readonly string[];
    };
    const operationsNavigation: Page[] = [
        { icon: 'gauge', id: 'overview', label: 'Overview', tabs: ['Summary', 'Activity'] },
        {
            icon: 'cart-shopping',
            id: 'orders',
            label: 'Orders',
            tabs: ['All orders', 'Unfulfilled', 'On hold', 'Cancelled']
        },
        { icon: 'truck', id: 'shipments', label: 'Shipments', tabs: ['In transit', 'Delivered'] }
    ];
    const catalogNavigation: Page[] = [
        {
            icon: 'box-archive',
            id: 'inventory',
            label: 'Inventory',
            tabs: ['Stock', 'Purchase orders']
        },
        { icon: 'users', id: 'customers', label: 'Customers', tabs: ['All customers'] },
        { icon: 'building', id: 'carriers', label: 'Carriers', tabs: ['Contracts', 'Rates'] }
    ];
    const insightsNavigation: Page[] = [
        { icon: 'chart-line', id: 'reports', label: 'Reports', tabs: ['Revenue', 'Returns'] },
        { icon: 'bolt', id: 'automations', label: 'Automations', tabs: ['Rules', 'Runs'] }
    ];
    const footerNavigation: Page[] = [
        { icon: 'user-key', id: 'admin', label: 'Administration', tabs: ['Members', 'Audit log'] },
        { icon: 'gear', id: 'settings', label: 'Settings', tabs: ['General'] }
    ];
    const pages = [
        ...operationsNavigation,
        ...catalogNavigation,
        ...insightsNavigation,
        ...footerNavigation
    ];
    const workspaces = [
        { icon: 'cubes', id: 'benelux', label: 'Harbor Benelux' },
        { icon: 'store', id: 'retail', label: 'Harbor Retail' },
        { icon: 'globe', id: 'export', label: 'Harbor Export' }
    ] satisfies readonly {
        readonly icon: FluxIconName;
        readonly id: string;
        readonly label: string;
    }[];
    const metrics = [
        {
            color: 'success',
            icon: 'arrow-trend-up',
            label: 'Orders shipped',
            trend: '+9.2%',
            value: '2,481'
        },
        {
            color: 'success',
            icon: 'arrow-trend-up',
            label: 'On time delivery',
            trend: '+1.4%',
            value: '96.8%'
        },
        {
            color: 'warning',
            icon: 'arrow-trend-down',
            label: 'Open returns',
            trend: '-4.0%',
            value: '58'
        },
        {
            color: 'gray',
            icon: 'stopwatch',
            label: 'Average pick time',
            trend: 'Unchanged',
            value: '4m 12s'
        }
    ] satisfies readonly {
        readonly color: FluxColor;
        readonly icon: FluxIconName;
        readonly label: string;
        readonly trend: string;
        readonly value: string;
    }[];
    const shipments = [
        {
            carrier: 'PostNL',
            color: 'info',
            destination: 'Rotterdam, NL',
            promised: 'Today, 18:00',
            status: 'Out for delivery',
            tracking: '3SHRB0148221'
        },
        {
            carrier: 'DHL Parcel',
            color: 'info',
            destination: 'Antwerp, BE',
            promised: 'Tomorrow, 12:00',
            status: 'In transit',
            tracking: 'JVGL0091724X'
        },
        {
            carrier: 'DPD',
            color: 'warning',
            destination: 'Cologne, DE',
            promised: 'Today, 21:00',
            status: 'Delayed',
            tracking: '05512480990'
        },
        {
            carrier: 'PostNL',
            color: 'success',
            destination: 'Utrecht, NL',
            promised: 'Today, 16:00',
            status: 'At depot',
            tracking: '3SHRB0148198'
        },
        {
            carrier: 'GLS',
            color: 'danger',
            destination: 'Lille, FR',
            promised: 'Yesterday, 17:00',
            status: 'Address issue',
            tracking: 'ZX448120071'
        }
    ] satisfies readonly {
        readonly carrier: string;
        readonly color: FluxColor;
        readonly destination: string;
        readonly promised: string;
        readonly status: string;
        readonly tracking: string;
    }[];
    const orders = [
        {
            color: 'gray',
            customer: 'Riverside Supply',
            number: 'HRB-24188',
            placed: '18 Jun 2026',
            filters: ['Unfulfilled'],
            status: 'Unfulfilled',
            total: '€ 1,284.00'
        },
        {
            color: 'success',
            customer: 'Atlas Group',
            number: 'HRB-24187',
            placed: '18 Jun 2026',
            filters: [],
            status: 'Fulfilled',
            total: '€ 612.50'
        },
        {
            color: 'warning',
            customer: 'Halcyon Studio',
            number: 'HRB-24186',
            placed: '17 Jun 2026',
            filters: ['On hold'],
            status: 'On hold',
            total: '€ 4,940.00'
        },
        {
            color: 'gray',
            customer: 'Meridian Labs',
            number: 'HRB-24185',
            placed: '17 Jun 2026',
            filters: ['Unfulfilled'],
            status: 'Unfulfilled',
            total: '€ 218.75'
        },
        {
            color: 'success',
            customer: 'Northgate Rail',
            number: 'HRB-24184',
            placed: '16 Jun 2026',
            filters: [],
            status: 'Fulfilled',
            total: '€ 3,015.00'
        },
        {
            color: 'danger',
            customer: 'Ivy & Stone',
            number: 'HRB-24183',
            placed: '15 Jun 2026',
            filters: ['Cancelled'],
            status: 'Cancelled',
            total: '€ 96.00'
        },
        {
            color: 'warning',
            customer: 'Bellweather Foods',
            number: 'HRB-24182',
            placed: '15 Jun 2026',
            filters: ['On hold'],
            status: 'On hold',
            total: '€ 1,760.40'
        }
    ] satisfies readonly {
        readonly color: FluxColor;
        readonly customer: string;
        readonly number: string;
        readonly placed: string;
        readonly filters: readonly string[];
        readonly status: string;
        readonly total: string;
    }[];
    const activity = [
        {
            description: 'Twelve parcels left the Rotterdam depot in the evening run.',
            icon: 'truck',
            id: 1,
            title: 'Carrier pickup confirmed',
            when: 'Today, 17:42'
        },
        {
            description: 'HRB-24186 waits for a customs document before it can be picked.',
            icon: 'circle-info',
            id: 2,
            title: 'Order put on hold',
            when: 'Today, 15:08'
        },
        {
            description: 'Bay C4 dropped below its reorder point of 120 units.',
            icon: 'box-archive',
            id: 3,
            title: 'Stock level warning',
            when: 'Today, 11:20'
        },
        {
            description: 'Rates for the Benelux zone were refreshed from the carrier portal.',
            icon: 'bolt',
            id: 4,
            title: 'Automation ran',
            when: 'Today, 06:00'
        }
    ] satisfies readonly {
        readonly description: string;
        readonly icon: FluxIconName;
        readonly id: number;
        readonly title: string;
        readonly when: string;
    }[];
    const openTasks = [
        {
            color: 'danger',
            description: 'Customs document missing since this morning.',
            due: 'Overdue',
            id: 1,
            title: 'Release HRB-24186'
        },
        {
            color: 'warning',
            description: 'Bay C4 dropped below its reorder point.',
            due: 'Today',
            id: 2,
            title: 'Restock packing tape'
        },
        {
            color: 'gray',
            description: 'The Benelux zone rates expire at the end of the week.',
            due: 'Friday',
            id: 3,
            title: 'Confirm carrier rates'
        },
        {
            color: 'gray',
            description: 'Two returns are waiting for an inspection slot.',
            due: 'Next week',
            id: 4,
            title: 'Schedule return inspection'
        }
    ] satisfies readonly {
        readonly color: FluxColor;
        readonly description: string;
        readonly due: string;
        readonly id: number;
        readonly title: string;
    }[];
    const [activePageId, setActivePageId] = useState('overview');
    const [activeTab, setActiveTab] = useState(operationsNavigation[0].tabs[0]);
    const [activeWorkspaceId, setActiveWorkspaceId] = useState('benelux');
    const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
    const [isSideVisible, setIsSideVisible] =
        useState<Exclude<ComponentProps<typeof FluxApplicationSide>['isVisible'], undefined>>(true);
    const [search, setSearch] =
        useState<Exclude<ComponentProps<typeof FluxFormInput>['value'], undefined>>('');
    const activePage = (() =>
        pages.find((page) => page.id === activePageId) ?? operationsNavigation[0])();
    const activeWorkspace = (() =>
        workspaces.find((workspace) => workspace.id === activeWorkspaceId) ?? workspaces[0])();
    const visibleOrders = (() => {
        if (activeTab === 'All orders') {
            return orders;
        }
        return orders.filter((order) => (order.filters as readonly string[]).includes(activeTab));
    })();
    useEffect(() => {
        setActiveTab(activePage.tabs[0]);
    }, [activePageId]);
    return (
        <>
            <div className="react-example-1ooy7crare2ql" style={{ width: '100%' }}>
                <FluxApplication
                    showDesktopMenuToggle
                    menu={
                        <>
                            <FluxApplicationMenu
                                header={
                                    <>
                                        <FluxMenuGroup isHorizontal>
                                            <FluxApplicationMenuAccount
                                                icon={activeWorkspace.icon}
                                                label={activeWorkspace.label}
                                                switcher={
                                                    <>
                                                        <FluxMenu>
                                                            <FluxMenuGroup>
                                                                <FluxMenuSubHeader
                                                                    label={'Workspaces'}
                                                                ></FluxMenuSubHeader>
                                                                {workspaces.map((workspace) => (
                                                                    <FluxMenuItem
                                                                        key={workspace.id}
                                                                        iconLeading={workspace.icon}
                                                                        isSelectable
                                                                        isSelected={
                                                                            workspace.id ===
                                                                            activeWorkspaceId
                                                                        }
                                                                        label={workspace.label}
                                                                        onClick={() => {
                                                                            setActiveWorkspaceId(
                                                                                workspace.id
                                                                            );
                                                                        }}
                                                                    ></FluxMenuItem>
                                                                ))}
                                                            </FluxMenuGroup>
                                                            <FluxSeparator></FluxSeparator>
                                                            <FluxMenuGroup>
                                                                <FluxMenuItem
                                                                    iconLeading={'circle-plus'}
                                                                    label={'New workspace'}
                                                                ></FluxMenuItem>
                                                            </FluxMenuGroup>
                                                        </FluxMenu>
                                                    </>
                                                }
                                            ></FluxApplicationMenuAccount>
                                        </FluxMenuGroup>
                                    </>
                                }
                                footer={
                                    <>
                                        <FluxApplicationMenuPromo icon={'rocket'}>
                                            <strong>{'Trial ends in 9 days'}</strong>
                                            <p>
                                                {
                                                    'Pick a plan to keep carrier rates and label printing after the trial.'
                                                }
                                            </p>
                                            <a href={'#'}>{'Compare plans'}</a>
                                        </FluxApplicationMenuPromo>
                                        <FluxMenuGroup>
                                            {footerNavigation.map((item) => (
                                                <FluxMenuItem
                                                    key={item.id}
                                                    iconLeading={item.icon}
                                                    isActive={item.id === activePageId}
                                                    label={item.label}
                                                    onClick={() => {
                                                        setActivePageId(item.id);
                                                    }}
                                                ></FluxMenuItem>
                                            ))}
                                        </FluxMenuGroup>
                                    </>
                                }
                            >
                                <FluxMenuGroup>
                                    {operationsNavigation.map((item) => (
                                        <FluxMenuItem
                                            key={item.id}
                                            iconLeading={item.icon}
                                            isActive={item.id === activePageId}
                                            label={item.label}
                                            onClick={() => {
                                                setActivePageId(item.id);
                                            }}
                                        ></FluxMenuItem>
                                    ))}
                                </FluxMenuGroup>
                                <FluxDivider></FluxDivider>
                                <FluxMenuGroup>
                                    <FluxMenuSubHeader label={'Catalog'}></FluxMenuSubHeader>
                                    {catalogNavigation.map((item) => (
                                        <FluxMenuItem
                                            key={item.id}
                                            iconLeading={item.icon}
                                            isActive={item.id === activePageId}
                                            label={item.label}
                                            onClick={() => {
                                                setActivePageId(item.id);
                                            }}
                                        ></FluxMenuItem>
                                    ))}
                                </FluxMenuGroup>
                                <FluxDivider></FluxDivider>
                                <FluxMenuGroup>
                                    <FluxMenuSubHeader label={'Insights'}></FluxMenuSubHeader>
                                    {insightsNavigation.map((item) => (
                                        <FluxMenuItem
                                            key={item.id}
                                            iconLeading={item.icon}
                                            isActive={item.id === activePageId}
                                            label={item.label}
                                            onClick={() => {
                                                setActivePageId(item.id);
                                            }}
                                        ></FluxMenuItem>
                                    ))}
                                    <FluxMenuItem
                                        disabled
                                        iconLeading={'robot'}
                                        label={'Forecasting'}
                                    ></FluxMenuItem>
                                </FluxMenuGroup>
                            </FluxApplicationMenu>
                        </>
                    }
                    side={
                        <>
                            <FluxApplicationSide
                                isVisible={isSideVisible}
                                onVisibleChange={setIsSideVisible}
                            >
                                <FluxPaneHeader
                                    icon={'list-check'}
                                    title={'Open tasks'}
                                    after={
                                        <>
                                            <FluxTooltip content={'Hide open tasks'}>
                                                <FluxSecondaryLinkButton
                                                    iconLeading={'xmark'}
                                                    size={'small'}
                                                    onClick={() => {
                                                        setIsSideVisible(false);
                                                    }}
                                                ></FluxSecondaryLinkButton>
                                            </FluxTooltip>
                                        </>
                                    }
                                ></FluxPaneHeader>
                                <FluxPaneBody className={clsx($style.sideBody)}>
                                    <FluxItemStack>
                                        {openTasks.map((task) => (
                                            <FluxItem key={task.id}>
                                                <FluxItemContent>
                                                    <strong>{task.title}</strong>
                                                    <p>{task.description}</p>
                                                </FluxItemContent>
                                                <FluxItemActions>
                                                    <FluxBadge
                                                        color={task.color}
                                                        label={task.due}
                                                        size={'small'}
                                                    ></FluxBadge>
                                                </FluxItemActions>
                                            </FluxItem>
                                        ))}
                                    </FluxItemStack>
                                </FluxPaneBody>
                            </FluxApplicationSide>
                        </>
                    }
                >
                    {isAnnouncementVisible ? (
                        <FluxNotice
                            color={'warning'}
                            icon={'screwdriver-wrench'}
                            isCenter
                            isCloseable
                            isFluid
                            message={
                                'Carrier rates are read only tonight between 23:00 and 01:00 CET while we migrate the rate engine.'
                            }
                            onClose={() => {
                                setIsAnnouncementVisible(false);
                            }}
                            end={
                                <>
                                    <FluxSecondaryButton
                                        label={'Read the notice'}
                                        size={'small'}
                                    ></FluxSecondaryButton>
                                </>
                            }
                        ></FluxNotice>
                    ) : null}
                    <FluxApplicationTop
                        icon={activePage.icon}
                        title={activePage.label}
                        end={
                            <>
                                <FluxAdaptiveSlot
                                    fallback={
                                        <>
                                            <FluxSecondaryLinkButton
                                                iconLeading={'magnifying-glass'}
                                                size={'small'}
                                            ></FluxSecondaryLinkButton>
                                        </>
                                    }
                                >
                                    <FluxFormInput
                                        value={search}
                                        onValueChange={(next) => setSearch(next ?? '')}
                                        className={clsx($style.dashboardSearch)}
                                        iconLeading={'magnifying-glass'}
                                        placeholder={'Search orders, tracking codes...'}
                                        type={'search'}
                                    ></FluxFormInput>
                                </FluxAdaptiveSlot>
                                <FluxButtonStack gap={0}>
                                    {!isAnnouncementVisible ? (
                                        <FluxTooltip content={'Show announcement'}>
                                            <FluxSecondaryLinkButton
                                                iconLeading={'circle-info'}
                                                size={'small'}
                                                onClick={() => {
                                                    setIsAnnouncementVisible(true);
                                                }}
                                            ></FluxSecondaryLinkButton>
                                        </FluxTooltip>
                                    ) : null}
                                    <FluxTooltip content={'Notifications'}>
                                        <FluxSecondaryLinkButton
                                            iconLeading={'bell'}
                                            size={'small'}
                                        ></FluxSecondaryLinkButton>
                                    </FluxTooltip>
                                    <FluxTooltip
                                        content={
                                            isSideVisible ? 'Hide open tasks' : 'Show open tasks'
                                        }
                                    >
                                        <FluxSecondaryLinkButton
                                            aria-expanded={isSideVisible}
                                            iconLeading={'sidebar-flip'}
                                            isActive={isSideVisible}
                                            size={'small'}
                                            onClick={() => {
                                                setIsSideVisible(!isSideVisible);
                                            }}
                                        ></FluxSecondaryLinkButton>
                                    </FluxTooltip>
                                </FluxButtonStack>
                                <FluxSeparator direction={'vertical'}></FluxSeparator>
                                <FluxFlyout
                                    isAutoWidth
                                    opener={({ open }) => (
                                        <>
                                            <FluxAvatar
                                                alt={'Ada Lovelace'}
                                                fallbackInitials={'AL'}
                                                size={30}
                                                status={'success'}
                                                type={'button'}
                                                onClick={() => {
                                                    open();
                                                }}
                                            ></FluxAvatar>
                                        </>
                                    )}
                                >
                                    {() => (
                                        <>
                                            <FluxMenu>
                                                <FluxMenuGroup>
                                                    <FluxMenuSubHeader
                                                        label={'Ada Lovelace'}
                                                    ></FluxMenuSubHeader>
                                                    <FluxMenuItem
                                                        iconLeading={'user'}
                                                        label={'Profile'}
                                                    ></FluxMenuItem>
                                                    <FluxMenuItem
                                                        iconLeading={'gear'}
                                                        label={'Preferences'}
                                                    ></FluxMenuItem>
                                                </FluxMenuGroup>
                                                <FluxSeparator></FluxSeparator>
                                                <FluxMenuGroup>
                                                    <FluxMenuItem
                                                        iconLeading={'arrow-right-from-bracket'}
                                                        isDestructive
                                                        label={'Sign out'}
                                                    ></FluxMenuItem>
                                                </FluxMenuGroup>
                                            </FluxMenu>
                                        </>
                                    )}
                                </FluxFlyout>
                            </>
                        }
                        tabs={
                            <>
                                {activePage.tabs.map((tab) => (
                                    <FluxTabBarItem
                                        key={tab}
                                        isActive={tab === activeTab}
                                        label={tab}
                                        onClick={() => {
                                            setActiveTab(tab);
                                        }}
                                    ></FluxTabBarItem>
                                ))}
                            </>
                        }
                    ></FluxApplicationTop>
                    <FluxApplicationContent layout={'dashboard'}>
                        {activePageId === 'overview' ? (
                            <Fragment>
                                <FluxApplicationHero
                                    subtitle={
                                        'Everything that moved through the warehouse in the last seven days.'
                                    }
                                    title={'Good morning, Ada'}
                                    end={
                                        <>
                                            <FluxPrimaryButton
                                                iconLeading={'plus'}
                                                label={'New order'}
                                            ></FluxPrimaryButton>
                                        </>
                                    }
                                ></FluxApplicationHero>
                                {activeTab === 'Summary' ? (
                                    <Fragment>
                                        <FluxApplicationSection
                                            info={'Compared to the previous seven days'}
                                            title={'Key figures'}
                                        >
                                            <div className={clsx($style.dashboardMetrics)}>
                                                {metrics.map((metric) => (
                                                    <FluxPane key={metric.label}>
                                                        <FluxPaneBody>
                                                            <div
                                                                className={clsx(
                                                                    $style.dashboardMetric
                                                                )}
                                                            >
                                                                <span
                                                                    className={clsx(
                                                                        $style.dashboardMetricLabel
                                                                    )}
                                                                >
                                                                    {metric.label}
                                                                </span>
                                                                <strong
                                                                    className={clsx(
                                                                        $style.dashboardMetricValue
                                                                    )}
                                                                >
                                                                    {metric.value}
                                                                </strong>
                                                                <FluxBadge
                                                                    color={metric.color}
                                                                    icon={metric.icon}
                                                                    label={metric.trend}
                                                                ></FluxBadge>
                                                            </div>
                                                        </FluxPaneBody>
                                                    </FluxPane>
                                                ))}
                                            </div>
                                        </FluxApplicationSection>
                                        <FluxApplicationSection
                                            title={'Shipments in transit'}
                                            end={
                                                <>
                                                    <FluxSecondaryButton
                                                        iconTrailing={'angle-right'}
                                                        label={'View all'}
                                                        size={'small'}
                                                        onClick={() => {
                                                            setActivePageId('shipments');
                                                        }}
                                                    ></FluxSecondaryButton>
                                                </>
                                            }
                                        >
                                            <FluxPane>
                                                <FluxPaneHeader
                                                    icon={'truck'}
                                                    subtitle={
                                                        'Handed over to a carrier and not delivered yet'
                                                    }
                                                    title={'On the road'}
                                                ></FluxPaneHeader>
                                                <FluxTable
                                                    isHoverable
                                                    header={
                                                        <>
                                                            <FluxTableRow>
                                                                <FluxTableHeader minWidth={165}>
                                                                    {'Tracking'}
                                                                </FluxTableHeader>
                                                                <FluxTableHeader minWidth={210}>
                                                                    {'Destination'}
                                                                </FluxTableHeader>
                                                                <FluxTableHeader minWidth={150}>
                                                                    {'Carrier'}
                                                                </FluxTableHeader>
                                                                <FluxTableHeader minWidth={150}>
                                                                    {'Status'}
                                                                </FluxTableHeader>
                                                                <FluxTableHeader minWidth={150}>
                                                                    {'Promised'}
                                                                </FluxTableHeader>
                                                            </FluxTableRow>
                                                        </>
                                                    }
                                                >
                                                    {shipments.map((shipment) => (
                                                        <FluxTableRow
                                                            key={shipment.tracking}
                                                            isClickable
                                                        >
                                                            <FluxTableCell>
                                                                <strong>{shipment.tracking}</strong>
                                                            </FluxTableCell>
                                                            <FluxTableCell>
                                                                {shipment.destination}
                                                            </FluxTableCell>
                                                            <FluxTableCell>
                                                                {shipment.carrier}
                                                            </FluxTableCell>
                                                            <FluxTableCell>
                                                                <FluxBadge
                                                                    color={shipment.color}
                                                                    dot
                                                                    label={shipment.status}
                                                                ></FluxBadge>
                                                            </FluxTableCell>
                                                            <FluxTableCell>
                                                                {shipment.promised}
                                                            </FluxTableCell>
                                                        </FluxTableRow>
                                                    ))}
                                                </FluxTable>
                                            </FluxPane>
                                        </FluxApplicationSection>
                                    </Fragment>
                                ) : (
                                    <FluxApplicationSection
                                        info={'Newest first'}
                                        title={'Warehouse activity'}
                                    >
                                        <FluxPane>
                                            <FluxPaneBody>
                                                <FluxTimeline>
                                                    {activity.map((entry) => (
                                                        <FluxTimelineItem
                                                            key={entry.id}
                                                            icon={entry.icon}
                                                            title={entry.title}
                                                            when={entry.when}
                                                        >
                                                            {entry.description}
                                                        </FluxTimelineItem>
                                                    ))}
                                                </FluxTimeline>
                                            </FluxPaneBody>
                                        </FluxPane>
                                    </FluxApplicationSection>
                                )}
                            </Fragment>
                        ) : activePageId === 'orders' ? (
                            <Fragment>
                                <FluxApplicationPageHeader
                                    description={
                                        'Every order that came in through the store, the API and the customer portal.'
                                    }
                                    title={'Orders'}
                                    actions={
                                        <>
                                            <FluxSecondaryButton
                                                iconLeading={'arrow-down-to-line'}
                                                label={'Export'}
                                            ></FluxSecondaryButton>
                                            <FluxPrimaryButton
                                                iconLeading={'plus'}
                                                label={'New order'}
                                            ></FluxPrimaryButton>
                                        </>
                                    }
                                ></FluxApplicationPageHeader>
                                <FluxApplicationSection
                                    info={'Filtered by the tab in the top bar'}
                                    title={activeTab}
                                >
                                    <FluxPane>
                                        <FluxTable
                                            isHoverable
                                            header={
                                                <>
                                                    <FluxTableBar>
                                                        <FluxFlex align={'center'} gap={9}>
                                                            <span>
                                                                {visibleOrders.length}
                                                                {' of '}
                                                                {orders.length}
                                                                {' orders'}
                                                            </span>
                                                            <FluxSpacer></FluxSpacer>
                                                            <FluxTableActions>
                                                                <FluxAction
                                                                    icon={'filter'}
                                                                ></FluxAction>
                                                                <FluxAction
                                                                    icon={'arrow-down-to-line'}
                                                                ></FluxAction>
                                                            </FluxTableActions>
                                                        </FluxFlex>
                                                    </FluxTableBar>
                                                    <FluxTableRow>
                                                        <FluxTableHeader minWidth={150}>
                                                            {'Order'}
                                                        </FluxTableHeader>
                                                        <FluxTableHeader minWidth={210}>
                                                            {'Customer'}
                                                        </FluxTableHeader>
                                                        <FluxTableHeader minWidth={150}>
                                                            {'Status'}
                                                        </FluxTableHeader>
                                                        <FluxTableHeader minWidth={150}>
                                                            {'Placed'}
                                                        </FluxTableHeader>
                                                        <FluxTableHeader
                                                            align={'end'}
                                                            isNumeric
                                                            minWidth={135}
                                                        >
                                                            {' Total '}
                                                        </FluxTableHeader>
                                                    </FluxTableRow>
                                                </>
                                            }
                                        >
                                            {visibleOrders.map((order) => (
                                                <FluxTableRow key={order.number} isClickable>
                                                    <FluxTableCell>
                                                        <strong>{order.number}</strong>
                                                    </FluxTableCell>
                                                    <FluxTableCell>{order.customer}</FluxTableCell>
                                                    <FluxTableCell>
                                                        <FluxBadge
                                                            color={order.color}
                                                            dot
                                                            label={order.status}
                                                        ></FluxBadge>
                                                    </FluxTableCell>
                                                    <FluxTableCell>{order.placed}</FluxTableCell>
                                                    <FluxTableCell>{order.total}</FluxTableCell>
                                                </FluxTableRow>
                                            ))}
                                        </FluxTable>
                                    </FluxPane>
                                </FluxApplicationSection>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <FluxApplicationPageHeader
                                    description={`${activePage.label} is not part of this playground, but the page still keeps the gutter, the heading and the actions of every other page.`}
                                    title={activePage.label}
                                    actions={
                                        <>
                                            <FluxSecondaryButton
                                                iconLeading={'angle-left'}
                                                label={'Back to the overview'}
                                                onClick={() => {
                                                    setActivePageId('overview');
                                                }}
                                            ></FluxSecondaryButton>
                                        </>
                                    }
                                ></FluxApplicationPageHeader>
                                <FluxApplicationSection>
                                    <FluxPane>
                                        <FluxPaneBody>
                                            <FluxPlaceholder
                                                icon={activePage.icon}
                                                message={
                                                    'Pick another item in the rail to come back to a page that does.'
                                                }
                                                title={`${activePage.label} has no demo content`}
                                            ></FluxPlaceholder>
                                        </FluxPaneBody>
                                    </FluxPane>
                                </FluxApplicationSection>
                            </Fragment>
                        )}
                    </FluxApplicationContent>
                </FluxApplication>
            </div>
        </>
    );
}
