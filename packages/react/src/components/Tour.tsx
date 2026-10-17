import {clsx} from 'clsx';
import {useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {useFocusTrap} from '../compatibility';
import {useFluxTranslate} from '../i18n';
import type {FluxStyle} from '../types';
import {FluxPrimaryButton, FluxSecondaryButton} from './Actions';
import {FluxPane} from './Display';
import {FluxSpacer} from './Layout';
import {FluxFadeTransition, Motion} from './Transitions';
import {positionPopup, type PopupPosition} from './anchor';
import {flattenElements} from './children';
import {useHeightTransition} from './heightTransition';
import styles from '../../../components/src/css/component/Tour.module.scss';

export type FluxTourPosition = PopupPosition;
export interface FluxTourItemProps {
    children?: ReactNode;
    position?: FluxTourPosition;
    target: string | (() => HTMLElement | null);
    title?: string;
}
export function FluxTourItem(_props: FluxTourItemProps) {
    return <span aria-hidden="true" style={{display: 'none'}}/>;
}

const bodyClasses = Object.fromEntries(['Enter', 'Leave'].flatMap(phase => ['Active', 'From', 'To'].map(state => [`body${phase}${state}`, `v-${phase.toLowerCase()}-${state.toLowerCase()}`])));

export function FluxTour({active, children, defaultActive = false, defaultStep = 0, maskPadding = 8, onActiveChange, onFinish, onNext, onPrev, onSkip, onStepChange, root, step: stepProp}: {active?: boolean; children?: ReactNode; defaultActive?: boolean; defaultStep?: number; maskPadding?: number; onActiveChange?: (active: boolean) => void; onFinish?: () => void; onNext?: (step: number) => void; onPrev?: (step: number) => void; onSkip?: () => void; onStepChange?: (step: number) => void; root?: string | HTMLElement | (() => HTMLElement | null); step?: number}) {
    const translate = useFluxTranslate();
    const items = flattenElements<FluxTourItemProps>(children).filter(item => item.type === FluxTourItem);
    const [innerActive, setInnerActive] = useState(defaultActive);
    const [innerStep, setInnerStep] = useState(defaultStep);
    const isActive = active ?? innerActive;
    const step = stepProp ?? innerStep;
    const item = items[step];
    const [rect, setRect] = useState<DOMRect | null>(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [stepping, setStepping] = useState(false);
    const [popup, setPopup] = useState<HTMLDivElement | null>(null);
    const pane = useRef<HTMLDivElement>(null);
    const body = useHeightTransition();
    const titleId = useId();
    const target = item?.props.target;
    const placement = item?.props.position ?? 'bottom';
    const previousStep = useRef(step);
    const state = useRef({active, onActiveChange, onSkip});
    state.current = {active, onActiveChange, onSkip};
    useFocusTrap(pane, Boolean(isActive && rect && popup));

    const changeActive = (next: boolean) => {
        if (state.current.active === undefined) setInnerActive(next);
        state.current.onActiveChange?.(next);
    };
    const changeStep = (next: number) => {
        if (stepProp === undefined) setInnerStep(next);
        onStepChange?.(next);
    };
    const skip = () => {changeActive(false); state.current.onSkip?.();};
    const next = () => {
        if (step < items.length - 1) {changeStep(step + 1); onNext?.(step + 1);}
        else {changeActive(false); onFinish?.();}
    };
    const previous = () => {if (step > 0) {changeStep(step - 1); onPrev?.(step - 1);}};

    useLayoutEffect(() => {
        if (!isActive) {setStepping(false); return;}
        if (previousStep.current === step) return;
        previousStep.current = step;
        setStepping(true);
        const timer = setTimeout(() => setStepping(false), 300);
        return () => clearTimeout(timer);
    }, [isActive, step]);
    useLayoutEffect(() => {
        if (!isActive || !target) {setRect(null); return;}
        const scope = typeof root === 'string' ? document.querySelector(root) : typeof root === 'function' ? root() : root;
        const resolve = () => typeof target === 'function' ? target() : (scope ?? document).querySelector<HTMLElement>(target);
        resolve()?.scrollIntoView?.({block: 'center', inline: 'center'});
        const measure = () => {
            const box = resolve()?.getBoundingClientRect() ?? null;
            setRect(current => current && box && current.x === box.x && current.y === box.y && current.width === box.width && current.height === box.height ? current : box);
        };
        measure();
        const frame = requestAnimationFrame(measure);
        window.addEventListener('scroll', measure, {capture: true, passive: true});
        window.addEventListener('resize', measure);
        return () => {cancelAnimationFrame(frame); window.removeEventListener('scroll', measure, true); window.removeEventListener('resize', measure);};
    }, [isActive, target, root, step]);
    useLayoutEffect(() => {
        if (!popup || !rect) return;
        const update = () => {
            const next = positionPopup({x: rect.x - maskPadding, y: rect.y - maskPadding, width: rect.width + maskPadding * 2, height: rect.height + maskPadding * 2}, popup.getBoundingClientRect(), placement, 12);
            setPosition(current => current.x === next.x && current.y === next.y ? current : next);
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(popup);
        return () => observer.disconnect();
    }, [popup, rect, placement, maskPadding]);
    useEffect(() => {
        if (!isActive) return;
        const key = (event: globalThis.KeyboardEvent) => {if (event.key === 'Escape') {event.preventDefault(); skip();}};
        window.addEventListener('keydown', key);
        return () => window.removeEventListener('keydown', key);
    }, [isActive]);

    if (typeof document === 'undefined') return null;
    return createPortal(<FluxFadeTransition>{isActive && <div className={styles.tour}>
        {rect && <div className={styles.tourSpotlight} style={{'--x': `${rect.x - maskPadding}px`, '--y': `${rect.y - maskPadding}px`, '--w': `${rect.width + maskPadding * 2}px`, '--h': `${rect.height + maskPadding * 2}px`} as FluxStyle}/>}
        {rect && item && <div ref={setPopup} className={clsx(styles.tourPopover, stepping && styles.isStepping)} role="dialog" aria-modal="true" aria-labelledby={item.props.title ? titleId : undefined} style={{'--x': `${position.x}px`, '--y': `${position.y}px`} as FluxStyle}>
            <FluxPane ref={pane} tabIndex={-1} className={styles.tourPane}>
                <div ref={body} className={styles.tourBodyViewport} aria-atomic="true" aria-live="polite">
                    <Motion name="body" styles={bodyClasses} mode="concurrent"><div key={step} className={styles.tourBody}>
                        {item.props.title && <strong id={titleId} className={styles.tourTitle}>{item.props.title}</strong>}
                        <div className={styles.tourContent}>{item.props.children}</div>
                    </div></Motion>
                </div>
                <div className={styles.tourFooter}>
                    <span className={styles.tourProgress}>{step + 1} / {items.length}</span>
                    <FluxSpacer/>
                    <button className={styles.tourSkip} type="button" onClick={skip}>{translate('flux.skip')}</button>
                    {step > 0 && <FluxSecondaryButton aria-label={translate('flux.previous')} iconLeading="angle-left" size="small" onClick={previous}/>}
                    <FluxPrimaryButton aria-label={translate(step < items.length - 1 ? 'flux.next' : 'flux.done')} iconLeading={step < items.length - 1 ? 'angle-right' : 'check'} size="small" onClick={next}/>
                </div>
            </FluxPane>
        </div>}
    </div>}</FluxFadeTransition>, document.body);
}
