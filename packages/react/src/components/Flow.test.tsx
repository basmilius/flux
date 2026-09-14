import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { FluxFlow, FluxFlowChain, FluxFlowConnection, FluxFlowControls, FluxFlowGraph, FluxFlowNode } from './Flow';
import type { FluxFlowHandle } from './Flow';
import { anchorPoint, getBezierPath, getSmoothStepPath, markerPath, routeAvoid, useFlowLayout, useFlowTrunkLayout } from './FlowUtilities';

describe('flow geometry and layout', () => {
    it('calculates anchors and SVG paths', () => {
        expect(anchorPoint({ x: 10, y: 20 }, { width: 100, height: 60 }, 'right')).toEqual({ x: 110, y: 50 });
        expect(getBezierPath({ x: 0, y: 0 }, 'right', { x: 100, y: 0 }, 'left').path).toContain(' C ');
        expect(getSmoothStepPath({ x: 0, y: 0 }, 'bottom', { x: 100, y: 100 }, 'top').path).toContain('Q');
        expect(markerPath('arrow', { x: 10, y: 10 }, [1, 0])).toContain('Z');
        const routed = routeAvoid({ x: 0, y: 0 }, 'right', { x: 100, y: 0 }, 'left', [{ minX: 40, minY: -10, maxX: 60, maxY: 10 }]);
        expect(routed.path).toContain('M 0 0');
        expect(routed.points.some((point) => point.x > 60)).toBe(true);
    });

    it('lays out layered and trunk graphs deterministically', () => {
        const nodes = [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
            edges = [
                { from: 'a', to: 'b' },
                { from: 'a', to: 'c' }
            ],
            layered = useFlowLayout(nodes, edges),
            trunk = useFlowTrunkLayout(nodes, edges, ['a']);
        expect(layered.positions.b.y).toBeGreaterThan(layered.positions.a.y);
        expect(layered.connections).toHaveLength(2);
        expect(trunk.positions.b.x).toBeGreaterThan(trunk.positions.a.x);
        expect(trunk.connections[0]).toMatchObject({ fromSide: 'right', toSide: 'left' });
    });
});

describe('flow components', () => {
    it('registers nodes, draws connections, and exposes viewport controls', async () => {
        const ref = createRef<FluxFlowHandle>(),
            onViewportChange = vi.fn();
        const { container } = render(
            <FluxFlow ref={ref} interactive defaultViewport={{ x: 0, y: 0, zoom: 1 }} onViewportChange={onViewportChange}>
                <FluxFlowNode id="start" x={0} y={0}>
                    <div data-flow-anchor>Start</div>
                </FluxFlowNode>
                <FluxFlowNode id="end" x={400} y={0}>
                    <div data-flow-anchor>End</div>
                </FluxFlowNode>
                <FluxFlowConnection from="start" to="end" label="Next" />
                <FluxFlowControls />
            </FluxFlow>
        );
        await waitFor(() => expect(container.querySelector(`.${'flowConnectionLine'}`) ?? container.querySelector('svg path')).not.toBeNull());
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(ref.current?.controller.nodes.size).toBe(2);
        fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
        expect(ref.current?.controller.viewport.zoom).toBe(1.2);
        expect(onViewportChange).toHaveBeenCalled();
    });

    it('positions graph children from their connections', () => {
        const { container } = render(
            <FluxFlow>
                <FluxFlowGraph>
                    <FluxFlowNode id="first">First</FluxFlowNode>
                    <FluxFlowNode id="second">Second</FluxFlowNode>
                    <FluxFlowConnection from="first" to="second" />
                </FluxFlowGraph>
            </FluxFlow>,
        );
        const nodes = container.querySelectorAll('[style*=\'translate\']');
        expect(Array.from(nodes).some((node) => node.getAttribute('style')?.includes('150px'))).toBe(true);
    });

    it('aligns chain nodes using their measured cross-axis sizes', async () => {
        const width = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function () {
            return Number.parseFloat((this as HTMLElement).style.width) || 300;
        });
        const {container} = render(
            <FluxFlow>
                <FluxFlowChain align="end">
                    <FluxFlowNode id="narrow" style={{width: 100}}>Narrow</FluxFlowNode>
                    <FluxFlowNode id="wide" style={{width: 200}}>Wide</FluxFlowNode>
                </FluxFlowChain>
            </FluxFlow>,
        );
        await waitFor(() => expect(screen.getByText('Narrow')).toHaveStyle({transform: 'translate(100px, 0px)'}));
        expect(screen.getByText('Wide')).toHaveStyle({transform: 'translate(0px, 150px)'});
        width.mockRestore();
        expect(container).not.toBeEmptyDOMElement();
    });
});
