import { Fragment, useState } from 'react';
import {
    FluxBadge,
    FluxBoxedIcon,
    FluxItem,
    FluxItemActions,
    FluxItemContent,
    FluxItemMedia,
    FluxPane,
    FluxSeparator,
    FluxSwipeAction,
    FluxSwipeActions,
    type FluxColor,
    type FluxIconName
} from '@flux-ui/react';
export default function Example() {
    const notifications: {
        title: string;
        time: string;
        icon: FluxIconName;
        color: FluxColor;
    }[] = [
        {
            title: 'Jane Doe started following you',
            time: '2 minutes ago',
            icon: 'user-plus',
            color: 'info'
        },
        { title: 'John Doe liked your post', time: '1 hour ago', icon: 'heart', color: 'danger' },
        {
            title: 'New comment on Release notes',
            time: '3 hours ago',
            icon: 'message',
            color: 'primary'
        }
    ];
    const [muted, setMuted] = useState<string[]>([]);
    function mute(title: string): void {
        if (muted.includes(title)) {
            return;
        }
        setMuted([...muted, title]);
    }
    return (
        <>
            <FluxPane style={{ width: 'min(100%, 480px)' }}>
                {notifications.map((notification, index) => (
                    <Fragment key={notification.title}>
                        {index > 0 ? <FluxSeparator></FluxSeparator> : null}
                        <FluxSwipeActions
                            end={
                                <>
                                    <FluxSwipeAction
                                        isPrimary
                                        icon={'bell'}
                                        label={'Mute'}
                                        onClick={() => {
                                            mute(notification.title);
                                        }}
                                    ></FluxSwipeAction>
                                </>
                            }
                        >
                            <FluxItem style={{ padding: '18px' }}>
                                <FluxItemMedia isCenter size={40}>
                                    <FluxBoxedIcon
                                        color={notification.color}
                                        name={notification.icon}
                                        size={40}
                                    ></FluxBoxedIcon>
                                </FluxItemMedia>
                                <FluxItemContent isCenter>
                                    <strong>{notification.title}</strong>
                                    <span style={{ fontSize: '.875rem', opacity: '.6' }}>
                                        {notification.time}
                                    </span>
                                </FluxItemContent>
                                {muted.includes(notification.title) ? (
                                    <FluxItemActions isCenter>
                                        <FluxBadge icon={'bell'} label={'Muted'}></FluxBadge>
                                    </FluxItemActions>
                                ) : null}
                            </FluxItem>
                        </FluxSwipeActions>
                    </Fragment>
                ))}
            </FluxPane>
        </>
    );
}
