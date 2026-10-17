import {useLayoutEffect, useState, type RefObject} from 'react';
import type {FluxFlowEdgeRecord} from '../FlowUtilities';

export function useFlowLabels(root: RefObject<HTMLDivElement | null>, edges: readonly FluxFlowEdgeRecord[]) {
    const [boxes, setBoxes] = useState<readonly {id: string; x: number; y: number; width: number; height: number}[]>([]);
    const geometry = edges.filter(edge => edge.spec?.label || edge.spec?.icon).map(edge => `${edge.id}:${edge.spec!.labelX}:${edge.spec!.labelY}`).join('|');
    useLayoutEffect(() => {
        const element = root.current;
        if (!element) return;
        const measure = () => {
            const next = [...element.children].flatMap(child => {
                const badge = child as HTMLElement;
                const edge = edges.find(edge => String(edge.id) === badge.dataset.flowEdge);
                const spec = edge?.spec;
                if (!spec) return [];
                const width = badge.offsetWidth, height = badge.offsetHeight;
                return [{id: String(edge!.id), x: spec.labelX - width / 2 - 6, y: spec.labelY - height / 2 - 6, width: width + 12, height: height + 12}];
            });
            setBoxes(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
        };
        const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
        for (const child of element.children) observer?.observe(child);
        measure();
        return () => observer?.disconnect();
    }, [root, geometry]);
    return boxes;
}
