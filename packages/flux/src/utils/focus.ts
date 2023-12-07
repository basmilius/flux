const FOCUSABLE_ELEMENTS = [
    'a:not([disabled])',
    'button:not([disabled])',
    'input[type=checkbox]:not([disabled])',
    'input[type=radio]:not([disabled])',
    'input[type=text]:not([disabled])',
    '[tabindex]:not([disabled]):not([tabindex="-1"])'
].join(',');

export function getBidirectionalFocusElement(container: HTMLElement, currentElement: HTMLElement, direction: BidirectionalDirection): HTMLElement | null {
    const elements = getFocusableElements(container);
    const currentIndex = elements.indexOf(currentElement);

    if (currentIndex === -1) {
        return null;
    }

    const elementInfos = getBidirectionalInfoForElements(elements);

    calculateBidirectionalDistances(elementInfos, currentIndex, direction);

    let candidate = determineBidirectionalCandidate(currentIndex, direction, elementInfos, elements);

    if (!candidate) {
        if (direction === 'up' || direction === 'left') {
            candidate = elements[currentIndex - 1];
        }

        if (direction === 'down' || direction === 'right') {
            candidate = elements[currentIndex + 1];
        }
    }

    return candidate;
}

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter(isHTMLElement)
        .filter(elm => elm.offsetWidth > 0 || elm.offsetHeight > 0 || elm === document.activeElement);
}

export function getFocusableElement(container: HTMLElement, direction: number, activeElement: HTMLElement | undefined = undefined): HTMLElement | undefined {
    const elements = getFocusableElements(container);
    const focusedElement = activeElement || document.activeElement;

    if (!focusedElement || !isHTMLElement(focusedElement))
        return elements[0] || undefined;

    const currentIndex = elements.indexOf(focusedElement);

    return elements[currentIndex + direction] || undefined;
}

export function wrapFocus(elm: HTMLElement, targetElm: Element, forceFirst: boolean = false): void {
    const walker = createFocusWalker(elm);
    const position = targetElm.compareDocumentPosition(elm);
    let wrappedTarget: HTMLElement | null;

    if (position && Node.DOCUMENT_POSITION_PRECEDING || forceFirst) {
        wrappedTarget = walker.firstChild() as HTMLElement | null;
    } else {
        wrappedTarget = walker.lastChild() as HTMLElement | null;
    }

    const newFocus = wrappedTarget !== null ? wrappedTarget : elm;
    newFocus.focus();
}

function createFocusWalker(elm: HTMLElement): TreeWalker {
    return document.createTreeWalker(elm, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node: HTMLButtonElement) => node.tabIndex >= 0 && !node.disabled ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    });
}

function calculateBidirectionalDistances(elementInfos: BidirectionalInfo[], currentIndex: number, direction: BidirectionalDirection): void {
    const current = elementInfos[currentIndex];

    elementInfos.forEach(r => {
        let point = r.center;

        switch (direction) {
            case 'up':
                point = {x: point.x, y: r.top + r.height};
                break;

            case 'down':
                point = {x: point.x, y: r.top};
                break;

            case 'left':
                point = {x: r.left + r.width, y: point.y};
                break;

            case 'right':
                point = {x: r.left, y: point.y};
                break;
        }

        r.distance = Math.sqrt(Math.pow(current.center.x - point.x, 2) + Math.pow(current.center.y - point.y, 2));
    });
}

function determineBidirectionalCandidate(currentIndex: number, direction: BidirectionalDirection, elementInfos: BidirectionalInfo[], elements: HTMLElement[]): HTMLElement | null {
    const current = elementInfos[currentIndex];
    let distances: number[] = [];

    switch (direction) {
        case 'up':
            distances = elementInfos.map((r, index) => index === currentIndex || r.top + r.height > current.top ? Number.MAX_SAFE_INTEGER : r.distance);
            break;

        case 'down':
            distances = elementInfos.map((r, index) => index === currentIndex || r.top < current.top + current.height ? Number.MAX_SAFE_INTEGER : r.distance);
            break;

        case 'left':
            distances = elementInfos.map((r, index) => index === currentIndex || r.left + r.width > current.left ? Number.MAX_SAFE_INTEGER : r.distance);
            break;

        case 'right':
            distances = elementInfos.map((r, index) => index === currentIndex || r.left < current.left + current.width ? Number.MAX_SAFE_INTEGER : r.distance);
            break;
    }

    const candidateIndex = distances.indexOf(Math.min(...distances));

    if (distances[candidateIndex] !== Number.MAX_SAFE_INTEGER) {
        return elements[candidateIndex];
    }

    return null;
}

function getBidirectionalInfoForElements(elements: HTMLElement[]): BidirectionalInfo[] {
    return elements
        .map(elm => elm.getBoundingClientRect())
        .map(rect => ({
            height: rect.height,
            width: rect.width,
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            center: {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            },
            distance: 0
        }));
}

function isHTMLElement(elm: Element): elm is HTMLElement {
    return elm instanceof HTMLElement;
}

class FocusTrapLockStack {
    get active(): boolean {
        return this.current?.isEnabled ?? false;
    }

    get current(): FocusTrap | null {
        return this.#traps[this.#traps.length - 1] ?? null;
    }

    #listeners: FocusTrapListener[] = [];
    #traps: FocusTrap[] = [];

    add(id: FocusTrap['id'], setEnabled: FocusTrap['setEnabled'], autoFocus: boolean = true): void {
        const trap: FocusTrap = {id, setEnabled, isEnabled: true};
        this.current && this.toggle(this.current, false);
        this.#traps.push(trap);

        if (autoFocus) {
            this.toggle(trap, true);
            this.emit();
        }
    }

    remove(id: FocusTrap['id']): void {
        const trap = this.#traps.find(t => t.id === id);
        trap && this.toggle(trap, false);

        const current = this.current;
        const wasCurrent = current?.id === id;
        this.#traps = this.#traps.filter(t => t.id !== id);

        wasCurrent && this.current && this.toggle(this.current, true);
        this.emit();
    }

    emit(): void {
        this.#listeners.forEach(listener => listener(this.active, this.#traps));
    }

    subscribe(listener: FocusTrapListener): () => void {
        this.#listeners.push(listener);
        listener(this.active, this.#traps);

        return () => this.#listeners = this.#listeners.filter(l => l !== listener);
    }

    toggle(trap: FocusTrap, isEnabled: boolean): void {
        trap.setEnabled(isEnabled);
        trap.isEnabled = isEnabled;
    }
}

interface FocusTrap {
    id: string;
    isEnabled: boolean;

    setEnabled(isEnabled: boolean): void;
}

export type FocusTrapListener = (isEnabled: boolean, focusTraps: FocusTrap[]) => void;

export type BidirectionalDirection = 'up' | 'down' | 'left' | 'right';
export type BidirectionalInfo = Omit<DOMRect, 'x' | 'y' | 'toJSON'> & {
    center: { x: number; y: number; };
    distance: number;
};

export const FOCUS_TRAP_LOCKS = new FocusTrapLockStack();
