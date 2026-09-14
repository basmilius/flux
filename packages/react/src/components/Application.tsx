import { clsx } from 'clsx';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType, HTMLAttributes, ReactNode } from 'react';
import type { FluxColor, FluxIconName, FluxPressableType, FluxTo } from '../types';
import { FluxSecondaryButton } from './Actions';
import { FluxBoxedIcon } from './DisplayExtended';
import { FluxSpacer } from './Layout';
import { FluxMenu, FluxMenuGroup, FluxMenuItem } from './Menus';
import { FluxFlyout } from './Overlays';
import { FluxTabBar } from './Navigation';
import { FluxIcon } from './Icon';
import applicationStyles from '../../../application/src/css/component/Application.module.scss';
import contentStyles from '../../../application/src/css/component/ApplicationContent.module.scss';
import heroStyles from '../../../application/src/css/component/ApplicationHero.module.scss';
import menuStyles from '../../../application/src/css/component/ApplicationMenu.module.scss';
import pageHeaderStyles from '../../../application/src/css/component/ApplicationPageHeader.module.scss';
import sectionStyles from '../../../application/src/css/component/ApplicationSection.module.scss';
import sideStyles from '../../../application/src/css/component/ApplicationSide.module.scss';
import statusStyles from '../../../application/src/css/component/ApplicationStatusPage.module.scss';
import topStyles from '../../../application/src/css/component/ApplicationTop.module.scss';

export type FluxApplicationLayout = 'default' | 'dashboard' | 'full' | 'medium' | 'narrow';
export interface FluxApplicationContextInfo {
    entryTo?: FluxTo;
    href?: string;
    icon?: FluxIconName;
    id: symbol;
    subtitle?: string;
    title: string;
    to?: FluxTo;
    type?: FluxPressableType;
}
export interface FluxApplicationRouteRecord {
    components?: Record<string, ComponentType | ReactNode>;
    path: string;
}
export interface FluxApplicationRoute {
    fullPath?: string;
    matched?: FluxApplicationRouteRecord[];
}
export interface FluxApplicationRouter {
    back(): void;
    navigate?(to: FluxTo): void;
}
export interface NamedRouteMatch {
    depth: number;
    record: FluxApplicationRouteRecord;
}
export interface FluxApplicationInjection {
    activeContext?: FluxApplicationContextInfo;
    contexts: readonly FluxApplicationContextInfo[];
    isMenuCollapsed: boolean;
    layout: FluxApplicationLayout;
    route: FluxApplicationRoute | null;
    router: FluxApplicationRouter | null;
    showDesktopMenuToggle: boolean;
    totalLevels: number;
    viewIndex: number;
    close(): void;
    goToChild(): void;
    goToCurrent(): void;
    goToLevel(index: number): void;
    goToMain(): void;
    goToParent(): void;
    open(): void;
    pushContext(info: FluxApplicationContextInfo): void;
    removeContext(id: symbol): void;
    setLayout(layout: FluxApplicationLayout): void;
    toggle(): void;
    updateContext(id: symbol, info: Omit<FluxApplicationContextInfo, 'id'>): void;
}
export const FluxApplicationInjectionKey = createContext<FluxApplicationInjection | null>(null);

export function useApplicationInjection() {
    const context = useContext(FluxApplicationInjectionKey);
    if (!context) throw new Error('Application components must be used inside FluxApplication');
    return context;
}
export function useRoute() {
    return useContext(FluxApplicationInjectionKey)?.route ?? null;
}
export function useRouter() {
    return useContext(FluxApplicationInjectionKey)?.router ?? null;
}
export function useNamedRoutes(name = 'menu'): NamedRouteMatch[] {
    const route = useRoute();
    return (route?.matched ?? []).flatMap((record, depth) => (record.components && name in record.components ? [{ depth, record }] : []));
}
export function useApplicationContextMenu(name = 'menu') {
    const matches = useNamedRoutes(name);
    return { contextMenuKey: matches.map((match) => match.record.path).join('|') || undefined, hasContextMenu: matches.length > 0 };
}
export function useApplicationMenu() {
    const context = useApplicationInjection();
    return {
        ...context,
        canGoBack: context.viewIndex > 0,
        canGoForward: context.viewIndex < context.totalLevels - 1,
        isMainMenuVisible: context.viewIndex === 0,
        showMainMenu: context.goToMain,
        showContextMenu: context.goToCurrent,
        toggleMainMenu: () => (context.viewIndex === 0 ? context.goToCurrent() : context.goToMain())
    };
}
export function useApplicationContextRegistration(info: Omit<FluxApplicationContextInfo, 'id'>) {
    const context = useApplicationInjection();
    const id = useRef(Symbol('application-context'));
    useEffect(() => {
        context.pushContext({ ...info, id: id.current });
        return () => context.removeContext(id.current);
    }, []);
    useEffect(() => context.updateContext(id.current, info), [info.title, info.subtitle, info.href, info.icon, info.type, JSON.stringify(info.to), JSON.stringify(info.entryTo)]);
    return id.current;
}

export interface FluxApplicationProps extends HTMLAttributes<HTMLDivElement> {
    contextMenuName?: string;
    menu?: ReactNode;
    route?: FluxApplicationRoute | null;
    router?: FluxApplicationRouter | null;
    showDesktopMenuToggle?: boolean;
    side?: ReactNode;
}
export function FluxApplication({ children, className, contextMenuName = 'menu', menu, route = null, router = null, showDesktopMenuToggle = false, side, ...props }: FluxApplicationProps) {
    const [contexts, setContexts] = useState<FluxApplicationContextInfo[]>([]);
    const [layout, setLayout] = useState<FluxApplicationLayout>('default');
    const [viewIndex, setViewIndex] = useState(0);
    const [isMenuCollapsed, setCollapsed] = useState(() => (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function' ? true : localStorage.getItem('flux-application-menu-collapsed') !== 'false'));
    const totalLevels = 1 + (route?.matched ?? []).filter((record) => record.components && contextMenuName in record.components).length;
    const clamp = (index: number) => Math.max(0, Math.min(totalLevels - 1, index));
    useEffect(() => {
        setViewIndex((index) => (index === 0 && totalLevels > 1 ? totalLevels - 1 : clamp(index)));
    }, [totalLevels]);
    useEffect(() => {
        if (route?.fullPath) setViewIndex(totalLevels - 1);
    }, [route?.fullPath, totalLevels]);
    useEffect(() => {
        if (typeof document !== 'undefined') document.documentElement.toggleAttribute('data-application-menu-open', !isMenuCollapsed);
        if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') localStorage.setItem('flux-application-menu-collapsed', String(isMenuCollapsed));
        return () => {
            if (typeof document !== 'undefined') document.documentElement.removeAttribute('data-application-menu-open');
        };
    }, [isMenuCollapsed]);
    const context = useMemo<FluxApplicationInjection>(
        () => ({
            activeContext: contexts.at(-1),
            contexts,
            isMenuCollapsed,
            layout,
            route,
            router,
            showDesktopMenuToggle,
            totalLevels,
            viewIndex,
            close: () => setCollapsed(true),
            open: () => setCollapsed(false),
            toggle: () => setCollapsed((value) => !value),
            goToChild: () => setViewIndex((index) => clamp(index + 1)),
            goToCurrent: () => setViewIndex(totalLevels - 1),
            goToLevel: (index) => setViewIndex(clamp(index)),
            goToMain: () => setViewIndex(0),
            goToParent: () => setViewIndex((index) => clamp(index - 1)),
            pushContext: (info) => setContexts((items) => (items.some((item) => item.id === info.id) ? items : [...items, info])),
            removeContext: (id) => setContexts((items) => items.filter((item) => item.id !== id)),
            setLayout,
            updateContext: (id, info) => setContexts((items) => items.map((item) => (item.id === id ? { ...info, id } : item)))
        }),
        [contexts, isMenuCollapsed, layout, route, router, showDesktopMenuToggle, totalLevels, viewIndex]
    );
    return (
        <FluxApplicationInjectionKey.Provider value={context}>
            <div {...props} className={clsx(applicationStyles.application, className)}>
                {menu}
                <div className={applicationStyles.applicationBody}>{children}</div>
                {side}
                <button type="button" aria-label="Close menu" className={applicationStyles.applicationMenuBackdrop} onClick={context.close} />
            </div>
        </FluxApplicationInjectionKey.Provider>
    );
}

export function FluxApplicationContent({ className, layout = 'default', ...props }: HTMLAttributes<HTMLElement> & { layout?: FluxApplicationLayout }) {
    const context = useApplicationInjection();
    useEffect(() => context.setLayout(layout), [context.setLayout, layout]);
    const classes: Record<FluxApplicationLayout, string> = { default: contentStyles.applicationContentDefault, dashboard: contentStyles.applicationContentDashboard, full: contentStyles.applicationContentFull, medium: contentStyles.applicationContentMedium, narrow: contentStyles.applicationContentNarrow };
    return <main {...props} className={clsx(classes[layout], className)} />;
}
export function FluxApplicationHero({ after, before, className, end, start, subtitle, title, ...props }: HTMLAttributes<HTMLElement> & { after?: ReactNode; before?: ReactNode; end?: ReactNode; start?: ReactNode; subtitle?: string; title: ReactNode }) {
    return (
        <header {...props} className={clsx(heroStyles.applicationHero, className)}>
            {start}
            <div className={heroStyles.applicationHeroBody}>
                {before}
                <h1>{title}</h1>
                {subtitle && <p className={heroStyles.applicationHeroSubtitle}>{subtitle}</p>}
                {after}
            </div>
            {end}
        </header>
    );
}
export function FluxApplicationMenu({ children, className, context, footer, header, ...props }: HTMLAttributes<HTMLElement> & { context?: ReactNode; footer?: ReactNode; header?: ReactNode }) {
    const application = useApplicationMenu();
    return (
        <aside {...props} className={clsx(menuStyles.applicationMenu, className)} data-collapsed={application.isMenuCollapsed ? '' : undefined} data-collapsible={application.showDesktopMenuToggle ? '' : undefined}>
            {header && <FluxMenu className={menuStyles.applicationMenuHeader}>{header}</FluxMenu>}
            <div className={menuStyles.applicationMenuStage}>
                <div className={menuStyles.applicationMenuTrack} style={{ '--view-index': application.viewIndex } as React.CSSProperties}>
                    <FluxMenu className={menuStyles.applicationMenuPanel}>{children}</FluxMenu>
                    {context}
                </div>
            </div>
            {footer && application.isMainMenuVisible && <FluxMenu className={menuStyles.applicationMenuFooter}>{footer}</FluxMenu>}
        </aside>
    );
}
export function FluxApplicationMenuAccount({ avatar, icon, imageAlt, imageSrc, label, switcher }: { avatar?: ReactNode; icon?: FluxIconName; imageAlt?: string; imageSrc?: string; label: string; switcher?: ReactNode }) {
    return switcher ? (
        <FluxFlyout isAutoWidth opener={({ toggle }) => <FluxMenuItem className={menuStyles.applicationMenuAccountSwitcher} before={avatar} iconLeading={icon} iconTrailing="angle-down" imageAlt={imageAlt} imageSrc={imageSrc} label={label} onClick={toggle} />}>
            {() => switcher}
        </FluxFlyout>
    ) : (
        <FluxMenuItem className={menuStyles.applicationMenuAccount} before={avatar} iconLeading={icon} imageAlt={imageAlt} imageSrc={imageSrc} label={label} />
    );
}
export function FluxApplicationMenuContext(props: { entryTo?: FluxTo; href?: string; icon?: FluxIconName; rel?: string; subtitle?: string; tabIndex?: number; target?: string; title: string; to?: FluxTo; type?: FluxPressableType }) {
    const application = useApplicationInjection();
    useApplicationContextRegistration(props);
    const canSlide = application.viewIndex > 0 && !(props.type && props.to);
    return (
        <div className={menuStyles.applicationMenuContext}>
            <FluxSecondaryButton iconLeading="angle-left" size="small" tabIndex={props.tabIndex} href={canSlide ? undefined : props.href} rel={props.rel} target={props.target} to={canSlide ? undefined : props.to} type={canSlide ? 'button' : props.type} aria-label="Back" onClick={() => canSlide && application.goToParent()} />
            <div className={menuStyles.applicationMenuContextContent}>
                <div className={menuStyles.applicationMenuContextContentInner}>
                    <strong>{props.title}</strong>
                    {props.subtitle && <span>{props.subtitle}</span>}
                </div>
            </div>
        </div>
    );
}
export function FluxApplicationMenuContextStack({ name = 'menu', render }: { name?: string; render?: (match: NamedRouteMatch) => ReactNode }) {
    const matches = useNamedRoutes(name);
    return (
        <>
            {matches.map((match) => {
                const value = match.record.components?.[name];
                const Component = typeof value === 'function' ? (value as ComponentType) : null;
                return (
                    <FluxMenu key={match.record.path} className={menuStyles.applicationMenuPanel}>
                        {render?.(match) ?? (Component ? <Component /> : (value as ReactNode))}
                    </FluxMenu>
                );
            })}
        </>
    );
}
export function FluxApplicationMenuContextSwitcher() {
    const { contexts, goToLevel, totalLevels, viewIndex } = useApplicationMenu();
    if (totalLevels <= 1) return null;
    return (
        <FluxMenuGroup isHorizontal>
            <FluxMenuItem aria-label="Main menu" iconLeading="grid-2" isHighlighted={viewIndex === 0} onClick={() => goToLevel(0)} />
            {contexts.map((context, index) => (
                <FluxMenuItem key={String(context.id)} aria-label={context.title} iconLeading={context.icon} isHighlighted={index + 1 === viewIndex} onClick={() => goToLevel(index + 1)} />
            ))}
        </FluxMenuGroup>
    );
}
export function FluxApplicationMenuPromo({ children, className, icon, ...props }: HTMLAttributes<HTMLDivElement> & { icon?: FluxIconName }) {
    return (
        <div {...props} className={clsx(menuStyles.applicationMenuPromo, className)}>
            {icon && <FluxIcon name={icon} />}
            <div className={menuStyles.applicationMenuPromoContent}>{children}</div>
        </div>
    );
}
export function FluxApplicationMenuToggle({ className, ...props }: Omit<React.ComponentProps<typeof FluxMenuItem>, 'onClick'>) {
    const application = useApplicationInjection();
    return (
        <FluxMenuItem
            {...props}
            className={clsx(menuStyles.applicationMenuToggle, className)}
            aria-label="Toggle menu"
            aria-expanded={!application.isMenuCollapsed}
            before={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" className={menuStyles.applicationMenuToggleIcon}>
                    <path fillRule="evenodd" d="M0 15V3a3 3 0 0 1 3-3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a3.04 3.04 0 0 1-3-3M2 3a1 1 0 0 1 1-1h2v14H3a1 1 0 0 1-1-1z" clipRule="evenodd" />
                    <path d="M16 15V3a1 1 0 0 0-1-1h-5a1 1 0 0 1 0-2h5c1.63.04 3 1.33 3 3v12a3.07 3.07 0 0 1-3 3h-5a1 1 0 1 1 0-2h5a1 1 0 0 0 1-1" />
                </svg>
            }
            onClick={application.toggle}
        />
    );
}
export function FluxApplicationPageHeader({ actions, children, className, description, title, titleContent, ...props }: HTMLAttributes<HTMLElement> & { actions?: ReactNode; description?: string; title?: ReactNode; titleContent?: ReactNode }) {
    return (
        <header {...props} className={clsx(pageHeaderStyles.applicationPageHeader, className)}>
            <div className={pageHeaderStyles.applicationPageHeaderMain}>
                <div className={pageHeaderStyles.applicationPageHeaderTitle}>
                    <h1>{titleContent ?? title}</h1>
                    {description && <p className={pageHeaderStyles.applicationPageHeaderDescription}>{description}</p>}
                </div>
                {actions && <div className={pageHeaderStyles.applicationPageHeaderActions}>{actions}</div>}
            </div>
            {children}
        </header>
    );
}
export function FluxApplicationSection({ children, className, end, info, title, ...props }: HTMLAttributes<HTMLElement> & { end?: ReactNode; info?: string; title?: ReactNode }) {
    return (
        <section {...props} className={clsx(sectionStyles.applicationSection, className)}>
            {(title || info || end) && (
                <header className={sectionStyles.applicationSectionHeader}>
                    {title && <h2>{title}</h2>}
                    {end}
                    {info && <span className={sectionStyles.applicationSectionInfo}>{info}</span>}
                </header>
            )}
            <div className={sectionStyles.applicationSectionContent}>{children}</div>
        </section>
    );
}
export function FluxApplicationSide({ children, className, closeLabel = 'Close panel', defaultVisible = true, isVisible, onVisibleChange, ...props }: HTMLAttributes<HTMLElement> & { closeLabel?: string; defaultVisible?: boolean; isVisible?: boolean; onVisibleChange?: (visible: boolean) => void }) {
    const controlled = isVisible !== undefined,
        [inner, setInner] = useState(defaultVisible),
        visible = controlled ? isVisible : inner;
    const close = () => {
        if (!controlled) setInner(false);
        onVisibleChange?.(false);
    };
    return (
        <>
            <button className={sideStyles.applicationSideBackdrop} type="button" aria-label={closeLabel} data-collapsed={visible ? undefined : ''} onClick={close} />
            <aside {...props} className={clsx(sideStyles.applicationSide, className)} data-collapsed={visible ? undefined : ''} aria-hidden={!visible || undefined}>
                {children}
            </aside>
        </>
    );
}
const statusPresets: Record<'error' | 'maintenance' | 'not-found' | 'offline', { color: FluxColor; description: string; icon: FluxIconName; title: string }> = { error: { color: 'danger', description: 'Something went wrong.', icon: 'triangle-exclamation', title: 'Error' }, maintenance: { color: 'warning', description: 'This service is temporarily under maintenance.', icon: 'screwdriver-wrench', title: 'Maintenance' }, 'not-found': { color: 'primary', description: 'The requested page could not be found.', icon: 'compass', title: 'Page not found' }, offline: { color: 'gray', description: 'Check your internet connection and try again.', icon: 'wifi-slash', title: 'You are offline' } };
export function FluxApplicationStatusPage({ actions, children, className, code, description, icon, media, title, variant = 'error', ...props }: HTMLAttributes<HTMLDivElement> & { actions?: ReactNode; code?: string | number; description?: string; icon?: FluxIconName; media?: ReactNode; title?: string; variant?: keyof typeof statusPresets }) {
    const router = useRouter(),
        preset = statusPresets[variant],
        variantClass = statusStyles[`applicationStatusPage${variant === 'not-found' ? 'NotFound' : variant[0].toUpperCase() + variant.slice(1)}`];
    return (
        <div {...props} className={clsx(variantClass, className)}>
            {media ? <div className={statusStyles.applicationStatusPageMedia}>{media}</div> : <FluxBoxedIcon color={preset.color} name={icon ?? preset.icon} rounded />}
            <div className={statusStyles.applicationStatusPageBody}>
                {code && (
                    <span aria-hidden="true" className={statusStyles.applicationStatusPageCode}>
                        {code}
                    </span>
                )}
                <h1>{title ?? preset.title}</h1>
                {children ?? <p>{description ?? preset.description}</p>}
            </div>
            <div className={statusStyles.applicationStatusPageActions}>
                {actions ?? (
                    <FluxSecondaryButton
                        label="Back"
                        onClick={() => {
                            if (router) router.back();
                            else history.back();
                        }}
                    />
                )}
            </div>
        </div>
    );
}
export function FluxApplicationTop({ className, end, icon, start, tabs, title, ...props }: HTMLAttributes<HTMLElement> & { end?: ReactNode; icon?: FluxIconName; start?: ReactNode; tabs?: ReactNode; title?: string }) {
    const { layout, showDesktopMenuToggle } = useApplicationInjection(),
        [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const update = () => setScrolled(window.scrollY > 1);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);
    const tabsClass = topStyles[`applicationTopTabs${layout[0].toUpperCase()}${layout.slice(1)}`];
    return (
        <header {...props} className={clsx(scrolled ? topStyles.applicationTopScrolled : topStyles.applicationTop, className)}>
            <div className={topStyles.applicationTopBar}>
                <FluxApplicationMenuToggle className={!showDesktopMenuToggle ? topStyles.applicationTopMenuToggleHidden : undefined} />
                {start}
                {icon && <FluxIcon name={icon} />}
                {title && <span className={topStyles.applicationTopBarTitle}>{title}</span>}
                <FluxSpacer />
                {end}
            </div>
            {tabs && (
                <div className={tabsClass}>
                    <FluxTabBar>{tabs}</FluxTabBar>
                </div>
            )}
        </header>
    );
}
