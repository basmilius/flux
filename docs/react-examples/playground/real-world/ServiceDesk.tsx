import { useState } from 'react';
import {
    FluxBadge,
    FluxIcon,
    FluxItem,
    FluxItemActions,
    FluxItemContent,
    FluxItemMedia,
    FluxItemStack,
    FluxPane,
    FluxPaneBody,
    FluxPaneHeader,
    FluxSpeedDial,
    FluxSpeedDialAction,
    FluxText,
    showSnackbar,
    type FluxColor,
    type FluxIconName
} from '@flux-ui/react';
import { useRef } from 'react';
import { clsx } from 'clsx';
import $style from './ServiceDesk-0.module.scss';
export default function Example() {
    type RequestKind = 'request' | 'incident' | 'visit';
    type WorkRequest = {
        readonly id: number;
        readonly reference: string;
        readonly title: string;
        readonly location: string;
        readonly kind: string;
        readonly icon: FluxIconName;
        readonly color: FluxColor;
    };
    const REQUEST_TYPES: Record<
        RequestKind,
        Pick<WorkRequest, 'title' | 'kind' | 'icon' | 'color'>
    > = {
        request: {
            title: 'Replace the reception door closer',
            kind: 'Request',
            icon: 'screwdriver-wrench',
            color: 'info'
        },
        incident: {
            title: 'Water leak in the loading bay',
            kind: 'Incident',
            icon: 'triangle-exclamation',
            color: 'danger'
        },
        visit: {
            title: 'Inspect emergency lighting',
            kind: 'Site visit',
            icon: 'calendar',
            color: 'gray'
        }
    };
    const [requests, setRequests] = useState<WorkRequest[]>([
        {
            id: 2481,
            reference: 'WO-2481',
            title: 'Replace lighting in the north hall',
            location: 'North hall',
            kind: 'Request',
            icon: 'screwdriver-wrench',
            color: 'info'
        },
        {
            id: 2482,
            reference: 'WO-2482',
            title: 'Loading gate does not close',
            location: 'Gate 4',
            kind: 'Incident',
            icon: 'triangle-exclamation',
            color: 'danger'
        },
        {
            id: 2483,
            reference: 'WO-2483',
            title: 'Quarterly safety inspection',
            location: 'Warehouse',
            kind: 'Site visit',
            icon: 'calendar',
            color: 'gray'
        }
    ]);
    const nextId = useRef(2484);
    function addRequest(kind: RequestKind): void {
        const id = nextId.current++;
        const request = {
            ...REQUEST_TYPES[kind],
            id,
            reference: `WO-${id}`,
            location: 'North depot'
        };
        setRequests([request, ...requests]);
        showSnackbar({
            color: 'success',
            icon: 'circle-check',
            message: `${request.reference} added to the queue.`
        });
    }
    return (
        <>
            <div className="react-example-1v4fr7vixzdvt" style={{ width: '100%' }}>
                <FluxPane>
                    <FluxPaneHeader
                        icon={'clipboard'}
                        subtitle={'North depot · Facilities team'}
                        title={'Incoming work'}
                        after={
                            <>
                                <FluxBadge label={`${requests.length} open`}></FluxBadge>
                            </>
                        }
                    ></FluxPaneHeader>
                    <FluxPaneBody className={clsx($style.serviceDeskFrame)}>
                        <FluxItemStack aria-live={'polite'}>
                            {requests.map((request) => (
                                <FluxItem key={request.id}>
                                    <FluxItemMedia isCenter>
                                        <FluxIcon name={request.icon} size={18}></FluxIcon>
                                    </FluxItemMedia>
                                    <FluxItemContent>
                                        <FluxText weight={600}>{request.title}</FluxText>
                                        <FluxText color={'muted'} size={'small'}>
                                            {request.reference}
                                            {' · '}
                                            {request.location}
                                        </FluxText>
                                    </FluxItemContent>
                                    <FluxItemActions>
                                        <FluxBadge
                                            color={request.color}
                                            label={request.kind}
                                        ></FluxBadge>
                                    </FluxItemActions>
                                </FluxItem>
                            ))}
                        </FluxItemStack>
                        <FluxSpeedDial label={'Create work'}>
                            <FluxSpeedDialAction
                                icon={'file-plus'}
                                label={'New request'}
                                onClick={() => {
                                    addRequest('request');
                                }}
                            ></FluxSpeedDialAction>
                            <FluxSpeedDialAction
                                icon={'triangle-exclamation'}
                                label={'Report incident'}
                                onClick={() => {
                                    addRequest('incident');
                                }}
                            ></FluxSpeedDialAction>
                            <FluxSpeedDialAction
                                icon={'calendar'}
                                label={'Plan site visit'}
                                onClick={() => {
                                    addRequest('visit');
                                }}
                            ></FluxSpeedDialAction>
                        </FluxSpeedDial>
                    </FluxPaneBody>
                </FluxPane>
            </div>
        </>
    );
}
