import { animationFrameDebounce } from '@flux-ui/internals';
import { onMounted, onUnmounted, ref, type Ref, watch } from 'vue';

export const TREE_STEP = 24;
export const TREE_MARKER_SIZE = 22;

const CORNER_RADIUS = 9;
const MARKER_RADIUS = TREE_MARKER_SIZE / 2;
const MARKER_GAP = 3;

type TreeNodeRegistration = {
    readonly element: Readonly<Ref<HTMLElement | null>>;
    readonly level: Readonly<Ref<number>>;
};

type MeasuredNode = {
    readonly x: number;
    readonly top: number;
    readonly bottom: number;
    readonly level: number;
};

/**
 * Draws the guide lines for every tree cell inside a table as a single SVG path.
 * Tree cells register their branch element and level; the path is (re)measured
 * from the cells that are actually rendered, so collapsing a branch — rendering
 * fewer cells — keeps the lines correct on its own. Because the geometry is
 * measured, the connectors can bend into their marker with a real rounded corner.
 *
 * Measuring is the expensive half: it reads the layout of every registered cell.
 * Every trigger therefore runs through one animation-frame debounce, so a table
 * mounting a thousand rows measures once instead of once per mount or resize.
 */
export function useTableTree(container: Readonly<Ref<HTMLElement | null>>) {
    // A plain Set: the registrations are only ever read from `measure`, which is
    // driven by explicit calls rather than by an effect. A reactive proxy would
    // only tax the mount, where every tree cell adds one entry.
    const registrations = new Set<TreeNodeRegistration>();
    const treeLines = ref('');

    let measured: MeasuredNode[] = [];

    // Nothing about the path changes unless a cell moved, resized or (un)registered.
    // Bailing out here keeps a resize that only nudged the row group from rebuilding
    // a path string that runs into the tens of thousands of characters.
    function isUnchanged(nodes: MeasuredNode[]): boolean {
        if (nodes.length !== measured.length) {
            return false;
        }

        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            const previous = measured[index];

            if (node.level !== previous.level || node.top !== previous.top || node.bottom !== previous.bottom || node.x !== previous.x) {
                return false;
            }
        }

        return true;
    }

    const measure = animationFrameDebounce(() => {
        const root = container.value;

        if (!root || registrations.size === 0) {
            measured = [];
            treeLines.value = '';
            return;
        }

        // A hidden table has no layout to read. Keep the previous path so the lines
        // are already correct the moment it becomes visible again.
        if (root.offsetParent === null || root.offsetHeight === 0) {
            return;
        }

        const nodes: MeasuredNode[] = [];

        for (const registration of registrations) {
            const node = measureNode(registration, root);

            if (node) {
                nodes.push(node);
            }
        }

        nodes.sort((a, b) => a.top - b.top);

        if (isUnchanged(nodes)) {
            return;
        }

        measured = nodes;
        treeLines.value = buildPath(nodes);
    });

    function registerTreeNode(element: Readonly<Ref<HTMLElement | null>>, level: Readonly<Ref<number>>): () => void {
        const registration: TreeNodeRegistration = {element, level};

        registrations.add(registration);
        measure();

        return () => {
            registrations.delete(registration);
            measure();
        };
    }

    let observer: ResizeObserver | null = null;

    onMounted(() => {
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(measure);

            if (container.value) {
                observer.observe(container.value);
            }
        }

        measure();
    });

    onUnmounted(() => observer?.disconnect());

    watch(container, element => {
        observer?.disconnect();

        if (observer && element) {
            observer.observe(element);
        }
    });

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
    const element = registration.element.value;

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
        level: registration.level.value
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
