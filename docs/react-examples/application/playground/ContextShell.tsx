import { useState } from 'react';
import {
    FluxApplication,
    FluxApplicationContent,
    FluxApplicationMenu,
    FluxApplicationMenuAccount,
    FluxApplicationMenuContextStack,
    FluxApplicationMenuContextSwitcher,
    FluxApplicationMenuToggle,
    FluxApplicationPageHeader,
    FluxApplicationSection,
    FluxApplicationTop,
    FluxBadge,
    FluxDescriptionItem,
    FluxDescriptionList,
    FluxMenuGroup,
    FluxMenuItem,
    FluxPane,
    FluxPaneBody,
    FluxTable,
    FluxTableCell,
    FluxTableHeader,
    FluxTableRow,
    type FluxColor,
    type FluxIconName
} from '@flux-ui/react';
import LaneMenu from './context/LaneMenu';
import RatesMenu from './context/RatesMenu';
export default function Example() {
    const PAGES = {
        overview: {
            description: 'Every lane Harbor Freight books capacity on.',
            icon: 'gauge',
            title: 'Overview'
        },
        lane: {
            description: 'A single lane, with its own menu level in the rail.',
            icon: 'truck',
            title: 'Lane RTM-HAM'
        },
        'lane.rates': {
            description: 'The rate cards of this lane, one level deeper again.',
            icon: 'money-bill',
            title: 'Rates'
        }
    } as const satisfies Record<
        string,
        {
            readonly description: string;
            readonly icon: FluxIconName;
            readonly title: string;
        }
    >;
    const lanes = [
        {
            code: 'RTM-HAM',
            color: 'success',
            departures: '14 per week',
            route: 'Rotterdam to Hamburg',
            status: 'On schedule'
        },
        {
            code: 'RTM-ANR',
            color: 'success',
            departures: '21 per week',
            route: 'Rotterdam to Antwerp',
            status: 'On schedule'
        },
        {
            code: 'RTM-LIL',
            color: 'warning',
            departures: '6 per week',
            route: 'Rotterdam to Lille',
            status: 'Capacity tight'
        }
    ] satisfies readonly {
        readonly code: string;
        readonly color: FluxColor;
        readonly departures: string;
        readonly route: string;
        readonly status: string;
    }[];
    const rates = [
        { price: '€ 84.20', service: 'Pallet freight', transit: '1 day' },
        { price: '€ 1,240.00', service: 'Full truck load', transit: '1 day' },
        { price: '€ 312.50', service: 'Part load', transit: '2 days' },
        { price: '€ 1,980.00', service: 'Express, same day', transit: '12 hours' }
    ];
    const [routeName, setRouteName] = useState('lane.rates');
    const paths: Record<string, string> = {
        overview: '/',
        lane: '/lanes/rtm-ham',
        'lane.rates': '/lanes/rtm-ham/rates'
    };
    const route = {
        fullPath: paths[routeName],
        matched: [
            { path: '/' },
            ...(routeName.startsWith('lane')
                ? [{ path: paths.lane, components: { menu: LaneMenu } }]
                : []),
            ...(routeName === 'lane.rates'
                ? [{ path: paths['lane.rates'], components: { menu: RatesMenu } }]
                : [])
        ]
    };
    const router = {
        back() {
            setRouteName((current) => (current === 'lane.rates' ? 'lane' : 'overview'));
        },
        navigate(to: unknown) {
            setRouteName(Object.keys(paths).find((key) => paths[key] === to) ?? 'overview');
        },
        push(to: { name: string }) {
            setRouteName(to.name);
        }
    };
    const page = (() => PAGES[routeName as keyof typeof PAGES] ?? PAGES.overview)();
    return (
        <>
            <FluxApplication
                showDesktopMenuToggle
                route={route}
                router={router}
                menu={
                    <>
                        <FluxApplicationMenu
                            header={
                                <>
                                    <FluxMenuGroup isHorizontal>
                                        <FluxApplicationMenuAccount
                                            icon={'cubes'}
                                            label={'Harbor Freight'}
                                        ></FluxApplicationMenuAccount>
                                        <FluxApplicationMenuToggle></FluxApplicationMenuToggle>
                                    </FluxMenuGroup>
                                    <FluxApplicationMenuContextSwitcher></FluxApplicationMenuContextSwitcher>
                                </>
                            }
                            context={
                                <>
                                    <FluxApplicationMenuContextStack></FluxApplicationMenuContextStack>
                                </>
                            }
                        >
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    iconLeading={'gauge'}
                                    isActive={routeName === 'overview'}
                                    label={'Overview'}
                                    onClick={() => {
                                        router.push({ name: 'overview' });
                                    }}
                                ></FluxMenuItem>
                                <FluxMenuItem
                                    iconLeading={'truck'}
                                    isActive={routeName.startsWith('lane')}
                                    label={'Lane RTM-HAM'}
                                    onClick={() => {
                                        router.push({ name: 'lane' });
                                    }}
                                ></FluxMenuItem>
                                <FluxMenuItem
                                    iconLeading={'building'}
                                    label={'Carriers'}
                                ></FluxMenuItem>
                                <FluxMenuItem
                                    iconLeading={'chart-line'}
                                    label={'Reports'}
                                ></FluxMenuItem>
                            </FluxMenuGroup>
                        </FluxApplicationMenu>
                    </>
                }
            >
                <FluxApplicationTop icon={page.icon} title={page.title}></FluxApplicationTop>
                <FluxApplicationContent layout={'default'}>
                    <FluxApplicationPageHeader
                        description={page.description}
                        title={page.title}
                    ></FluxApplicationPageHeader>
                    {routeName === 'overview' ? (
                        <FluxApplicationSection
                            info={'Three lanes, one of which has a context menu in this playground'}
                            title={'Freight lanes'}
                        >
                            <FluxPane>
                                <FluxTable
                                    isHoverable
                                    header={
                                        <>
                                            <FluxTableRow>
                                                <FluxTableHeader minWidth={165}>
                                                    {'Lane'}
                                                </FluxTableHeader>
                                                <FluxTableHeader minWidth={210}>
                                                    {'Route'}
                                                </FluxTableHeader>
                                                <FluxTableHeader minWidth={150}>
                                                    {'Departures'}
                                                </FluxTableHeader>
                                                <FluxTableHeader minWidth={150}>
                                                    {'Status'}
                                                </FluxTableHeader>
                                            </FluxTableRow>
                                        </>
                                    }
                                >
                                    {lanes.map((lane) => (
                                        <FluxTableRow
                                            key={lane.code}
                                            isClickable
                                            onRowClick={() => {
                                                lane.code === 'RTM-HAM' &&
                                                    router.push({ name: 'lane' });
                                            }}
                                        >
                                            <FluxTableCell>
                                                <strong>{lane.code}</strong>
                                            </FluxTableCell>
                                            <FluxTableCell>{lane.route}</FluxTableCell>
                                            <FluxTableCell>{lane.departures}</FluxTableCell>
                                            <FluxTableCell>
                                                <FluxBadge
                                                    color={lane.color}
                                                    dot
                                                    label={lane.status}
                                                ></FluxBadge>
                                            </FluxTableCell>
                                        </FluxTableRow>
                                    ))}
                                </FluxTable>
                            </FluxPane>
                        </FluxApplicationSection>
                    ) : routeName === 'lane' ? (
                        <FluxApplicationSection info={'Rolling four weeks'} title={'Performance'}>
                            <FluxPane>
                                <FluxPaneBody>
                                    <FluxDescriptionList>
                                        <FluxDescriptionItem
                                            icon={'truck'}
                                            label={'Departures per week'}
                                        >
                                            {' 14 '}
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            icon={'stopwatch'}
                                            label={'Average transit'}
                                        >
                                            {' 11h 40m '}
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            icon={'circle-check'}
                                            label={'On time'}
                                        >
                                            <FluxBadge
                                                color={'success'}
                                                label={'97.1%'}
                                            ></FluxBadge>
                                        </FluxDescriptionItem>
                                        <FluxDescriptionItem
                                            icon={'money-bill'}
                                            label={'Cost per pallet'}
                                        >
                                            {' € 84.20 '}
                                        </FluxDescriptionItem>
                                    </FluxDescriptionList>
                                </FluxPaneBody>
                            </FluxPane>
                        </FluxApplicationSection>
                    ) : (
                        <FluxApplicationSection
                            info={'Valid until 31 December 2026'}
                            title={'Rate cards'}
                        >
                            <FluxPane>
                                <FluxTable
                                    header={
                                        <>
                                            <FluxTableRow>
                                                <FluxTableHeader minWidth={210}>
                                                    {'Service'}
                                                </FluxTableHeader>
                                                <FluxTableHeader minWidth={150}>
                                                    {'Transit'}
                                                </FluxTableHeader>
                                                <FluxTableHeader
                                                    align={'end'}
                                                    isNumeric
                                                    minWidth={135}
                                                >
                                                    {' Rate '}
                                                </FluxTableHeader>
                                            </FluxTableRow>
                                        </>
                                    }
                                >
                                    {rates.map((rate) => (
                                        <FluxTableRow key={rate.service}>
                                            <FluxTableCell>{rate.service}</FluxTableCell>
                                            <FluxTableCell>{rate.transit}</FluxTableCell>
                                            <FluxTableCell>{rate.price}</FluxTableCell>
                                        </FluxTableRow>
                                    ))}
                                </FluxTable>
                            </FluxPane>
                        </FluxApplicationSection>
                    )}
                </FluxApplicationContent>
            </FluxApplication>
        </>
    );
}
