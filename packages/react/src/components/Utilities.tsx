import {clsx} from 'clsx';
import {Children, cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState} from 'react';
import type {ElementType, HTMLAttributes, ReactElement, ReactNode} from 'react';
import type {FluxColor, FluxDirection, FluxIconName, FluxPressableType, FluxSize, FluxStyle, FluxTo} from '../types';
import {FluxSecondaryButton, FluxPressable} from './Actions';
import {FluxLayerPane} from './DisplayExtended';
import {FluxPane, FluxPaneBody} from './Display';
import {FluxIcon} from './Icon';
import {FluxMenu, FluxMenuFlyout} from './Menus';
import {useFluxBreadcrumbSeparator} from './Navigation';
import {FluxFlyout, FluxTooltip} from './Overlays';
import adaptiveStyles from '../../../components/src/css/component/AdaptiveSlot.module.scss';
import backStyles from '../../../components/src/css/component/BackToTop.module.scss';
import badgeStyles from '../../../components/src/css/component/Badge.module.scss';
import breadcrumbStyles from '../../../components/src/css/component/Breadcrumb.module.scss';
import expandableStyles from '../../../components/src/css/component/Expandable.module.scss';
import masonryStyles from '../../../components/src/css/component/Masonry.module.scss';
import overflowStyles from '../../../components/src/css/component/OverflowBar.module.scss';
import overlayStyles from '../../../components/src/css/component/Overlay.module.scss';

function capital(value:string){return value.charAt(0).toUpperCase()+value.slice(1);}

interface AdaptiveChild {defaultNode:ReactNode;fallback:ReactNode;priority:number;setVisible(value:boolean):void;widthDefault:number;widthFallback:number}
interface AdaptiveContextValue {register(id:string, child:AdaptiveChild):void;unregister(id:string):void;reflow():void}
const AdaptiveContext=createContext<AdaptiveContextValue|null>(null);
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

export function FluxBackToTop({children,label='Back to top',offset=300,position='end',target}: {children?:(state:{cssClass:string;scrollToTop():void})=>ReactNode;label?:string;offset?:number;position?:'start'|'end';target?:HTMLElement|null}){const[visible,setVisible]=useState(false);useEffect(()=>{const source=target??window;const read=()=>setVisible((target?.scrollTop??window.scrollY)>offset);read();source.addEventListener('scroll',read,{passive:true});return()=>source.removeEventListener('scroll',read);},[offset,target]);const cssClass=clsx(backStyles.backToTop,position==='start'?backStyles.isStart:backStyles.isEnd);const scrollToTop=()=>{(target??document.scrollingElement)?.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});const focus=target??document.body;if(!focus.hasAttribute('tabindex')){focus.setAttribute('tabindex','-1');focus.addEventListener('blur',()=>focus.removeAttribute('tabindex'),{once:true});}focus.focus({preventScroll:true});};if(!visible)return null;return children?children({cssClass,scrollToTop}):<FluxTooltip content={label}><FluxSecondaryButton className={cssClass} iconLeading="arrow-up" aria-label={label} onClick={scrollToTop}/></FluxTooltip>;}

export function FluxBadgeGroup({className,color='gray',end,iconLeading,iconTrailing,label,size='medium',start,type='none',...props}:Omit<HTMLAttributes<HTMLElement>,'color'|'onClick'>&{color?:FluxColor;end?:ReactNode;href?:string;iconLeading?:FluxIconName;iconTrailing?:FluxIconName;label:string;onClick?:React.MouseEventHandler<HTMLElement>;rel?:string;size?:FluxSize;start?:ReactNode;target?:string;to?:FluxTo;type?:FluxPressableType}){const iconSize={small:12,medium:16,large:18}[size];const adorn=(nodes:ReactNode)=>Children.map(nodes,child=>isValidElement(child)?cloneElement(child as ReactElement<{color?:FluxColor;size?:FluxSize}>,{color:(child.props as {color?:FluxColor}).color??color,size:(child.props as {size?:FluxSize}).size??size}):child);return <FluxPressable {...props} className={clsx(badgeStyles[`badgeGroup${capital(color)}`],size!=='medium'&&badgeStyles[`badgeGroup${capital(size)}`],start&&badgeStyles.badgeGroupHasStart,end&&badgeStyles.badgeGroupHasEnd,className)} componentType={type}>{adorn(start)}{iconLeading&&<FluxIcon className={badgeStyles.badgeGroupIcon} name={iconLeading} size={iconSize}/>}<span className={badgeStyles.badgeGroupLabel}>{label}</span>{iconTrailing&&<FluxIcon className={badgeStyles.badgeGroupIcon} name={iconTrailing} size={iconSize}/>} {adorn(end)}</FluxPressable>;}

export function FluxBreadcrumbFlyout({ariaLabel,children,icon,isCollapsed,label,leading}: {ariaLabel?:string;children?:ReactNode;icon?:FluxIconName;isCollapsed?:boolean;label?:string;leading?:ReactNode}){const separator=useFluxBreadcrumbSeparator();if(isCollapsed)return <FluxMenuFlyout icon={icon} label={label}><FluxMenu>{children}</FluxMenu></FluxMenuFlyout>;return <li className={breadcrumbStyles.breadcrumbItem}><FluxFlyout label={ariaLabel??label} opener={({isOpen,toggle})=><FluxPressable className={clsx(breadcrumbStyles.breadcrumbLink,breadcrumbStyles.breadcrumbFlyoutTrigger,isOpen&&breadcrumbStyles.isOpen)} componentType="button" aria-label={ariaLabel??label} aria-haspopup="menu" aria-expanded={isOpen} onClick={toggle}>{leading}{icon&&<FluxIcon className={breadcrumbStyles.breadcrumbIcon} name={icon} size={16}/>} {label&&<span className={breadcrumbStyles.breadcrumbLabel}>{label}</span>}<FluxIcon className={breadcrumbStyles.breadcrumbChevron} name="angle-down" size={12}/></FluxPressable>}>{()=> <FluxMenu>{children}</FluxMenu>}</FluxFlyout><FluxIcon className={breadcrumbStyles.breadcrumbSeparator} name={separator} size={12}/></li>;}

export function FluxDynamicView({vnode}:{vnode?:ReactNode}){return <>{vnode}</>;}

export function FluxExpandablePane({before,body,children,className,color='gray',defaultOpened,header,icon,isOpened,onToggle,subtitle,title,...props}:Omit<HTMLAttributes<HTMLDivElement>,'onToggle'>&{before?:ReactNode;body?:ReactNode|((state:{close():void;contentId:string;headerId:string;subtitle?:string;title?:string})=>ReactNode);color?:FluxColor;defaultOpened?:boolean;header?:(state:{close():void;contentId:string;headerId:string;isOpen:boolean;open():void;toggle():void})=>ReactNode;icon?:FluxIconName;isOpened?:boolean;onToggle?:(open:boolean)=>void;subtitle?:string;title?:string}){const generated=useId().replace(/:/g,''),[inner,setInner]=useState(Boolean(defaultOpened)),open=isOpened??inner,contentId=`${generated}-content`,headerId=`${generated}-header`;const change=(next:boolean)=>{if(isOpened===undefined)setInner(next);onToggle?.(next);},api={close:()=>change(false),open:()=>change(true),toggle:()=>change(!open)};return <FluxLayerPane {...props} className={clsx(open?expandableStyles.expandablePaneOpened:expandableStyles.expandablePane,className)} color={color}>{header?header({...api,contentId,headerId,isOpen:open}):<FluxPressable className={expandableStyles.expandablePaneHeader} id={headerId} componentType="button" aria-controls={contentId} aria-expanded={open} onClick={api.toggle}>{before}{icon&&<FluxIcon className={expandableStyles.expandablePaneHeaderIcon} size={20} name={icon}/>} {(title||subtitle)&&<div className={expandableStyles.expandablePaneHeaderCaption}>{title&&<strong>{title}</strong>}{subtitle&&<span>{subtitle}</span>}</div>}<FluxIcon className={expandableStyles.expandablePaneHeaderChevron} size={20} name="angle-right"/></FluxPressable>}{open&&<FluxPane className={expandableStyles.expandablePaneBody} id={contentId} role="region" aria-labelledby={headerId}>{typeof body==='function'?body({...api,contentId,headerId,subtitle,title}):body??<FluxPaneBody>{children}</FluxPaneBody>}</FluxPane>}</FluxLayerPane>;}

type MasonryColumns=number|{xs?:number;sm?:number;md?:number;lg?:number;xl?:number};
export function FluxMasonry({as:Component='div',children,className,columns=3,gap=15,style,...props}:HTMLAttributes<HTMLElement>&{as?:ElementType;columns?:MasonryColumns;gap?:number}){const root=useRef<HTMLElement>(null),[width,setWidth]=useState(0),[spans,setSpans]=useState<number[]>([]);const configured=typeof columns==='number'?{xs:1,sm:columns,md:columns,lg:columns,xl:columns}:{xs:columns.xs??1,sm:columns.sm??columns.xs??1,md:columns.md??columns.sm??columns.xs??1,lg:columns.lg??columns.md??columns.sm??columns.xs??1,xl:columns.xl??columns.lg??columns.md??columns.sm??columns.xs??1};const count=width>=1280?configured.xl:width>=1024?configured.lg:width>=768?configured.md:width>=640?configured.sm:configured.xs;useLayoutEffect(()=>{const element=root.current;if(!element)return;const reflow=()=>{setWidth(element.clientWidth);setSpans(Array.from(element.children).map(child=>Math.ceil(child.getBoundingClientRect().height)+gap));};reflow();if(typeof ResizeObserver==='undefined')return;const observer=new ResizeObserver(reflow);observer.observe(element);Array.from(element.children).forEach(child=>observer.observe(child));return()=>observer.disconnect();},[children,gap]);return <Component {...props} ref={root} className={clsx(masonryStyles.masonry,spans.length&&masonryStyles.isPacked,className)} style={{...style,'--columns':count,'--gap':`${gap}px`} as FluxStyle}>{Children.map(children,(child,index)=>isValidElement(child)?cloneElement(child as ReactElement<{style?:React.CSSProperties}>,{style:{...(child.props as {style?:React.CSSProperties}).style,gridRowEnd:spans[index]?`span ${spans[index]}`:undefined}}):child)}</Component>;}

export function FluxOverflowBar({alignment='center',children,className,direction='horizontal',gap=9,overflow,style,...props}:HTMLAttributes<HTMLDivElement>&{alignment?:'start'|'center'|'end';direction?:FluxDirection;gap?:number;overflow?:(state:{hasOverflow:boolean;items:ReactNode[]})=>ReactNode}){const bar=useRef<HTMLDivElement>(null),measurer=useRef<HTMLDivElement>(null),[visible,setVisible]=useState(Infinity),items=Children.toArray(children);useLayoutEffect(()=>{const barElement=bar.current,measureElement=measurer.current;if(!barElement||!measureElement)return;const update=()=>{const available=direction==='horizontal'?barElement.offsetWidth:barElement.offsetHeight,sizes=Array.from(measureElement.children).map(element=>direction==='horizontal'?(element as HTMLElement).offsetWidth:(element as HTMLElement).offsetHeight);let total=0,count=0;for(const size of sizes){const next=total+size+(count?gap:0);if(next>available)break;total=next;count++;}setVisible(count);};update();if(typeof ResizeObserver==='undefined')return;const observer=new ResizeObserver(update);observer.observe(barElement);observer.observe(measureElement);return()=>observer.disconnect();},[children,direction,gap]);const hidden=items.slice(visible);return <><div {...props} ref={bar} className={clsx(direction==='horizontal'?overflowStyles.overflowBarHorizontal:overflowStyles.overflowBarVertical,overflowStyles[`align${capital(alignment)}`],className)} style={{...style,gap}}>{items.slice(0,visible)}{overflow&&<div className={overflowStyles.overflowBarOverflow}>{overflow({hasOverflow:hidden.length>0,items:hidden})}</div>}</div><div ref={measurer} className={overflowStyles.overflowBarMeasurer} aria-hidden="true">{children}</div></>;}

export function FluxOverlayProvider({children}: {children?:ReactNode}){return <><div className={overlayStyles.overlayProvider} aria-hidden="true"><div className={overlayStyles.overlayShade}/></div>{children}</>;}
export function FluxTooltipProvider({children}: {children?:ReactNode}){return <>{children}</>;}

export interface FluxWindowState {back(to?:string):void;isBack:boolean;navigate(to:string):void;view:string}
export function FluxWindow({children,defaultView='default',onViewChange,views}: {children?:(state:FluxWindowState)=>ReactNode;defaultView?:string;onViewChange?:(view:string,isBack:boolean)=>void;views?:Record<string,ReactNode>}){const[view,setView]=useState(defaultView),[isBack,setBack]=useState(false);const change=(to:string,back:boolean)=>{setBack(back);setView(to);onViewChange?.(to,back);};const state={back:(to='default')=>change(to,true),isBack,navigate:(to:string)=>change(to,false),view};return <>{children?children(state):views?.[view]}</>;}
