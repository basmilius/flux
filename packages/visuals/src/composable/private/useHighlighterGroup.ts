import { annotationGroup } from 'rough-notation';
import { inject, onScopeDispose, provide, type InjectionKey } from 'vue';

type Annotation = Parameters<typeof annotationGroup>[0][number];

export type HighlighterVariant = 'highlight' | 'box' | 'circle' | 'underline' | 'strike-through' | 'crossed-off' | 'bracket';

export type HighlighterGroupProps = {
    readonly variant?: HighlighterVariant;
    readonly color?: string;
    readonly strokeWidth?: number;
    readonly animationDuration?: number;
    readonly iterations?: number;
    readonly padding?: number;
    readonly multiline?: boolean;
    readonly whenInView?: boolean;
};

export type HighlighterGroupEntry = {
    readonly element: HTMLElement;
    getAnnotation(): Annotation | null;
};

export type HighlighterGroupContext = {
    readonly defaults: HighlighterGroupProps;
    add(entry: HighlighterGroupEntry): void;
    remove(entry: HighlighterGroupEntry): void;
    notify(): void;
};

const FluxVisualHighlighterGroupInjectionKey: InjectionKey<HighlighterGroupContext> = Symbol('flux-visual-highlighter-group');

/**
 * Injects the enclosing highlighter group, if any. A `FluxVisualHighlighter`
 * that finds a group registers its annotation with it and lets the group drive
 * the cascade instead of drawing itself.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function useHighlighterGroupInjection(): HighlighterGroupContext | null {
    return inject(FluxVisualHighlighterGroupInjectionKey, null);
}

/**
 * Collects the annotations of the descendant highlighters and reveals them as a
 * single rough-notation group, so they draw one after another in document order
 * rather than all at once. The draw is debounced so the initial burst of child
 * registrations (and any surrounding chrome settling its layout) coalesces into
 * one cascade, and — when `whenInView` is set — it waits until the first
 * highlighter scrolls into view. rough-notation keeps the drawn annotations
 * aligned on later resizes itself.
 *
 * The reactive props object is provided as `defaults` on the group context, so
 * descendant highlighters can inherit annotation props they don't set themselves.
 *
 * @param props The reactive props of the group component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export default function useHighlighterGroup(props: HighlighterGroupProps): void {
    const whenInView = props.whenInView ?? false;
    const entries = new Set<HighlighterGroupEntry>();

    let group: ReturnType<typeof annotationGroup> | null = null;
    let timer: number | undefined;
    let settleObserver: ResizeObserver | null = null;
    let inViewObserver: IntersectionObserver | null = null;
    let inView = !whenInView;

    function orderedAnnotations(): Annotation[] {
        return [...entries]
            .sort((a, b) => a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
            .map(entry => entry.getAnnotation())
            .filter((annotation): annotation is Annotation => annotation !== null);
    }

    function draw(): void {
        if (!inView) {
            return;
        }

        const annotations = orderedAnnotations();

        if (annotations.length === 0) {
            return;
        }

        // annotationGroup writes cumulative animation delays onto the annotations,
        // so a fresh group is rebuilt whenever the members change.
        group?.hide();
        group = annotationGroup(annotations);
        group.show();

        stopSettleWatch();
    }

    function schedule(): void {
        clearTimeout(timer);
        timer = setTimeout(() => draw(), 80);
    }

    function stopSettleWatch(): void {
        settleObserver?.disconnect();
        settleObserver = null;
    }

    // Draw the first cascade only once the surrounding layout has stopped moving,
    // so the animation plays over the text instead of where it sat pre-layout.
    function watchSettle(): void {
        if (settleObserver || typeof ResizeObserver === 'undefined') {
            return;
        }

        settleObserver = new ResizeObserver(() => schedule());
        settleObserver.observe(document.body);
    }

    function watchInView(element: HTMLElement): void {
        if (!whenInView || inViewObserver || typeof IntersectionObserver === 'undefined') {
            return;
        }

        inViewObserver = new IntersectionObserver(observed => {
            if (observed.some(entry => entry.isIntersecting)) {
                inView = true;
                inViewObserver?.disconnect();
                inViewObserver = null;
                schedule();
            }
        });

        inViewObserver.observe(element);
    }

    provide(FluxVisualHighlighterGroupInjectionKey, {
        defaults: props,
        add(entry) {
            entries.add(entry);
            watchInView(entry.element);
            watchSettle();
            schedule();
        },
        remove(entry) {
            entries.delete(entry);
            schedule();
        },
        notify() {
            schedule();
        }
    });

    onScopeDispose(() => {
        clearTimeout(timer);
        stopSettleWatch();
        inViewObserver?.disconnect();
        inViewObserver = null;
        group?.hide();
        group = null;
    });
}
