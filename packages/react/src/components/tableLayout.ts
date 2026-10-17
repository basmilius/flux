import {useLayoutEffect, useState, type RefObject} from 'react';
import type {FluxTableColumnDef} from './Tables';
import styles from '~flux/components/css/component/Table.module.scss';

export function useTableLayout(base: RefObject<HTMLDivElement | null>, columns: FluxTableColumnDef[], template: string) {
    const [layout, setLayout] = useState({count: 0, pinnedEdges: {start: -1, end: -1}, pinnedOffsets: new Map<number, number>()});
    useLayoutEffect(() => {
        const root = base.current;
        if (!root) return;
        const grid = root.querySelector<HTMLElement>(`.${styles.tableBase}`);
        const head = root.querySelector<HTMLElement>(`.${styles.tableHead}`);
        const body = root.querySelector<HTMLElement>(`.${styles.tableBody}`);
        const foot = root.querySelector<HTMLElement>(`.${styles.tableFoot}`);
        let frame = 0;
        let previousTemplate = '';
        const measure = () => {
            const resolved = grid ? getComputedStyle(grid).gridTemplateColumns : '';
            const headHeight = head?.offsetHeight ?? 0;
            const footHeight = foot?.offsetHeight ?? 0;
            root.style.setProperty('--flux-table-head-height', `${headHeight}px`);
            root.toggleAttribute('data-scrolled-start', root.scrollLeft > 0);
            root.toggleAttribute('data-scrollable-end', root.scrollLeft < root.scrollWidth - root.clientWidth);
            const loader = root.querySelector<HTMLElement>(`.${styles.tableLoader.split(' ').join('.')}`);
            if (loader) Object.assign(loader.style, {
                transform: `translate(${root.scrollLeft}px, ${root.scrollTop}px)`,
                top: `${headHeight}px`, bottom: `${footHeight}px`,
                borderTopLeftRadius: headHeight > 0 ? '0' : '', borderTopRightRadius: headHeight > 0 ? '0' : '',
                borderBottomLeftRadius: footHeight > 0 ? '0' : '', borderBottomRightRadius: footHeight > 0 ? '0' : ''
            });
            let startIndices = columns.flatMap((column, i) => column.pinned === 'start' ? [i] : []);
            let endIndices = columns.flatMap((column, i) => column.pinned === 'end' ? [i] : []);
            let count = 0;
            const row = body?.querySelector(`.${styles.tableRow}`);
            for (const cell of row?.children ?? []) {
                const span = Math.max(1, Number(cell.getAttribute('aria-colspan') ?? 1));
                if (!columns.length) {
                    for (let i = count; i < count + span; i++) {
                        if (cell.classList.contains(styles.isPinnedStart)) startIndices.push(i);
                        else if (cell.classList.contains(styles.isPinnedEnd)) endIndices.push(i);
                    }
                }
                count += span;
            }
            const widths = resolved.split(' ').map(Number.parseFloat).filter(Number.isFinite);
            const lefts: number[] = [];
            let total = 0;
            for (const width of widths) {lefts.push(total); total += width;}
            const rights = lefts.map((left, i) => total - left - widths[i]);
            const pinnedOffsets = new Map<number, number>();
            for (const i of startIndices) pinnedOffsets.set(i, lefts[i] - lefts[startIndices[0]]);
            for (const i of endIndices) pinnedOffsets.set(i, rights[i] - rights[endIndices.at(-1)!]);
            const pinnedEdges = {start: startIndices.at(-1) ?? -1, end: endIndices[0] ?? -1};
            setLayout(previous => previous.count === count && previous.pinnedEdges.start === pinnedEdges.start && previous.pinnedEdges.end === pinnedEdges.end && previous.pinnedOffsets.size === pinnedOffsets.size && [...pinnedOffsets].every(([key, value]) => previous.pinnedOffsets.get(key) === value) ? previous : {count, pinnedEdges, pinnedOffsets});
            // WebKit needs a row-track invalidation after subgrid columns change.
            if (resolved !== previousTemplate) {
                previousTemplate = resolved;
                for (const group of [head, body, foot]) if (group) group.style.gridAutoRows = group.style.gridAutoRows === 'max-content' ? '' : 'max-content';
            }
        };
        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(measure);
        };
        const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
        for (const element of [root, grid, head, body, foot]) if (element) observer?.observe(element);
        const mutation = new MutationObserver(schedule);
        mutation.observe(root, {childList: true, subtree: true});
        root.addEventListener('scroll', schedule, {passive: true});
        measure();
        return () => {observer?.disconnect(); mutation.disconnect(); root.removeEventListener('scroll', schedule); cancelAnimationFrame(frame);};
    }, [base, columns, template]);
    return layout;
}
