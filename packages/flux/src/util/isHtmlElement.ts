export default function (elm: unknown): elm is HTMLElement {
    return elm instanceof HTMLElement;
}
