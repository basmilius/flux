import {clsx} from 'clsx';
import {
    Children, createContext, isValidElement, useCallback, useContext, useEffect, useLayoutEffect,
    useMemo, useRef, useState
} from 'react';
import type {
    ButtonHTMLAttributes, DragEvent, HTMLAttributes, ImgHTMLAttributes, ReactElement, ReactNode
} from 'react';
import type {FluxColor, FluxFocalPointObject, FluxIconName, FluxPressableType, FluxStyle, FluxTo} from '../types';
import {FluxButtonGroup, FluxButtonStack, FluxPressable, FluxSecondaryButton} from './Actions';
import {FluxAvatar, FluxPane, FluxPaneBody} from './Display';
import {FluxSpinner} from './Feedback';
import {FluxIcon} from './Icon';
import {FluxFlex} from './Layout';
import {FluxRemove} from './Composition';
import actionStyles from '../../../components/src/css/component/Action.module.scss';
import activityStyles from '../../../components/src/css/component/ActivityFeed.module.scss';
import avatarStyles from '../../../components/src/css/component/Avatar.module.scss';
import commentStyles from '../../../components/src/css/component/Comment.module.scss';
import descriptionStyles from '../../../components/src/css/component/DescriptionList.module.scss';
import dropZoneStyles from '../../../components/src/css/component/DropZone.module.scss';
import focalPointStyles from '../../../components/src/css/component/FocalPoint.module.scss';
import formStyles from '../../../components/src/css/component/Form.module.scss';
import galleryStyles from '../../../components/src/css/component/Gallery.module.scss';
import iconStyles from '../../../components/src/css/component/Icon.module.scss';
import layerStyles from '../../../components/src/css/component/LayerPane.module.scss';
import paneStyles from '../../../components/src/css/component/Pane.module.scss';
import stepperStyles from '../../../components/src/css/component/Stepper.module.scss';
import timelineStyles from '../../../components/src/css/component/Timeline.module.scss';

function capitalize(value: string) { return value.charAt(0).toUpperCase() + value.slice(1); }

export function FluxActionPane({base, buttons, children, className, paneVariant = 'default', ...props}: HTMLAttributes<HTMLDivElement> & {base?: ReactNode; buttons?: ReactNode; paneVariant?: 'default' | 'flat' | 'well'}) {
    return <FluxPane {...props} className={clsx(actionStyles.actionPane, className)} variant={paneVariant}>
        {base}<div className={actionStyles.actionPaneGrid}>
            <FluxPaneBody className={actionStyles.actionPaneBody}>{children}</FluxPaneBody>
            {buttons && <FluxPaneBody className={actionStyles.actionPaneBody}><FluxButtonStack direction="vertical">{buttons}</FluxButtonStack></FluxPaneBody>}
        </div>
    </FluxPane>;
}

export function FluxBoxedIcon({className, color, name, rounded, size, style, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {color?: FluxColor; name: FluxIconName; rounded?: boolean; size?: number}) {
    return <div {...props} className={clsx(color ? iconStyles[`iconBoxed${capitalize(color)}`] : iconStyles.iconBoxedDefault, rounded && iconStyles.isRounded, className)} style={{...style, fontSize: size && `${size}px`}}><FluxIcon name={name} /></div>;
}

const DisabledContext = createContext(false);

export function FluxDisabled({children, disabled = true}: {children?: ReactNode; disabled?: boolean}) {
    return <DisabledContext.Provider value={disabled}>{children}</DisabledContext.Provider>;
}

export function useFluxDisabled(disabled?: boolean) {
    const contextDisabled = useContext(DisabledContext);
    return Boolean(disabled || contextDisabled);
}

export interface FluxClickablePaneProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
    disabled?: boolean; href?: string; isLoading?: boolean; loader?: ReactNode; onClick?: React.MouseEventHandler<HTMLElement>;
    rel?: string; tag?: string; target?: string; to?: FluxTo; type?: FluxPressableType; variant?: 'default' | 'flat' | 'well';
}

export function FluxClickablePane({children, className, disabled, isLoading, loader, tag, type = 'button', variant = 'default', ...props}: FluxClickablePaneProps) {
    const isDisabled = useFluxDisabled(disabled);
    return <FluxPressable {...props} className={clsx(paneStyles[`pane${capitalize(variant)}`], className)} componentType={type} disabled={isDisabled || isLoading} aria-busy={isLoading || undefined}>
        {children}{isLoading && (loader ?? <div className={paneStyles.paneLoader}><FluxSpinner /></div>)}{tag && <div className={paneStyles.paneTag}>{tag}</div>}
    </FluxPressable>;
}

export function FluxClickablePaneHeader({before, children, className, disabled, icon, subtitle, title, type = 'button', ...props}: FluxClickablePaneProps & {before?: ReactNode; icon?: FluxIconName; subtitle?: string; title?: string}) {
    const isDisabled = useFluxDisabled(disabled);
    return <FluxPressable {...props} className={clsx(paneStyles.paneHeader, paneStyles.paneHeaderClickable, className)} componentType={type} disabled={isDisabled}>
        {before}{icon && <FluxIcon className={paneStyles.paneHeaderIcon} size={20} name={icon} />}
        {(title || subtitle) && <div className={paneStyles.paneHeaderCaption}>{title && <strong>{title}</strong>}{subtitle && <span>{subtitle}</span>}</div>}
        {children}<FluxIcon className={paneStyles.paneHeaderChevron} size={20} name="angle-right" />
    </FluxPressable>;
}

export interface FluxRelativeDateTime {
    diffNow(): {as(unit: 'seconds'): number};
    toISO(): string | null;
    toRelative(): string | null;
}

export function FluxComment({avatarAlt, avatarFallback = 'colorized', avatarFallbackIcon = 'user', avatarFallbackInitials, avatarSrc, children, className, isReceived, isTyping, postedBy, postedOn, ...props}: HTMLAttributes<HTMLDivElement> & {avatarAlt?: string; avatarFallback?: 'colorized' | 'neutral'; avatarFallbackIcon?: FluxIconName; avatarFallbackInitials?: string; avatarSrc?: string; isReceived?: boolean; isTyping?: boolean; postedBy?: string; postedOn?: FluxRelativeDateTime}) {
    const [, update] = useState(0);
    useEffect(() => { const timer = setInterval(() => update(value => value + 1), 30_000); return () => clearInterval(timer); }, []);
    const iso = postedOn?.toISO();
    const relative = postedOn?.toRelative();
    const justNow = postedOn && Math.abs(postedOn.diffNow().as('seconds')) < 15;
    return <div {...props} className={clsx(commentStyles.comment, isTyping && commentStyles.isTyping, isReceived && commentStyles.isReceived, className)} role={props.role ?? 'article'}>
        <FluxAvatar alt={avatarAlt} fallback={avatarFallback} fallbackIcon={avatarFallbackIcon} fallbackInitials={avatarFallbackInitials} size={42} src={avatarSrc} />
        <div className={commentStyles.commentContent}>{isTyping ? <div className={commentStyles.commentTyping} /> : children}</div>
        <div className={commentStyles.commentFooter}>{isReceived && postedBy && <span>{postedBy}</span>}{iso && relative && !isTyping && <time dateTime={iso}>{justNow ? 'Just now' : relative}</time>}</div>
    </div>;
}

export function FluxDescriptionList({children, className, direction = 'vertical', header, labelWidth, style, title, ...props}: HTMLAttributes<HTMLDivElement> & {direction?: 'horizontal' | 'vertical'; header?: ReactNode; labelWidth?: number | string; title?: string}) {
    const aligned = direction === 'vertical' && labelWidth !== undefined;
    return <div {...props} className={clsx(descriptionStyles.descriptionList, className)}>{(title || header) && <div className={descriptionStyles.descriptionListHeader}>{header ?? title}</div>}<dl className={clsx(descriptionStyles.descriptionListItems, direction === 'horizontal' && descriptionStyles.isHorizontal, aligned && descriptionStyles.hasLabelWidth)} style={{...style, '--label-width': aligned ? (typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth) : undefined} as FluxStyle}>{children}</dl></div>;
}

export function FluxDescriptionItem({children, className, icon, isStacked, label, labelContent, ...props}: HTMLAttributes<HTMLDivElement> & {icon?: FluxIconName; isStacked?: boolean; label?: string; labelContent?: ReactNode}) {
    return <div {...props} className={clsx(descriptionStyles.descriptionItem, isStacked && descriptionStyles.isStacked, className)}><dt className={descriptionStyles.descriptionItemTerm}>{icon && <FluxIcon className={descriptionStyles.descriptionItemIcon} name={icon} />}<span className={descriptionStyles.descriptionItemLabel}>{labelContent ?? label}</span></dt><dd className={descriptionStyles.descriptionItemValue}>{children}</dd></div>;
}

export interface FluxDropZoneRenderState {isDragging: boolean; isDraggingOver: boolean; showPicker(): void}
export interface FluxDropZoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> {
    accept?: string; actions?: ReactNode | ((state: FluxDropZoneRenderState) => ReactNode); children?: ReactNode | ((state: FluxDropZoneRenderState) => ReactNode);
    disabled?: boolean; extra?: ReactNode | ((state: FluxDropZoneRenderState) => ReactNode); isLoading?: boolean; isMultiple?: boolean;
    onReject?: (files: File[]) => void; onSelect?: (file: File) => void; onSelectMultiple?: (files: FileList) => void;
}

function accepts(file: File, accept?: string) {
    if (!accept) return true;
    return accept.split(',').map(value => value.trim().toLowerCase()).filter(Boolean).some(pattern => pattern.startsWith('.') ? file.name.toLowerCase().endsWith(pattern) : pattern.endsWith('/*') ? file.type.toLowerCase().startsWith(pattern.slice(0, -1)) : file.type.toLowerCase() === pattern);
}

export function FluxDropZone({accept, actions, children, className, disabled, extra, isLoading, isMultiple, onReject, onSelect, onSelectMultiple, ...props}: FluxDropZoneProps) {
    const isDisabled = useFluxDisabled(disabled);
    const [isDragging, setDragging] = useState(false);
    const [isDraggingOver, setDraggingOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const depth = useRef(0);
    const emitFiles = useCallback((list: FileList | null) => {
        if (!list?.length) return;
        const all = Array.from(list), accepted = all.filter(file => accepts(file, accept));
        const rejected = [...all.filter(file => !accepts(file, accept)), ...(isMultiple ? [] : accepted.slice(1))];
        if (rejected.length) onReject?.(rejected);
        if (!accepted.length) return;
        if (isMultiple) onSelectMultiple?.(listFrom(accepted)); else onSelect?.(accepted[0]);
    }, [accept, isMultiple, onReject, onSelect, onSelectMultiple]);
    useEffect(() => {
        const start = () => setDragging(true), end = () => {depth.current = 0; setDragging(false); setDraggingOver(false);};
        window.addEventListener('dragover', start, true); window.addEventListener('dragleave', end, true); window.addEventListener('drop', end, true);
        return () => {window.removeEventListener('dragover', start, true); window.removeEventListener('dragleave', end, true); window.removeEventListener('drop', end, true);};
    }, []);
    const showPicker = () => { if (!isDisabled) inputRef.current?.click(); };
    const state = {isDragging, isDraggingOver, showPicker};
    const render = (value: ReactNode | ((value: FluxDropZoneRenderState) => ReactNode) | undefined) => typeof value === 'function' ? value(state) : value;
    return <div {...props} className={clsx(dropZoneStyles.dropZone, isDragging && dropZoneStyles.isDragging, isDraggingOver && dropZoneStyles.isDraggingOver, className)} role="button" aria-disabled={isDisabled || undefined} aria-label={props['aria-label'] ?? 'Drop files or click to select'} tabIndex={isDisabled ? -1 : 0} onClick={event => {props.onClick?.(event); if (!event.defaultPrevented && !(event.target as Element).closest('a,button,input,select,textarea')) showPicker();}} onKeyDown={event => {props.onKeyDown?.(event); if (!event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {event.preventDefault(); showPicker();}}}>
        <div className={dropZoneStyles.dropZoneContent} onDragEnter={event => {if (!isDisabled) {depth.current++; setDraggingOver(true); event.preventDefault();}}} onDragOver={event => {if (!isDisabled) event.preventDefault();}} onDragLeave={() => {depth.current = Math.max(0, depth.current - 1); if (!depth.current) setDraggingOver(false);}} onDrop={(event: DragEvent<HTMLDivElement>) => {depth.current = 0; setDragging(false); setDraggingOver(false); if (!isDisabled) {event.preventDefault(); event.stopPropagation(); emitFiles(event.dataTransfer.files);}}}>
            <svg className={dropZoneStyles.dropZoneBorder} role="presentation"><rect height="100%" width="100%" strokeLinecap="round" strokeLinejoin="round" pathLength={600} /></svg>
            {render(children)}{isLoading && <div className={dropZoneStyles.dropZoneLoader}><FluxSpinner /></div>}
        </div>{actions && <div className={dropZoneStyles.dropZoneActions}>{render(actions)}</div>}{render(extra)}
        <input ref={inputRef} hidden type="file" accept={accept} multiple={isMultiple} disabled={isDisabled} onChange={event => {emitFiles(event.currentTarget.files); event.currentTarget.value = '';}} />
    </div>;
}

function listFrom(files: File[]): FileList {
    if (typeof DataTransfer !== 'undefined') { const transfer = new DataTransfer(); files.forEach(file => transfer.items.add(file)); return transfer.files; }
    return Object.assign(files, {item: (index: number) => files[index] ?? null}) as unknown as FileList;
}

export function FluxFocalPointImage({alt = '', className, focalPoint, style, ...props}: ImgHTMLAttributes<HTMLImageElement> & {focalPoint?: FluxFocalPointObject}) {
    return <img {...props} alt={alt} className={clsx(focalPointStyles.focalPointImage, className)} style={{...style, objectPosition: `${focalPoint?.x ?? 50}% ${focalPoint?.y ?? 50}%`}} />;
}

export interface FluxGalleryItemProps extends HTMLAttributes<HTMLDivElement> {focalPoint?: FluxFocalPointObject; isDeletable?: boolean; isPending?: boolean; onDelete?: () => void; url: string}
export function FluxGalleryItem({className, focalPoint, isDeletable, isPending, onDelete, url, ...props}: FluxGalleryItemProps) {
    const [visible, setVisible] = useState(() => typeof matchMedia === 'function' && !matchMedia('(hover: hover)').matches);
    return <div {...props} className={clsx(galleryStyles.galleryItem, className)} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onFocus={() => setVisible(true)} onBlur={event => {if (!event.currentTarget.contains(event.relatedTarget)) setVisible(false);}}><FluxFocalPointImage className={galleryStyles.galleryItemImage} focalPoint={focalPoint} src={url} />{isDeletable && <FluxRemove isHidden={!visible} onClick={onDelete} />}{isPending && <div className={galleryStyles.galleryItemLoader}><FluxSpinner size={24} /></div>}</div>;
}

export function FluxGallery({children, className, isEditable, items, onDelete, onUpload, pendingItems = [], ...props}: Omit<FluxDropZoneProps, 'children' | 'onSelectMultiple'> & {children?: ReactNode; isEditable?: boolean; items?: Array<string | (FluxFocalPointObject & {url: string})>; onDelete?: (index: number) => void; onUpload?: (files: File[]) => void; pendingItems?: string[]}) {
    return <FluxDropZone {...props} accept="image/*" className={clsx(galleryStyles.gallery, className)} disabled={!isEditable} isMultiple onSelectMultiple={files => onUpload?.(Array.from(files).filter(file => file.type.startsWith('image/')))}>{({showPicker}) => <div className={galleryStyles.galleryGrid}>{items?.map((item, index) => {const url = typeof item === 'string' ? item : item.url; return <FluxGalleryItem key={url} url={url} focalPoint={typeof item === 'string' ? undefined : item} isDeletable={isEditable} onDelete={() => onDelete?.(index)} />;})}{children}{pendingItems.map(url => <FluxGalleryItem key={url} url={url} isPending />)}{isEditable && <button className={galleryStyles.galleryAdd} type="button" aria-label="Add image" onClick={showPicker}><FluxIcon name="plus" /></button>}</div>}</FluxDropZone>;
}

export function FluxInfoStack(props: HTMLAttributes<HTMLDivElement>) { return <FluxFlex {...props} direction="vertical" gap={18} role={props.role ?? 'group'} />; }
export function FluxNoticeStack(props: HTMLAttributes<HTMLDivElement>) { return <FluxFlex {...props} direction="vertical" gap={6} role={props.role ?? 'group'} />; }

export function FluxLayerPane({className, color = 'gray', ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {color?: FluxColor}) { return <div {...props} className={clsx(layerStyles[`layerPane${capitalize(color)}`], className)} />; }

export function FluxPaneMedia({aspectRatio, className, imageAlt, imageFocalPoint, imageUrl, isInset, ...props}: HTMLAttributes<HTMLDivElement> & {aspectRatio?: number; imageAlt?: string; imageFocalPoint?: [number, number]; imageUrl?: string; isInset?: boolean}) { return <div {...props} className={clsx(isInset ? paneStyles.paneMediaInset : paneStyles.paneMediaDefault, className)}>{imageUrl && <img className={paneStyles.paneMediaImage} style={{aspectRatio, objectPosition: `${imageFocalPoint?.[0] ?? 50}% ${imageFocalPoint?.[1] ?? 50}%`}} src={imageUrl} alt={imageAlt ?? ''} />}</div>; }

export function FluxPersona({avatarAlt, avatarFallback = 'colorized', avatarFallbackIcon = 'user', avatarFallbackInitials, avatarSize, avatarSrc, className, isCompact, name, title, ...props}: ButtonHTMLAttributes<HTMLButtonElement> & {avatarAlt?: string; avatarFallback?: 'colorized' | 'neutral'; avatarFallbackIcon?: FluxIconName; avatarFallbackInitials?: string; avatarSize?: number; avatarSrc?: string; isCompact?: boolean; name: string; title?: string}) { return <button {...props} className={clsx(avatarStyles.persona, className)} type="button" aria-label={isCompact ? name : props['aria-label']}><FluxAvatar alt={avatarAlt} fallback={avatarFallback} fallbackIcon={avatarFallbackIcon} fallbackInitials={avatarFallbackInitials} size={avatarSize} src={avatarSrc} />{!isCompact && <div className={avatarStyles.personaDetails}><strong>{name}</strong>{title && <span>{title}</span>}</div>}</button>; }

export interface FluxQuantitySelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {ariaLabel?: string; defaultValue?: number; disabled?: boolean; max?: number; min?: number; onValueChange?: (value: number) => void; step?: number; value?: number}
export function FluxQuantitySelector({ariaLabel, className, defaultValue = 0, disabled, max = 100, min = 0, onValueChange, step = 1, value, ...props}: FluxQuantitySelectorProps) {
    const scopedDisabled = useFluxDisabled(disabled), controlled = value !== undefined;
    const [inner, setInner] = useState(() => clamp(defaultValue, min, max));
    const current = clamp(controlled ? value : inner, min, max);
    const set = (next: number) => {next = clamp(snap(next, min, step), min, max); if (!controlled) setInner(next); onValueChange?.(next);};
    const width = Math.max(51, String(current).length * 9 + 30);
    return <FluxButtonGroup {...props} className={clsx(formStyles.formQuantitySelector, className)} aria-label={ariaLabel} aria-disabled={scopedDisabled || undefined}><FluxSecondaryButton className={formStyles.formQuantitySelectorButton} aria-label="Decrease" disabled={scopedDisabled || current <= min} iconLeading="minus" tabIndex={-1} onClick={() => set(current - step)} /><input className={formStyles.formQuantitySelectorInput} style={{width}} disabled={scopedDisabled} tabIndex={0} type="number" aria-label={ariaLabel} max={max} min={min} step={step} value={current} onChange={event => set(event.currentTarget.valueAsNumber)} /><FluxSecondaryButton className={formStyles.formQuantitySelectorButton} aria-label="Increase" disabled={scopedDisabled || current >= max} iconLeading="plus" tabIndex={-1} onClick={() => set(current + step)} /></FluxButtonGroup>;
}
function clamp(value: number, min: number, max: number) { return Number.isNaN(value) ? min : Math.min(max, Math.max(min, value)); }
function snap(value: number, min: number, step: number) { if (step <= 0) return value; const decimals = (String(step).split('.')[1] ?? '').length; const result = min + Math.round((value - min) / step) * step; return decimals ? Number(result.toFixed(decimals)) : result; }

interface TimelineContextValue {register(element: HTMLElement | null, previous: HTMLElement | null): void}
const TimelineContext = createContext<TimelineContextValue | null>(null);
export function FluxTimeline({children, className, ...props}: HTMLAttributes<HTMLDivElement>) {
    const rootRef = useRef<HTMLDivElement>(null), markers = useRef(new Set<HTMLElement>()), [path, setPath] = useState('');
    const measure = useCallback(() => {const root = rootRef.current; if (!root) return setPath(''); const base = root.getBoundingClientRect(); const measured = Array.from(markers.current).map(element => {const rect = element.getBoundingClientRect(), top = rect.top - base.top; return {x: rect.left - base.left + rect.width / 2, top, bottom: top + rect.height};}).sort((a,b) => a.top - b.top); setPath(measured.slice(0,-1).map((item,index) => {const from = item.bottom + 6, to = measured[index + 1].top - 6; return to > from ? `M${item.x} ${from}V${to}` : '';}).join(''));}, []);
    const context = useMemo(() => ({register(element: HTMLElement | null, previous: HTMLElement | null) {if (previous) markers.current.delete(previous); if (element) markers.current.add(element); queueMicrotask(measure);}}), [measure]);
    useLayoutEffect(() => {measure(); if (typeof ResizeObserver === 'undefined' || !rootRef.current) return; const observer = new ResizeObserver(measure); observer.observe(rootRef.current); return () => observer.disconnect();}, [children, measure]);
    return <TimelineContext.Provider value={context}><div {...props} ref={rootRef} className={clsx(timelineStyles.timeline, className)} role={props.role ?? 'feed'}>{path && <svg className={timelineStyles.timelineLine} aria-hidden="true"><path d={path} /></svg>}{children}</div></TimelineContext.Provider>;
}
function useTimelineMarker() { const timeline = useContext(TimelineContext); const old = useRef<HTMLElement | null>(null); return useCallback((element: HTMLElement | null) => {timeline?.register(element, old.current); old.current = element;}, [timeline]); }
export function FluxTimelineItem({children, className, color = 'gray', icon, photo, title, when, ...props}: HTMLAttributes<HTMLDivElement> & {color?: FluxColor; icon?: FluxIconName; photo?: string; title?: string; when?: string}) { const marker = useTimelineMarker(); return <div {...props} className={clsx(timelineStyles[`timelineItem${capitalize(color)}`], className)} role={props.role ?? 'article'}>{photo ? <div ref={marker} className={timelineStyles.timelineItemPhoto}><img className={timelineStyles.timelineItemPhotoImage} src={photo} alt="" />{icon && <div className={timelineStyles.timelineItemPhotoIcon}><FluxIcon name={icon} size={16} /></div>}</div> : icon ? <div ref={marker} className={timelineStyles.timelineItemIcon}><FluxIcon name={icon} size={20} /></div> : <span ref={marker} className={timelineStyles.timelineItemDot} />}<div className={timelineStyles.timelineItemBody}>{(title || when) && <div className={timelineStyles.timelineItemHeader}>{title && <strong>{title}</strong>}{when && <span>{when}</span>}</div>}{children}</div></div>; }

export interface FluxActivityFeedItemProps extends HTMLAttributes<HTMLLIElement> {actor?: string; avatarFallbackInitials?: string; avatarSrc?: string; color?: FluxColor; dateTime?: string; day?: string; details?: ReactNode; icon?: FluxIconName; when?: string}
export function FluxActivityFeedItem({actor, avatarFallbackInitials, avatarSrc, children, className, color = 'gray', dateTime, details, icon, when, ...props}: FluxActivityFeedItemProps) { const marker = useTimelineMarker(); return <li {...props} className={clsx(activityStyles[`activityFeedItem${capitalize(color)}`], className)}>{avatarSrc || avatarFallbackInitials ? <span ref={marker}><FluxAvatar className={activityStyles.activityFeedItemAvatar} fallbackInitials={avatarFallbackInitials} size={30} src={avatarSrc} aria-hidden="true" /></span> : icon ? <div ref={marker} className={activityStyles.activityFeedItemIcon}><FluxIcon name={icon} size={16} /></div> : <span ref={marker} className={activityStyles.activityFeedItemDot} />}<div className={activityStyles.activityFeedItemBody}><div className={activityStyles.activityFeedItemAction}>{actor && <strong>{actor}</strong>}<span>{children}</span>{when && <time className={activityStyles.activityFeedItemWhen} dateTime={dateTime}>{when}</time>}</div>{details && <div className={activityStyles.activityFeedItemDetails}>{details}</div>}</div></li>; }
export function FluxActivityFeed({children, className, isGrouped, ...props}: HTMLAttributes<HTMLDivElement> & {isGrouped?: boolean}) {
    let previous: string | undefined;
    const content: ReactNode[] = [];
    Children.forEach(children, (child, index) => {
        if (isGrouped && isValidElement(child)) {
            const day = (child as ReactElement<FluxActivityFeedItemProps>).props.day;
            if (day && day !== previous) {
                content.push(<li className={activityStyles.activityFeedDay} role="presentation" key={`day-${day}-${index}`}><span>{day}</span></li>);
            }
            previous = day ?? previous;
        }
        content.push(child);
    });
    return <FluxTimeline {...props} className={className} role="presentation"><ul className={activityStyles.activityFeedList} role="list">{content}</ul></FluxTimeline>;
}

export function FluxStepperStep(props: HTMLAttributes<HTMLDivElement>) { return <div {...props} className={clsx(stepperStyles.stepperStep, props.className)} />; }
export function FluxStepperSteps({amount, className, current, onActivate, style, ...props}: HTMLAttributes<HTMLDivElement> & {amount: number; current: number; onActivate?: (index: number) => void}) { const progress = amount <= 1 ? 1 : (current - 1) / (amount - 1); return <div {...props} className={clsx(stepperStyles.stepperSteps, className)} style={{...style, '--progress': progress} as FluxStyle}>{Array.from({length: amount}, (_, index) => {const step = index + 1; return <button key={step} className={clsx(stepperStyles.stepperStepsItem, current > step && stepperStyles.stepperStepsItemComplete, current === step && stepperStyles.stepperStepsItemCurrent, current < step && stepperStyles.stepperStepsItemIdle)} tabIndex={-1} type="button" onClick={() => onActivate?.(index)}>{current > step ? <FluxIcon name="check" /> : <span>{step}</span>}</button>;})}</div>; }
export function FluxStepper({children, content, defaultValue = 0, onValueChange, steps: stepsRenderer, value}: {children?: ReactNode; content?: (state: FluxStepperState) => ReactNode; defaultValue?: number; onValueChange?: (index: number) => void; steps?: (state: Pick<FluxStepperState, 'activate' | 'value' | 'steps'>) => ReactNode; value?: number}) { const items = Children.toArray(children), controlled = value !== undefined, [inner, setInner] = useState(defaultValue), current = controlled ? value : inner, previous = useRef(current), isTransitioningBack = current < previous.current; useEffect(() => {previous.current = current;}, [current]); const activate = (index: number) => {if (!controlled) setInner(index); onValueChange?.(index);}; const state = {activate, children: items, isTransitioningBack, steps: items.length, value: current, view: items[current] ?? null}; return <>{stepsRenderer ? stepsRenderer(state) : <FluxStepperSteps amount={items.length} current={current + 1} onActivate={activate} />}{content ? content(state) : state.view}</>; }
export interface FluxStepperState {activate(index: number): void; children: ReactNode[]; isTransitioningBack: boolean; steps: number; value: number; view: ReactNode}
