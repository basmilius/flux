import { nextTick, onMounted, onUnmounted, ref, shallowReactive, watch, type Ref } from 'vue';

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
    readonly centerY: number;
    readonly level: number;
};

/**
 * Draws the guide lines for every tree cell inside a table as a single SVG path.
 * Tree cells register their branch element and level; the path is (re)measured
 * from the cells that are actually rendered, so collapsing a branch — rendering
 * fewer cells — keeps the lines correct on its own. Because the geometry is
 * measured, the connectors can bend into their marker with a real rounded corner.
 */
export function useTableTree(container: Readonly<Ref<HTMLElement | null>>) {
    const registrations = shallowReactive(new Set<TreeNodeRegistration>());
    const treeLines = ref('');

    function registerTreeNode(element: Readonly<Ref<HTMLElement | null>>, level: Readonly<Ref<number>>): () => void {
        const registration: TreeNodeRegistration = {element, level};

        registrations.add(registration);
        scheduleMeasure();

        return () => {
            registrations.delete(registration);
            scheduleMeasure();
        };
    }

    let scheduled = false;

    function scheduleMeasure(): void {
        if (scheduled) {
            return;
        }

        scheduled = true;

        nextTick(() => {
            measure();
            scheduled = false;
        });
    }

    function measure(): void {
        const root = container.value;

        if (!root) {
            treeLines.value = '';
            return;
        }

        const rootRect = root.getBoundingClientRect();

        // getBoundingClientRect() reports transformed coordinates, so measuring
        // while the table sits inside a CSS scale transition would bake the scaled
        // sizes into the path. offsetWidth/offsetHeight ignore transforms, so their
        // ratio gives the effective scale, letting us normalise back to layout px.
        const scaleX = rootRect.width / root.offsetWidth;
        const scaleY = rootRect.height / root.offsetHeight;

        if (!Number.isFinite(scaleX) || !Number.isFinite(scaleY) || scaleX <= 0 || scaleY <= 0) {
            // Degenerate scale (e.g. a scale(0) enter frame); keep the previous path
            // and let the next, non-degenerate measure produce the correct geometry.
            return;
        }

        const nodes = Array.from(registrations)
            .map((registration): MeasuredNode | null => {
                const element = registration.element.value;

                if (!element) {
                    return null;
                }

                const rect = element.getBoundingClientRect();
                const top = (rect.top - rootRect.top) / scaleY;
                const height = rect.height / scaleY;

                return {
                    x: (rect.left - rootRect.left) / scaleX,
                    top,
                    bottom: top + height,
                    centerY: top + height / 2,
                    level: registration.level.value
                };
            })
            .filter((node): node is MeasuredNode => node !== null)
            .sort((a, b) => a.top - b.top);

        treeLines.value = buildPath(nodes);
    }

    let observer: ResizeObserver | null = null;

    onMounted(() => {
        observer = new ResizeObserver(() => measure());

        if (container.value) {
            observer.observe(container.value);
        }

        scheduleMeasure();
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

function buildPath(nodes: MeasuredNode[]): string {
    // Walk bottom-up so each node knows which ancestor branches are still open
    // below it (guide lines to draw) and whether it is the last of its siblings.
    const open: boolean[] = [];
    const guides = nodes.map(() => ({isLast: true, lineGuides: [] as boolean[]}));

    for (let index = nodes.length - 1; index >= 0; index--) {
        const {level} = nodes[index];

        guides[index] = {
            isLast: !open[level],
            lineGuides: Array.from({length: level}, (_, depth) => open[depth] ?? false)
        };

        for (let depth = level + 1; depth < open.length; depth++) {
            open[depth] = false;
        }

        open[level] = true;
    }

    const segments: string[] = [];

    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        const {isLast, lineGuides} = guides[index];
        const columnX = (column: number) => node.x + column * TREE_STEP + TREE_STEP / 2;
        const hasChildren = index + 1 < nodes.length && nodes[index + 1].level === node.level + 1;

        for (let depth = 1; depth < node.level; depth++) {
            if (lineGuides[depth]) {
                const x = columnX(depth - 1);
                segments.push(`M${x} ${node.top}V${node.bottom}`);
            }
        }

        if (node.level > 0) {
            const x = columnX(node.level - 1);
            // Stop the connector a small gap short of the marker; the rounded
            // stroke cap then gives the line end a soft finish next to the dot.
            const endX = columnX(node.level) - MARKER_RADIUS - MARKER_GAP;
            segments.push(`M${x} ${node.top}V${isLast ? node.centerY - CORNER_RADIUS : node.bottom}`);
            segments.push(`M${x} ${node.centerY - CORNER_RADIUS}Q${x} ${node.centerY} ${x + CORNER_RADIUS} ${node.centerY}H${endX}`);
        }

        if (hasChildren) {
            const x = columnX(node.level);
            // Same gap below the marker before the line drops to its children.
            segments.push(`M${x} ${node.centerY + MARKER_RADIUS + MARKER_GAP}V${node.bottom}`);
        }
    }

    return segments.join(' ');
}
