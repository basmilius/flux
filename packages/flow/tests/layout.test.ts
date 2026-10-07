import { expect, test } from 'bun:test';
import useFlowLayout from '../src/composable/useFlowLayout';

test('centers layers and uses measured sizes', () => {
    const nodes = [{id: 'a', width: 60, height: 30}, {id: 'b', width: 30, height: 15}, {id: 'c', width: 30, height: 15}];
    const edges = [{from: 'a', to: 'b'}, {from: 'a', to: 'c'}];
    const layout = useFlowLayout(nodes, edges, {nodeGap: 15, layerGap: 45, x: 3, y: 6});

    expect(layout.positions).toEqual({a: {x: 10.5, y: 6}, b: {x: 3, y: 81}, c: {x: 48, y: 81}});
    expect(layout.connections.every(edge => edge.fromSide === 'bottom' && edge.toSide === 'top')).toBe(true);
});

test('cuts cycles while discarding self-links and missing endpoints', () => {
    const nodes = ['a', 'b', 'c'].map(id => ({id}));
    const edges = [{from: 'a', to: 'b'}, {from: 'b', to: 'a'}, {from: 'c', to: 'c'}, {from: 'missing', to: 'a'}];
    const layout = useFlowLayout(nodes, edges, {direction: 'horizontal'});

    expect(Object.keys(layout.positions)).toHaveLength(3);
    expect(layout.connections).toHaveLength(2);
    expect(layout.connections[0]).toEqual({from: 'a', to: 'b', fromSide: 'right', toSide: 'left'});
    expect(layout.connections[1]).toEqual({from: 'b', to: 'a', fromSide: 'bottom', toSide: 'bottom'});
});

test('preserves input order for a wide layer', () => {
    const nodes = Array.from({length: 20000}, (_, index) => ({id: String(index)}));
    const layout = useFlowLayout(nodes, []);

    expect(Object.keys(layout.positions)).toHaveLength(nodes.length);
    expect(layout.positions['0']).toEqual({x: 0, y: 0});
    expect(layout.positions['19999']).toEqual({x: 19999 * 345, y: 0});
    expect(layout.connections).toEqual([]);
});
