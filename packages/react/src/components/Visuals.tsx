import { clsx } from "clsx";
import { Children, cloneElement, createContext, forwardRef, isValidElement, useContext, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode, SVGAttributes } from "react";
import type { FluxColor, FluxStyle } from "../types";
import attentionStyles from "../../../visuals/src/css/component/Attention.module.scss";
import beamStyles from "../../../visuals/src/css/component/BorderBeam.module.scss";
import highlighterStyles from "../../../visuals/src/css/component/Highlighter.module.scss";
import noiseStyles from "../../../visuals/src/css/component/Noise.module.scss";
import numberStyles from "../../../visuals/src/css/component/NumberFlow.module.scss";
import paneStyles from "../../../visuals/src/css/component/PaneIllustration.module.scss";
import glowStyles from "../../../visuals/src/css/component/PatternGlow.module.scss";
import pingStyles from "../../../visuals/src/css/component/Ping.module.scss";
import slotStyles from "../../../visuals/src/css/component/SlotText.module.scss";
import scrambleStyles from "../../../visuals/src/css/component/TextScramble.module.scss";
import shimmerStyles from "../../../visuals/src/css/component/TextShimmer.module.scss";
import visualStyles from "../../../visuals/src/css/component/Visual.module.scss";

function reducedMotion() {
    return typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function hash(value: string) {
    let result = 0;
    for (const char of value) result = (result * 31 + char.charCodeAt(0)) | 0;
    return result;
}
function random(seed: number) {
    let value = seed >>> 0;
    return () => {
        value += 0x6d2b79f5;
        let next = value;
        next = Math.imul(next ^ (next >>> 15), next | 1);
        next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
        return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
    };
}

export function FluxVisualAnimatedColors({ className, colors = [], incrementor = 1, opacity = 0.5, seed, static: isStatic, ...props }: HTMLAttributes<HTMLCanvasElement> & { colors?: string[]; incrementor?: number; opacity?: number; seed?: number; static?: boolean }) {
    const ref = useRef<HTMLCanvasElement>(null),
        id = useId();
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas || !colors.length) return;
        let frame = 0,
            tick = 0;
        const rng = random(seed ?? hash(id));
        const points = colors.map(() => ({ x: rng(), y: rng(), speed: 0.004 + rng() * 0.006 }));
        const draw = () => {
            let context: CanvasRenderingContext2D | null = null;
            try {
                context = canvas.getContext("2d");
            } catch {
                return;
            }
            if (!context) return;
            const width = canvas.clientWidth || 300,
                height = canvas.clientHeight || 150,
                ratio = window.devicePixelRatio || 1;
            if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
                canvas.width = width * ratio;
                canvas.height = height * ratio;
                context.scale(ratio, ratio);
            }
            context.clearRect(0, 0, width, height);
            context.globalCompositeOperation = "screen";
            context.globalAlpha = opacity;
            colors.forEach((color, index) => {
                const point = points[index],
                    x = (point.x + Math.sin(tick * point.speed) * 0.2) * width,
                    y = (point.y + Math.cos(tick * point.speed) * 0.2) * height;
                const gradient = context!.createRadialGradient(x, y, 0, x, y, Math.max(width, height) * 0.75);
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, "transparent");
                context!.fillStyle = gradient;
                context!.fillRect(0, 0, width, height);
            });
            tick += incrementor;
            if (!isStatic && !reducedMotion()) frame = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(frame);
    }, [colors.join("|"), id, incrementor, isStatic, opacity, seed]);
    return <canvas {...props} ref={ref} aria-hidden="true" className={clsx(visualStyles.animatedColors, className)} />;
}

export type FluxVisualAttentionEffect = "pulse" | "shake" | "bounce" | "tada";
export interface FluxVisualAttentionHandle {
    play(): void;
}
export const FluxVisualAttention = forwardRef<FluxVisualAttentionHandle, { children: ReactNode; className?: string; duration?: number; effect?: FluxVisualAttentionEffect; onFinished?: () => void; trigger?: unknown }>(function FluxVisualAttention({ children, className, duration = 700, effect = "pulse", onFinished, trigger }, forwardedRef) {
    const [playing, setPlaying] = useState(false),
        frame = useRef(0),
        finishTimer = useRef(0);
    const finish = () => {
        window.clearTimeout(finishTimer.current);
        finishTimer.current = 0;
        setPlaying(false);
        onFinished?.();
    };
    const play = () => {
        if (reducedMotion()) {
            finish();
            return;
        }
        setPlaying(false);
        cancelAnimationFrame(frame.current);
        window.clearTimeout(finishTimer.current);
        finishTimer.current = window.setTimeout(finish, duration + 34);
        frame.current = requestAnimationFrame(() => {
            frame.current = requestAnimationFrame(() => setPlaying(true));
        });
    };
    useImperativeHandle(forwardedRef, () => ({ play }));
    useEffect(() => {
        if (trigger !== undefined) play();
    }, [trigger]);
    useEffect(() => () => {
        cancelAnimationFrame(frame.current);
        window.clearTimeout(finishTimer.current);
    }, []);
    return (
        <>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) return child;
                const element = child as ReactElement<{ className?: string; style?: CSSProperties; onAnimationEnd?: () => void }>;
                return cloneElement(element, {
                    className: clsx(element.props.className, className, playing && attentionStyles[effect]),
                    style: { ...element.props.style, "--attention-duration": duration } as FluxStyle,
                    onAnimationEnd: finish,
                });
            })}
        </>
    );
});

export type FluxVisualBorderBeamVariant = "sm" | "md" | "line" | "pulse-inner" | "pulse-outside";
export function FluxVisualBorderBeam({ active = true, brightness, children, className, colorVariant = "colorful", duration, hueRange = 30, onActivate, onDeactivate, radius, saturation, staticColors, strength = 1, variant = "md", ...props }: HTMLAttributes<HTMLDivElement> & { active?: boolean; brightness?: number; colorVariant?: "colorful" | "mono" | "ocean" | "sunset"; duration?: number; hueRange?: number; onActivate?: () => void; onDeactivate?: () => void; radius?: string | number; saturation?: number; staticColors?: boolean; strength?: number; variant?: FluxVisualBorderBeamVariant }) {
    const [visible, setVisible] = useState(active),
        [fading, setFading] = useState(false),
        deactivateTimer = useRef(0);
    const resolvedDuration = duration ?? (variant === "line" ? 3.1 : variant.startsWith("pulse") ? 2.3 : 1.96);
    const finishDeactivation = () => {
        window.clearTimeout(deactivateTimer.current);
        deactivateTimer.current = 0;
        setVisible(false);
        setFading(false);
        onDeactivate?.();
    };
    useEffect(() => {
        if (active) {
            window.clearTimeout(deactivateTimer.current);
            setVisible(true);
            setFading(false);
        } else if (visible) {
            setFading(true);
            deactivateTimer.current = window.setTimeout(finishDeactivation, resolvedDuration * 1000);
        }
        return () => window.clearTimeout(deactivateTimer.current);
    }, [active]);
    const variantClass = { sm: beamStyles.sm, md: beamStyles.md, line: beamStyles.line, "pulse-inner": beamStyles.pulseInner, "pulse-outside": beamStyles.pulseOutside }[variant];
    return (
        <div
            {...props}
            className={clsx(beamStyles.borderBeam, variantClass, beamStyles[colorVariant], visible && !fading && beamStyles.isActive, fading && beamStyles.isFading, staticColors && beamStyles.isStatic, className)}
            style={{ ...props.style, "--beam-brightness": brightness, "--beam-duration": resolvedDuration, "--beam-hue-range": variant === "line" ? Math.min(hueRange, 13) : hueRange, "--beam-radius": typeof radius === "number" ? `${radius}px` : radius, "--beam-saturation": saturation, "--beam-strength": Math.max(0, Math.min(1, strength)) } as FluxStyle}
            onAnimationEnd={(event) => {
                if (event.target !== event.currentTarget) return;
                if (fading) {
                    finishDeactivation();
                } else onActivate?.();
            }}
        >
            {children}
            <div aria-hidden="true" className={beamStyles.bloom} />
        </div>
    );
}
export function FluxVisualBorderShine({ children, className, colors = ["#9333ea", "transparent", "#ea580c", "transparent", "#db2777", "transparent", "#9333ea"], duration = 9, offset = 1, radius, width = 2 }: { children: ReactNode; className?: string; colors?: string[]; duration?: number; offset?: number; radius?: string | number; width?: number }) {
    const style = { "--shine-colors": colors.join(", "), "--shine-duration": duration, "--shine-offset": offset, "--shine-radius": typeof radius === "number" ? `${radius}px` : radius, "--shine-width": width } as FluxStyle;
    return (
        <>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) return child;
                const element = child as ReactElement<{ className?: string; style?: CSSProperties }>;
                return cloneElement(element, { className: clsx(element.props.className, visualStyles.borderShine, className), style: { ...element.props.style, ...style } });
            })}
        </>
    );
}

function usePatternGlow<T extends SVGElement>(enabled: boolean) {
    const ref = useRef<T>(null),
        [active, setActive] = useState(false);
    useEffect(() => {
        const root = ref.current,
            parent = root?.parentElement;
        if (!enabled || !root || !parent) return;
        const move = (event: PointerEvent) => {
            const box = parent.getBoundingClientRect();
            root.style.setProperty("--pattern-glow-x", `${event.clientX - box.left}px`);
            root.style.setProperty("--pattern-glow-y", `${event.clientY - box.top}px`);
        };
        const enter = () => setActive(true),
            leave = () => setActive(false);
        parent.addEventListener("pointermove", move);
        parent.addEventListener("pointerenter", enter);
        parent.addEventListener("pointerleave", leave);
        return () => {
            parent.removeEventListener("pointermove", move);
            parent.removeEventListener("pointerenter", enter);
            parent.removeEventListener("pointerleave", leave);
        };
    }, [enabled]);
    return { active, ref };
}
export function FluxVisualDotPattern({ className, cr = 1, cx = 1, cy = 1, glow = false, height = 16, width = 16, ...props }: SVGAttributes<SVGSVGElement> & { cr?: number; cx?: number; cy?: number; glow?: boolean; height?: number; width?: number }) {
    const id = useId().replace(/:/g, ""),
        glowId = `${id}-glow`,
        state = usePatternGlow<SVGSVGElement>(glow);
    return (
        <svg {...props} ref={state.ref} aria-hidden="true" className={clsx(visualStyles.dotPattern, className)}>
            <defs>
                <pattern id={id} width={width} height={height} patternContentUnits="userSpaceOnUse" patternUnits="userSpaceOnUse" x={-1} y={-1}>
                    <circle r={cr} cx={width / 2 - cx} cy={height / 2 - cy} />
                </pattern>
                {glow && (
                    <pattern id={glowId} width={width} height={height} patternContentUnits="userSpaceOnUse" patternUnits="userSpaceOnUse" x={-1} y={-1}>
                        <circle className={glowStyles.glowDot} r={cr} cx={width / 2 - cx} cy={height / 2 - cy} />
                    </pattern>
                )}
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
            {glow && <rect className={clsx(glowStyles.glowLayer, state.active && glowStyles.isActive)} width="100%" height="100%" strokeWidth={0} fill={`url(#${glowId})`} />}
        </svg>
    );
}
export function FluxVisualGridPattern({ className, glow = false, height = 42, squares, strokeDasharray = 0, width = 42, ...props }: SVGAttributes<SVGSVGElement> & { glow?: boolean; height?: number; squares?: Array<[number, number]>; strokeDasharray?: number | string; width?: number }) {
    const id = useId().replace(/:/g, ""),
        glowId = `${id}-glow`,
        state = usePatternGlow<SVGSVGElement>(glow),
        path = `M.5 ${height}V.5H${width}`;
    return (
        <svg {...props} ref={state.ref} aria-hidden="true" className={clsx(visualStyles.gridPattern, className)}>
            <defs>
                <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={-1} y={-1}>
                    <path d={path} fill="none" strokeDasharray={strokeDasharray} />
                </pattern>
                {glow && (
                    <pattern id={glowId} width={width} height={height} patternUnits="userSpaceOnUse" x={-1} y={-1}>
                        <path className={glowStyles.glowLine} d={path} fill="none" strokeDasharray={strokeDasharray} />
                    </pattern>
                )}
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
            {squares?.map(([x, y]) => (
                <rect key={`${x}-${y}`} width={width - 1} height={height - 1} x={x * width} y={y * height} strokeWidth={0} />
            ))}
            {glow && <rect className={clsx(glowStyles.glowLayer, state.active && glowStyles.isActive)} width="100%" height="100%" strokeWidth={0} fill={`url(#${glowId})`} />}
        </svg>
    );
}
export function FluxVisualFlickeringGrid({ className, color = "#1d4ed8", flickerChance = 0.15, gap = 6, maxOpacity = 0.3, size = 3, ...props }: HTMLAttributes<HTMLCanvasElement> & { color?: string; flickerChance?: number; gap?: number; maxOpacity?: number; size?: number }) {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        let frame = 0;
        const draw = () => {
            let context: CanvasRenderingContext2D | null = null;
            try {
                context = canvas.getContext("2d");
            } catch {
                return;
            }
            if (!context) return;
            const width = canvas.clientWidth || 300,
                height = canvas.clientHeight || 150;
            canvas.width = width;
            canvas.height = height;
            context.clearRect(0, 0, width, height);
            for (let x = 0; x < width; x += size + gap)
                for (let y = 0; y < height; y += size + gap) {
                    context.globalAlpha = Math.random() < flickerChance ? Math.random() * maxOpacity : maxOpacity / 2;
                    context.fillStyle = color;
                    context.fillRect(x, y, size, size);
                }
            if (!reducedMotion()) frame = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(frame);
    }, [color, flickerChance, gap, maxOpacity, size]);
    return <canvas {...props} ref={ref} aria-hidden="true" className={clsx(visualStyles.flickeringGrid, className)} />;
}

export type FluxVisualHighlighterVariant = "underline" | "box" | "circle" | "highlight" | "strike-through" | "crossed-off" | "bracket";
interface HighlighterDefaults {
    animationDuration?: number;
    color?: string;
    iterations?: number;
    multiline?: boolean;
    padding?: number;
    strokeWidth?: number;
    variant?: FluxVisualHighlighterVariant;
}
const HighlighterContext = createContext<HighlighterDefaults | null>(null);
export interface FluxVisualHighlighterHandle {
    hide(): void;
    replay(): void;
    show(): void;
}
export const FluxVisualHighlighter = forwardRef<FluxVisualHighlighterHandle, HTMLAttributes<HTMLSpanElement> & HighlighterDefaults & { onHidden?: () => void; onShown?: () => void; whenInView?: boolean }>(function FluxVisualHighlighter({ animationDuration, children, className, color, iterations, multiline, onHidden, onShown, padding, strokeWidth, variant, whenInView, style, ...props }, forwardedRef) {
    const group = useContext(HighlighterContext),
        [shown, setShown] = useState(!whenInView),
        ref = useRef<HTMLSpanElement>(null);
    const effective = { animationDuration: animationDuration ?? group?.animationDuration ?? 500, color: color ?? group?.color ?? "var(--warning-border)", iterations: iterations ?? group?.iterations ?? 2, multiline: multiline ?? group?.multiline ?? true, padding: padding ?? group?.padding ?? 2, strokeWidth: strokeWidth ?? group?.strokeWidth ?? 1.5, variant: variant ?? group?.variant ?? "highlight" };
    const show = () => {
            setShown(true);
            window.setTimeout(() => onShown?.(), reducedMotion() ? 0 : effective.animationDuration);
        },
        hide = () => {
            setShown(false);
            onHidden?.();
        };
    useImperativeHandle(forwardedRef, () => ({
        hide,
        replay: () => {
            hide();
            requestAnimationFrame(show);
        },
        show,
    }));
    useEffect(() => {
        if (!whenInView || !ref.current || typeof IntersectionObserver === "undefined") {
            show();
            return;
        }
        const observer = new IntersectionObserver((entries) => entries[0]?.isIntersecting && show(), { threshold: 0.1 });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [whenInView]);
    const decoration: CSSProperties = shown ? (effective.variant === "highlight" ? { background: `linear-gradient(transparent 45%, ${effective.color} 45%, ${effective.color} 90%, transparent 90%)` } : effective.variant === "underline" ? { textDecoration: `underline ${effective.strokeWidth}px ${effective.color}`, textUnderlineOffset: effective.padding } : effective.variant === "strike-through" || effective.variant === "crossed-off" ? { textDecoration: `line-through ${effective.strokeWidth}px ${effective.color}` } : { outline: `${effective.strokeWidth}px solid ${effective.color}`, outlineOffset: effective.padding, borderRadius: effective.variant === "circle" ? "50%" : undefined }) : {};
    return (
        <span {...props} ref={ref} className={clsx(highlighterStyles.highlighter, className)} style={{ ...style, ...decoration }}>
            {children}
        </span>
    );
});
export function FluxVisualHighlighterGroup({ children, className, ...defaults }: HTMLAttributes<HTMLSpanElement> & HighlighterDefaults) {
    return (
        <HighlighterContext.Provider value={defaults}>
            <span className={clsx(highlighterStyles.highlighterGroup, className)}>{children}</span>
        </HighlighterContext.Provider>
    );
}

export function FluxVisualNoise({ animated = false, blend = "overlay", className, opacity = 0.05, ...props }: HTMLAttributes<HTMLDivElement> & { animated?: boolean; blend?: "normal" | "multiply" | "screen" | "overlay" | "soft-light" | "plus-lighter"; opacity?: number }) {
    return <div {...props} aria-hidden="true" className={clsx(noiseStyles.noise, animated && noiseStyles.animated, className)} style={{ ...props.style, "--noise-blend": blend, "--noise-opacity": opacity } as FluxStyle} />;
}
export type FluxVisualNumberFlowEasing = "linear" | "ease-in" | "ease-out" | "ease-in-out" | `cubic-bezier(${string})` | ((progress: number) => number);
export function FluxVisualNumberFlow({ animateOnMount = true, className, duration = 800, easing = "ease-out", format, locale, value, ...props }: HTMLAttributes<HTMLSpanElement> & { animateOnMount?: boolean; duration?: number; easing?: FluxVisualNumberFlowEasing; format?: Intl.NumberFormatOptions; locale?: string; value: number }) {
    const formatter = useMemo(() => new Intl.NumberFormat(locale, format ?? { maximumFractionDigits: 0 }), [locale, JSON.stringify(format)]),
        [display, setDisplay] = useState(animateOnMount ? 0 : value),
        current = useRef(display);
    useEffect(() => {
        const from = current.current,
            start = performance.now();
        let frame = 0;
        const ease = typeof easing === "function" ? easing : easing === "linear" ? (x: number) => x : easing === "ease-in" ? (x: number) => x * x : easing === "ease-in-out" ? (x: number) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2) : (x: number) => 1 - (1 - x) ** 2;
        const tick = (now: number) => {
            const progress = reducedMotion() || duration <= 0 ? 1 : Math.min(1, (now - start) / duration),
                next = from + (value - from) * ease(progress);
            current.current = next;
            setDisplay(next);
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [duration, easing, value]);
    return (
        <span {...props} aria-label={formatter.format(value)} className={clsx(numberStyles.numberFlow, className)}>
            {formatter.format(display)}
        </span>
    );
}
function hexAlpha(color: string | undefined) {
    if (!color?.startsWith("#")) return "transparent";
    const value = color.slice(1);
    const full =
        value.length === 3
            ? value
                  .split("")
                  .map((part) => part + part)
                  .join("")
            : value;
    return full.length >= 6 ? `rgb(${parseInt(full.slice(0, 2), 16)} ${parseInt(full.slice(2, 4), 16)} ${parseInt(full.slice(4, 6), 16)} / .15)` : "transparent";
}
export function FluxVisualPaneIllustration({ animatedColors, animatedOpacity, animatedSeed, aspectRatio = 16 / 9, children, className, controlled, isMasked }: HTMLAttributes<HTMLDivElement> & { animatedColors: string[]; animatedOpacity?: number; animatedSeed?: number; aspectRatio?: number; controlled?: ReactNode; isMasked?: boolean }) {
    return (
        <div data-flux-pane-illustration className={clsx(isMasked ? paneStyles.paneIllustrationMasked : paneStyles.paneIllustration, className)} style={{ aspectRatio }}>
            <div className={paneStyles.paneIllustrationMagic} style={{ border: `1px solid ${hexAlpha(animatedColors[0])}` }}>
                <FluxVisualGridPattern strokeDasharray={3} />
                <FluxVisualAnimatedColors colors={animatedColors} opacity={animatedOpacity} seed={animatedSeed} />
            </div>
            {controlled && <div className={paneStyles.paneIllustrationContentControlled}>{controlled}</div>}
            {children && <div className={paneStyles.paneIllustrationContent}>{children}</div>}
        </div>
    );
}
export function FluxVisualPing({ color = "success", duration = 1.4, size = 9 }: { color?: FluxColor; duration?: number; size?: number }) {
    return <span aria-hidden="true" className={pingStyles.ping} style={{ "--ping-color": `var(--${color}-solid)`, "--ping-size": `${size}px`, "--ping-duration": duration } as FluxStyle} />;
}

export interface FluxVisualSlotTextHandle {
    flash(text: string, options?: { revertAfter?: number }): void;
    set(text: string): void;
}
export const FluxVisualSlotText = forwardRef<FluxVisualSlotTextHandle, { bounce?: number; chromatic?: boolean; color?: string; colorFade?: number; direction?: "up" | "down"; duration?: number; easing?: string; exitOffset?: number; interrupt?: boolean; skipUnchanged?: boolean; stagger?: number; text: string }>(function FluxVisualSlotText({ chromatic, color, direction = "down", duration = 300, stagger = 45, text }, forwardedRef) {
    const [display, setDisplay] = useState(text),
        resting = useRef(text),
        timer = useRef(0);
    useEffect(() => {
        resting.current = text;
        setDisplay(text);
    }, [text]);
    useImperativeHandle(forwardedRef, () => ({
        set: setDisplay,
        flash(next, options) {
            clearTimeout(timer.current);
            setDisplay(next);
            timer.current = window.setTimeout(() => setDisplay(resting.current), options?.revertAfter ?? 1400);
        },
    }));
    useEffect(() => () => clearTimeout(timer.current), []);
    return (
        <span className={slotStyles.slotText} aria-label={display}>
            {Array.from(display).map((char, index) => (
                <span key={`${index}-${char}`} className={slotStyles.charSlot} style={{ transition: `transform ${duration}ms`, transitionDelay: `${index * stagger}ms`, transform: direction === "up" ? "translateY(0)" : undefined, color: chromatic ? `hsl(${(index / Math.max(1, display.length - 1)) * 320} 92% 60%)` : color }}>
                    <span className={slotStyles.charSizer}>{char === " " ? "\u00a0" : char}</span>
                    <span className={slotStyles.charFace}>{char === " " ? "\u00a0" : char}</span>
                </span>
            ))}
        </span>
    );
});
export interface FluxVisualTextScrambleHandle {
    replay(): void;
    set(text: string): void;
}
export const FluxVisualTextScramble = forwardRef<FluxVisualTextScrambleHandle, { characters?: string; className?: string; duration?: number; onFinished?: () => void; skipUnchanged?: boolean; speed?: number; stagger?: number; text: string }>(function FluxVisualTextScramble({ characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", className, duration = 900, onFinished, speed = 45, text }, forwardedRef) {
    const [display, setDisplay] = useState(text),
        current = useRef(text),
        timer = useRef(0);
    const scramble = (next: string) => {
        clearInterval(timer.current);
        if (duration <= 0 || reducedMotion()) {
            current.current = next;
            setDisplay(next);
            onFinished?.();
            return;
        }
        const start = performance.now(),
            from = current.current;
        timer.current = window.setInterval(() => {
            const progress = Math.min(1, (performance.now() - start) / duration);
            setDisplay(Array.from({ length: Math.max(from.length, next.length) }, (_, index) => (progress > index / Math.max(1, next.length) ? (next[index] ?? "") : characters[Math.floor(Math.random() * characters.length)])).join(""));
            if (progress >= 1) {
                clearInterval(timer.current);
                current.current = next;
                setDisplay(next);
                onFinished?.();
            }
        }, speed);
    };
    useEffect(() => scramble(text), [text]);
    useEffect(() => () => clearInterval(timer.current), []);
    useImperativeHandle(forwardedRef, () => ({
        replay: () => {
            current.current = "";
            scramble(text);
        },
        set: scramble,
    }));
    return (
        <span aria-label={text} className={clsx(scrambleStyles.textScramble, className)}>
            {display}
        </span>
    );
});
export function FluxVisualTextShimmer({ children, className, color, duration = 2, shimmerColor, spread = 15, ...props }: HTMLAttributes<HTMLSpanElement> & { color?: string; duration?: number; shimmerColor?: string; spread?: number }) {
    return (
        <span {...props} className={clsx(shimmerStyles.textShimmer, className)} style={{ ...props.style, "--shimmer-duration": `${duration}s`, "--shimmer-spread": spread, "--shimmer-base": color, "--shimmer-color": shimmerColor } as FluxStyle}>
            {children}
        </span>
    );
}
