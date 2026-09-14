import {clsx} from 'clsx';
import {createContext, useContext, useId, useState} from 'react';
import type {HTMLAttributes, ReactNode} from 'react';
import type {FluxIconName, FluxStyle} from '../types';
import {FluxIcon} from './Icon';
import expandableStyles from '../../../components/src/css/component/Expandable.module.scss';
import readMoreStyles from '../../../components/src/css/component/ReadMore.module.scss';

interface ExpandableGroupValue {active?: string; select(id: string): void;}
const ExpandableGroupContext = createContext<ExpandableGroupValue | undefined>(undefined);

export function FluxExpandableGroup({children, className, defaultOpenId, ...props}: HTMLAttributes<HTMLDivElement> & {defaultOpenId?: string}) {
    const [active, setActive] = useState(defaultOpenId);
    return <ExpandableGroupContext.Provider value={{active, select: setActive}}><div {...props} className={clsx(expandableStyles.expandableGroup, className)}>{children}</div></ExpandableGroupContext.Provider>;
}

export interface FluxExpandableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onToggle'> {
    body?: ReactNode;
    defaultOpened?: boolean;
    expandableId?: string;
    header?: (state: {isOpen: boolean; toggle(): void}) => ReactNode;
    icon?: FluxIconName;
    isOpened?: boolean;
    label?: ReactNode;
    onToggle?: (open: boolean) => void;
}

export function FluxExpandable({body, children, className, defaultOpened, expandableId, header, icon, isOpened, label, onToggle, ...props}: FluxExpandableProps) {
    const generated = useId();
    const id = expandableId ?? generated;
    const group = useContext(ExpandableGroupContext);
    const [localOpen, setLocalOpen] = useState(Boolean(defaultOpened));
    const open = isOpened ?? (group ? group.active === id : localOpen);
    const contentId = `${id}-content`;
    const headerId = `${id}-header`;
    const toggle = () => { const next = !open; if (group) group.select(next ? id : ''); else setLocalOpen(next); onToggle?.(next); };
    return <div {...props} className={clsx(open ? expandableStyles.expandableOpened : expandableStyles.expandable, className)}>
        {header ? header({isOpen: open, toggle}) : <button className={expandableStyles.expandableHeader} id={headerId} type="button" aria-controls={contentId} aria-expanded={open} onClick={toggle}>{icon && <FluxIcon name={icon} />}<span>{label}</span><FluxIcon name={open ? 'minus' : 'plus'} size={16} /></button>}
        {open && <div className={expandableStyles.expandableBody} id={contentId} role="region" aria-labelledby={headerId}><div className={expandableStyles.expandableContent}>{body ?? children}</div></div>}
    </div>;
}

export function FluxReadMore({children, className, isExpanded, labelLess = 'Read less', labelMore = 'Read more', lines = 3, onExpandedChange, ...props}: HTMLAttributes<HTMLDivElement> & {isExpanded: boolean; labelLess?: string; labelMore?: string; lines?: number; onExpandedChange: (expanded: boolean) => void}) {
    const id = useId();
    return <div {...props} className={clsx(readMoreStyles.readMore, !isExpanded && readMoreStyles.isFaded, className)}><div id={id} className={clsx(readMoreStyles.readMoreContent, !isExpanded && readMoreStyles.isClamped)} style={{'--lines': lines} as FluxStyle}>{children}</div><button className={readMoreStyles.readMoreToggle} type="button" aria-controls={id} aria-expanded={isExpanded} onClick={() => onExpandedChange(!isExpanded)}>{isExpanded ? labelLess : labelMore}</button></div>;
}
