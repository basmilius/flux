import {useCallback, useLayoutEffect, useRef, useState, type RefObject} from 'react';

export const TREE_STEP = 24;
export const TREE_MARKER_SIZE = 18;
const CORNER_RADIUS = 9;
const MARKER_RADIUS = TREE_MARKER_SIZE / 2;
const MARKER_GAP = 3;
type TreeNodeRegistration = {element: HTMLElement; level: number};
type MeasuredNode = {x: number; top: number; bottom: number; level: number};

export function useTableTree(container: RefObject<HTMLElement | null>) {
    const registrations = useRef(new Set<TreeNodeRegistration>());
    const [treeLines, setTreeLines] = useState('');
    const frame = useRef(0);
    const measure = useCallback(() => {
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            const root = container.current;
            if (!root || !registrations.current.size) {
                setTreeLines('');
                return;
            }
            if (root.offsetParent === null || !root.offsetHeight) return;
            const nodes = Array.from(registrations.current, entry => measureNode(entry, root))
                .filter((node): node is MeasuredNode => node !== null)
                .sort((a, b) => a.top - b.top);
            setTreeLines(buildPath(nodes));
        });
    }, [container]);
    const registerTreeNode = useCallback((element: HTMLElement, level: number) => {
        const registration = {element, level};
        registrations.current.add(registration);
        measure();
        return () => {
            registrations.current.delete(registration);
            measure();
        };
    }, [measure]);
    useLayoutEffect(() => {
        const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
        if (container.current) observer?.observe(container.current);
        measure();
        return () => {observer?.disconnect(); cancelAnimationFrame(frame.current);};
    }, [container, measure]);
    return {registerTreeNode, treeLines};
}

// offsetTop/offsetLeft are relative to the offsetParent, which is normally the row
// group itself. A pinned cell is sticky and therefore becomes the offsetParent of
// its own branch, so walk up until the container is reached. Unlike
// getBoundingClientRect() these ignore transforms — the path stays correct inside a
// scale transition — and they report the layout position rather than the
// sticky-shifted one, which is what the path, absolutely positioned in the row
// group, is drawn against.
function measureNode(registration: TreeNodeRegistration, root: HTMLElement): MeasuredNode | null {
    const element = registration.element;

    if (!element) {
        return null;
    }

    let left = 0;
    let top = 0;
    let current: HTMLElement | null = element;

    while (current && current !== root) {
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
    }

    if (current !== root) {
        return null;
    }

    return {
        x: left,
        top,
        bottom: top + element.offsetHeight,
        level: registration.level
    };
}

function columnX(node: MeasuredNode, column: number): number {
    return node.x + column * TREE_STEP + TREE_STEP / 2;
}

// Walk bottom-up: at any index `open` still describes the nodes below it, which is
// exactly what decides whether that node is the last of its siblings and which
// ancestor branches still need a guide line. Segments come out bottom-up, which is
// harmless — each one starts with its own move command.
function buildPath(nodes: MeasuredNode[]): string {
    const open: boolean[] = [];
    const segments: string[] = [];

    for (let index = nodes.length - 1; index >= 0; index--) {
        const node = nodes[index];
        const {bottom, level, top} = node;
        const centerY = (top + bottom) / 2;
        const isLast = !open[level];
        const hasChildren = index + 1 < nodes.length && nodes[index + 1].level === level + 1;

        for (let depth = 1; depth < level; depth++) {
            if (open[depth]) {
                const x = columnX(node, depth - 1);
                segments.push(`M${x} ${top}V${bottom}`);
            }
        }

        if (level > 0) {
            const x = columnX(node, level - 1);
            // Stop the connector a small gap short of the marker; the rounded
            // stroke cap then gives the line end a soft finish next to the dot.
            const endX = columnX(node, level) - MARKER_RADIUS - MARKER_GAP;
            segments.push(`M${x} ${top}V${isLast ? centerY - CORNER_RADIUS : bottom}`);
            segments.push(`M${x} ${centerY - CORNER_RADIUS}Q${x} ${centerY} ${x + CORNER_RADIUS} ${centerY}H${endX}`);
        }

        if (hasChildren) {
            const x = columnX(node, level);
            // Same gap below the marker before the line drops to its children.
            segments.push(`M${x} ${centerY + MARKER_RADIUS + MARKER_GAP}V${bottom}`);
        }

        for (let depth = level + 1; depth < open.length; depth++) {
            open[depth] = false;
        }

        open[level] = true;
    }

    return segments.join(' ');
}
