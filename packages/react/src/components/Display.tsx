import {clsx} from 'clsx';
import {Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState} from 'react';
import type {HTMLAttributes, ReactElement, ReactNode} from 'react';
import type {FluxColor, FluxIconName, FluxPressableType, FluxSize, FluxStyle, FluxTo} from '../types';
import {FluxPressable} from './Actions';
import {FluxSpinner} from './Feedback';
import {FluxIcon} from './Icon';
import paneStyles from '../../../components/src/css/component/Pane.module.scss';
import badgeStyles from '../../../components/src/css/component/Badge.module.scss';
import avatarStyles from '../../../components/src/css/component/Avatar.module.scss';
import avatarGroupStyles from '../../../components/src/css/component/AvatarGroup.module.scss';
import noticeStyles from '../../../components/src/css/component/Notice.module.scss';
import infoStyles from '../../../components/src/css/component/Info.module.scss';
import placeholderStyles from '../../../components/src/css/component/Placeholder.module.scss';

export interface FluxPaneProps extends HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean;
    loader?: ReactNode;
    tag?: string;
    variant?: 'default' | 'flat' | 'well';
}

export function FluxPane({children, className, isLoading, loader, style, tag, variant = 'default', ...props}: FluxPaneProps) {
    const paneRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState<number>();

    useEffect(() => {
        const pane = paneRef.current;
        const header = pane?.querySelector<HTMLElement>('[data-flux-pane-header]');
        if (!header) {
            setHeaderHeight(undefined);
            return;
        }

        const update = () => setHeaderHeight(header.offsetHeight);
        update();
        if (typeof ResizeObserver === 'undefined') return;
        const observer = new ResizeObserver(update);
        observer.observe(header);
        return () => observer.disconnect();
    }, [children]);

    return (
        <div
            {...props}
            ref={paneRef}
            className={clsx(paneStyles[`pane${capitalize(variant)}`], className)}
            style={{...style, '--flux-pane-header-height': headerHeight ? `${headerHeight}px` : undefined} as FluxStyle}
        >
            {children}
            {isLoading && (loader ?? <div className={paneStyles.paneLoader}><FluxSpinner /></div>)}
            {tag && <div className={paneStyles.paneTag}>{tag}</div>}
        </div>
    );
}

export interface FluxPaneHeaderProps extends HTMLAttributes<HTMLDivElement> {
    after?: ReactNode;
    before?: ReactNode;
    icon?: FluxIconName;
    subtitle?: string;
    title?: string;
}

export function FluxPaneHeader({after, before, children, className, icon, subtitle, title, ...props}: FluxPaneHeaderProps) {
    return <div {...props} className={clsx(paneStyles.paneHeader, className)} data-flux-pane-header="">
        {before}
        {icon && <FluxIcon className={paneStyles.paneHeaderIcon} size={20} name={icon} />}
        {(title || subtitle) && <div className={paneStyles.paneHeaderCaption}>{title && <strong>{title}</strong>}{subtitle && <span>{subtitle}</span>}</div>}
        {children}
        {after}
    </div>;
}

export function FluxPaneBody({className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(paneStyles.paneBody, className)} />;
}

export function FluxPaneFooter({className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(paneStyles.paneFooter, className)} />;
}

export function FluxPaneGroup({className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(paneStyles.paneGroup, className)} />;
}

export interface FluxLabelProps extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'onClick'> {
    color?: FluxColor;
    colored?: boolean;
    deleteLabel?: string;
    dot?: boolean;
    href?: string;
    icon?: FluxIconName;
    isDeletable?: boolean;
    isKeyboardShortcut?: boolean;
    isLoading?: boolean;
    label: ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onDelete?: () => void;
    rel?: string;
    size?: FluxSize;
    target?: string;
    to?: FluxTo;
    type?: FluxPressableType;
}

const iconSizes: Record<FluxSize, number> = {small: 12, medium: 16, large: 18};

export function FluxBadge(props: FluxLabelProps) {
    return <FluxLabel {...props} kind="badge" />;
}

export function FluxTag(props: FluxLabelProps) {
    return <FluxLabel {...props} kind="tag" />;
}

function FluxLabel({className, color = 'gray', colored, deleteLabel = 'Delete', dot, href, icon, isDeletable, isKeyboardShortcut, isLoading, kind, label, onClick, onDelete, rel, size = 'medium', target, to, type = 'none', ...props}: FluxLabelProps & {kind: 'badge' | 'tag'}) {
    const styles = badgeStyles;
    const prefix = kind;
    const classes = clsx(
            styles[`${prefix}${capitalize(color)}`],
            kind === 'badge' && colored && styles.badgeColored,
            kind === 'tag' && isKeyboardShortcut && styles.tagKeyboardShortcut,
            size !== 'medium' && styles[`is${capitalize(size)}`],
            className
        );
    const content = <>
        {isLoading ? <FluxSpinner className={styles[`${prefix}Icon`]} size={iconSizes[size]} /> : dot ? <span className={styles[`${prefix}Dot`]} /> : icon ? <FluxIcon className={styles[`${prefix}Icon`]} size={iconSizes[size]} name={icon} /> : null}
        <span className={styles[`${prefix}Label`]}>{label}</span>
        {type === 'none' && isDeletable && <button className={styles[`${prefix}Close`]} type="button" aria-label={deleteLabel} onClick={event => {event.stopPropagation(); onDelete?.();}}><FluxIcon name="xmark" /></button>}
    </>;
    if (type === 'none' && !onClick) return <span {...props as HTMLAttributes<HTMLSpanElement>} className={classes}>{content}</span>;
    return <FluxPressable {...props} className={classes} componentType={type} href={href} onClick={onClick} rel={rel} target={target} to={to}>{content}</FluxPressable>;
}

export function FluxBadgeStack(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(props.className)} style={{...props.style, display: 'flex', flexWrap: 'wrap', gap: 6}} />;
}

export function FluxTagStack(props: HTMLAttributes<HTMLDivElement>) {
    return <FluxBadgeStack {...props} />;
}

const fallbackColors = ['#65a30d', '#16a34a', '#059669', '#0d9488', '#0891b2', '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#c026d3', '#db2777', '#e11d48', '#dc2626', '#ea580c', '#d97706', '#ca8a04'];

export interface FluxAvatarProps extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'onClick'> {
    alt?: string;
    fallback?: 'colorized' | 'neutral';
    fallbackIcon?: FluxIconName;
    fallbackInitials?: string;
    href?: string;
    isLoading?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
    size?: number;
    src?: string;
    status?: FluxColor;
    statusIcon?: FluxIconName;
    type?: FluxPressableType;
}

export function FluxAvatar({alt, className, fallback = 'colorized', fallbackIcon = 'user', fallbackInitials, isLoading, onClick, size, src, status, statusIcon, style, type = 'none', ...props}: FluxAvatarProps) {
    const [hasError, setHasError] = useState(false);
    useEffect(() => setHasError(false), [src]);
    const color = useMemo(() => {
        const source = fallbackInitials ?? fallbackIcon;
        let seed = 6;
        for (let index = 0; index < source.length; index++) seed ^= source.charCodeAt(index);
        return fallbackColors[seed % fallbackColors.length];
    }, [fallbackIcon, fallbackInitials]);

    return <FluxPressable
        {...props}
        className={clsx(!status && avatarStyles.avatar, status && !statusIcon && avatarStyles.statusAvatar, status && statusIcon && avatarStyles.statusIconAvatar, type !== 'none' && avatarStyles.avatarClickable, className)}
        style={{...style, '--color': color, fontSize: size && `${size}px`} as FluxStyle}
        componentType={type}
        role={type === 'none' && !onClick ? 'img' : undefined}
        aria-label={alt}
        onClick={onClick}
    >
        {src && !hasError ? <img className={avatarStyles.avatarImage} alt={alt ?? ''} src={src} onError={() => setHasError(true)} /> : <div className={fallback === 'colorized' ? avatarStyles.avatarFallbackColorized : avatarStyles.avatarFallbackNeutral}>{fallbackInitials ? <span>{fallbackInitials}</span> : <FluxIcon name={fallbackIcon} />}</div>}
        {isLoading && <div className={avatarStyles.avatarLoading}><FluxSpinner /></div>}
        {status && (statusIcon ? <FluxIcon className={avatarStyles.avatarStatusIcon} color={status} name={statusIcon} size="0.36em" /> : <div className={avatarStyles[`avatarStatus${capitalize(status)}`]} />)}
    </FluxPressable>;
}

export function FluxAvatarGroup({children, className, max, overlap = .21, size = 30, style, ...props}: HTMLAttributes<HTMLDivElement> & {max?: number; overlap?: number; size?: number}) {
    const all = Children.toArray(children);
    const visible = max !== undefined ? all.slice(0, max) : all;
    const hidden = all.length - visible.length;
    return <div {...props} className={clsx(avatarGroupStyles.avatarGroup, className)} style={{...style, fontSize: `${size}px`, '--overlap': overlap} as FluxStyle} role={props.role ?? 'group'}>
        {visible.map((child, index) => {
            if (!isValidElement(child)) return child;
            const avatar = child as ReactElement<FluxAvatarProps>;
            return cloneElement(avatar, {size: avatar.props.size ?? size, key: avatar.key ?? index});
        })}
        {hidden > 0 && <FluxAvatar alt={`and ${hidden} more`} fallback="neutral" fallbackInitials={`+${hidden}`} size={size} />}
    </div>;
}

export interface FluxNoticeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'title'> {
    color?: FluxColor;
    end?: ReactNode;
    icon?: FluxIconName;
    isCenter?: boolean;
    isCloseable?: boolean;
    isFluid?: boolean;
    isLoading?: boolean;
    message?: ReactNode;
    onClose?: () => void;
    title?: ReactNode;
}

export function FluxNotice({children, className, color = 'gray', end, icon, isCenter, isCloseable, isFluid, isLoading, message, onClose, title, ...props}: FluxNoticeProps) {
    const role = color === 'danger' || color === 'warning' ? 'alert' : 'status';
    return <div {...props} className={clsx(noticeStyles[`notice${capitalize(color)}`], isCenter && noticeStyles.isCenter, isFluid && noticeStyles.isFluid, className)} role={role} aria-live={role === 'alert' ? 'assertive' : 'polite'}>
        {isLoading ? <FluxSpinner className={noticeStyles.noticePrefix} color={color} /> : icon ? <FluxIcon className={noticeStyles.noticePrefix} name={icon} /> : null}
        <div className={noticeStyles.noticeBody}>{title && <p className={noticeStyles.noticeTitle}>{title}</p>}{message && <p className={noticeStyles.noticeMessage}>{message}</p>}{children}</div>
        {end}
        {isCloseable && <button className={noticeStyles.noticeClose} type="button" aria-label="Close" onClick={onClose}><FluxIcon name="xmark" /></button>}
    </div>;
}

export function FluxInfo({children, className, color = 'gray', icon, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {color?: FluxColor; icon?: FluxIconName}) {
    return <div {...props} className={clsx(infoStyles.info, infoStyles[`info${capitalize(color)}`], className)}>{icon && <FluxIcon className={infoStyles.infoIcon} name={icon} />}<div className={infoStyles.infoBody}>{children}</div></div>;
}

export interface FluxPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
    icon?: FluxIconName;
    isButton?: boolean;
    message?: string;
    title?: string;
    variant?: 'extended' | 'simple' | 'small';
}

export function FluxPlaceholder({children, className, icon, isButton, message, onClick, onKeyDown, title, variant = 'extended', ...props}: FluxPlaceholderProps) {
    return <div {...props} className={clsx(placeholderStyles.placeholder, isButton && placeholderStyles.isButton, placeholderStyles[`is${capitalize(variant)}`], className)} role={isButton ? 'button' : 'presentation'} tabIndex={isButton ? 0 : undefined} onClick={onClick} onKeyDown={event => {onKeyDown?.(event); if (isButton && !event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {event.preventDefault(); event.currentTarget.click();}}}>
        {icon && <FluxIcon className={placeholderStyles.placeholderIcon} name={icon} />}
        <div className={placeholderStyles.placeholderCaption}>{title && <strong>{title}</strong>}{message && <p>{message}</p>}</div>
        {children}
    </div>;
}

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
