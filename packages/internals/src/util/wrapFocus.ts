export default function (elm: HTMLElement, targetElm: Element, forceFirst: boolean = false): void {
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
