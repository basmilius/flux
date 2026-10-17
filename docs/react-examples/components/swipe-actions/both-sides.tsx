import { Fragment, type CSSProperties, useState } from 'react';
import {
    FluxBadge,
    FluxItem,
    FluxItemActions,
    FluxItemContent,
    FluxPane,
    FluxSeparator,
    FluxSwipeAction,
    FluxSwipeActions
} from '@flux-ui/react';
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
    const [tasks, setTasks] = useState([
        { title: 'Review the release notes', due: 'Today', isCompleted: false, isStarred: false },
        { title: 'Update the design tokens', due: 'Tomorrow', isCompleted: false, isStarred: true },
        { title: 'Archive last quarter', due: 'Next week', isCompleted: false, isStarred: false }
    ]);
    return (
        <>
            <FluxPane style={{ width: 'min(100%, 480px)' }}>
                {tasks.map((task, index) => (
                    <Fragment key={task.title}>
                        {index > 0 ? <FluxSeparator></FluxSeparator> : null}
                        <FluxSwipeActions
                            start={
                                <>
                                    <FluxSwipeAction
                                        isPrimary
                                        color={'success'}
                                        icon={'check'}
                                        label={'Complete'}
                                        onClick={() => {
                                            setTasks(
                                                tasks.map((item) =>
                                                    item === task
                                                        ? {
                                                              ...item,
                                                              isCompleted: !item.isCompleted
                                                          }
                                                        : item
                                                )
                                            );
                                        }}
                                    ></FluxSwipeAction>
                                </>
                            }
                            end={
                                <>
                                    <FluxSwipeAction
                                        color={'warning'}
                                        icon={'star'}
                                        label={'Star'}
                                        onClick={() => {
                                            setTasks(
                                                tasks.map((item) =>
                                                    item === task
                                                        ? { ...item, isStarred: !item.isStarred }
                                                        : item
                                                )
                                            );
                                        }}
                                    ></FluxSwipeAction>
                                    <FluxSwipeAction
                                        isPrimary
                                        color={'danger'}
                                        icon={'trash'}
                                        label={'Delete'}
                                        onClick={() => {
                                            setTasks(
                                                tasks.filter((_, itemIndex) => itemIndex !== index)
                                            );
                                        }}
                                    ></FluxSwipeAction>
                                </>
                            }
                        >
                            <FluxItem style={{ padding: '18px' }}>
                                <FluxItemContent isCenter>
                                    <strong
                                        style={parseStyle(
                                            task.isCompleted
                                                ? 'text-decoration: line-through; opacity: .6'
                                                : undefined
                                        )}
                                    >
                                        {task.title}
                                    </strong>
                                    <span style={{ fontSize: '.875rem', opacity: '.6' }}>
                                        {task.due}
                                    </span>
                                </FluxItemContent>
                                {task.isStarred ? (
                                    <FluxItemActions isCenter>
                                        <FluxBadge
                                            color={'warning'}
                                            colored
                                            icon={'star'}
                                            label={'Starred'}
                                        ></FluxBadge>
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
