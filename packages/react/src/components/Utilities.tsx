import {useFluxTranslate} from '../i18n';
import {flattenElements} from './children';
import {useOverlayHost} from './overlayHost';
import {FluxFadeTransition, FluxWindowTransition} from './Transitions';
import {clsx} from 'clsx';
import {Children, cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState} from 'react';
import type {ElementType, HTMLAttributes, ReactElement, ReactNode} from 'react';
import type {FluxColor, FluxDirection, FluxIconName, FluxPressableType, FluxSize, FluxStyle, FluxTo} from '../types';
import {FluxSecondaryButton, FluxPressable} from './Actions';
import {FluxLayerPane} from './DisplayExtended';
import {FluxPane, FluxPaneBody} from './Display';
import {FluxIcon} from './Icon';
import {FluxMenu, FluxMenuFlyout} from './Menus';
import {useFluxBreadcrumbCollapsed, useFluxBreadcrumbSeparator} from './Navigation';
import {FluxFlyout, FluxTooltip} from './Overlays';
import adaptiveStyles from '../../../components/src/css/component/AdaptiveSlot.module.scss';
import backStyles from '../../../components/src/css/component/BackToTop.module.scss';
import badgeStyles from '../../../components/src/css/component/Badge.module.scss';
import breadcrumbStyles from '../../../components/src/css/component/Breadcrumb.module.scss';
import masonryStyles from '../../../components/src/css/component/Masonry.module.scss';
import overflowStyles from '../../../components/src/css/component/OverflowBar.module.scss';
import overlayStyles from '../../../components/src/css/component/Overlay.module.scss';

function capital(value:string){return value.charAt(0).toUpperCase()+value.slice(1);}

interface AdaptiveChild {defaultNode:ReactNode;fallback:ReactNode;priority:number;setVisible(value:boolean):void;widthDefault:number;widthFallback:number}
export interface AdaptiveContextValue {register(id:string, child:AdaptiveChild):void;unregister(id:string):void;reflow():void}
export const AdaptiveContext=createContext<AdaptiveContextValue|null>(null);
export function FluxAdaptiveGroup({children, className, gap = 9, style, ...props}: HTMLAttributes<HTMLDivElement> & {gap?: number}) {
    const root = useRef<HTMLDivElement>(null), items = useRef(new Map<string, AdaptiveChild>()), [, render] = useState(0);
    const reflow = useCallback(() => {
        const available = root.current?.clientWidth ?? Infinity, entries = Array.from(items.current.values()), visible = new Set(entries);
        const total = () => Array.from(visible).reduce((sum, item) => sum + (item.widthDefault || 0), 0) + Math.max(0, visible.size - 1) * gap;
        for (const item of [...entries].sort((a, b) => a.priority - b.priority)) {
            if (total() <= available) break;
            visible.delete(item);
        }
        entries.forEach(item => item.setVisible(visible.has(item)));
    }, [gap]);
    const context = useMemo(() => ({
        register(id: string, child: AdaptiveChild) {
            items.current.set(id, child);
            render(value => value + 1);
            queueMicrotask(reflow);
        },
        unregister(id: string) {
            items.current.delete(id);
            queueMicrotask(reflow);
        },
        reflow
    }), [reflow]);
    useLayoutEffect(() => {
        if (typeof ResizeObserver === 'undefined' || !root.current) return;
        const observer = new ResizeObserver(reflow);
        observer.observe(root.current);
        return () => observer.disconnect();
    }, [reflow]);
    return <AdaptiveContext.Provider value={context}><div {...props} ref={root} className={clsx(adaptiveStyles.adaptiveGroup, className)} style={{...style, '--gap': `${gap}px`} as FluxStyle}>{children}</div></AdaptiveContext.Provider>;
}
export function FluxAdaptiveSlot({children, className, fallback, priority = 1, ...props}: HTMLAttributes<HTMLDivElement> & {fallback?: ReactNode; priority?: number}) {
    const group = useContext(AdaptiveContext), id = useId(), [visible, setVisible] = useState(true), defaultMeasure = useRef<HTMLDivElement>(null), fallbackMeasure = useRef<HTMLDivElement>(null), root = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const update = () => {
            const child = {defaultNode: children, fallback, priority, setVisible, widthDefault: defaultMeasure.current?.offsetWidth ?? 0, widthFallback: fallbackMeasure.current?.offsetWidth ?? 0};
            if (group) group.register(id, child);
            else if (root.current) setVisible(child.widthDefault <= root.current.clientWidth);
        };
        update();
        if (typeof ResizeObserver === 'undefined') return () => group?.unregister(id);
        const observer = new ResizeObserver(update);
        if (defaultMeasure.current) observer.observe(defaultMeasure.current);
        if (fallbackMeasure.current) observer.observe(fallbackMeasure.current);
        if (root.current) observer.observe(root.current);
        return () => {
            observer.disconnect();
            group?.unregister(id);
        };
    }, [children, fallback, group, id, priority]);
    return <><div {...props} ref={root} className={clsx(adaptiveStyles.adaptiveSlot, className)} style={group ? {...props.style, flexShrink: 0} : props.style}>{visible ? children : fallback}</div><div ref={defaultMeasure} className={adaptiveStyles.adaptiveSlotMeasurer} aria-hidden="true">{children}</div><div ref={fallbackMeasure} className={adaptiveStyles.adaptiveSlotMeasurer} aria-hidden="true">{fallback}</div></>;
}

export function FluxBackToTop({children,label,offset=300,position='end',target}: {children?:(state:{cssClass:string;scrollToTop():void})=>ReactNode;label?:string;offset?:number;position?:'start'|'end';target?:HTMLElement|null}){
    const translate = useFluxTranslate();
    label ??= translate('flux.backToTop');
const[visible,setVisible]=useState(false);useEffect(()=>{const source=target??window;const read=()=>setVisible((target?.scrollTop??window.scrollY)>offset);read();source.addEventListener('scroll',read,{passive:true});return()=>source.removeEventListener('scroll',read);},[offset,target]);const cssClass=clsx(backStyles.backToTop,position==='start'?backStyles.isStart:backStyles.isEnd);const scrollToTop=()=>{(target??document.scrollingElement)?.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});const focus=target??document.body;if(!focus.hasAttribute('tabindex')){focus.setAttribute('tabindex','-1');focus.addEventListener('blur',()=>focus.removeAttribute('tabindex'),{once:true});}focus.focus({preventScroll:true});};return <FluxTooltip content={label}><FluxFadeTransition show={visible}>{children?children({cssClass,scrollToTop}):<FluxSecondaryButton className={cssClass} iconLeading="arrow-up" aria-label={label} onClick={scrollToTop}/>}</FluxFadeTransition></FluxTooltip>;}

export function FluxBadgeGroup({className,color='gray',end,iconLeading,iconTrailing,label,size='medium',start,type='none',...props}:Omit<HTMLAttributes<HTMLElement>,'color'|'onClick'>&{color?:FluxColor;end?:ReactNode;href?:string;iconLeading?:FluxIconName;iconTrailing?:FluxIconName;label:string;onClick?:React.MouseEventHandler<HTMLElement>;rel?:string;size?:FluxSize;start?:ReactNode;target?:string;to?:FluxTo;type?:FluxPressableType}){const iconSize={small:12,medium:16,large:18}[size];const adorn=(nodes:ReactNode)=>flattenElements<{color?:FluxColor;size?:FluxSize}>(nodes).map((child,index)=>cloneElement(child,{key:child.key??index,color:child.props.color??color,size:child.props.size??size}));return <FluxPressable {...props} className={clsx(badgeStyles[`badgeGroup${capital(color)}`],size!=='medium'&&badgeStyles[`badgeGroup${capital(size)}`],start&&badgeStyles.badgeGroupHasStart,end&&badgeStyles.badgeGroupHasEnd,className)} componentType={type}>{adorn(start)}{iconLeading&&<FluxIcon className={badgeStyles.badgeGroupIcon} name={iconLeading} size={iconSize}/>}<span className={badgeStyles.badgeGroupLabel}>{label}</span>{iconTrailing&&<FluxIcon className={badgeStyles.badgeGroupIcon} name={iconTrailing} size={iconSize}/>} {adorn(end)}</FluxPressable>;}

export function FluxBreadcrumbFlyout({ariaLabel,children,icon,isCollapsed,label,leading}: {ariaLabel?:string;children?:ReactNode;icon?:FluxIconName;isCollapsed?:boolean;label?:string;leading?:ReactNode}){const separator=useFluxBreadcrumbSeparator();const inheritedCollapsed=useFluxBreadcrumbCollapsed();if(isCollapsed??inheritedCollapsed)return <FluxMenuFlyout icon={icon} label={label}><FluxMenu>{children}</FluxMenu></FluxMenuFlyout>;return <li className={breadcrumbStyles.breadcrumbItem}><FluxFlyout label={ariaLabel??label} opener={({isOpen,toggle})=><FluxPressable className={clsx(breadcrumbStyles.breadcrumbLink,breadcrumbStyles.breadcrumbFlyoutTrigger,isOpen&&breadcrumbStyles.isOpen)} componentType="button" aria-label={ariaLabel??label} aria-haspopup="menu" aria-expanded={isOpen} onClick={toggle}>{leading}{icon&&<FluxIcon className={breadcrumbStyles.breadcrumbIcon} name={icon} size={15}/>} {label&&<span className={breadcrumbStyles.breadcrumbLabel}>{label}</span>}<FluxIcon className={breadcrumbStyles.breadcrumbChevron} name="angle-down" size={12}/></FluxPressable>}>{()=> <FluxMenu>{children}</FluxMenu>}</FluxFlyout><FluxIcon className={breadcrumbStyles.breadcrumbSeparator} name={separator} size={12}/></li>;}

export function FluxDynamicView({vnode}:{vnode?:ReactNode}){return <>{vnode}</>;}



type MasonryColumns=number|{xs?:number;sm?:number;md?:number;lg?:number;xl?:number};
export function FluxMasonry({as: Component = 'div', children, className, columns = 3, gap = 15, style, ...props}: HTMLAttributes<HTMLElement> & {as?: ElementType; columns?: MasonryColumns; gap?: number}) {
    const root = useRef<HTMLElement>(null);
    const [width, setWidth] = useState(0);
    const [packed, setPacked] = useState(false);
    const configured = typeof columns === 'number' ? {xs: 1, sm: columns, md: columns, lg: columns, xl: columns} : {xs: columns.xs ?? 1, sm: columns.sm ?? columns.xs ?? 1, md: columns.md ?? columns.sm ?? columns.xs ?? 1, lg: columns.lg ?? columns.md ?? columns.sm ?? columns.xs ?? 1, xl: columns.xl ?? columns.lg ?? columns.md ?? columns.sm ?? columns.xs ?? 1};
    const count = width >= 1280 ? configured.xl : width >= 1024 ? configured.lg : width >= 768 ? configured.md : width >= 640 ? configured.sm : configured.xs;
    useLayoutEffect(() => {
        const element = root.current;
        if (!element) return;
        let frame = 0;
        const observed = new Set<HTMLElement>();
        const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(schedule);
        function gridItems(parent: Element): HTMLElement[] {
            return Array.from(parent.children).flatMap(child => child instanceof HTMLElement ? getComputedStyle(child).display === 'contents' ? gridItems(child) : [child] : []);
        }
        function reflow() {
            setWidth(element!.clientWidth);
            const items = gridItems(element!);
            for (const item of observed) if (!items.includes(item)) {observer?.unobserve(item); observed.delete(item);}
            for (const item of items) {
                if (!observed.has(item)) {observer?.observe(item); observed.add(item);}
                const span = `span ${Math.ceil(item.getBoundingClientRect().height) + gap}`;
                if (item.style.gridRowEnd !== span) item.style.gridRowEnd = span;
            }
            setPacked(true);
        }
        function schedule() {cancelAnimationFrame(frame); frame = requestAnimationFrame(reflow);}
        observer?.observe(element);
        const mutations = typeof MutationObserver === 'undefined' ? undefined : new MutationObserver(schedule);
        mutations?.observe(element, {childList: true, subtree: true});
        reflow();
        return () => {cancelAnimationFrame(frame); observer?.disconnect(); mutations?.disconnect();};
    }, [gap, count]);
    return <Component {...props} ref={root} className={clsx(masonryStyles.masonry, packed && masonryStyles.isPacked, className)} style={{...style, '--columns': count, '--gap': `${gap}px`} as FluxStyle}>{children}</Component>;
}


export function FluxOverflowBar({alignment='center',children,className,direction='horizontal',gap=9,overflow,style,...props}:HTMLAttributes<HTMLDivElement>&{alignment?:'start'|'center'|'end';direction?:FluxDirection;gap?:number;overflow?:(state:{hasOverflow:boolean;items:ReactNode[]})=>ReactNode}){const bar=useRef<HTMLDivElement>(null),measurer=useRef<HTMLDivElement>(null),[visible,setVisible]=useState(Infinity),items=Children.toArray(children);useLayoutEffect(()=>{const barElement=bar.current,measureElement=measurer.current;if(!barElement||!measureElement)return;const update=()=>{const available=direction==='horizontal'?barElement.offsetWidth:barElement.offsetHeight,sizes=Array.from(measureElement.children).map(element=>direction==='horizontal'?(element as HTMLElement).offsetWidth:(element as HTMLElement).offsetHeight);let total=0,count=0;for(const size of sizes){const next=total+size+(count?gap:0);if(next>available)break;total=next;count++;}setVisible(count);};update();if(typeof ResizeObserver==='undefined')return;const observer=new ResizeObserver(update);observer.observe(barElement);observer.observe(measureElement);return()=>observer.disconnect();},[children,direction,gap]);const hidden=items.slice(visible);return <><div {...props} ref={bar} className={clsx(direction==='horizontal'?overflowStyles.overflowBarHorizontal:overflowStyles.overflowBarVertical,overflowStyles[`align${capital(alignment)}`],className)} style={{...style,gap}}>{items.slice(0,visible)}{overflow&&<div className={overflowStyles.overflowBarOverflow}>{overflow({hasOverflow:hidden.length>0,items:hidden})}</div>}</div><div ref={measurer} className={overflowStyles.overflowBarMeasurer} aria-hidden="true">{children}</div></>;}

export function FluxOverlayProvider({children}: {children?: ReactNode}) {useOverlayHost(); return <>{children}</>;}
export {FluxTooltipProvider} from './Overlays';

export interface FluxWindowState {back(to?:string):void;isBack:boolean;navigate(to:string):void;view:string}
export function FluxWindow({children,defaultView='default',onViewChange,views}: {children?:(state:FluxWindowState)=>ReactNode;defaultView?:string;onViewChange?:(view:string,isBack:boolean)=>void;views?:Record<string,ReactNode|((state:FluxWindowState)=>ReactNode)>}){const[view,setView]=useState(defaultView),[isBack,setBack]=useState(false);const change=(to:string,back:boolean)=>{setBack(back);setView(to);onViewChange?.(to,back);};const state={back:(to='default')=>change(to,true),isBack,navigate:(to:string)=>change(to,false),view};const content = views?.[view]; const active = flattenElements(content !== undefined ? typeof content === 'function' ? content(state) : content : children?.(state))[0];return <FluxWindowTransition isBack={isBack}>{active && cloneElement(active,{key:view})}</FluxWindowTransition>;}
