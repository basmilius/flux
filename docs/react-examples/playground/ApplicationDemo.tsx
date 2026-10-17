import {type ComponentProps, useState} from 'react';
import {
    FluxAction,
    FluxAdaptiveSlot,
    FluxApplication,
    FluxApplicationContent,
    FluxApplicationHero,
    FluxApplicationMenu,
    FluxApplicationMenuAccount,
    FluxApplicationMenuContext,
    FluxApplicationMenuPromo,
    FluxApplicationSection,
    FluxApplicationTop,
    FluxAvatar,
    FluxBadge,
    FluxButtonStack,
    FluxDivider,
    FluxFlex,
    FluxFlyout,
    FluxFormInput,
    FluxMenu,
    FluxMenuGroup,
    FluxMenuItem,
    FluxMenuSubHeader,
    FluxPane,
    FluxPaneBody,
    FluxPaneHeader,
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
    FluxTooltip,
    type FluxColor,
    type FluxIconName
} from '@flux-ui/react';
import {clsx} from 'clsx';
import $style from './ApplicationDemo-0.module.scss';
export default function Example() {
    type NavigationItem = {
        readonly icon: FluxIconName;
        readonly id: string;
        readonly label: string;
    };
    const primaryNavigation: NavigationItem[] = [{icon: 'grid-2', id: 'dashboard', label: 'Dashboard'}];
    const workspaceNavigation: NavigationItem[] = [
        {icon: 'users', id: 'clients', label: 'Clients'},
        {icon: 'receipt', id: 'invoices', label: 'Invoices'},
        {icon: 'chart-line', id: 'reports', label: 'Reports'}
    ];
    const automationNavigation: NavigationItem[] = [
        {icon: 'bolt', id: 'automations', label: 'Automations'},
        {icon: 'puzzle-piece', id: 'integrations', label: 'Integrations'}
    ];
    const footerNavigation: NavigationItem[] = [
        {icon: 'user-key', id: 'admin', label: 'Administration'},
        {icon: 'gear', id: 'settings', label: 'Settings'}
    ];
    const workspaces: NavigationItem[] = [
        {icon: 'cubes', id: 'northwind', label: 'Northwind'},
        {icon: 'store', id: 'riverside', label: 'Riverside Supply'},
        {icon: 'building', id: 'atlas', label: 'Atlas Group'}
    ];
    const metrics = [
        {
            color: 'success',
            icon: 'arrow-trend-up',
            label: 'Revenue',
            trend: '+12.4%',
            value: '€ 48,290'
        },
        {
            color: 'success',
            icon: 'arrow-trend-up',
            label: 'Active clients',
            trend: '+3.1%',
            value: '1,284'
        },
        {
            color: 'warning',
            icon: 'arrow-trend-down',
            label: 'Open invoices',
            trend: '-8.0%',
            value: '37'
        },
        {
            color: 'gray',
            icon: 'stopwatch',
            label: 'Average payment term',
            trend: 'Unchanged',
            value: '18 days'
        }
    ] satisfies readonly {
        readonly color: FluxColor;
        readonly icon: FluxIconName;
        readonly label: string;
        readonly trend: string;
        readonly value: string;
    }[];
    const invoices = [
        {
            amount: '€ 4,280.00',
            client: 'Riverside Supply',
            color: 'success',
            issued: '12 Mar 2026',
            number: 'INV-2026-0148',
            status: 'Paid'
        },
        {
            amount: '€ 1,190.50',
            client: 'Atlas Group',
            color: 'info',
            issued: '11 Mar 2026',
            number: 'INV-2026-0147',
            status: 'Sent'
        },
        {
            amount: '€ 12,400.00',
            client: 'Halcyon Studio',
            color: 'warning',
            issued: '09 Mar 2026',
            number: 'INV-2026-0146',
            status: 'Overdue'
        },
        {
            amount: '€ 860.00',
            client: 'Meridian Labs',
            color: 'success',
            issued: '07 Mar 2026',
            number: 'INV-2026-0145',
            status: 'Paid'
        },
        {
            amount: '€ 3,015.75',
            client: 'Northgate Rail',
            color: 'gray',
            issued: '05 Mar 2026',
            number: 'INV-2026-0144',
            status: 'Draft'
        },
        {
            amount: '€ 640.00',
            client: 'Ivy & Stone',
            color: 'danger',
            issued: '02 Mar 2026',
            number: 'INV-2026-0143',
            status: 'Disputed'
        }
    ] satisfies readonly {
        readonly amount: string;
        readonly client: string;
        readonly color: FluxColor;
        readonly issued: string;
        readonly number: string;
        readonly status: string;
    }[];
    const tabs = ['Overview', 'Activity', 'Automations'];
    const navigation = [
        ...primaryNavigation,
        ...workspaceNavigation,
        ...automationNavigation,
        ...footerNavigation
    ];
    const [activePage, setActivePage] = useState('dashboard');
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [activeWorkspace, setActiveWorkspace] = useState('northwind');
    const [search, setSearch] =
        useState<Exclude<ComponentProps<typeof FluxFormInput>['value'], undefined>>('');
    const activeNavigationItem = (() =>
        navigation.find((item) => item.id === activePage) ?? primaryNavigation[0])();
    return (
        <>
            
                <div className={clsx($style.demoFrame)} data-prose-full>
                    <div className={clsx($style.scroller)}>
                        <FluxApplication
                            showDesktopMenuToggle
                            menu={
                                <>
                                    <FluxApplicationMenu
                                        header={
                                            <>
                                                <FluxMenuGroup isHorizontal>
                                                    <FluxApplicationMenuAccount
                                                        icon={'cubes'}
                                                        label={'Northwind'}
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
                                                                                    activeWorkspace
                                                                                }
                                                                                label={workspace.label}
                                                                                onClick={() => {
                                                                                    setActiveWorkspace(
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
                                                    <strong>{'Trial ends in 12 days'}</strong>
                                                    <p>
                                                        {
                                                            'Pick a plan to keep automations running after the trial.'
                                                        }
                                                    </p>
                                                    <a href={'#'}>{'Compare plans'}</a>
                                                </FluxApplicationMenuPromo>
                                                <FluxMenuGroup>
                                                    <FluxMenuItem
                                                        iconLeading={'user-key'}
                                                        isActive={activePage === 'admin'}
                                                        label={'Administration'}
                                                        onClick={() => {
                                                            setActivePage('admin');
                                                        }}
                                                    ></FluxMenuItem>
                                                    <FluxMenuItem
                                                        iconLeading={'gear'}
                                                        isActive={activePage === 'settings'}
                                                        label={'Settings'}
                                                        onClick={() => {
                                                            setActivePage('settings');
                                                        }}
                                                    ></FluxMenuItem>
                                                </FluxMenuGroup>
                                            </>
                                        }
                                    >
                                        {activePage === 'clients' ? (
                                            <FluxApplicationMenuContext
                                                subtitle={'Client'}
                                                title={'Riverside Supply — Rotterdam office'}
                                                onClick={() => {
                                                    setActivePage('dashboard');
                                                }}
                                            ></FluxApplicationMenuContext>
                                        ) : null}
                                        <FluxMenuGroup>
                                            {primaryNavigation.map((item) => (
                                                <FluxMenuItem
                                                    key={item.id}
                                                    iconLeading={item.icon}
                                                    isActive={item.id === activePage}
                                                    label={item.label}
                                                    onClick={() => {
                                                        setActivePage(item.id);
                                                    }}
                                                ></FluxMenuItem>
                                            ))}
                                        </FluxMenuGroup>
                                        <FluxDivider></FluxDivider>
                                        <FluxMenuGroup>
                                            <FluxMenuSubHeader label={'Workspace'}></FluxMenuSubHeader>
                                            {workspaceNavigation.map((item) => (
                                                <FluxMenuItem
                                                    key={item.id}
                                                    iconLeading={item.icon}
                                                    isActive={item.id === activePage}
                                                    label={item.label}
                                                    onClick={() => {
                                                        setActivePage(item.id);
                                                    }}
                                                ></FluxMenuItem>
                                            ))}
                                        </FluxMenuGroup>
                                        <FluxDivider></FluxDivider>
                                        <FluxMenuGroup>
                                            <FluxMenuSubHeader label={'Automation'}></FluxMenuSubHeader>
                                            {automationNavigation.map((item) => (
                                                <FluxMenuItem
                                                    key={item.id}
                                                    iconLeading={item.icon}
                                                    isActive={item.id === activePage}
                                                    label={item.label}
                                                    onClick={() => {
                                                        setActivePage(item.id);
                                                    }}
                                                ></FluxMenuItem>
                                            ))}
                                            <FluxMenuItem
                                                disabled
                                                iconLeading={'robot'}
                                                label={'Agents'}
                                            ></FluxMenuItem>
                                        </FluxMenuGroup>
                                    </FluxApplicationMenu>
                                </>
                            }
                        >
                            <FluxApplicationTop
                                icon={activeNavigationItem.icon}
                                title={activeNavigationItem.label}
                                end={
                                    <>
                                        <FluxAdaptiveSlot
                                            fallback={
                                                <>
                                                    <FluxSecondaryLinkButton
                                                        iconLeading={'magnifying-glass'}
                                                    ></FluxSecondaryLinkButton>
                                                </>
                                            }
                                        >
                                            <FluxFormInput
                                                value={search}
                                                onValueChange={(next) => setSearch(next ?? '')}
                                                className={clsx($style.demoSearch)}
                                                iconLeading={'magnifying-glass'}
                                                placeholder={'Search invoices, clients...'}
                                                type={'search'}
                                            ></FluxFormInput>
                                        </FluxAdaptiveSlot>
                                        <FluxButtonStack gap={0}>
                                            <FluxTooltip content={'Notifications'}>
                                                <FluxSecondaryLinkButton
                                                    iconLeading={'bell'}
                                                ></FluxSecondaryLinkButton>
                                            </FluxTooltip>
                                            <FluxTooltip content={'Support'}>
                                                <FluxSecondaryLinkButton
                                                    iconLeading={'circle-question'}
                                                ></FluxSecondaryLinkButton>
                                            </FluxTooltip>
                                        </FluxButtonStack>
                                        <FluxSeparator direction={'vertical'}></FluxSeparator>
                                        <FluxFlyout
                                            isAutoWidth
                                            opener={({open}) => (
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
                                        {tabs.map((tab) => (
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
                                <FluxApplicationHero
                                    subtitle={
                                        'A summary of everything that moved in this workspace over the last 30 days.'
                                    }
                                    title={'Good afternoon, Ada'}
                                    end={
                                        <>
                                            <FluxPrimaryButton
                                                iconLeading={'plus'}
                                                label={'New invoice'}
                                            ></FluxPrimaryButton>
                                        </>
                                    }
                                ></FluxApplicationHero>
                                <FluxApplicationSection
                                    info={'Compared to the previous 30 days'}
                                    title={'Key figures'}
                                >
                                    <div className={clsx($style.demoMetrics)}>
                                        {metrics.map((metric) => (
                                            <FluxPane key={metric.label}>
                                                <FluxPaneBody>
                                                    <div className={clsx($style.demoMetric)}>
                                                        <span className={clsx($style.demoMetricLabel)}>
                                                            {metric.label}
                                                        </span>
                                                        <strong className={clsx($style.demoMetricValue)}>
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
                                    title={'Latest invoices'}
                                    end={
                                        <>
                                            <FluxSecondaryButton
                                                iconTrailing={'angle-right'}
                                                label={'View all'}
                                            ></FluxSecondaryButton>
                                        </>
                                    }
                                >
                                    <FluxPane>
                                        <FluxPaneHeader
                                            icon={'receipt'}
                                            subtitle={'Everything issued in the last two weeks'}
                                            title={'Invoices'}
                                        ></FluxPaneHeader>
                                        <FluxTable
                                            isHoverable
                                            header={
                                                <>
                                                    <FluxTableBar>
                                                        <FluxFlex align={'center'} gap={9}>
                                                            <span>
                                                                {invoices.length}
                                                                {' invoices'}
                                                            </span>
                                                            <FluxSpacer></FluxSpacer>
                                                            <FluxTableActions>
                                                                <FluxAction icon={'filter'}></FluxAction>
                                                                <FluxAction
                                                                    icon={'arrow-down-to-line'}
                                                                ></FluxAction>
                                                            </FluxTableActions>
                                                        </FluxFlex>
                                                    </FluxTableBar>
                                                    <FluxTableRow>
                                                        <FluxTableHeader minWidth={150}>
                                                            {'Number'}
                                                        </FluxTableHeader>
                                                        <FluxTableHeader minWidth={210}>
                                                            {'Client'}
                                                        </FluxTableHeader>
                                                        <FluxTableHeader minWidth={150}>
                                                            {'Status'}
                                                        </FluxTableHeader>
                                                        <FluxTableHeader minWidth={150}>
                                                            {'Issued'}
                                                        </FluxTableHeader>
                                                        <FluxTableHeader
                                                            align={'end'}
                                                            isNumeric
                                                            minWidth={135}
                                                        >
                                                            {' Amount '}
                                                        </FluxTableHeader>
                                                    </FluxTableRow>
                                                </>
                                            }
                                        >
                                            {invoices.map((invoice) => (
                                                <FluxTableRow key={invoice.number} isClickable>
                                                    <FluxTableCell>
                                                        <strong>{invoice.number}</strong>
                                                    </FluxTableCell>
                                                    <FluxTableCell>{invoice.client}</FluxTableCell>
                                                    <FluxTableCell>
                                                        <FluxBadge
                                                            color={invoice.color}
                                                            dot
                                                            label={invoice.status}
                                                        ></FluxBadge>
                                                    </FluxTableCell>
                                                    <FluxTableCell>{invoice.issued}</FluxTableCell>
                                                    <FluxTableCell>{invoice.amount}</FluxTableCell>
                                                </FluxTableRow>
                                            ))}
                                        </FluxTable>
                                    </FluxPane>
                                </FluxApplicationSection>
                            </FluxApplicationContent>
                        </FluxApplication>
                    </div>
                </div>
            
        </>
    );
}
